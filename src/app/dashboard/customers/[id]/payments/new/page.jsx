import NewPayment from "@/components/Payment/NewPayment";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const RegisterPayment = async () => {
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

  const permissions = user?.permissions ? user.permissions.split(",") : [];

  return (
    <div>
      {permissions.includes("create customer payments") ? (
        <NewPayment permissions={permissions} />
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </div>
  );
};

export default RegisterPayment;
