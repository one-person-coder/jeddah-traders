import MainSideBar from "@/components/SideBar/Layout/MainSideBar";
import { ErrorToast } from "@/components/utils/CustomToasts";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
    select: { id: true, status: true, role: true },
  });

  if (!user) {
    return redirect("/logout");
  }
  if (user.status === "inactive") {
    return redirect("/logout");
  }
  if (user.status === "pending") {
    return redirect("/logout");
  }

  let userType;

  if (user.role === "admin") {
    userType = "admin";
  }
  if (user.role === "customer") {
    userType = "customer";
  }
  if (user.role === "manager") {
    userType = "manager";
  }

  return <MainSideBar userType={userType}>{children}</MainSideBar>;
}
