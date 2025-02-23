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
      last_name: true,
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

  const permissions = user?.permissions ? user.permissions.split(",") : [];
  const userRole = user?.role;

  return (
    <div className="custom-width">
      {permissions.includes("view customer") ? (
        <>
          <div className="flex mt-3 flex-wrap flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Customer Management
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and monitor Customer accounts
              </p>
            </div>
            {permissions.includes("create customer") ? (
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
            ) : null}
          </div>
          <CustomerCards data={users} />
          <CustomerLists
            data={users}
            permissions={permissions}
            role={userRole}
          />{" "}
        </>
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </div>
  );
};

export default CustomersPage;
