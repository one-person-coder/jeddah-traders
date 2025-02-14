"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/components/utils/CustomToasts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { Input } from "postcss";

export default function ViewCustomer({ user }) {
  const [registerFormData, setRegisterFormData] = useState({
    ...user,
  });

  let userProfileImg;
  let frontImage;
  let backImage;
  if (user.user_img.length >= 1) {
    const userProfileBase64 = btoa(
      String.fromCharCode(...registerFormData.user_img)
    );
    userProfileImg = `data:image/jpeg;base64,${userProfileBase64}`;

    const frontImageBase64 = btoa(
      String.fromCharCode(...registerFormData.cnic_front_img)
    );
    frontImage = `data:image/jpeg;base64,${frontImageBase64}`;

    const backimageBase64 = btoa(
      String.fromCharCode(...registerFormData.cnic_back_img)
    );
    backImage = `data:image/jpeg;base64,${backimageBase64}`;
  }

  const [fullscreenImage, setFullscreenImage] = useState(null);

  const toggleFullscreen = (image) => {
    setFullscreenImage(fullscreenImage === image ? null : image);
  };

  return (
    <div>
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={() => setFullscreenImage(null)}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen View"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-semibold mb-4">View Customer</h1>
              </div>

              <form className="w-full space-y-10">
                <hr />

                <div className="flex justify-center items-center flex-col">
                  <h3 className="font-semibold  mb-2 text-sm">
                    Choose Profile Picture{" "}
                    <span className="text-red-500">*</span>
                  </h3>
                  <div className="relative flex justify-center items-center flex-col w-32 h-32 border-4 rounded-full overflow-hidden border-white shadow-light">
                    <Avatar>
                      <AvatarImage
                        src={userProfileImg}
                        className="cursor-pointer w-full h-full"
                        alt="Profile"
                        onClick={() => toggleFullscreen(userProfileImg)}
                      />
                    </Avatar>
                  </div>
                </div>
                <hr />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Full Name <span className="text-red-500">*</span>
                    </h3>
                    <input
                      disabled={true}
                      type="text"
                      name="fullname"
                      placeholder="Enter Full Name"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={registerFormData.fullname}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Username <span className="text-red-500">*</span>
                    </h3>
                    <input
                      disabled={true}
                      type="text"
                      name="username"
                      placeholder="Enter Username"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={registerFormData.username}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Email <span className="text-red-500">*</span>
                    </h3>
                    <input
                      disabled={true}
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={registerFormData.email}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Phone No.
                      <span className="text-red-500">*</span>
                    </h3>
                    <input
                      disabled={true}
                      type="text"
                      name="pNumber"
                      placeholder="Enter Phone Number"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={registerFormData.pNumber}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Cnic.
                      <span className="text-red-500">*</span>
                    </h3>
                    <input
                      disabled={true}
                      type="text"
                      name="cnic"
                      placeholder="Enter Phone Number"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      value={registerFormData.cnic_no}
                    />
                  </div>
                </div>

                <div className="my-6">
                  <hr />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Choose CNIC Front Image{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <img
                      src={frontImage}
                      alt="CNIC Front Img"
                      className="cursor-pointer h-32 object-cover w-full rounded-md"
                      onClick={() => toggleFullscreen(frontImage)}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Choose CNIC Back Image{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <img
                      src={backImage}
                      alt="CNIC Front Img"
                      className="cursor-pointer h-32 object-cover w-full rounded-md"
                      onClick={() => toggleFullscreen(backImage)}
                    />
                  </div>
                </div>

                <div className="my-6">
                  <hr />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Choose Gender{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <div>
                      <RadioGroup.Root
                        disabled={true}
                        defaultValue={registerFormData.gender}
                        onValueChange={(value) =>
                          setRegisterFormData((prevData) => ({
                            ...prevData,
                            gender: value,
                          }))
                        }
                        name="gender"
                        className="max-w-lg w-full grid grid-cols-2 gap-3"
                      >
                        <RadioGroup.Item
                          value="male"
                          className="ring-[1px] ring-border rounded py-[9px] px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500 "
                        >
                          <span className="tracking-tight">Male</span>
                        </RadioGroup.Item>
                        <RadioGroup.Item
                          value="female"
                          className="ring-[1px] ring-border rounded py-[9px] px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                        >
                          <span className="tracking-tight">Female</span>
                        </RadioGroup.Item>
                      </RadioGroup.Root>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Date of Birth{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <input
                      disabled={true}
                      type="date"
                      name="date"
                      placeholder="Enter Date of Birth"
                      value={registerFormData.date}
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[7px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                    />
                  </div>
                </div>

                <div className="my-6">
                  <hr />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Choose Status{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <div>
                      <RadioGroup.Root
                        disabled={true}
                        defaultValue={registerFormData.status}
                        onValueChange={(value) =>
                          setRegisterFormData((prevData) => ({
                            ...prevData,
                            status: value,
                          }))
                        }
                        name="status"
                        className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-3"
                      >
                        <RadioGroup.Item
                          value="active"
                          className="ring-[1px] ring-border rounded py-[9px] px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500 "
                        >
                          <span className="tracking-tight">Active</span>
                        </RadioGroup.Item>
                        <RadioGroup.Item
                          value="pending"
                          className="ring-[1px] ring-border rounded py-[9px] px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                        >
                          <span className="tracking-tight">Pending</span>
                        </RadioGroup.Item>
                        <RadioGroup.Item
                          value="inactive"
                          className="ring-[1px] ring-border rounded py-[9px] px-3 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                        >
                          <span className="tracking-tight">Inactive</span>
                        </RadioGroup.Item>
                      </RadioGroup.Root>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    asChild
                    className="w-full h-11 bg-red-600 hover:bg-red-700"
                  >
                    <Link href={"/dashboard/customers"}>Back</Link>
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
