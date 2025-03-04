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
function formatSpecificDate(currentDate) {
  const now = new Date(currentDate + "Z");

  const day = now.getUTCDate(); // Get local day
  const month = now.toLocaleString("en-GB", {
    month: "short",
    timeZone: "UTC",
  }); // "Mar"
  const year = now.getUTCFullYear();
  const weekday = now.toLocaleString("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  }); // "Monday"

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

function filterUsersByPaymentDate(userData, startDate, endDate) {
  const [startDay, startMonthStr, startYear] = startDate
    .split(",")[0]
    .split("-");
  const [endDay, endMonthStr, endYear] = endDate.split(",")[0].split("-");

  console.log(startDay, startMonthStr, startYear);
  console.log(endDay, endMonthStr, endYear);

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

  const startMonth = monthMap[startMonthStr];
  const endMonth = monthMap[endMonthStr];

  // Convert to Date objects for comparison
  const startDateObj = new Date(`${startYear}-${startMonth}-${startDay}`);
  const endDateObj = new Date(`${endYear}-${endMonth}-${endDay}`);

  return userData
    .map((user) => {
      if (!user.customerPayments || !Array.isArray(user.customerPayments))
        return null;

      // Find payments within the range
      const matchedPayments = user.customerPayments.filter((payment) => {
        if (!payment.createdAt || payment.isDelete) return false;

        const paymentDate = new Date(payment.createdAt);
        return paymentDate >= startDateObj && paymentDate <= endDateObj;
      });

      // If no matching payments found, ignore this user
      if (matchedPayments.length === 0) return null;

      // Return user with all customerPayments + matched ones in new key `bills`
      return {
        ...user,
        bills: matchedPayments, // Changed from single `bill` to `bills` array
      };
    })
    .filter(Boolean); // Remove null users
}

function convertToDateInputFormat(dateStr) {
  let parts = dateStr.split(", ")[0].split("-"); // ["3", "Mar", "2025"]

  let day = parts[0].padStart(2, "0"); // Ensure two-digit day
  let month = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  }[parts[1]]; // Convert month to number
  let year = parts[2];

  return `${year}-${month}-${day}`;
}

const ReportPage = ({ userData }) => {
  const [mainUsers, MainSetUsers] = useState([...userData]);
  const [users, setUsers] = useState([]);

  const [statsHeading, setStatsHeading] = useState("Today Stats");
  // const [formattedDate, setFormattedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const formattedDate = getCurrentFormattedDate();
    // setFormattedDate(formattedDate);
    setStartDate(convertToDateInputFormat(formattedDate));
    setEndDate(convertToDateInputFormat(formattedDate));

    const filteredUsers = filterUsersByPaymentDate(
      mainUsers,
      formattedDate,
      formatSpecificDate(endDate)
    );

    setUsers(filteredUsers || []);

    const isoDate = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    const daysAgo = calculateDaysAgo(isoDate);
    setStatsHeading(getStatsHeading(daysAgo));
  }, []);

  const filterDateRangeData = () => {
    const filteredUsers = filterUsersByPaymentDate(
      mainUsers,
      formatSpecificDate(startDate),
      formatSpecificDate(endDate)
    );

    console.log("logging end", formatSpecificDate(endDate));

    console.log(filteredUsers);

    setUsers(filteredUsers || []);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center text-gray-900">
        Date [
        <span className="font-semibold text-purple-700 text-lg">
          {" "}
          {formatSpecificDate(startDate)}
          {formatSpecificDate(endDate) !== formatSpecificDate(startDate)
            ? ` --> ${formatSpecificDate(endDate)}`
            : ""}{" "}
        </span>
        ]
      </h2>

      <div className="py-8 space-y-8">
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-dashed">
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-900">
                Date Closing Report Filter
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
                <Select>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Reports" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reports">Reports</SelectItem>
                    <SelectItem value="users">Users</SelectItem>
                  </SelectContent>
                </Select>
                <div>
                  <input
                    type="date"
                    name="startDate"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                    className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[3px] px-3 !bg-white"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    name="endDate"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                    className="w-full border-2 border-transparent outline outline-1 outline-[#d1cfd4] rounded-[6px] duration-200 py-[3px] px-3 !bg-white"
                  />
                </div>
                <div className="lg:justify-self-end">
                  <Button
                    onClick={filterDateRangeData}
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border shadow-sm max-h-[500px] overflow-scroll">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Sr.</TableHead>
                    <TableHead>A/C</TableHead>
                    <TableHead>Customer</TableHead>
                    {/* <TableHead>ROLE</TableHead>
                  <TableHead>STATUS</TableHead> */}
                    {/* <TableHead>CONTACT</TableHead> */}
                    <TableHead>Bill</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead>Stamp</TableHead>
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
                        </TableCell> */}
                        {/* <TableCell>
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
                        {/* <TableCell>
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
                        </TableCell> */}

                        <TableCell>{user.bill.amount || "-"}</TableCell>
                        <TableCell>{user.bill.paid_amount || "-"}</TableCell>
                        <TableCell>
                          <div className="flex flex-col justify-center">
                            <span className="text-[16px]">
                              {user.bill.createdAt
                                ? new Date(user.bill.createdAt).toLocaleString(
                                    "en-GB",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                      weekday: "long",
                                    }
                                  )
                                : null}
                            </span>
                            <span className="text-[12px] text-purple-700 font-semibold">
                              {user.bill.user.username || "-"}
                            </span>
                          </div>
                        </TableCell>

                        {/* <TableCell>
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
                        </TableCell> */}

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
                            {/* <Button
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
                            </Button> */}
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
