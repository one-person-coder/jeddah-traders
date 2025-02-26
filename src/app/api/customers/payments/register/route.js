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
      customerId,
      amount,
      paidAmount,
      description,
      method,
      createdAt,
      items,
      total,
      less,
      payment,
    } = reqBody;

    // console.log("---> start logging....");
    // console.log("customerId --> ", typeof customerId, customerId);
    // console.log("amount --> ", typeof amount, amount);
    // console.log("paidAmount --> ", typeof paidAmount, paidAmount);
    // console.log("description --> ", typeof description, description);
    // console.log("method --> ", typeof method, method);
    // console.log("createdAt --> ", typeof createdAt, createdAt);
    // console.log("total --> ", typeof total, total);
    // console.log("less --> ", typeof less, less);
    // console.log("payment --> ", typeof payment, payment);
    // console.log("items --> ", typeof items, items);

    // console.log("......end logging ----->");

    const paymentMethod = method ? method : null;

    const paymentRecord = await prisma.paymentRecord.create({
      data: {
        user_id: parseInt(login.id),
        customer_id: parseInt(customerId),
        amount: parseFloat(amount) || (total ? parseFloat(total) : null),
        paid_amount: parseFloat(paidAmount) || (less ? parseFloat(less) : null),
        method: paymentMethod,
        description: description,
        createdAt: new Date(createdAt),
        total: total ? parseFloat(total) : null,
        less: less ? parseFloat(less) : null,
        payment: payment ? parseFloat(payment) : null,
      },
    });

    if (items && items.length > 0) {
      const paymentItems = items.map((item) => ({
        payment_id: paymentRecord.id,
        product_id: parseInt(item.productId),
        name: item.name,
        qty: parseInt(item.qty),
        price: parseFloat(item.price),
        amount: parseFloat(item.amount),
      }));

      await prisma.paymentItem.createMany({
        data: paymentItems,
      });
    }

    return NextResponse.json({
      paymentRecord,
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
