import EditPayment from "@/components/Payment/EditPayment";
import prisma from "@/lib/prisma";

const EditPage = async ({ params }) => {
  const { pId } = await params;
  const user = await prisma.paymentRecord.findUnique({
    where: { id: parseInt(pId) },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <EditPayment user={user} />
    </div>
  );
};

export default EditPage;
