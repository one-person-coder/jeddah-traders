import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { fullname, username, email, pNumber, password, gender, date } =
      reqBody;

    const existingUser = await prisma.userInfo.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            existingUser.username === username
              ? "Username already exists"
              : "Email already exists",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.userInfo.create({
      data: {
        fullname,
        username,
        email,
        pNumber,
        password: hashedPassword,
        gender,
        date: new Date(date),
      },
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to register user",
      },
      { status: 500 }
    );
  }
}
