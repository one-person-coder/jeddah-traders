import CustomerCards from "@/components/Customer/CustomerCards";
import CustomerLists from "@/components/Customer/CustomerLists";
import prisma from "@/lib/prisma";

export const revalidate = 0;

const CustomersPage = async () => {
  const users = await prisma.userInfo.findMany({
    where: {
      role: {
        in: ["customer"],
      },
    },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      gender: true,
      date: true,
      status: true,
      pNumber: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div className="custom-width">
      <CustomerCards data={users} />
      <CustomerLists data={users} />
    </div>
  );
};

export default CustomersPage;
