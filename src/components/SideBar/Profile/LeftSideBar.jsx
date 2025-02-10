import BookOpenSvg from "@/components/utils/SvgJsx/BookOpenSvg";
import CheckSvg from "@/components/utils/SvgJsx/CheckSvg";
import FlagSvg from "@/components/utils/SvgJsx/FlagSvg";
import MailSvg from "@/components/utils/SvgJsx/MailSvg";
import MessageSquareReplySvg from "@/components/utils/SvgJsx/MessageSquareReplySvg";
import MessageSquareSvg from "@/components/utils/SvgJsx/MessageSquareSvg";
import ProfileSvg from "@/components/utils/SvgJsx/ProfileSvg";

const LeftSideBar = () => {
  return (
    <div>
      <div className="prose max-w-[100%] sm:break-normal break-all">
        <div className="shadow-light p-4 rounded-md bg-white">
          <div>
            <span className="text-zinc-500">About</span>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <div className="text-zinc-600 flex gap-1 items-center">
              <ProfileSvg />
              <div>
                <span>Full Name:</span>
                <span className="text-zinc-500 ml-2">Hussain Coder</span>
              </div>
            </div>
            <div className="text-zinc-600 flex gap-1 items-center">
              <ProfileSvg />
              <div>
                <span>Username:</span>
                <span className="text-zinc-500 ml-2">hussain_coder</span>
              </div>
            </div>
            <div className="text-zinc-600 flex gap-1 items-center">
              <CheckSvg />
              <div>
                <span>Status:</span>
                <span className="text-zinc-500 ml-2">Active</span>
              </div>
            </div>
            <div className="text-zinc-600 flex gap-1 items-center">
              <FlagSvg />
              <div>
                <span>Country:</span>
                <span className="text-zinc-500 ml-2">Pakistan</span>
              </div>
            </div>
            <div className="text-zinc-600 flex gap-1 items-center">
              <MailSvg />
              <div>
                <span>Email:</span>
                <span className="text-zinc-500 ml-2">
                  hussaincoder2006@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-light p-4 rounded-md bg-white mt-5">
          <div>
            <span className="text-zinc-500">Overview</span>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <div className="text-zinc-600 flex gap-1 items-center">
              <BookOpenSvg />
              <div>
                <span>Total Blogs:</span>
                <span className="text-zinc-500 ml-2">38</span>
              </div>
            </div>
            <div className="text-zinc-600 flex gap-1 items-center">
              <MessageSquareSvg />
              <div>
                <span>Total Comments:</span>
                <span className="text-zinc-500 ml-2">20</span>
              </div>
            </div>
            <div className="text-zinc-600 flex gap-1 items-center">
              <MessageSquareReplySvg />
              <div>
                <span>Total Replies:</span>
                <span className="text-zinc-500 ml-2">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
