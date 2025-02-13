import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkLoginToken } from "@/app/api/checker";
import { handleLogout } from "@/app/api/handleLogout";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  const login = await checkLoginToken(request);

  if (!login || login.status === "inactive" || login.status === "pending") {
    return handleLogout(login);
  }


  try {
    const reqBody = await request.json();
    const { oldPassword, newPassword, confirmPassword } = reqBody;

    // Password validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Find user in database
    const user = await prisma.userInfo.findUnique({
      where: { id: Number(login.id) },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check old password
    const isMatch = await bcryptjs.compare(oldPassword, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect old password" },
        { status: 401 }
      );
    }

    // Hash new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update password
    await prisma.userInfo.update({
      where: { id: Number(login.id) },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
