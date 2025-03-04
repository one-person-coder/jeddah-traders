import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import ReportPage from "@/components/Report/ReportPage";

export const revalidate = 0;
const ReportsPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return (
      <h3 className="text-3xl text-center py-20 font-bold text-red-600">
        Unauthorized
      </h3>
    );
  }

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
  });

  if (!user || user.role === "customer") {
    return redirect("/dashboard");
  }

  const userData = await prisma.userInfo.findMany({
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
      customerPayments: {
        select: {
          amount: true,
          isDelete: true,
          description: true,
          paid_amount: true,
          createdAt: true,
          user: {
            select: {
              fullname: true,
              username: true
            },
          },
        },
      },
    },
  });

  return (
    <div className="custom-width">
      {user.role === "admin" ? (
        <>
          {/* <div className="mt-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Reports Management
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and monitor Reports
            </p>
          </div> */}

          <div className="py-6 mt-3">
            <ReportPage userData={userData} />
          </div>
        </>
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </div>
  );
};

export default ReportsPage;
