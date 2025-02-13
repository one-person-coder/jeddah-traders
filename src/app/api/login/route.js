import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma"; // Prisma connection
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

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

    if (user.status === "inactive") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your account is inactive. For more details, please contact the site owner.",
        },
        { status: 401 }
      );
    }

    if (user.status === "pending") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your account is currently pending. The site administrator will activate it after review.",
        },
        { status: 401 }
      );
    }

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

    const tokenData = { id: user.id };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "15d",
    });

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to login user",
      },
      { status: 500 }
    );
  }
}
