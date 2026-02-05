import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Payload + Postgres pulls in node-only dependencies (drizzle-kit/esbuild)
  // that Turbopack shouldn't try to bundle/parse.
  serverExternalPackages: [
    "payload",
    "@payloadcms/db-postgres",
    "@payloadcms/drizzle",
    "drizzle-kit",
    "esbuild",
    "esbuild-register",
    "@esbuild/linux-x64",
    "@esbuild/darwin-arm64",
    "@esbuild/darwin-x64",
    "@libsql/client",
    "@libsql/linux-x64-gnu",
    "@libsql/linux-arm64-gnu",
  ],
};

export default nextConfig;
