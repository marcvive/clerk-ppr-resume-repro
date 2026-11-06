import { Suspense } from "react";
import { connection } from "next/server";

import AuthStatus from "./AuthStatus";

// Request-time content. Because it waits on connection(), it is left out
// of the build-time prerender, so AuthStatus (and with it Clerk's
// components.client.js) is first loaded on the running server.
const Dynamic = async () => {
  await connection();
  return <AuthStatus />;
};

const Page = () => (
  <main>
    <h1>Clerk PPR resume repro</h1>
    <Suspense fallback={<p>Loading…</p>}>
      <Dynamic />
    </Suspense>
  </main>
);

export default Page;
