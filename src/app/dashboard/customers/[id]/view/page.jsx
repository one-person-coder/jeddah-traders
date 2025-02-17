import CalendarSvg from "@/components/utils/SvgJsx/CalendarSvg";
import ProfileSvg from "@/components/utils/SvgJsx/ProfileSvg";
import Image from "next/image";
import {
  Handshake,
  Hash,
  Mail,
  MessageSquareText,
  Phone,
  Transgender,
  UserCheck,
} from "lucide-react";
import CheckSvg from "@/components/utils/SvgJsx/CheckSvg";
import BookOpenSvg from "@/components/utils/SvgJsx/BookOpenSvg";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";


const ViewPage = async ({ params }) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const currentUser = await prisma.userInfo.findUnique({
    where: { id: decoded.id },
  });
  const permissions = currentUser?.permissions
    ? currentUser.permissions.split(",")
    : [];

  const user = await prisma.userInfo.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      fullname: true,
      address: true,
      father_name: true,
      username: true,
      email: true,
      pNumber: true,
      gender: true,
      date: true,
      status: true,
      role: true,
      cnic_no: true,
      cnic_front_img: true,
      cnic_back_img: true,
      user_img: true,
      createdAt: true,
      account_number: true,

      family_member_name: true,
      family_relation: true,
      family_contact_number: true,
      family_description: true,
      refferal_name: true,
      refferal_account_number: true,
      refferal_description: true,
    },
  });

  if (user) {
    user.date = user.date.toISOString().split("T")[0];
  }

  let base64String;
  let imageSrc;

  if (user.user_img) {
    base64String = btoa(String.fromCharCode(...user.user_img));
    imageSrc = `data:image/jpeg;base64,${base64String}`;
  }

  let frontImage;
  let backImage;
  if (user.user_img.length >= 1) {
    const frontImageBase64 = btoa(String.fromCharCode(...user.cnic_front_img));
    frontImage = `data:image/jpeg;base64,${frontImageBase64}`;

    const backimageBase64 = btoa(String.fromCharCode(...user.cnic_back_img));
    backImage = `data:image/jpeg;base64,${backimageBase64}`;
  }

  const date = new Date(user.createdAt);
  const formattedDate = date.toISOString().split("T")[0];

  return (
    <>
      {permissions.includes("view user") ? (
        <div>
          <div>
            <div>
              <img
                src={"/profile-banner.png"}
                height={300}
                width={1800}
                priority={"false"}
                alt="image"
              />
            </div>
            <div className="custom-padding pt-0 justify-between flex items-center lg:items-end rounded-md bg-white shadow-light pb-4 flex-col gap-4 lg:flex-row h-fit mt-[-0.8rem]">
              <div className="flex lg:items-end flex-col lg:flex-row items-center">
                <div className="border-4 rounded-md overflow-hidden z-20 border-zinc-400">
                  <Image
                    src={imageSrc || "/1.png"}
                    height={120}
                    width={120}
                    alt="image"
                  />
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
              <div className="flex gap-2 items-center justify-center flex-wrap">
                <div className="bg-green-400 rounded-sm p-2 px-2 w-fit">
                  Account No:
                  <span>{user.account_number}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className="prose max-w-[100%] sm:grid-cols-2 grid grid-cols-1 gap-4 sm:break-normal break-all">
              <div className="shadow-light p-4 rounded-md bg-white">
                <div>
                  <span className="text-zinc-500">About</span>
                </div>
                <div className="mt-3 flex flex-col gap-3">
                  <div className="text-zinc-600 flex gap-1 items-center">
                    <ProfileSvg />
                    <div>
                      <span>Full Name:</span>
                      <span className="text-zinc-500 ml-2">
                        {user.fullname}
                      </span>
                    </div>
                  </div>
                  <div className="text-zinc-600 flex gap-1 items-center">
                    <ProfileSvg />
                    <div>
                      <span>Username:</span>
                      <span className="text-zinc-500 ml-2">
                        {user.username}
                      </span>
                    </div>
                  </div>
                  <div className="text-zinc-600 flex gap-1 items-center">
                    <ProfileSvg />
                    <div>
                      <span>Father Name:</span>
                      <span className="text-zinc-500 ml-2">
                        {user.father_name}
                      </span>
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
                    <Phone className="h-5 w-5" />
                    <div>
                      <span>Phone No:</span>
                      <span className="text-zinc-500 ml-2">{user.pNumber}</span>
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
                      <span className="text-zinc-500 ml-2">
                        {formattedDate}
                      </span>
                    </div>
                  </div>
                  <div className="text-zinc-600 flex gap-1 items-center">
                    <CheckSvg />
                    <div>
                      <span>Status:</span>
                      <span className="text-zinc-500 ml-2">{user.status}</span>
                    </div>
                  </div>
                  <div className="text-zinc-600 flex gap-1 items-center">
                    <BookOpenSvg />
                    <div>
                      <span>CNIC No:</span>
                      <span className="text-zinc-500 ml-2">{user.cnic_no}</span>
                    </div>
                  </div>
                  <div className="text-zinc-600 flex gap-1 items-center">
                    <BookOpenSvg />
                    <div>
                      <span>Address:</span>
                      <span className="text-zinc-500 ml-2">{user.address}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shadow-light p-4 rounded-md bg-white">
                <div>
                  <div>
                    <span className="text-zinc-500">Family Detail</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-3">
                    <div className="text-zinc-600 flex gap-1 items-center">
                      <ProfileSvg />
                      <div>
                        <span>Name:</span>
                        <span className="text-zinc-500 ml-2">
                          {user.family_member_name || "-"}
                        </span>
                      </div>
                    </div>
                    <div className="text-zinc-600 flex gap-1 items-center">
                      <Handshake className="h-5 w-5" />
                      <div>
                        <span>Relation:</span>
                        <span className="text-zinc-500 ml-2">
                          {user.family_relation || "-"}
                        </span>
                      </div>
                    </div>
                    <div className="text-zinc-600 flex gap-1 items-center">
                      <ProfileSvg />
                      <div>
                        <span>Contact:</span>
                        <span className="text-zinc-500 ml-2">
                          {user.family_contact_number || "-"}
                        </span>
                      </div>
                    </div>
                    <div className="text-zinc-600 flex gap-1 items-center">
                      <MessageSquareText className="h-5 w-5" />
                      <div>
                        <span>Description:</span>
                        <span className="text-zinc-500 ml-2">
                          {user.family_description || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <div>
                  <div>
                    <span className="text-zinc-500">Family Detail</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-3">
                    <div className="text-zinc-600 flex gap-1 items-center">
                      <ProfileSvg />
                      <div>
                        <span>Name:</span>
                        <span className="text-zinc-500 ml-2">
                          {user.refferal_name || "-"}
                        </span>
                      </div>
                    </div>
                    <div className="text-zinc-600 flex gap-1 items-center">
                      <UserCheck className="h-5 w-5" />
                      <div>
                        <span>Refferal Account No:</span>
                        <span className="text-zinc-500 ml-2">
                          {user.refferal_account_number || "-"}
                        </span>
                      </div>
                    </div>
                    <div className="text-zinc-600 flex gap-1 items-center">
                      <MessageSquareText className="h-5 w-5" />
                      <div>
                        <span>Description:</span>
                        <span className="text-zinc-500 ml-2">
                          {user.refferal_description || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="prose max-w-[100%] sm:grid-cols-2 grid grid-cols-1 mt-3 gap-4 sm:break-normal break-all">
              <div className="shadow-light p-4 rounded-md bg-white">
                <div className="mt-3 flex flex-col gap-3">
                  <div className="text-zinc-600 flex w-full h-[300px] relative gap-1 items-center">
                    <Image src={frontImage} fill />
                  </div>
                </div>
              </div>
              <div className="shadow-light p-4 rounded-md bg-white">
                <div className="mt-3 flex flex-col gap-3">
                  <div className="text-zinc-600 flex w-full h-[300px] relative gap-1 items-center">
                    <Image src={backImage} fill />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-3xl text-center py-20 font-bold text-red-600">
          Oops Not Found!
        </h3>
      )}
    </>
  );
};

export default ViewPage;
