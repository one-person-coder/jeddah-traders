import { NextResponse } from "next/server";
import { checkLoginToken } from "../../checker";
import prisma from "@/lib/prisma";
import { handleLogout } from "../../handleLogout";

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
    const { id, name, price, description } = reqBody;

    const pr = parseInt(price)

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const ac = parseInt(id);

    const user = await prisma.product.findUnique({
      where: { id: parseInt(ac) },
    });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    const existingUser = await prisma.product.findFirst({
      where: {
        OR: [{ name: name, NOT: { id: parseInt(ac) } }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Product name is already used please change it.",
        },
        { status: 400 }
      );
    }

    await prisma.product.update({
      where: { id: parseInt(ac) },
      data: {
        name: name || user.name,
        price: pr || user.price,
        description: description || user.description,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
