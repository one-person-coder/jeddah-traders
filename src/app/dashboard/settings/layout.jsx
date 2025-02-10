"use client";
import CalendarSvg from "@/components/utils/SvgJsx/CalendarSvg";
import MapPinSvg from "@/components/utils/SvgJsx/MapPinSvg";
import MonitorSvg from "@/components/utils/SvgJsx/MonitorSvg";
import NavBarPills from "@/components/NavBarPills";
import Image from "next/image";
import ProfileSvg from "@/components/utils/SvgJsx/ProfileSvg";

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
          <div className="custom-padding pt-0 flex items-center lg:items-end rounded-md bg-white shadow-light pb-4 flex-col lg:flex-row h-fit mt-[-2.4rem]">
            <div className="border-4 rounded-md overflow-hidden z-20 border-white">
              <Image src={"/1.png"} height={125} width={125} alt="image" />
            </div>
            <div className="p-3 ml-3 sm:ml-0">
              <div className="prose text-center lg:text-start">
                <h2 className="font-semibold text-zinc-700 mb-0">John Doe</h2>
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
        </div>
      </div>
      <NavBarPills />
      {children}
    </div>
  );
};

export default layout;
