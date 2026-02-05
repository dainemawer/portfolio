function normalizeURL(input: string): string {
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  return `https://${input}`;
}

export function getServerURL(): string {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.PAYLOAD_PUBLIC_SERVER_URL;
  if (explicit && explicit.length > 0) return normalizeURL(explicit);

  const vercel = process.env.VERCEL_URL;
  if (vercel && vercel.length > 0) return normalizeURL(vercel);

  return "http://localhost:3000";
}
