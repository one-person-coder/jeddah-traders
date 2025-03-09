import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import DashboardCards from "@/components/Dashboard/Customer/DashboardCards";
import DashboardLists from "@/components/Dashboard/Customer/DashboarLists";
import UserDashboard from "@/components/Dashboard/User/UserDashboard";

const Dashboard = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
    select: { id: true, status: true, role: true },
  });

  const startOfDay = new Date(new Date() + "Z");
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setUTCHours(23, 59, 59, 999);

  const stats = await prisma.paymentRecord.findMany({
    where: { customer_id: decoded.id },
    include: {
      user: true,
      customer: true,
    },
  });

  const paymentData = await prisma.PaymentRecord.findMany({
    where: { isDelete: false, user_id: decoded.id },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      amount: true,
      isDelete: true,
      description: true,
      paid_amount: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          fullname: true,
          username: true,
        },
      },
      customer: {
        select: {
          id: true,
          fullname: true,
          last_name: true,
          username: true,
          pNumber: true,
          account_number: true,
          createdAt: true,
        },
      },
    },
  });

  if (!stats) {
    return redirect("/logout");
  }
  if (stats.status === "inactive") {
    return redirect("/logout");
  }
  if (stats.status === "pending") {
    return redirect("/logout");
  }

  return (
    <>
      <div className="custom-width">
        {(stats && stats.length >= 1) || user.role === "customer" ? (
          <h3 className="text-3xl font-bold">
            <DashboardCards data={stats} />
            <DashboardLists data={stats} customerId={decoded.id} />
          </h3>
        ) : (
          <div className="m-3">
            <UserDashboard userData={paymentData} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
