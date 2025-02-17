import ViewProduct from "@/components/Product/ViewProduct";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const ViewPage = async ({ params }) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const currentUser = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
    select: { id: true, status: true, role: true, permissions: true },
  });

  if (currentUser.role === "customer") {
    return redirect("/dashboard");
  }

  const permissions = currentUser?.permissions
    ? currentUser.permissions.split(",")
    : [];

  const user = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  return (
    <div>
      {permissions.includes("view product") ? (
        <ViewProduct user={user} />
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </div>
  );
};

export default ViewPage;
