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
    select: { id: true, status: true, role: true },
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

  return (
    <div className="custom-width">
      <UserCards data={users} />
      <UserLists data={users} />
    </div>
  );
};

export default UsersPage;
