"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { LoginHeader } from "@/components/LoginHeader/LoginHeader";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ErrorToast, SuccessToast } from "@/components/utils/CustomToasts";
import { useRouter } from "next/navigation";
import { Camera, CameraIcon, ImageIcon, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function NewCustomer() {
  const [registerFormData, setRegisterFormData] = useState({
    fullname: "",
    username: "",
    last_name: "",
    father_name: "",
    address: "",
    email: "",
    pNumber: "",
    password: "",
    gender: "male",
    status: "pending",
    date: "",
    cnic_no: "",
    description: "",

    family_member_name: "",
    family_relation: "",
    family_contact_number: "",
    family_description: "",

    refferal_name: "",
    refferal_account_number: "",
    refferal_description: "",

    account_number: "",
    cnic_front_img: {
      preview: "",
      binary: "",
    },
    cnic_back_img: {
      preview: "",
      binary: "",
    },
    user_img: {
      preview: "",
      binary: "",
    },
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
      !registerFormData.father_name ||
      !registerFormData.family_member_name ||
      !registerFormData.family_relation ||
      !registerFormData.family_contact_number ||
      !registerFormData.address ||
      !registerFormData.username ||
      !registerFormData.email ||
      !registerFormData.pNumber ||
      !registerFormData.password ||
      !registerFormData.gender ||
      !registerFormData.cnic_front_img.preview.length >= 1 ||
      !registerFormData.cnic_back_img.preview.length >= 1 ||
      !registerFormData.user_img.preview.length >= 1 ||
      !registerFormData.cnic_no ||
      !registerFormData.account_number ||
      !registerFormData.date
    ) {
      ErrorToast("Please fill in all required fields before proceeding.");
      return;
    }

    setDisableBtn(true);

    const response = await fetch("/api/customers/register", {
      method: "POST",
      body: JSON.stringify(registerFormData),
    });

    setDisableBtn(false);

    const rspJson = await response.json();

    if (!rspJson.success) {
      ErrorToast(rspJson.message);
      return;
    }

    SuccessToast("Customer Registration successful!");
    router.push("/dashboard/customers");
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setRegisterFormData((prevState) => ({
          ...prevState,
          [key]: {
            preview: URL.createObjectURL(file),
            binary: reader.result,
          },
        }));
      };
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center bg-slate-50 p-4">
        <Card className="w-full max-w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-semibold mb-4">
                  Register New Customer
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-10">
                <hr />

                <div className="flex justify-center items-center flex-col">
                  <h3 className="font-semibold  mb-2 text-sm">
                    Choose Profile Picture{" "}
                    <span className="text-red-500">*</span>
                  </h3>
                  <div className="relative flex justify-center items-center flex-col">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-light">
                      {registerFormData.user_img.preview ? (
                        <AvatarImage
                          src={registerFormData.user_img.preview}
                          alt="Profile"
                        />
                      ) : (
                        <AvatarFallback className="bg-purple-100 text-purple-600 text-4xl font-bold">
                          HC
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="absolute bottom-0 right-0">
                      <Input
                        id="profile-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, "user_img")}
                      />
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById("profile-image-upload")
                            ?.click();
                        }}
                        size="icon"
                        className="rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-md"
                      >
                        <CameraIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <hr />

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
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Last Name
                    </h3>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Enter Last Name"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Father Name <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      name="father_name"
                      placeholder="Enter Father Name"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
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
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      CNIC No <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      name="cnic_no"
                      placeholder="Enter CNIC Number"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Account No <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <input
                      type="text"
                      name="account_number"
                      placeholder="Enter Account No"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Password <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <input
                      type="text"
                      name="password"
                      placeholder="Enter Password"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Address <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">Description</h3>
                    <textarea
                      type="text"
                      name="description"
                      placeholder="Enter Description"
                      className="min-h-[48px] max-h-[100px] w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
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
                    <div className="flex shadow-light rounded-md p-3 flex-col items-center justify-center space-y-3 py-4">
                      {registerFormData.cnic_front_img.preview.length >= 1 ? (
                        <>
                          <img
                            src={registerFormData.cnic_front_img.preview}
                            alt="CNIC Front Img"
                            className="h-20 object-cover rounded-md"
                          />
                          <Button
                            variant="outline"
                            className="w-full max-w-[150px] bg-white hover:bg-red-50 text-red-500"
                            onClick={(e) => {
                              e.preventDefault();
                              setRegisterFormData((prev) => {
                                return {
                                  ...prev,
                                  cnic_front_img: { preview: "", binary: "" },
                                };
                              });
                            }}
                          >
                            Change Image
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-gray-800">
                              Choose CNIC Front Image
                            </p>
                          </div>
                          <Input
                            id="front-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageChange(e, "cnic_front_img")
                            }
                          />
                          <div className="flex justify-center">
                            <Button
                              onClick={(e) => {
                                document
                                  .getElementById("front-image-upload")
                                  ?.click();
                                e.preventDefault();
                              }}
                              variant="outline"
                              className="w-full max-w-[200px] bg-white hover:bg-purple-50"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Choose File
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Choose CNIC Back Image{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <div className="flex shadow-light rounded-md p-3 flex-col items-center justify-center space-y-3 py-4">
                      {registerFormData.cnic_back_img.preview.length >= 1 ? (
                        <>
                          <img
                            src={registerFormData.cnic_back_img.preview}
                            alt="CNIC Front Img"
                            className="h-20 object-cover rounded-md"
                          />
                          <Button
                            variant="outline"
                            className="w-full max-w-[150px] bg-white hover:bg-red-50 text-red-500"
                            onClick={(e) => {
                              e.preventDefault();
                              setRegisterFormData((prev) => {
                                return {
                                  ...prev,
                                  cnic_back_img: { preview: "", binary: "" },
                                };
                              });
                            }}
                          >
                            Change Image
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-gray-800">
                              Choose CNIC Front Image
                            </p>
                          </div>
                          <Input
                            id="back-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageChange(e, "cnic_back_img")
                            }
                          />
                          <div className="flex justify-center">
                            <Button
                              onClick={(e) => {
                                document
                                  .getElementById("back-image-upload")
                                  ?.click();
                                e.preventDefault();
                              }}
                              variant="outline"
                              className="w-full max-w-[200px] bg-white hover:bg-purple-50"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Choose File
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
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
                      onChange={handleInputChange}
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

                <div className="my-6">
                  <hr />
                </div>

                <h1 className="text-xl font-semibold mb-4 text-center">
                  Family Detail
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Name <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      name="family_member_name"
                      placeholder="Enter Name"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Relation <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      name="family_relation"
                      placeholder="Enter Relation"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Contact No <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      name="family_contact_number"
                      placeholder="Enter Contact No"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">Description</h3>
                    <textarea
                      type="text"
                      name="family_description"
                      placeholder="Enter Description"
                      className="min-h-[48px] max-h-[100px] w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="my-6">
                  <hr />
                </div>

                <h1 className="text-xl font-semibold mb-4 text-center">
                  Referral Info
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Refferal Name
                    </h3>
                    <input
                      type="text"
                      name="refferal_name"
                      placeholder="Enter Name"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">Account No</h3>
                    <input
                      type="number"
                      name="refferal_account_number"
                      placeholder="Enter Refferal Acount No"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">Description</h3>
                    <textarea
                      type="text"
                      name="refferal_description"
                      placeholder="Enter Description"
                      className="min-h-[48px] max-h-[100px] w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    disabled={disableBtn}
                    className="w-full h-11 bg-red-600 hover:bg-red-700"
                    asChild
                  >
                    <Link href={"/dashboard/customers"}>Cancel</Link>
                  </Button>
                  <Button
                    disabled={disableBtn}
                    className="w-full h-11 bg-purple-600 hover:bg-purple-700"
                  >
                    Register Customer
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
