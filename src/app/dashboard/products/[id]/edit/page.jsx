import EditProduct from "@/components/Product/EditProduct";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const EditPage = async ({ params }) => {
  const { id } = await params;

  const user = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <EditProduct user={user} />
    </div>
  );
};

export default EditPage;
