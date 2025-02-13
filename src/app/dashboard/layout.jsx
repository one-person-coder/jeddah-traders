import MainSideBar from "@/components/SideBar/Layout/MainSideBar";
import { ErrorToast } from "@/components/utils/CustomToasts";
import { cookies } from "next/headers";
import {
  LayoutDashboard,
  Settings,
  Users,
  User,
  ChartColumn,
} from "lucide-react";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
    select: { id: true, status: true, role: true },
  });

  if (!user) {
    ErrorToast("Session expired, please login again");
    return <></>;
  }
  if (user.status === "inactive") {
    ErrorToast("Your account has been deactivated");
    return <></>;
  }
  if (user.status === "pending") {
    ErrorToast(
      "Your account is pending. The site administrator will activate it after review."
    );
    return <></>;
  }

  let userType;

  if (user.role === "admin") {
    userType = "admin";
  }
  if (user.role === "customer") {
    userType = "customer";
  }

  return <MainSideBar userType={userType}>{children}</MainSideBar>;
}
