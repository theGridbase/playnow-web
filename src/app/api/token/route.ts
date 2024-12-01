import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { type NextRequest } from "next/server";
import { getSession } from "next-auth/react";
import { headers } from "next/headers";

export async function GET(req: NextRequest, res: any) {
  console.log("session cc");
  //   to be done
  const token = await getToken({ req });
  console.log("s =>", token);

  return Response.json({ message: "Hello from Next.js!" }, { status: 200 });
}
