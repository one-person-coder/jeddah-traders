import CustomerCards from "@/components/Customer/CustomerCards";
import CustomerLists from "@/components/Customer/CustomerLists";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const revalidate = 0;

const CustomersPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
  });

  if (user.role === "customer") {
    return redirect("/dashboard");
  }

  const users = await prisma.userInfo.findMany({
    where: {
      role: {
        in: ["customer"],
      },
    },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      gender: true,
      date: true,
      status: true,
      pNumber: true,
      account_number: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div className="custom-width">
      <CustomerCards data={users} />
      <CustomerLists data={users} />
    </div>
  );
};

export default CustomersPage;
