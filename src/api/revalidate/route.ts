// src/api/revalidate/route.ts

import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    if (!SANITY_WEBHOOK_SECRET) {
      console.error("Missing SANITY_WEBHOOK_SECRET");
      return NextResponse.json(
        { message: "Secret not configured" },
        { status: 500 },
      );
    }

    const { body, isValidSignature } = await parseBody<{
      _type: string;
      _id: string;
    }>(req, SANITY_WEBHOOK_SECRET);

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Invalid payload", { status: 400 });
    }

    // POPRAWKA DLA NEXT.JS 16:
    // W tej wersji revalidateTag wymaga drugiego argumentu 'profile'.
    // Ustawiamy go na 'default'.

    // 1. Odśwież ogólny tag typu (np. "homePage")
    revalidateTag(body._type, "default");

    // 2. Odśwież konkretny tag ID (jeśli istnieje)
    if (body._id) {
      revalidateTag(`${body._type}:${body._id}`, "default");
    }

    console.log(
      `Revalidated tags: ${body._type} ${body._id ? `and ${body._type}:${body._id}` : ""}`,
    );

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("Error in revalidate route:", err);
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    return NextResponse.json({ message }, { status: 500 });
  }
}
