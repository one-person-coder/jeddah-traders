import ViewUser from "@/components/User/ViewUser/ViewUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ViewPage = async ({ params }) => {
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

  if (user) {
    user.date = user.date.toISOString().split("T")[0];
  }

  return <ViewUser user={user} />;
};

export default ViewPage;
