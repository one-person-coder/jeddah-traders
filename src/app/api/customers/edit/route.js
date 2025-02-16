import { NextResponse } from "next/server";
import { checkLoginToken } from "../../checker";
import prisma from "@/lib/prisma";
import { handleLogout } from "../../handleLogout";
import sharp from "sharp";

export async function POST(request) {
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

  try {
    const reqBody = await request.json();
    const {
      id,
      fullname,
      father_name,
      account_number,
      address,
      username,
      email,
      pNumber,
      gender,
      date,
      status,
      role,
      cnic_no,
      cnic_front_img_bak,
      cnic_back_img_bak,
      user_img_bak,

      family_member_name,
      family_relation,
      family_contact_number,
      family_description,
      refferal_name,
      refferal_account_number,
      refferal_description,
    } = reqBody;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.userInfo.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Customer not found" },
        { status: 404 }
      );
    }

    const existingUser = await prisma.userInfo.findFirst({
      where: {
        OR: [
          { username: username, NOT: { id: parseInt(id) } },
          { email: email, NOT: { id: parseInt(id) } },
          {
            account_number: parseInt(account_number),
            NOT: { id: parseInt(id) },
          },
        ],
      },
    });

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
    const cnicFrontBuffer = await compressImage(cnic_front_img_bak);
    const cnicBackBuffer = await compressImage(cnic_back_img_bak);
    const userImgBuffer = await compressImage(user_img_bak);

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username, Email or maybe account no already used. ",
        },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.userInfo.update({
      where: { id: parseInt(id) },
      data: {
        fullname: fullname || user.fullname,
        father_name: father_name || user.father_name,
        address: address || user.address,
        account_number: parseInt(account_number) || user.account_number,
        username: username || user.username,
        email: email || user.email,
        pNumber: pNumber || user.pNumber,
        gender: gender || user.gender,
        date: date ? new Date(date) : user.date,
        status: status || user.status,
        role: role || user.role,
        cnic_front_img: cnicFrontBuffer || user.cnic_front_img,
        cnic_back_img: cnicBackBuffer || user.cnic_back_img,
        user_img: userImgBuffer || user.user_img,
        cnic_no: cnic_no || user.cnic_no,
        family_member_name: family_member_name || user.family_member_name,
        family_relation: family_relation || user.family_relation,
        family_contact_number:
          family_contact_number || user.family_contact_number,
        family_description: family_description || user.family_description,
        refferal_name: refferal_name || user.refferal_name,
        refferal_account_number:
          refferal_account_number || user.refferal_account_number,
        refferal_description: refferal_description || user.refferal_description,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Customer updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
