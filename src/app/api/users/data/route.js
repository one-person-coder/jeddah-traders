import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { checkLoginToken } from "../../checker";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const login = await checkLoginToken(request);

    if (!login) {
      const response = NextResponse.json({
        success: true,
        message: "Logout successful",
      });
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      return response;
    }

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // Fetch user from Prisma database
    const user = await prisma.userInfo.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        fullname: true,
        username: true,
        email: true,
        pNumber: true,
        gender: true,
        date: true,
        status: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}
