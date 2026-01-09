import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { nin, bvn, address } = body;

  if (!nin || !bvn || !address) {
    return new Response("Missing fields", { status: 400 });
  }

  const SECRET = process.env.DATA_ENCRYPTION_KEY;
  if (!SECRET) {
    return new Response("Server encryption key missing", { status: 500 });
  }

  const encryptedNIN = CryptoJS.AES.encrypt(nin, SECRET).toString();
  const encryptedBVN = CryptoJS.AES.encrypt(bvn, SECRET).toString();

  await prisma.kyc.upsert({
    where: { userId },
    update: {
      ninHash: encryptedNIN,
      bvnHash: encryptedBVN,
      address,
    },
    create: {
      userId,
      ninHash: encryptedNIN,
      bvnHash: encryptedBVN,
      address,
    },
  });

  return new Response("KYC submitted", { status: 200 });
}