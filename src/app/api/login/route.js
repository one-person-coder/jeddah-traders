import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma"; // Prisma connection
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    // ✅ Find user by username
    const user = await prisma.userInfo.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User does not exist",
        },
        { status: 400 }
      );
    }

    // ✅ Compare password with hashed password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect password",
        },
        { status: 401 }
      );
    }

    // ✅ Create JWT token
    const tokenData = { id: user.id }; // Prisma uses `id`, not `_id`
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "15d",
    });

    // ✅ Send token in HttpOnly cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60, // 15 days in seconds
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to login user",
      },
      { status: 500 }
    );
  }
}
