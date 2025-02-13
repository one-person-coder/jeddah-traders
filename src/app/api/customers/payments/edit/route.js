import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkLoginToken } from "@/app/api/checker";
import { handleLogout } from "@/app/api/handleLogout";

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
    const { customerId, amount, paid_amount, description, method } = reqBody;

    const user = await prisma.userInfo.findUnique({
      where: { id: parseInt(customerId) },
    });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Payment not found" },
        { status: 404 }
      );
    }

    await prisma.paymentRecord.update({
      where: { id: parseInt(customerId) },
      data: {
        amount: parseFloat(amount),
        paid_amount: parseFloat(paid_amount),
        method: method,
        description: description,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Payment updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to updat payment",
      },
      { status: 500 }
    );
  }
}
