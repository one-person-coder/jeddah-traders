import BookOpenSvg from "@/components/utils/SvgJsx/BookOpenSvg";
import CheckSvg from "@/components/utils/SvgJsx/CheckSvg";
import FlagSvg from "@/components/utils/SvgJsx/FlagSvg";
import MailSvg from "@/components/utils/SvgJsx/MailSvg";
import MessageSquareReplySvg from "@/components/utils/SvgJsx/MessageSquareReplySvg";
import MessageSquareSvg from "@/components/utils/SvgJsx/MessageSquareSvg";
import ProfileSvg from "@/components/utils/SvgJsx/ProfileSvg";
import Image from "next/image";
import React from "react";

const RightSideBar = () => {
  const images = [
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-2.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-3.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-4.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-5.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-6.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-7.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-8.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg",
    "https://demos.themeselection.com/materio-html-django-admin-template/demo-1/static/img/avatars/1.png",
    "https://demos.themeselection.com/materio-html-django-admin-template/demo-1/static/img/avatars/8.png",
    "https://demos.themeselection.com/materio-html-django-admin-template/demo-1/static/img/avatars/3.png",
    "https://demos.themeselection.com/materio-html-django-admin-template/demo-1/static/img/avatars/18.png",
    "https://demos.themeselection.com/materio-html-django-admin-template/demo-1/static/img/avatars/5.png",
    "https://demos.themeselection.com/materio-html-django-admin-template/demo-1/static/img/avatars/10.png",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-2.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-3.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-4.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-5.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-6.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-7.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-8.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-9.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-10.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-2.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-3.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-4.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-5.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-6.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-7.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-8.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-9.jpg",
    "https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-10.jpg",
  ];
  return (
    <div>
      <div className="prose max-w-[100%]">
        <div className="shadow-light p-4 rounded-md bg-white">
          <div className="mb-3">
            <span className="text-zinc-500">Choose Profile Picture</span>
          </div>
          <div className="flex justify-center flex-wrap gap-2 h-[331px] overflow-y-scroll">
            {images.map((url, index) => {
              return (
                <div key={index} className="h-24">
                  <img src={url} className="m-0 h-full w-full rounded-md" />
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex justify-center items-center">
            <button className="py-[7px] rounded-md px-6 text-white bg-[#8C57FF] hover:bg-[#7E4EE6] duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
