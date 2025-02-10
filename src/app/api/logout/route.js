import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    success: true,
    message: "Logout successful",
  });
  response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
  return response;
}
