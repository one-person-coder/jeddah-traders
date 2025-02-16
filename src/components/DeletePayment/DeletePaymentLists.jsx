"use client";

import * as React from "react";
import {
  Pencil,
  Search,
  User2,
  Eye,
  Plus,
  Filter,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { statusColors } from "@/constant/constant";
import { ErrorToast, SuccessToast } from "../utils/CustomToasts";
import { Badge } from "../ui/badge";

export default function DeletePaymentLists({ data }) {
  let runningRemaining = 0;
  const [isFiltersVisible, setIsFiltersVisible] = React.useState(true);

  const [storeUsers, setStoreUsers] = React.useState(data);
  const [users, setUsers] = React.useState(data);

  const [searchTerm, setSearchTerm] = React.useState("");

  const refreshData = async () => {
    const response = await fetch(`/api/customers/payments/status`, {
      method: "POST",
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
    } else {
      window.location.reload();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteUser = async (userId) => {
    let userResponse = confirm(
      `Are you sure you want to delete payment [ ${userId} ]`
    );
    if (!userResponse) return;

    const response = await fetch("/api/customers/payments/delete", {
      method: "POST",
      body: JSON.stringify({
        id: userId,
      }),
    });
    const responseJson = await response.json();

    if (!responseJson.success) {
      ErrorToast(responseJson.message);
      return;
    }
    refreshData();
    SuccessToast("Payment Deleted Successfully!");
  };

  React.useEffect(() => {
    const filteredUsers = storeUsers.filter(
      (user) =>
        user.user.fullname
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim()) ||
        user.customer.fullname
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim()) ||
        user.user.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim()) ||
        user.customer.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim()) ||
        user.user.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim()) ||
        user.customer.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim()) ||
        user.user.pNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim()) ||
        user.customer.pNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim()) ||
        user.description.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    setUsers(filteredUsers);
  }, [searchTerm]);
  const [isVisible, setIsVisible] = React.useState(false);
  const [visibleData, setVisibleData] = React.useState({});

  const handleInvoiceClick = (id) => {
    const filterData = users.find((user) => user.id === id);
    const lowerUsers = users.filter((user) => user.id <= id);
    let remaining = 0;

    lowerUsers.forEach((user) => {
      remaining += user.amount ? user.amount : 0;
      remaining -= user.paid_amount ? user.paid_amount : 0;
    });

    const singleUser = { ...filterData, remaining: remaining };

    setVisibleData(singleUser);
    setIsVisible(true);
  };

  const handleClose = () => {
    setVisibleData({});
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible ? (
        <div>
          <div
            className="bg-black/40 fixed top-0 left-0 h-full w-full z-40"
            onClick={handleClose}
          ></div>
          <div className="fixed z-50 rounded-md bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Card className="min-w-[280px]  mx-auto bg-white shadow-sm">
              {/* Header Section */}
              <CardHeader className="text-center space-y-6 pb-6 border-b">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Jeddah Traders
                  </h1>
                  <p className="!font-bold text-center text-lg">
                    Invoice Details
                  </p>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="px-6 py-4">
                  <div className="mb-3">
                    <Table className="border border-gray-400">
                      <TableBody>
                        <TableRow className="bg-gray-50 border-b border-gray-400">
                          <TableHead className="font-semibold border-r border-gray-400">
                            Bill No:
                          </TableHead>
                          <TableCell className="text-blue-600 font-medium border-gray-400">
                            {visibleData?.id}
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-b border-gray-400">
                          <TableHead className="font-semibold border-r border-gray-400">
                            Customer:
                          </TableHead>
                          <TableCell className="font-medium border-gray-400">
                            <span>{visibleData?.customer?.fullname}</span>
                            <br />
                            <span>{visibleData?.customer?.username}</span>
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-b border-gray-400">
                          <TableHead className="font-semibold border-r border-gray-400">
                            Description
                          </TableHead>
                          <TableCell className="border-gray-400">
                            {visibleData?.description || "-"}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <p className="!font-bold text-center text-lg">Bill Details</p>

                  {visibleData?.items.length >= 1 ? (
                    <div className="border border-gray-200 overflow-hidden">
                      <Table className="border border-gray-400 text-center">
                        <TableHeader>
                          <TableRow className="bg-gray-50 border-b border-gray-400">
                            <TableHead className="w-16 text-center font-semibold border-r border-gray-400">
                              Sr.
                            </TableHead>
                            <TableHead className="font-semibold border-r border-gray-400">
                              Product
                            </TableHead>
                            <TableHead className="w-24 text-center font-semibold border-r border-gray-400">
                              Qty
                            </TableHead>
                            <TableHead className="w-32 text-center font-semibold border-gray-400">
                              Amount
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {visibleData?.items.map((item, index) => {
                            return (
                              <TableRow
                                key={item.id}
                                className="border-b border-gray-400"
                              >
                                <TableCell className="text-blue-600 font-medium border-r border-gray-400">
                                  {index + 1}
                                </TableCell>
                                <TableCell className="font-medium border-r border-gray-400">
                                  {item?.name}
                                </TableCell>
                                <TableCell className="text-center border-r border-gray-400">
                                  {item?.qty}
                                </TableCell>
                                <TableCell className="text-center font-medium border-gray-400">
                                  {item?.amount}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  ) : null}

                  <div className="mt-2">
                    <Table className="border border-gray-400">
                      <TableBody>
                        {visibleData?.items.length >= 1 ? (
                          <TableRow className="bg-gray-50 border-b border-gray-400">
                            <TableHead className="font-semibold border-r border-gray-400">
                              Total
                            </TableHead>
                            <TableCell className="font-bold border-gray-400">
                              {visibleData?.amount}
                            </TableCell>
                          </TableRow>
                        ) : null}

                        <TableRow className="border-b border-gray-400">
                          <TableHead className="font-semibold border-r border-gray-400">
                            Paid Amount
                          </TableHead>
                          <TableCell className="font-bold border-gray-400">
                            {visibleData?.paid_amount || 0}
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-b border-gray-400">
                          <TableHead className="font-semibold border-r border-gray-400">
                            Bill
                          </TableHead>
                          <TableCell className="border-gray-400 font-bold">
                            {visibleData?.remaining || 0}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* <div className="mt-6 text-center text-sm text-gray-500">
                Thank you for your business!
              </div> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}
      <div className={`py-8 space-y-8`}>
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={refreshData} variant="outline">
                  <RefreshCcw className="mr-2 h-4 w-4 text-purple-600" />
                  Refresh
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  onChange={handleSearchChange}
                  placeholder="Search payment..."
                  className="w-full pl-9 sm:w-[300px] bg-gray-50 border-0 ring-1 ring-gray-200"
                />
              </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border shadow-sm max-h-[500px] overflow-scroll">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Sr.</TableHead>
                    <TableHead>USER</TableHead>
                    <TableHead>DATE</TableHead>
                    {/* <TableHead>STATUS</TableHead> */}
                    <TableHead>Bill</TableHead>
                    <TableHead>PAID AMOUNT</TableHead>
                    <TableHead>DESCRIPTION</TableHead>
                    <TableHead>ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => {
                    runningRemaining += user.amount || 0;
                    runningRemaining -= user.paid_amount || 0;

                    return user.isDelete ? (
                      <TableRow
                        key={index}
                        className={`cursor-pointer data-[selected=true]:bg-blue-100 ${
                          user.isDelete
                            ? "bg-[#ffd2d2] hover:bg-[#ffd2d2]"
                            : "hover:bg-gray-200/50"
                        }`}
                        onClick={(e) => {
                          document
                            .querySelectorAll("[data-selected]")
                            .forEach((row) => {
                              row.removeAttribute("data-selected");
                            });
                          e.currentTarget.setAttribute("data-selected", "true");
                        }}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{index + 1}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-600 ring-2 ring-white">
                                {user.user.fullname
                                  .split(" ")
                                  .map((word) => word.charAt(0))
                                  .join("")}
                              </div>
                              <div
                                className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white"
                                style={{
                                  backgroundColor:
                                    user.amount && user.paid_amount
                                      ? "#9333ea"
                                      : user.amount && !user.paid_amount
                                      ? "#c5bd00"
                                      : !user.amount && user.paid_amount
                                      ? "#00cd0e"
                                      : null,
                                }}
                              />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {user.customer.fullname}
                              </div>
                              <div className="text-sm ml-2 text-[#712fff] text-muted-foreground">
                                {user.user.fullname}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User2 className="h-4 w-4 text-purple-600" />
                            <span className="font-medium">
                              {new Date(user.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric",
                                  timeZone: "UTC",
                                  hour12: true,
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                        </TableCell>
                        {/* <TableCell>
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-flex items-center rounded-md text-xs transition-colors font-medium px-2 py-0.5 capitalize"
                              style={{
                                backgroundColor:
                                  user.amount && user.paid_amount
                                    ? "#f3e8ff"
                                    : user.amount && !user.paid_amount
                                    ? "#f1f5b2"
                                    : !user.amount && user.paid_amount
                                    ? "#c8ffc8"
                                    : null,
                              }}
                            >
                              {user.amount && user.paid_amount ? (
                                <span>partial</span>
                              ) : user.amount && !user.paid_amount ? (
                                <span>pending</span>
                              ) : !user.amount && user.paid_amount ? (
                                <span>paid</span>
                              ) : null}
                            </span>
                          </div>
                        </TableCell> */}
                        <TableCell>{user.amount}</TableCell>
                        <TableCell>
                          <span className="text-muted-foreground flex flex-col gap-2 text-black">
                            {user.paid_amount ? user.paid_amount : "-"}
                          </span>
                          <span className="text-[13px] text-blue-800 ml-2 mt-3">
                            {runningRemaining}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {user.description}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                              onClick={() => {
                                handleInvoiceClick(user.id, runningRemaining);
                              }}
                            >
                              <Eye className="h-4 w-4" />

                              {/* <Link
                                href={`/dashboard/customers/${customerId}/payments/${user.id}/view`}
                              >
                                <Eye className="h-4 w-4" />
                              </Link> */}
                            </Button>
                            {/* <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                            asChild
                          >
                            <Link
                              href={`/dashboard/customers/${customerId}/payments/${user.id}/edit`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button> */}
                            {/* <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                deleteUser(user.id, user.username);
                              }}
                              className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button> */}
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : null;
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
