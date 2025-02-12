import EditAccount from "@/components/Account/EditAccount";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const EditPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return <h3>Please log in</h3>;
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return <h3>Invalid token</h3>;
  }
  

  const user = await prisma.userInfo.findUnique({
    where: { id: parseInt(decoded.id) },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      pNumber: true,
      gender: true,
      date: true,
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  user.date = user.date.toISOString().split("T")[0];

  return (
    <div>
      <EditAccount user={user} />
    </div>
  );
};

export default EditPage;
