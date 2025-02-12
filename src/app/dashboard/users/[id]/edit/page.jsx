import EditUser from "@/components/User/EditUser/EditUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const EditPage = async ({ params }) => {
  const { id } = await params;

  const user = await prisma.userInfo.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      pNumber: true,
      gender: true,
      date: true,
      status: true,
      role: true,
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  user.date = user.date.toISOString().split("T")[0];

  return (
    <div>
      <EditUser user={user} />
    </div>
  );
};

export default EditPage;
