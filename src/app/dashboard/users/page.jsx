import UserCards from "@/components/Card/UserCards";
import UserLists from "@/components/Card/UserLists";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export const revalidate = 0;

const UsersPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
    select: { id: true, status: true, role: true, permissions: true },
  });

  if (user.role === "customer") {
    return redirect("/dashboard");
  }

  const users = await prisma.userInfo.findMany({
    where: {
      role: {
        in: ["admin", "manager"],
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
      role: true,
      account_number: true,
      createdAt: true,
    },
  });

  const permissions = user?.permissions ? user.permissions.split(",") : [];
  const userRole = user?.role
  
  return (
    <div className="custom-width">
      {permissions.includes("view user") ? (
        <>
          <UserCards data={users} />
          <UserLists data={users} permissions={permissions} role={userRole} />
        </>
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </div>
  );
};

export default UsersPage;
