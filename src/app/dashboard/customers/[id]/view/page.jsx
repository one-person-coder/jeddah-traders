import ViewCustomer from "@/components/Customer/ViewCustomer/ViewCustomer";
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
      cnic_no: true,
      cnic_front_img: true,
      cnic_back_img: true,
      user_img: true,
    },
  });

  if (user) {
    user.date = user.date.toISOString().split("T")[0];
  }

  return <ViewCustomer user={user} />;
};

export default ViewPage;
