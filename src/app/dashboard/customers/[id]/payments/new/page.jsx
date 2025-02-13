"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "@/components/utils/CustomToasts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const users = [
  { id: "1", name: "Ali Khan" },
  { id: "2", name: "Sara Ahmed" },
  { id: "3", name: "Usman Tariq" },
  { id: "4", name: "Ayesha Malik" },
];

export default function NewPayment() {
  const [registerFormData, setRegisterFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    pNumber: "",
    password: "",
    gender: "male",
    date: "",
    status: "pending",
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
      !registerFormData.password ||
      !registerFormData.gender ||
      !registerFormData.date ||
      !registerFormData.status
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

    SuccessToast("Customer Registered successful!");
    router.push("/dashboard/customers");
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-semibold mb-4">
                  Register New Payment
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-10">
                <hr />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm">
                      Choose User <span className="text-red-500">*</span>
                    </h3>
                    <Select
                      onValueChange={(value) =>
                        setRegisterFormData({
                          ...registerFormData,
                          user: value,
                        })
                      }
                    >
                      <SelectTrigger className="bg-white py-[21px]">
                        <SelectValue placeholder="Select User" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Amount <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="number"
                      name="amount"
                      placeholder="Enter Amount"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Paid Amount <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="number"
                      name="paid_amount"
                      placeholder="Enter Paid Amount"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">
                      Payment Method.
                      <span className="text-red-500">*</span>
                    </h3>
                    <Select
                    // value={statusFilter}
                    // onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="bg-white py-[21px]">
                        <SelectValue placeholder="Choose Payment Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="bank">Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="font-semibold mb-2 text-sm">
                      Password <span className="text-red-500 text-lg">*</span>
                    </h3>
                    <textarea
                      type="text"
                      name="password"
                      placeholder="Enter Password"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF] min-h-[100px] max-h-[200px]"
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div className="my-6">
                  <hr />
                </div>
                <div className="flex gap-4">
                  <Button
                    asChild
                    className="w-full h-11 bg-red-600 hover:bg-red-700"
                  >
                    <Link href={"/dashboard/customers"}>Cancel</Link>
                  </Button>
                  <Button
                    disabled={disableBtn}
                    className="w-full h-11 bg-purple-600 hover:bg-purple-700"
                  >
                    Register Payment
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
