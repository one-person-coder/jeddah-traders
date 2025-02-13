import PaymentCards from "@/components/Payment/PaymentCards";
import PaymentLists from "@/components/Payment/PaymentLists";
import prisma from "@/lib/prisma";

export const revalidate = 0;

const Payments = async ({ params }) => {
  const { id } = await params;

  const payments = await prisma.paymentRecord.findMany({
    where: { customer_id: parseInt(id) },
    include: {
      user: true, // Jis user ne payment ki
      customer: true, // Jis customer ke liye payment hui
    },
  });


  if (!payments) {
    return <div>User not found</div>;
  }

  // payments.date = user.date.toISOString().split("T")[0];

  return (
    <div className="custom-width">
      <PaymentCards data={payments} />
      <PaymentLists data={payments} customerId={id} />
    </div>
  );
};

export default Payments;
