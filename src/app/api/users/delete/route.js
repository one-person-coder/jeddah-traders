import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkLoginToken } from "../../checker";

export async function POST(request) {
  try {
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

    const reqBody = await request.json();
    const { id } = reqBody;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const deletedUser = await prisma.userInfo.delete({
      where: { id: parseInt(id) },
    });

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
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
