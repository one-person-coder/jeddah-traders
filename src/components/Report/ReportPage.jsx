"use client";
import React, { useState, useEffect } from "react";
import { statusColors } from "@/constant/constant";
import { Pencil, Eye, Filter, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
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

// ✅ Function to get current **Pakistan time** (or local time)
function getCurrentFormattedDate() {
  const now = new Date();

  const day = now.getDate(); // Get local day
  const month = now.toLocaleString("en-GB", { month: "short" }); // "Mar"
  const year = now.getFullYear();
  const weekday = now.toLocaleString("en-GB", { weekday: "long" }); // "Monday"

  return `${day}-${month}-${year}, ${weekday}`;
}

// ✅ Function to calculate days ago correctly based on local time
function calculateDaysAgo(selectedDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to local midnight

  const inputDate = new Date(selectedDate);
  inputDate.setHours(0, 0, 0, 0); // Normalize selectedDate to local midnight

  const diffTime = today.getTime() - inputDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

function getStatsHeading(daysAgo) {
  if (daysAgo === 0) return `Today Stats`;
  if (daysAgo === 1) return `Yesterday Stats`;
  if (daysAgo < 7) return `Last ${daysAgo} Days Stats`;
  if (daysAgo < 30) return `Last Week Stats`;
  if (daysAgo < 90) return `Last ${Math.floor(daysAgo / 30)} Months Stats`;
  return `Yearly Stats`;
}

function filterUsersByPaymentDate(userData, targetDate) {
  // Extract day, month, and year from targetDate format "3-Mar-2025, Monday"
  const [targetDay, targetMonthStr, targetYear] = targetDate
    .split(",")[0]
    .split("-");

  // Convert month string (e.g., "Mar") to month number (1-12)
  const monthMap = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };
  const targetMonth = monthMap[targetMonthStr];

  return userData.filter((user) => {
    if (!user.customerPayments || !Array.isArray(user.customerPayments))
      return false;

    return user.customerPayments.some((payment) => {
      if (!payment.createdAt) return false;

      const paymentDate = new Date(payment.createdAt);
      const paymentYear = paymentDate.getFullYear();
      const paymentMonth = paymentDate.getMonth() + 1; // Convert to 1-12
      const paymentDay = paymentDate.getDate();

      return (
        paymentYear === parseInt(targetYear) &&
        paymentMonth === targetMonth &&
        paymentDay === parseInt(targetDay)
      );
    });
  });
}

const ReportPage = ({ userData }) => {
  const [mainUsers, MainSetUsers] = useState([...userData]);
  const [users, setUsers] = useState([]);

  const [statsHeading, setStatsHeading] = useState("Today Stats");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formattedDate = getCurrentFormattedDate();
    setFormattedDate(formattedDate);

    const filteredUsers = filterUsersByPaymentDate(mainUsers, formattedDate);
    setUsers(filteredUsers || []);

    const isoDate = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    const daysAgo = calculateDaysAgo(isoDate);
    setStatsHeading(getStatsHeading(daysAgo));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center text-gray-900">
        {statsHeading} [
        <span className="font-semibold text-purple-700"> {formattedDate} </span>
        ]
      </h2>

      <div className="py-8 space-y-8">
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  className="border-dashed"
                  onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                >
                  <Filter className="mr-2 h-4 w-4 text-purple-600" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6 p-4 bg-gray-50 rounded-lg border border-dashed">
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Status: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-lg border shadow-sm max-h-[500px] overflow-scroll">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Sr.</TableHead>
                    <TableHead>A/C</TableHead>
                    <TableHead>USER</TableHead>
                    {/* <TableHead>ROLE</TableHead>
                  <TableHead>STATUS</TableHead> */}
                    <TableHead>CONTACT</TableHead>
                    <TableHead>LAST</TableHead>
                    <TableHead>REMAINING AMOUNT</TableHead>
                    <TableHead className="text-right">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users
                    .sort((a, b) => a.account_number - b.account_number)
                    .map((user, index) => (
                      <TableRow
                        key={index}
                        className="cursor-pointer hover:bg-gray-200/50 data-[selected=true]:bg-blue-100"
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
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {user.account_number}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-600 ring-2 ring-white">
                                {user.fullname
                                  .split(" ")
                                  .map((word) => word.charAt(0))
                                  .join("")}
                              </div>
                              <div
                                className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white"
                                style={{
                                  backgroundColor:
                                    statusColors[`more-${user.status}`],
                                }}
                              />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {user.fullname}
                              </div>
                              <div className="text-[12px]">
                                {user.last_name || "-"}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        {/* <TableCell>
                      <div className="flex items-center gap-2">
                        <User2 className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center rounded-md text-xs transition-colors font-medium px-2 py-0.5 capitalize"
                          style={{
                            backgroundColor: statusColors[user.status],
                          }}
                        >
                          {user.status}
                        </span>
                      </div>
                    </TableCell> */}
                        <TableCell>
                          {user.pNumber ? (
                            <>
                              {user.pNumber.split("/").map((num, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="mb-1 flex gap-2 items-center bg-orange-300 overflow-hidden w-fit pr-2 rounded-md"
                                  >
                                    <div
                                      className="hover:bg-orange-400 py-2 px-2"
                                      onClick={() => {
                                        window.location.href = `tel:${num}`;
                                      }}
                                    >
                                      <PhoneCall className="h-4 w-4" />
                                    </div>
                                    <span>{num}</span>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          {user.customerPayments.length >= 1 ? (
                            <div className="flex gap-2">
                              <span className="text-[16px] font-bold text-blue-700 text-muted-foreground">
                                {
                                  user?.customerPayments
                                    .filter((payment) => !payment.isDelete)
                                    .reverse()[0]?.paid_amount
                                }
                              </span>
                              -
                              <span className="text-sm text-muted-foreground">
                                {new Date(
                                  user?.customerPayments
                                    .filter((payment) => !payment.isDelete)
                                    .reverse()[0]?.createdAt
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric",
                                  timeZone: "UTC",
                                  hour12: true,
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                })}
                              </span>
                            </div>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          {user.customerPayments.length >= 1 ? (
                            <div>
                              <span className="text-sm text-muted-foreground">
                                {user?.customerPayments.reduce(
                                  (acc, user) =>
                                    user.isDelete ? acc : acc + user.amount,
                                  0
                                ) -
                                  user?.customerPayments?.reduce(
                                    (acc, user) =>
                                      user.isDelete
                                        ? acc
                                        : acc + user.paid_amount,
                                    0
                                  )}
                              </span>
                            </div>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              asChild
                              variant="outline"
                              className="border-2 border-blue-800"
                            >
                              <Link
                                href={`/dashboard/customers/${user.id}/payments`}
                                className="!py-1 !px-3 rounded-sm !h-[2rem] hover:!bg-blue-800 hover:!text-white"
                              >
                                Account
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                            >
                              <Link
                                href={`/dashboard/customers/${user.id}/view`}
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
                                href={`/dashboard/customers/${user.id}/edit`}
                              >
                                <Pencil className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportPage;
