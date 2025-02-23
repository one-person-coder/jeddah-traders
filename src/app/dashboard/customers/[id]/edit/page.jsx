import EditCustomer from "@/components/Customer/EditCustomer/EditCustomer";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const EditPage = async ({ params }) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const currentUser = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
    select: { id: true, status: true, role: true, permissions: true },
  });

  if (!currentUser) {
    return redirect("/logout");
  }
  if (currentUser.status === "inactive") {
    return redirect("/logout");
  }
  if (currentUser.status === "pending") {
    return redirect("/logout");
  }

  const user = await prisma.userInfo.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      fullname: true,
      last_name: true,
      account_number: true,
      father_name: true,
      address: true,
      username: true,
      email: true,
      pNumber: true,
      gender: true,
      date: true,
      status: true,
      role: true,
      cnic_no: true,
      permissions: true,
      description: true,

      family_member_name: true,
      family_relation: true,
      family_contact_number: true,
      family_description: true,
      refferal_name: true,
      refferal_account_number: true,
      refferal_description: true,
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  user.date = user.date.toISOString().split("T")[0];
  const permissions = currentUser?.permissions
    ? currentUser.permissions.split(",")
    : [];

  return (
    <div>
      {permissions.includes("edit customer") ? (
        <EditCustomer user={user} permissions={permissions} />
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </div>
  );
};

export default EditPage;
