"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/components/utils/CustomToasts";
import { useRouter } from "next/navigation";

export default function EditAccount({ user }) {
  const [registerFormData, setRegisterFormData] = useState({
    ...user,
  });

  const router = useRouter();
  const [disableBtn, setDisableBtn] = useState(false);

  const handleInputChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !registerFormData.fullname ||
      !registerFormData.username ||
      !registerFormData.email ||
      !registerFormData.pNumber ||
      !registerFormData.gender ||
      !registerFormData.date
    ) {
      ErrorToast("Please fill in all required fields before proceeding.");
      return;
    }

    setDisableBtn(true);

    const response = await fetch("/api/settings/profile/edit", {
      method: "POST",
      body: JSON.stringify(registerFormData),
    });

    setDisableBtn(false);

    const rspJson = await response.json();

    if (!rspJson.success) {
      ErrorToast(rspJson.message);
      return;
    }

    SuccessToast("User Updated successful!");
    router.push("/dashboard/settings/profile");
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-6">
              <form onSubmit={handleSubmit} className="w-full space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Full Name <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Enter Full Name"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                      value={registerFormData.fullname}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Username <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter Username"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                      value={registerFormData.username}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Email <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                      value={registerFormData.email}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Phone No.
                      <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      name="pNumber"
                      placeholder="Enter Phone Number"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                      value={registerFormData.pNumber}
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
                      type="date"
                      name="date"
                      placeholder="Enter Date of Birth"
                      value={registerFormData.date}
                      onChange={handleInputChange}
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[7px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                    />
                  </div>
                </div>

                <div className="my-6">
                  <hr />
                </div>

                <div className="flex gap-4">
                  <Button
                    disabled={disableBtn}
                    type={"submit"}
                    className="w-full h-11 bg-purple-600 hover:bg-purple-700"
                  >
                    Save Changes
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
