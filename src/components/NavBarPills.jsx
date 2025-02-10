"use client";
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
              <AnchorLink
                href="/dashboard/settings/profile"
                classes="hover:bg-[#EDE4FF] py-[7px] justify-center rounded-md px-6 text-white duration-150 flex gap-2 items-center no-underline"
              >
                <ProfileSvg />
                Profile
              </AnchorLink>
              <AnchorLink
                href="/dashboard/settings/account"
                classes="hover:bg-[#EDE4FF] py-[7px] justify-center rounded-md px-6 text-white duration-150 flex gap-2 items-center no-underline"
              >
                <UsersSvg />
                Account
              </AnchorLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarPills;
