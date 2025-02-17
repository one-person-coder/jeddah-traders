import EditUser from "@/components/User/EditUser/EditUser";
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
  });

  const user = await prisma.userInfo.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      pNumber: true,
      gender: true,
      account_number: true,
      date: true,
      status: true,
      role: true,
      permissions: true,
    },
  });
  const permissions = currentUser?.permissions
    ? currentUser.permissions.split(",")
    : [];

  if (!user) {
    return <div>User not found</div>;
  }

  user.date = user.date.toISOString().split("T")[0];

  return (
    <div>
      {permissions.includes("edit user") ? (
        <EditUser user={user} />
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </div>
  );
};

export default EditPage;
