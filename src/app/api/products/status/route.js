import { NextResponse } from "next/server";
import { checkLoginToken } from "../../checker";
import prisma from "@/lib/prisma";
import { handleLogout } from "../../handleLogout";

export async function GET(request) {
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

  const users = await prisma.product.findMany();

  return NextResponse.json({
    success: true,
    data: users,
    message: "Products fetched successfully",
  });
}
