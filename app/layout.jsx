import { ClerkProvider } from "@clerk/nextjs";

// ClerkProvider sits in the static shell, exactly as Clerk's Next.js
// quickstart places it. Its component name is recorded in the prerender
// and compared again when the shell is resumed at request time.
const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <ClerkProvider>{children}</ClerkProvider>
    </body>
  </html>
);

export default RootLayout;
