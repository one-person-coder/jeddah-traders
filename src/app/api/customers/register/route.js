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
      father_name,
      last_name,
      address,
      username,
      email,
      pNumber,
      password,
      gender,
      date,
      status,
      cnic_no,
      cnic_front_img,
      cnic_back_img,
      user_img,
      account_number,
      description,

      family_member_name,
      family_relation,
      family_contact_number,
      family_description,
      refferal_name,
      refferal_account_number,
      refferal_description,
    } = reqBody;
    const ac = parseInt(account_number);

    const existingUser = await prisma.userInfo.findFirst({
      where: {
        OR: [{ username }, { email }, { account_number: ac }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            existingUser.username === username
              ? "Username already exists"
              : existingUser.email == email
              ? "Email already exists"
              : "Account No already assign another user.",
        },
        { status: 400 }
      );
    }

    async function compressImage(base64Image) {
      if (!base64Image || !base64Image.binary) return null;

      const buffer = Buffer.from(base64Image.binary.split(",")[1], "base64");

      const compressedBuffer = await sharp(buffer)
        .resize({ width: 480 })
        .jpeg({ quality: 80 })
        .toBuffer();

      return compressedBuffer;
    }

    const cnicFrontBuffer = await compressImage(cnic_front_img);
    const cnicBackBuffer = await compressImage(cnic_back_img);
    const userImgBuffer = await compressImage(user_img);

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.userInfo.create({
      data: {
        fullname,
        last_name,
        father_name,
        address,
        username,
        email,
        pNumber,
        password: hashedPassword,
        gender,
        date: new Date(date),
        status,
        cnic_front_img: cnicFrontBuffer,
        cnic_back_img: cnicBackBuffer,
        user_img: userImgBuffer,
        cnic_no,
        account_number: ac,
        description,

        family_member_name,
        family_relation,
        family_contact_number,
        family_description,
        refferal_name,
        refferal_account_number,
        refferal_description,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Customer registered successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to register customer",
      },
      { status: 500 }
    );
  }
}
