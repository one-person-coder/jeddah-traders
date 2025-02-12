import UserCards from "@/components/Card/UserCards";
import UserLists from "@/components/Card/UserLists";
import prisma from "@/lib/prisma"; // Prisma connection

export const revalidate = 0;

const UsersPage = async () => {
  // ✅ Fetch users from Prisma (MySQL)
  const users = await prisma.userInfo.findMany({
    where: {
      role: { in: ["admin", "manager"] },
    },
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
      createdAt: true,
      updatedAt: true,
    },
  });

  

  return (
    <div className="custom-width">
      <UserCards data={users} />
      <UserLists data={users} />
    </div>
  );
};

export default UsersPage;
