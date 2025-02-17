import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import NewUser from "@/components/User/NewUser/NewUser";

const NewUserPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const currentUser = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
  });
  const permissions = currentUser?.permissions
    ? currentUser.permissions.split(",")
    : [];

  return (
    <>
      {permissions.includes("create user") ? (
        <NewUser />
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </>
  );
};

export default NewUserPage;
