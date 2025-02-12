import UserCards from "@/components/Card/UserCards";
import UserLists from "@/components/Card/UserLists";
import prisma from "@/lib/prisma";

export const revalidate = 0;

const UsersPage = async () => {
  const users = await prisma.userInfo.findMany({
    where: {
      role: {
        in: ["admin", "manager"],
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
      <UserCards data={users} />
      <UserLists data={users} />
    </div>
  );
};

export default UsersPage;
