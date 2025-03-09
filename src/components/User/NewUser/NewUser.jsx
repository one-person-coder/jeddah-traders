"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/components/utils/CustomToasts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
import { CameraIcon, Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const permissions = [
  "view user",
  "create user",
  "edit user",
  "delete user",
  "view customer",
  "create customer",
  "edit customer",
  "delete customer",
  "view customer payments",
  "create customer payments",
  "change payment date",
  "change bill date",
  "delete customer payments",
  "print customer payments",
  "make bill",
  "view product",
  "create product",
  "edit product",
  "delete product",
];

export default function NewUser() {
  const [registerFormData, setRegisterFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    pNumber: "",
    password: "",
    gender: "male",
    date: "",
    status: "pending",
    user_img: {
      preview: "",
      binary: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const togglePermission = (permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const toggleAll = () => {
    setSelectedPermissions((prev) =>
      prev.length === permissions.length ? [] : [...permissions]
    );
  };

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
      !registerFormData.password ||
      !registerFormData.gender ||
      !registerFormData.date ||
      !registerFormData.status
    ) {
      ErrorToast("Please fill in all required fields before proceeding.");
      return;
    }
    if (selectedPermissions.length === 0) {
      ErrorToast("Please select at least one permission.");
      return;
    }

    setDisableBtn(true);

    const response = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({
        ...registerFormData,
        permissionNames: selectedPermissions,
      }),
    });

    setDisableBtn(false);

    const rspJson = await response.json();

    if (!rspJson.success) {
      ErrorToast(rspJson.message);
      return;
    }

    SuccessToast("User Registered successful!");
    router.push("/dashboard/users");
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
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-semibold mb-4">
                  Register New User
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
                        <AvatarFallback className="bg-purple-100 h-full w-full text-purple-600 text-4xl font-bold"></AvatarFallback>
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
                    <h3 className="font-semibold mb-2 text-sm">
                      Phone Number{" "}
                      <span className="text-red-500 text-lg">*</span>
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

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Choose Permission{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <div>
                      <Card>
                        <CardContent className="mt-6">
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                              >
                                {selectedPermissions.length > 0
                                  ? `${selectedPermissions.length} permission${
                                      selectedPermissions.length > 1 ? "s" : ""
                                    } selected`
                                  : "Select permissions..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search permissions..." />
                                <CommandList>
                                  <CommandEmpty>
                                    No permission found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem onSelect={toggleAll}>
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          selectedPermissions.length ===
                                            permissions.length
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {selectedPermissions.length ===
                                      permissions.length
                                        ? "Deselect All"
                                        : "Select All"}
                                    </CommandItem>
                                    {permissions.map((permission) => (
                                      <CommandItem
                                        key={permission}
                                        onSelect={() =>
                                          togglePermission(permission)
                                        }
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedPermissions.includes(
                                              permission
                                            )
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {permission}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    asChild
                    className="w-full h-11 bg-red-600 hover:bg-red-700"
                  >
                    <Link href={"/dashboard/users"}>Cancel</Link>
                  </Button>
                  <Button
                    disabled={disableBtn}
                    className="w-full h-11 bg-purple-600 hover:bg-purple-700"
                  >
                    Register User
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
