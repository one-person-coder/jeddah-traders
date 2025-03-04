import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import ReportPage from "@/components/Report/ReportPage";

export const revalidate = 0;
const ReportsPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
  });

  if (user.role === "customer") {
    return redirect("/dashboard");
  }

  const date = new Date();
  const utcDate = new Date(date.toUTCString());

  const day = utcDate.getUTCDate();
  const month = utcDate.toLocaleString("en-GB", {
    month: "short",
    timeZone: "UTC",
  });
  const year = utcDate.getUTCFullYear();
  const weekday = utcDate.toLocaleString("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  });

  const formattedDate = `${day}-${month}-${year}, ${weekday}`;

  return (
    <div className="custom-width">
      {user.role === "admin" ? (
        <>
          <div className="mt-8 text-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Reports Management
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and monitor Reports
              </p>
            </div>
          </div>

          <div className="py-6 mt-3 text-center">
            <ReportPage formattedDate={formattedDate} />
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
