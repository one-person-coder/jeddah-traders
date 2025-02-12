import CalendarSvg from "@/components/utils/SvgJsx/CalendarSvg";
import NavBarPills from "@/components/NavBarPills";
import Image from "next/image";
import ProfileSvg from "@/components/utils/SvgJsx/ProfileSvg";
import { LogOut } from "lucide-react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

const layout = async ({ children }) => {
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

  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <div>
        <div>
          <div>
            <Image
              src={"/profile-banner.png"}
              height={300}
              width={1800}
              priority={true}
              alt="image"
            />
          </div>
          <div className="custom-padding pt-0 justify-between flex items-center lg:items-end rounded-md bg-white shadow-light pb-4 flex-col gap-4 lg:flex-row h-fit mt-[-2.4rem]">
            <div className="flex lg:items-end flex-col lg:flex-row items-center">
              <div className="border-4 rounded-md overflow-hidden z-20 border-white">
                <Image src={"/1.png"} height={125} width={125} alt="image" />
              </div>
              <div className="p-3 ml-3 sm:ml-0">
                <div className="prose text-center lg:text-start">
                  <h2 className="font-semibold text-zinc-700 mb-0 text-2xl">
                    {user.fullname}
                  </h2>
                </div>
                <div className="mt-3 flex gap-x-6 flex-wrap justify-center gap-y-2">
                  <div className="flex gap-2 items-center text-zinc-600">
                    <ProfileSvg />
                    <span>{user.username}</span>
                  </div>
                  <div className="flex gap-2 items-center text-zinc-600">
                    <CalendarSvg />
                    <span>Joined {formattedDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Link
                className="hover:bg-[#EDE4FF] py-[7px] justify-center rounded-md px-6 text-white duration-150 flex gap-2 items-center no-underline!text-white !bg-[#8C57FF]"
                href="/logout"
              >
                Logout
                <LogOut className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <NavBarPills />
      {children}
    </div>
  );
};

export default layout;
