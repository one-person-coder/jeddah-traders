import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkLoginToken } from "@/app/api/checker";
import { handleLogout } from "@/app/api/handleLogout";

export async function POST(request) {
  const reqBody = await request.json();
  const login = await checkLoginToken(request);

  const { customerId } = reqBody;

  if (!customerId) {
    return NextResponse.json({
      success: false,
      message: "Customer ID is required!",
    });
  }

  if (!login || login.status === "inactive" || login.status === "pending") {
    return handleLogout(login);
  }

  const payments = await prisma.paymentRecord.findMany({
    where: { customer_id: parseInt(customerId) },
    include: {
      user: true,
      customer: true,
    },
  });

  return NextResponse.json({
    success: true,
    data: payments,
    message: "Payments fetched successfully",
  });
}
