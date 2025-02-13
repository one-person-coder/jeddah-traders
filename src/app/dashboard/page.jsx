import { ErrorToast } from "@/components/utils/CustomToasts";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import DashboardCards from "@/components/Dashboard/Customer/DashboardCards";
import DashboardLists from "@/components/Dashboard/Customer/DashboarLists";

const Dashboard = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
    select: { id: true, status: true, role: true },
  });
  const stats = await prisma.paymentRecord.findMany({
    where: { customer_id: decoded.id },
    include: {
      user: true,
      customer: true,
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
        {stats && stats.length >= 1 || user.role === "customer" ? (
          <h3 className="text-3xl font-bold">
            <DashboardCards data={stats} />
            <DashboardLists data={stats} customerId={decoded.id} />
          </h3>
        ) : (
          <h3 className="text-3xl text-center py-20 font-bold">Coming Soon!</h3>
        )}
      </div>
    </>
  );
};

export default Dashboard;
