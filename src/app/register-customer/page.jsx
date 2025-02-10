"use client";
import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { LoginHeader } from "@/components/LoginHeader/LoginHeader";
import Link from "next/link";

export default function RegisterCustomer() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div>
      <LoginHeader />
      <div className="flex items-center justify-center bg-slate-50 p-4">
        <Card className="w-full max-w-[800px]">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-semibold mb-4">
                  Welcome to <br />
                  Jeddah Traders!
                </h1>
                <p className="text-muted-foreground">
                  Please Register your account here.
                </p>
              </div>

              <form className="w-full space-y-10">
                <hr />
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Choose Gender{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <div>
                      <RadioGroup.Root
                        defaultValue={"male"}
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
                      id="date"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[7px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                    />
                  </div>
                </div>

                <div className="my-6">
                  <hr />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Customer Name{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <input
                      type="text"
                      placeholder="Customer Name"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Father Name{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <input
                      type="text"
                      placeholder="Father Name"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Cast (Zaat){" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <input
                      type="text"
                      placeholder="Cast"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      NIC (Nation Identity Card){" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <input
                      type="text"
                      placeholder="NIC"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Working Address{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <input
                      type="text"
                      placeholder="Working Address"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Residence Address{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <input
                      type="text"
                      placeholder="Residence Address"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Contact No 1{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <input
                      type="text"
                      placeholder="Contact"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Contact No 2{" "}
                      <span className="text-red-500 text-lg"></span>
                    </h3>
                    <input
                      type="text"
                      placeholder="Contact"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                    />
                  </div>
                  <div
                    className="col-span-2
                  "
                  >
                    <h3 className="font-semibold mb-2 text-sm">
                      Buying Details{" "}
                      <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <textarea
                      type="text"
                      placeholder="Buying Details"
                      className="w-full border-2 min-h-[100px] max-h-[200px] border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                    />
                  </div>
                </div>

                <Button className="w-full h-11 bg-purple-600 hover:bg-purple-700">
                  Register Now
                </Button>

                <div className="text-center">
                  <Link
                    href={"/login"}
                    className="text-center text-sm text-muted-foreground hover:underline"
                  >
                    Already have an account.
                  </Link>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
