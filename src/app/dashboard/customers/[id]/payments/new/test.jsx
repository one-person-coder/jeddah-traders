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

export default function NewPayment() {
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    amount: "",
    paidAmount: "",
    description: "",
    method: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`/api/customers/status`, {
        method: "GET",
      });
      const userStatus = await response.json();

      if (!userStatus.success) {
        ErrorToast("User Cannot Fetch Server Error");
      }

      if (!userStatus.success) {
        ErrorToast("User Cannot Fetch Server Error");
      }

      if (userStatus.data && userStatus.data.length >= 1) {
        setUsers(userStatus.data);
        setFilteredUsers(userStatus.data);
      }
    };
    fetchUsers();
  }, []);

  const router = useRouter();
  const { id } = useParams();

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
      !registerFormData.username ||
      (!registerFormData.method && !registerFormData.paidAmount) ||
      !registerFormData.amount
    ) {
      ErrorToast("Please fill in all required fields before proceeding.");
      return;
    }

    // setDisableBtn(true);

    // const response = await fetch("/api/customers/register", {
    //   method: "POST",
    //   body: JSON.stringify(registerFormData),
    // });

    // setDisableBtn(false);

    // const rspJson = await response.json();

    // if (!rspJson.success) {
    //   ErrorToast(rspJson.message);
    //   return;
    // }

    // SuccessToast("Customer Registered successful!");
    // router.push("/dashboard/customers");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setDropdownOpen(true);
    setRegisterFormData({
      ...registerFormData,
      username: value,
    });
    if (value.trim() === "") {
      setFilteredUsers([]);
      setDropdownOpen(false);
    } else {
      const filtered = users.filter((user) =>
        user.fullname.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleUserSelect = (user) => {
    setRegisterFormData({ ...registerFormData, user: user.id });
    setSearchTerm(user.name);
    setRegisterFormData({
      ...registerFormData,
      username: user.name,
    });
    setFilteredUsers([]);
    setDropdownOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev < filteredUsers.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleUserSelect(filteredUsers[selectedIndex]);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
    if (!dropdownOpen) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers([]);
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
                  Register New Payment
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-10">
                <hr />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative w-full">
                    <h3 className="font-semibold mb-2 text-sm">
                      Choose User <span className="text-red-500">*</span>
                    </h3>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter Username"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleSearch}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setDropdownOpen(true)}
                      value={searchTerm}
                      autoComplete="off"
                    />
                    <ChevronDown
                      className="absolute right-3 top-[39px] cursor-pointer text-gray-500"
                      onClick={handleDropdownToggle}
                    />
                    {dropdownOpen && filteredUsers.length > 0 && (
                      <div className="absolute w-full bg-white border border-gray-200 rounded-lg shadow-md mt-1 max-h-40 overflow-y-auto">
                        {filteredUsers.map((user, index) => (
                          <div
                            key={user.id}
                            className={`p-2 cursor-pointer ${
                              selectedIndex === index
                                ? "bg-gray-200"
                                : "hover:bg-gray-100"
                            }`}
                            onClick={() => handleUserSelect(user.username)}
                          >
                            {user.fullname}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold  mb-2 text-sm">Amount</h3>
                    <input
                      type="number"
                      name="amount"
                      placeholder="Enter Amount"
                      className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[9px] px-3 focus-visible:outline-none focus:border-2 focus:border-[#8C57FF]"
                      onChange={handleInputChange}
                    />
                  </div>
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
