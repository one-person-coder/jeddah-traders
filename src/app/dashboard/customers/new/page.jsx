import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import NewCustomer from "@/components/Customer/NewCustomer/NewCustomer";

const NewCustomerPage = async () => {
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
      {permissions.includes("create customer") ? (
        <NewCustomer />
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </>
  );
};

export default NewCustomerPage;
