import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { BillPrint } from "@/components/Printer/BillPrint";

const printer = async ({ params }) => {
  const { id, bid } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
    select: { id: true, status: true, role: true, permissions: true },
  });

  const permissions = user?.permissions ? user.permissions.split(",") : [];
  const payments = await prisma.paymentRecord.findMany({
    where: { customer_id: parseInt(id) },
    include: {
      user: true,
      customer: true,
      items: true,
    },
  });
  return (
    <>
      {permissions.includes("print customer payments") ? (
        <BillPrint payments={payments} id={bid} />
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </>
  );
};

export default printer;
