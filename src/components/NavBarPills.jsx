"use client";
import { LockKeyhole } from "lucide-react";
import ProfileSvg from "./utils/SvgJsx/ProfileSvg";
import UsersSvg from "./utils/SvgJsx/UsersSvg";
import AnchorLink from "./utils/AnchorLink";

const NavBarPills = () => {
  return (
    <div>
      <div className="custom-width pl-2">
        <div className="my-8 prose max-w-[100%]">
          <div>
            <div className="flex sm:flex-row flex-col gap-2">
              <AnchorLink href="profile" classes="bg-[#8C57FF] py-[7px] justify-center rounded-md px-6 text-white flex gap-1 items-center no-underline">
                <ProfileSvg />
                <span>Profile</span>
              </AnchorLink>
              <AnchorLink href="account" classes="hover:bg-[#EDE4FF] py-[7px] justify-center rounded-md px-6 text-zinc-600 duration-150 flex gap-2 items-center no-underline">
                <UsersSvg />
                <span>Account</span>
              </AnchorLink>
              <AnchorLink href="security" classes="hover:bg-[#EDE4FF] py-[7px] justify-center rounded-md px-6 text-zinc-600 duration-150 flex gap-2 items-center no-underline">
                <LockKeyhole className="h-4 w-5"/>
                <span>Security</span>
              </AnchorLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarPills;
