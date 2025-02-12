import { NextResponse } from "next/server";
import { checkLoginToken } from "../../checker";
import prisma from "@/lib/prisma";

export async function POST(request) {
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

  try {
    const reqBody = await request.json();
    const {
      id,
      fullname,
      username,
      email,
      pNumber,
      gender,
      date,
      status,
      role,
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
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const existingUser = await prisma.userInfo.findFirst({
      where: {
        OR: [
          { username: username, NOT: { id: parseInt(id) } },
          { email: email, NOT: { id: parseInt(id) } },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username or Email already exists Please choose another",
        },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.userInfo.update({
      where: { id: parseInt(id) },
      data: {
        fullname: fullname || user.fullname,
        username: username || user.username,
        email: email || user.email,
        pNumber: pNumber || user.pNumber,
        gender: gender || user.gender,
        date: date ? new Date(date) : user.date,
        status: status || user.status,
        role: role || user.role,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
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
