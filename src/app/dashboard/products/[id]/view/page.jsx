import ViewProduct from "@/components/Product/ViewProduct";
import ViewUser from "@/components/User/ViewUser/ViewUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ViewPage = async ({ params }) => {
  const { id } = await params;

  const user = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  return <ViewProduct user={user} />;
};

export default ViewPage;
