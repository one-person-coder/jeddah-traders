import PaymentCards from "@/components/Payment/PaymentCards";
import PaymentLists from "@/components/Payment/PaymentLists";
import Image from "next/image";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

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
  });

  const payments = await prisma.paymentRecord.findMany({
    where: { customer_id: parseInt(id) },
    include: {
      user: true,
      customer: true,
    },
  });

  let base64String;
  let imageSrc;

  if (currentUser.user_img) {
    base64String = btoa(String.fromCharCode(...currentUser.user_img));
    imageSrc = `data:image/jpeg;base64,${base64String}`;
  }

  if (!payments) {
    return <div>User not found</div>;
  }

  return (
    <div className="custom-width">
      <PaymentCards data={payments} />
      <div className="flex sm:items-end flex-col justify-between sm:flex-row items-center bg-white shadow-light rounded-md p-2">
        <div className="flex sm:items-end flex-col sm:flex-row items-center">
          <div className="border-4 rounded-md overflow-hidden z-20 border-white">
            <Image
              src={imageSrc || "/1.png"}
              height={80}
              width={80}
              alt="image"
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

        <div>
          <div>
            <Link
              className="py-[7px] justify-center rounded-md px-6 text-white duration-150 flex gap-2 items-center no-underline!text-white !bg-[#8C57FF] hover:!bg-purple-600"
              href={`/dashboard/customers`}
            >
              <LogOut className="h-5 w-5 rotate-180" />
              Back
            </Link>
          </div>
        </div>
      </div>
      <PaymentLists data={payments} customerId={id} />
    </div>
  );
};

export default Payments;
