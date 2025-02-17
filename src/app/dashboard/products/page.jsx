import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import ProductCards from "@/components/Product/ProductCards";
import ProductLists from "@/components/Product/ProductLists";

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

  const users = await prisma.product.findMany();
  const permissions = user?.permissions ? user.permissions.split(",") : [];


  return (
    <div className="custom-width">
      {permissions.includes("view product") ? (
        <>
          <ProductCards data={users} />
          <ProductLists data={users} permissions={permissions} />{" "}
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
