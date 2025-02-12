import { NextResponse } from "next/server";
import { checkLoginToken } from "../../checker";
import prisma from "@/lib/prisma";

export async function GET(request) {
  const login = await checkLoginToken(request);
  if (!login) {
    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  }

  const users = await prisma.userInfo.findMany({
    where: {
      role: {
        in: ["admin", "manager"],
      },
    },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      pNumber: true,
      gender: true,
      date: true,
      createdAt: true,
      status: true,
      role: true,
    },
  });

  return NextResponse.json({
    success: true,
    data: users,
    message: "Users fetched successfully",
  });
}
