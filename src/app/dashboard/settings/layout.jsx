"use client";
import CalendarSvg from "@/components/utils/SvgJsx/CalendarSvg";
import NavBarPills from "@/components/NavBarPills";
import Image from "next/image";
import ProfileSvg from "@/components/utils/SvgJsx/ProfileSvg";
import { LogOut } from "lucide-react";
import Link from "next/link";

const layout = ({ children }) => {
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
                  <h2 className="font-semibold text-zinc-700 mb-0 text-xl">
                    John Doe
                  </h2>
                </div>
                <div className="mt-3 flex gap-x-6 flex-wrap justify-center gap-y-2">
                  <div className="flex gap-2 items-center text-zinc-600">
                    <ProfileSvg />
                    <span>Hussain_coder</span>
                  </div>
                  <div className="flex gap-2 items-center text-zinc-600">
                    <CalendarSvg />
                    <span>Joined April 2021</span>
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
