import BookOpenSvg from "@/components/utils/SvgJsx/BookOpenSvg";
import CalendarSvg from "@/components/utils/SvgJsx/CalendarSvg";
import CheckSvg from "@/components/utils/SvgJsx/CheckSvg";
import ProfileSvg from "@/components/utils/SvgJsx/ProfileSvg";
import { Mail, Transgender } from "lucide-react";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const LeftSideBar = async () => {
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
    where: { id: decoded.id },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      gender: true,
      date: true,
      status: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    return <h3>User Not Found</h3>;
  }

  const date = new Date(user.date);

  const formattedDate = date.toISOString().split("T")[0];


  return (
    <div>
      <div className="prose max-w-[100%] grid sm:grid-cols-2 gap-4 sm:break-normal break-all">
        <div className="shadow-light p-4 rounded-md bg-white">
          <div>
            <span className="text-zinc-500">About</span>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <div className="text-zinc-600 flex gap-1 items-center">
              <ProfileSvg />
              <div>
                <span>Full Name:</span>
                <span className="text-zinc-500 ml-2">{user.fullname}</span>
              </div>
            </div>
            <div className="text-zinc-600 flex gap-1 items-center">
              <ProfileSvg />
              <div>
                <span>Username:</span>
                <span className="text-zinc-500 ml-2">{user.username}</span>
              </div>
            </div>
            <div className="text-zinc-600 flex gap-1 items-center">
              <Mail className="h-5 w-5" />
              <div>
                <span>Email:</span>
                <span className="text-zinc-500 ml-2">{user.email}</span>
              </div>
            </div>
            <div className="text-zinc-600 flex gap-1 items-center">
              <Transgender className="h-5 w-5" />
              <div>
                <span>Gender:</span>
                <span className="text-zinc-500 ml-2">{user.gender}</span>
              </div>
            </div>
            <div className="text-zinc-600 flex gap-1 items-center">
              <CalendarSvg />
              <div>
                <span>Birth:</span>
                <span className="text-zinc-500 ml-2">{formattedDate}</span>
              </div>
            </div>
            <div className="text-zinc-600 flex gap-1 items-center">
              <CheckSvg />
              <div>
                <span>Status:</span>
                <span className="text-zinc-500 ml-2">{user.status}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-light p-4 rounded-md bg-white">
          <div>
            <span className="text-zinc-500">Overview</span>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <div className="text-zinc-600 flex gap-1 items-center">
              <BookOpenSvg />
              <div>
                <span>Total Bills:</span>
                <span className="text-zinc-500 ml-2">38</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
