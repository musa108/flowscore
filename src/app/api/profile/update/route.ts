import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
 const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const updated = await prisma.user.update({
    where: { clerkId: userId },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      accountType: body.accountType,
      businessName: body.businessName,
      businessType: body.businessType,
    },
  });

  return NextResponse.json(updated);
}
