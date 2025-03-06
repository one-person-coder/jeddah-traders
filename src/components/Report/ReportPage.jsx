"use client";
import { DollarSign, HandCoins } from "lucide-react";
import React, { useState, useEffect } from "react";
import { statusColors } from "@/constant/constant";
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

function filterUsersByPaymentDate(payments, startDate, endDate) {
  const monthMap = {
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
  };

  // Function to convert "3-Mar-2025, Monday" to Date object
  function parseDate(dateStr, isStartDate) {
    let cleanDateStr = dateStr.split(",")[0]; // "3-Mar-2025"
    let [day, monthStr, year] = cleanDateStr.split("-");

    if (!monthMap[monthStr]) {
      console.error("Invalid month:", monthStr);
      return new Date("Invalid Date");
    }

    // Create the date in local time (without timezone shifts)
    let date = new Date(year, monthMap[monthStr] - 1, day);

    // Set time to the beginning of the day (00:00:00.000) for start date
    // Set time to the end of the day (23:59:59.999) for end date
    if (isStartDate) {
      date.setUTCHours(0, 0, 0, 0); // Start of the day
    } else {
      date.setUTCHours(23, 59, 59, 999); // End of the day
    }

    return date;
  }

  // Parse Start & End Dates
  let start = parseDate(startDate, true); // Start date (beginning of the day)
  let end = parseDate(endDate, false); // End date (end of the day)

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error("Error: Invalid start or end date format!");
    return [];
  }

  return payments.filter((payment) => {
    const paymentDate = new Date(payment.createdAt);

    return (
      paymentDate.getTime() >= start.getTime() &&
      paymentDate.getTime() <= end.getTime()
    );
  });
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


function aggregateUserData(dataList) {
  let userSummary = {};

  dataList.forEach((obj) => {
    if (obj.user && obj.user.username) {
      let username = obj.user.username;
      let fullname = obj.user.fullname || "";

      if (!userSummary[username]) {
        userSummary[username] = {
          fullname: fullname,
          username: username,
          amount: 0,
          paid_amount: 0,
          count: 0,
          items: [],
        };
      }

      userSummary[username].count += 1;

      userSummary[username].amount += obj.amount || 0;
      userSummary[username].paid_amount += obj.paid_amount || 0;

      userSummary[username].items.push(obj);
    }
  });

  return Object.values(userSummary);
}

const ReportPage = ({ userData }) => {
  const [mainUsers, MainSetUsers] = useState([...userData]);
  const [statusFilter, setStatusFilter] = useState("reports");
  const [itemsData, setItemsData] = useState();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState({
    totalAmount: 0,
    paidAmount: 0,
    remainingAmount: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (statusFilter === "users") {
      const filterData = aggregateUserData(users);
      setUsers(filterData);
    } else if (statusFilter === "reports") {
      filterDateRangeData();
    }
  }, [statusFilter]);

  useEffect(() => {
    const totalAmount = users.reduce(
      (acc, user) => (user.isDelete ? acc : acc + user.amount),
      0
    );
    const paidAmount = users.reduce(
      (acc, user) => (user.isDelete ? acc : acc + user.paid_amount),
      0
    );
    const remainingAmount = totalAmount - paidAmount;

    setTotal({ totalAmount, paidAmount, remainingAmount });
  }, [users]);

  const [statsHeading, setStatsHeading] = useState("Today Stats");
  // const [formattedDate, setFormattedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const formattedDate = getCurrentFormattedDate();
    setStartDate(convertToDateInputFormat(formattedDate));
    setEndDate(convertToDateInputFormat(formattedDate));
  
    const filteredUsers = filterUsersByPaymentDate(
      mainUsers,
      formatSpecificDate(convertToDateInputFormat(formattedDate)),
      formatSpecificDate(convertToDateInputFormat(formattedDate))
    );
  
    setUsers(filteredUsers || []);
  
    const isoDate = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    const daysAgo = calculateDaysAgo(isoDate);
    setStatsHeading(getStatsHeading(daysAgo));
  }, []);

  const filterDateRangeData = () => {
    if (startDate && endDate) {
      const filteredUsers = filterUsersByPaymentDate(
        mainUsers,
        formatSpecificDate(startDate),
        formatSpecificDate(endDate)
      );
  
      if (statusFilter === "users") {
        const filterData = aggregateUserData(filteredUsers);
        setUsers(filterData);
      } else if (statusFilter === "reports") {
        setUsers(filteredUsers || []);
      }
    }
  };

  const handleClose = () => {
    setItemsData([]);
    setIsVisible(false);
  };

  const showDetail = (items) => {
    setItemsData(items);
    setIsVisible(true);
  };

  return (
    <div>
      <div className="pb-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Bill
                  </p>
                  <h2 className="text-3xl font-bold">{total.totalAmount}</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-purple-700" />
            </CardContent>
          </Card>

          {/* Active Users Card */}
          <Card className="relative overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Paid Amount
                  </p>
                  <h2 className="text-3xl font-bold">{total.paidAmount}</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <HandCoins className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 to-green-700" />
            </CardContent>
          </Card>
          {/* Pending Users Card */}
          {/* <Card className="relative overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Remaining Amount
                  </p>
                  <h2 className="text-3xl font-bold">
                    {total.remainingAmount >= 0 ? total.remainingAmount : 0}
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <DollarSign className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 to-amber-700" />
            </CardContent>
          </Card> */}
        </div>
      </div>

      <h2 className="text-xl font-semibold text-center text-gray-900">
        Stats Date [
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
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

            <div className="rounded-lg border shadow-sm max-h-[500px] overflow-scroll">
              {statusFilter === "reports" ? (
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
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map((user, index) => (
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
                              {user?.customer?.account_number}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-600 ring-2 ring-white">
                                {user?.customer?.fullname
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
                                {user?.customer?.fullname}
                              </div>
                              <div className="text-[12px]">
                                {user?.customer?.last_name || "-"}
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

                        <TableCell>{user.amount || "-"}</TableCell>
                        <TableCell>{user.paid_amount || "-"}</TableCell>
                        <TableCell>
                          <div className="flex flex-col justify-center">
                            <span className="text-[16px]">
                              {user.createdAt
                                ? new Date(user.createdAt).toLocaleString(
                                    "en-GB",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      timeZone: "UTC",
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
                              {user?.user?.username || "-"}
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
                        <TableCell>{user.description || "-"}</TableCell>

                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              asChild
                              variant="outline"
                              className="border-2 border-blue-800"
                            >
                              <Link
                                href={`/dashboard/customers/${user?.customer?.id}/payments`}
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
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Sr.</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Bill</TableHead>
                      <TableHead>Paid Amount</TableHead>
                      <TableHead className="text-right">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map((user, index) => (
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
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-600 ring-2 ring-white">
                                {user?.fullname
                                  ?.split(" ")
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
                                {user?.fullname}
                              </div>
                              <div className="text-[12px]">
                                {user?.username || "-"}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.count || "-"}</TableCell>
                        <TableCell>{user.amount || "-"}</TableCell>
                        <TableCell>{user.paid_amount || "-"}</TableCell>

                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              className="border-2 border-blue-800 hover:bg-blue-800 hover:text-white"
                              onClick={() => showDetail(user)}
                            >
                              Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {isVisible ? (
        <>
          <div className="fixed top-0 z-[600] w-full sm:w-[80%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Card className="border-none shadow-light">
              <CardContent className="p-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center text-gray-900">
                    {itemsData?.fullname} -&gt; [{" "}
                    <span className="text-purple-700">
                      {itemsData?.username}
                    </span>{" "}
                    ]
                  </h3>
                </div>
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
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">ACTIONS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {itemsData?.items?.map((user, index) => (
                        <TableRow
                          key={index}
                          className="cursor-pointer hover:bg-gray-200/50 data-[selected=true]:bg-blue-100"
                          onClick={(e) => {
                            document
                              .querySelectorAll("[data-selected]")
                              .forEach((row) => {
                                row.removeAttribute("data-selected");
                              });
                            e.currentTarget.setAttribute(
                              "data-selected",
                              "true"
                            );
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
                                {user?.customer?.account_number}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-600 ring-2 ring-white">
                                  {user?.customer?.fullname
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
                                  {user?.customer?.fullname}
                                </div>
                                <div className="text-[12px]">
                                  {user?.customer?.last_name || "-"}
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

                          <TableCell>{user.amount || "-"}</TableCell>
                          <TableCell>{user.paid_amount || "-"}</TableCell>
                          <TableCell>
                            <div className="flex flex-col justify-center">
                              <span className="text-[16px]">
                                {user.createdAt
                                  ? new Date(user.createdAt).toLocaleString(
                                      "en-GB",
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        timeZone: "UTC",
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
                                {user?.user?.username || "-"}
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
                          <TableCell>{user.description || "-"}</TableCell>

                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                asChild
                                variant="outline"
                                className="border-2 border-blue-800"
                              >
                                <Link
                                  href={`/dashboard/customers/${user?.customer?.id}/payments`}
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
          <div
            className="bg-black/40 fixed top-0 left-0 h-full w-full z-40"
            onClick={handleClose}
          ></div>
        </>
      ) : null}
    </div>
  );
};

export default ReportPage;
