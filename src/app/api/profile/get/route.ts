import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth(); // ✅ FIXED

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  return new Response(JSON.stringify(profile), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
