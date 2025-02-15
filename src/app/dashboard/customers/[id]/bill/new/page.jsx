import SaleEntry from "@/components/Bill/NewBill";
import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const MakeBill = async ({ params }) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
  });

  if (user.role === "customer") {
    return redirect("/dashboard");
  }

  const currentUser = await prisma.userInfo.findUnique({
    where: { id: parseInt(id) },
  });

  return (
    <div>
      <SaleEntry username={currentUser.username} />
    </div>
  );
};

export default MakeBill;
