import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = await headers();

  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  try {
    const event = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    if (event.type === "user.created") {
      // email_addresses removed (not needed)
      const { id, first_name, last_name } = event.data;

      console.log("User created:", { id, first_name, last_name });

      // TODO: Add Prisma create user
    }

    return new Response("OK", { status: 200 });
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }
}
