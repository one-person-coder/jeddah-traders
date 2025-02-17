import ViewUser from "@/components/User/ViewUser/ViewUser";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const ViewPage = async ({ params }) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const currentUser = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
  });

  const user = await prisma.userInfo.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      pNumber: true,
      account_number: true,
      gender: true,
      date: true,
      status: true,
      role: true,
      permissions: true,
    },
  });

  const permissions = currentUser?.permissions ? currentUser.permissions.split(",") : [];

  if (user) {
    user.date = user.date.toISOString().split("T")[0];
  }

  console.log(permissions);
  

  return (
    <>
      {permissions.includes("view user") ? (
        <ViewUser user={user} />
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </>
  );
};

export default ViewPage;
