"use client";

import * as React from "react";
import {
  Pencil,
  Search,
  User2,
  Eye,
  Plus,
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
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ErrorToast, SuccessToast } from "@/components/utils/CustomToasts";

export default function DashboardLists({ data, customerId }) {
  const [isFiltersVisible, setIsFiltersVisible] = React.useState(true);
  const [storeUsers, setStoreUsers] = React.useState(data);
  const [users, setUsers] = React.useState(data);

  const [searchTerm, setSearchTerm] = React.useState("");

  const refreshData = async () => {
    const response = await fetch(`/api/customers/payments/status`, {
      method: "POST",
      body: JSON.stringify({ customerId: customerId }),
    });
    const userStatus = await response.json();

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
        user.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim()) ||
        user?.paid_amount
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchTerm.toLowerCase().trim()) ||
        user?.amount
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchTerm.toLowerCase().trim())
    );
    setUsers(filteredUsers);
  }, [searchTerm]);

  return (
    <div className="py-8 space-y-8">
      <div className="text-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Payment History
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor your payment history
          </p>
        </div>
      </div>

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
                  <TableHead>STATUS</TableHead>
                  <TableHead>AMOUNT</TableHead>
                  <TableHead>PAID</TableHead>
                  <TableHead>DESCRIPTION</TableHead>
                  {/* <TableHead>ACTIONS</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    key={index}
                    className={`${
                      user.isDelete
                        ? "bg-[#ffd2d2] hover:bg-[#ffd2d2]"
                        : "hover:bg-gray-50/50"
                    }`}
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
                            {user.user.fullname}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.user.username}
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
                    <TableCell>
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
                    </TableCell>
                    <TableCell>{user.amount}</TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {user.paid_amount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {user.description}
                      </span>
                    </TableCell>
                    {/* <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                        >
                          <Link
                            href={`/dashboard/customers/${customerId}/payments/${user.id}/view`}
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
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
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            deleteUser(user.id, user.username);
                          }}
                          className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
