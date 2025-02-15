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
    select: { id: true, status: true, role: true },
  });

  if (user.role === "customer") {
    return redirect("/dashboard");
  }

  const users = await prisma.product.findMany();

  return (
    <div className="custom-width">
      <ProductCards data={users} />
      <ProductLists data={users} />
    </div>
  );
};

export default UsersPage;
