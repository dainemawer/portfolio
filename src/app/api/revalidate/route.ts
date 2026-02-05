import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

type Body = {
  tags?: unknown;
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET not configured" },
      { status: 500 },
    );
  }

  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  if (!isStringArray(body.tags) || body.tags.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Body must include non-empty `tags: string[]`" },
      { status: 400 },
    );
  }

  for (const tag of body.tags) revalidateTag(tag);

  return NextResponse.json({ ok: true, revalidated: body.tags });
}
