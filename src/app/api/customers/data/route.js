import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { checkLoginToken } from "../../checker";
import prisma from "@/lib/prisma";
import { handleLogout } from "../../handleLogout";

export async function GET(request) {
  try {
    const login = await checkLoginToken(request);

    if (!login || login.status === "inactive" || login.status === "pending") {
      return handleLogout(login);
    }


    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // Fetch user from Prisma database
    const user = await prisma.userInfo.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        fullname: true,
        username: true,
        email: true,
        pNumber: true,
        gender: true,
        date: true,
        status: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}
