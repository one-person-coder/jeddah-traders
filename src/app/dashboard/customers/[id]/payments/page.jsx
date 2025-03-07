import PaymentCards from "@/components/Payment/PaymentCards";
import PaymentLists from "@/components/Payment/PaymentLists";
import Image from "next/image";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { LogOut, Mail, Transgender } from "lucide-react";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const revalidate = 0;

const Payments = async ({ params }) => {
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
    select: {
      username: true,
      fullname: true,
      pNumber: true,
      cnic_no: true,
      address: true,
      user_img: true,
      account_number: true,
    },
  });

  const payments = await prisma.paymentRecord.findMany({
    where: { customer_id: parseInt(id) },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      user: {
        select: {
          username: true,
          fullname: true,
          pNumber: true,
          cnic_no: true,
          address: true,
          account_number: true,
        },
      },
      customer: {
        select: {
          username: true,
          fullname: true,
          pNumber: true,
          cnic_no: true,
          address: true,
          account_number: true,
        },
      },
      id: true,
      amount: true,
      description: true,
      method: true,
      paid_amount: true,
      total: true,
      less: true,
      payment: true,
      isDelete: true,
      createdAt: true,
      updatedAt: true,
      items: true,
    },
  });

  console.log("user", payments);

  let base64String;
  let imageSrc;

  if (currentUser.user_img) {
    base64String = btoa(String.fromCharCode(...currentUser.user_img));
    imageSrc = `data:image/jpeg;base64,${base64String}`;
  }

  if (!payments) {
    return <div>User not found</div>;
  }

  const permissions = user?.permissions ? user.permissions.split(",") : [];

  return (
    <div className="custom-width">
      {permissions.includes("view customer payments") ? (
        <>
          <div className="flex flex-col justify-between sm:flex-row items-center bg-white shadow-light rounded-md p-2 gap-4">
            <div className="flex sm:items-end flex-col sm:flex-row items-center">
              <div className="border-4 rounded-md overflow-hidden z-20 border-zinc-300">
                <Image
                  src={imageSrc || "/1.png"}
                  height={80}
                  width={80}
                  alt="image"
                  className="min-h-[80px] min-w-[80px]"
                />
              </div>
              <div className="p-3 sm:text-start text-center ml-3 sm:ml-0">
                <div className="prose sm:text-start">
                  <h2 className="font-semibold text-zinc-700 mb-0 text-2xl">
                    {currentUser.fullname}
                  </h2>
                </div>
                <div>
                  <div className="flex gap-2 items-center text-zinc-600">
                    <span>{currentUser.username}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 self-start text-center">
              <div className="flex justify-center items-center flex-wrap">
                <div className="bg-green-400 rounded-sm p-1 px-2 w-fit">
                  Account No:
                  <span>{currentUser.account_number}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap justify-center mt-2">
                <div>FullName: {currentUser.fullname}</div>
                <span className="text-green-500">|</span>
                <div>Username: {currentUser.username}</div>
                <span className="text-green-500">|</span>
                <div>Phone No: {currentUser.pNumber}</div>
                <span className="text-green-500">|</span>
                <div>CNIC No: {currentUser.cnic_no}</div>
                <span className="text-green-500">|</span>
                <div>Address: {currentUser.address}</div>
              </div>
            </div>

            <div className="flex gap-2 flex-col">
              <div>
                <Link
                  className="py-[6px] justify-center rounded-md px-6 text-white duration-150 flex gap-2 items-center no-underline!text-white !bg-green-500 hover:!bg-green-600"
                  href={`/dashboard/customers/${currentUser.id}/view`}
                >
                  Profile
                </Link>
              </div>
              <div>
                <Link
                  className="py-[6px] justify-center rounded-md px-6 text-white duration-150 flex gap-2 items-center no-underline!text-white !bg-[#8C57FF] hover:!bg-purple-600"
                  href={`/dashboard/customers`}
                >
                  <LogOut className="h-5 w-5 rotate-180" />
                  Back
                </Link>
              </div>
            </div>
          </div>
          <PaymentCards data={payments} />
          <PaymentLists
            data={payments}
            customerId={id}
            permissions={permissions}
          />
        </>
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </div>
  );
};

export default Payments;
