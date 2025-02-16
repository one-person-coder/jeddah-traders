import CustomerCards from "@/components/Customer/CustomerCards";
import CustomerLists from "@/components/Customer/CustomerLists";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      customerPayments: true,
    },
  });

  console.log("usrs", users);

  return (
    <div className="custom-width">
      <div className="flex mt-3 flex-wrap flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Customer Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and monitor Customer accounts
          </p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200"
          size="lg"
          asChild
        >
          <Link href={"/dashboard/customers/new"}>
            <Plus className="h-4 w-4" />
            Add New Customer
          </Link>
        </Button>
      </div>
      <CustomerCards data={users} />
      <CustomerLists data={users} />
    </div>
  );
};

export default CustomersPage;
