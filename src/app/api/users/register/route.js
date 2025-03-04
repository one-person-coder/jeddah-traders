import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { checkLoginToken } from "../../checker";
import prisma from "@/lib/prisma";
import { handleLogout } from "../../handleLogout";
import sharp from "sharp";

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
      user_img,
      permissionNames,
    } = reqBody;

    const permissionsString = permissionNames.join(",");

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

    async function compressImage(base64Image) {
      if (!base64Image || !base64Image.binary) return null;

      const buffer = Buffer.from(base64Image.binary.split(",")[1], "base64");

      const compressedBuffer = await sharp(buffer)
        .resize({ width: 480 })
        .jpeg({ quality: 80 })
        .toBuffer();

      return compressedBuffer;
    }

    const userImgBuffer = await compressImage(user_img);

    await prisma.userInfo.create({
      data: {
        fullname,
        username,
        email,
        pNumber,
        password: hashedPassword,
        gender,
        date: new Date(createdAt + "Z").toISOString(),
        status,
        role: "manager",
        user_img: userImgBuffer,
        permissions: permissionsString,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to register user",
      },
      { status: 500 }
    );
  }
}
