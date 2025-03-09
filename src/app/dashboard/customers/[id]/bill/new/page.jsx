import SaleEntry from "@/components/Bill/NewBill";
import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { User } from "lucide-react";

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

  const permissions = user?.permissions ? user.permissions.split(",") : [];

  return (
    <div>
      {permissions.includes("make bill") ? (
        <SaleEntry username={currentUser.username} permissions={permissions} />
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </div>
  );
};

export default MakeBill;
