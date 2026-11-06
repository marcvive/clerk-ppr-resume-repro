"use client";

// Show (like ClerkProvider) is re-exported from #components, which
// resolves to components.client.js -> client-boundary/ClerkProvider.js ->
// pages/ClerkProvider.js, whose top-level statement renames the shared
// @clerk/react provider to "ReactClerkProvider". Hooks such as useAuth
// do not trigger it: the package is "sideEffects": false, so they never
// load components.client.js.
import { Show } from "@clerk/nextjs";

const AuthStatus = () => (
  <Show when="signed-out">
    <p>Signed out</p>
  </Show>
);

export default AuthStatus;
