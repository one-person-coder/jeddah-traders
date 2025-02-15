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
    const { name, price, description } = reqBody;

    const pr = parseInt(price);

    const existingUser = await prisma.product.findFirst({
      where: {
        OR: [{ name }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Product name already exist choose another",
        },
        { status: 400 }
      );
    }

    await prisma.product.create({
      data: {
        name,
        price: pr,
        description,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product registered successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to register Product",
      },
      { status: 500 }
    );
  }
}
