/** @type {import('next').NextConfig} */
const nextConfig = {
  // Partial Prerendering: the static shell (which contains ClerkProvider)
  // is prerendered at build time and resumed per request.
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
