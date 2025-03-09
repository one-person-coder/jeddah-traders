"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ErrorToast, SuccessToast } from "@/components/utils/CustomToasts";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

export default function NewPayment({ permissions }) {
  const { id } = useParams();
  const [date, setDate] = useState(() => {
    const now = new Date(new Date() + "Z");
    return now.toISOString().slice(0, 16);
  });

  const [registerFormData, setRegisterFormData] = useState({
    paidAmount: "",
    description: "",
    createdAt: "",
    method: "",
    customerId: id,
  });

  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = (e) => {
    if (e.target.type === "checkbox") return;
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    setRegisterFormData({
      ...registerFormData,
      createdAt: date,
    });
  }, [date]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

    if (!registerFormData.paidAmount || !registerFormData.createdAt) {
      ErrorToast("Please fill in all required fields before proceeding.");
      return;
    }

    setDisableBtn(true);

    const response = await fetch("/api/customers/payments/register", {
      method: "POST",
      body: JSON.stringify(registerFormData),
    });

    const rspJson = await response.json();

    if (!rspJson.success) {
      setDisableBtn(false);
      ErrorToast(rspJson.message);

      return;
    }

    SuccessToast("Payment Registered successful!");

    if (isChecked) {
      window.open(
        `/printer/${rspJson?.paymentRecord?.customer_id}/${rspJson?.paymentRecord?.id}`
      );
    }

    router.push(`/dashboard/customers/${id}/payments`);
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
                    <h3 className="font-semibold  mb-2 text-sm">Paid Amount</h3>
                    <input
                      type="number"
                      name="paidAmount"
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
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: "method", value },
                        })
                      }
                      name="method"
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
                  {permissions.includes("change payment date") ? (
                    <div>
                      <h3 className="font-semibold  mb-2 text-sm">
                        Payment Date{" "}
                        <span className="text-red-500 text-lg">*</span>
                      </h3>
                      <input
                        type="datetime-local"
                        name="createdAt"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[7px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      />
                    </div>
                  ) : null}

                  <div className="sm:col-span-2">
                    <h3 className="font-semibold mb-2 text-sm">
                      Enter Description
                    </h3>
                    <textarea
                      name="description"
                      placeholder="Enter Description"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF] min-h-[100px] max-h-[200px]"
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div>
                    <div
                      onClick={handleToggle}
                      className="bg-[lightblue] group p-4 rounded-lg items-center flex justify-between space-x-3 cursor-pointer"
                    >
                      <div className="grid gap-1.5" onClick={handleToggle}>
                        <label
                          htmlFor="print"
                          className="text-xl font-bold leading-none cursor-pointer"
                        >
                          Print
                        </label>
                      </div>
                      <Checkbox
                        id="print"
                        className={`scale-125 !text-white !w-5 !font-bold !h-5 group-hover:scale-150 duration-200 !border-none ${
                          isChecked ? "!bg-blue-600" : "!bg-white"
                        } !rounded-[2px]`}
                        checked={isChecked}
                        onClick={() => setIsChecked((prev) => !prev)}
                      />
                    </div>
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
                    <Link href={`/dashboard/customers/${id}/payments`}>
                      Cancel
                    </Link>
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
