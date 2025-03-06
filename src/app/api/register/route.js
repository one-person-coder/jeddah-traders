import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import sharp from "sharp";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      fullname,
      username,
      email,
      pNumber,
      password,
      gender,
      date,
      cnic_no,
      cnic_front_img,
      cnic_back_img,
      user_img,
      father_name,
      address,

      family_member_name,
      family_relation,
      family_contact_number,
      family_description,
      refferal_name,
      refferal_account_number,
      refferal_description,
      description,
    } = reqBody;

    async function compressImage(base64Image) {
      if (!base64Image || !base64Image.binary) return null;

      const buffer = Buffer.from(base64Image.binary.split(",")[1], "base64");

      const compressedBuffer = await sharp(buffer)
        .resize({ width: 480 })
        .jpeg({ quality: 80 })
        .toBuffer();

      return compressedBuffer;
    }

    // ✅ Compress all images
    const cnicFrontBuffer = await compressImage(cnic_front_img);
    const cnicBackBuffer = await compressImage(cnic_back_img);
    const userImgBuffer = await compressImage(user_img);

    const existingUser = await prisma.userInfo.findFirst({
      where: { OR: [{ username }, { email }] },
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
        father_name,
        address,
        username,
        email,
        pNumber,
        password: hashedPassword,
        gender,
        date: new Date(date + "Z").toISOString(),
        cnic_front_img: cnicFrontBuffer,
        cnic_back_img: cnicBackBuffer,
        user_img: userImgBuffer,
        cnic_no,

        family_member_name,
        family_relation,
        family_contact_number,
        family_description,
        refferal_name,
        refferal_account_number,
        refferal_description,
        description,
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
