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
    const { customerId, amount, paidAmount, description, method, createdAt } =
      reqBody;

    const paymentMethod = method ? method : null;

    await prisma.paymentRecord.create({
      data: {
        user_id: parseInt(login.id),
        customer_id: parseInt(customerId),
        amount: parseFloat(amount),
        paid_amount: parseFloat(paidAmount),
        method: paymentMethod,
        description: description,
        createdAt: new Date(createdAt),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Payment registered successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to register payment",
      },
      { status: 500 }
    );
  }
}
