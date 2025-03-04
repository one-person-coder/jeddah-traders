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
    const {
      id,
      customer_id,
      amount,
      paidAmount,
      description,
      method,
      createdAt,
    } = reqBody;

    console.log(
      customer_id,
      amount,
      paidAmount,
      description,
      method,
      createdAt
    );

    const user = await prisma.userInfo.findUnique({
      where: { id: parseInt(customer_id) },
    });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Payment not found" },
        { status: 404 }
      );
    }

    const paymentMethod = method ? method : null;

    await prisma.paymentRecord.update({
      where: { id: parseInt(id) },
      data: {
        amount: parseFloat(amount),
        paid_amount: parseFloat(paidAmount),
        method: paymentMethod,
        description: description,
        createdAt: new Date(createdAt + "Z").toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Payment updated successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update payment",
      },
      { status: 500 }
    );
  }
}
