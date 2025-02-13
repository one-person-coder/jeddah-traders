import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { checkLoginToken } from "../../checker";
import prisma from "@/lib/prisma";
import { handleLogout } from "../../handleLogout";

export async function POST(request) {
  try {
    const login = await checkLoginToken(request);

    if (!login || login.status === "inactive" || login.status === "pending") {
      return handleLogout(login);
    }

    if (login.role === "customer") {
      return NextResponse.json({
        success: false,
        message: "Unauthorized access detected!",
      });
    }

    const reqBody = await request.json();
    const {
      fullname,
      username,
      email,
      pNumber,
      password,
      gender,
      date,
      status,
    } = reqBody;

    // Check if user already exists
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

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.userInfo.create({
      data: {
        fullname,
        username,
        email,
        pNumber,
        password: hashedPassword,
        gender,
        date: new Date(date),
        status,
        role: "manager",
      },
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to register user",
      },
      { status: 500 }
    );
  }
}
