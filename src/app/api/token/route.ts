import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);

  return Response.json({ message: "Hello from Next.js!" }, { status: 200 });
}
