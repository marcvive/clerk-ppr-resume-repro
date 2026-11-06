# @clerk/nextjs >= 7.9.24 breaks Partial Prerendering resume

Minimal reproduction for the error:

```
Error: Expected the resume to render <ClerkProvider> in this slot but instead it rendered <ReactClerkProvider>. The tree doesn't match so React will fallback to client rendering.
```

## Steps

1. `cp .env.local.example .env.local` and fill in the keys of a Clerk development instance.
2. `npm install`
3. `npm run build && npm start`
4. Request the page twice: `curl -s http://localhost:3200/ > /dev/null` (twice), or load it and reload it in a browser.
5. The first request renders fine and loads `Show`. From the second request on, the server console prints the error above for every request; the browser console shows minified React error #419 and the page falls back to client rendering.

## Control

`npm install @clerk/nextjs@7.9.23 --save-exact`, rebuild, repeat step 4: no error.

## Cause

Since 7.9.24, `dist/esm/pages/ClerkProvider.js` runs
`ReactClerkProvider.displayName = "ReactClerkProvider"` at module top level
(previously inside the Pages Router provider's render). `ReactClerkProvider`
is the shared `InternalClerkProvider` from `@clerk/react/internal`, which the
App Router provider also renders and which `@clerk/react` names
`"ClerkProvider"`. The module is pulled in through `#components`
(`components.client.js`), which client components reach by importing `Show`
or `ClerkProvider` from `@clerk/nextjs`. Once that has happened on the
server, the provider's name has changed: the build-time prerender recorded
`<ClerkProvider>`, the warm server resumes with `<ReactClerkProvider>`, and
React's resume check (which compares component names) fails.

Hooks such as `useAuth` alone do not trigger it: the package is
`"sideEffects": false`, so they never load `components.client.js`.
