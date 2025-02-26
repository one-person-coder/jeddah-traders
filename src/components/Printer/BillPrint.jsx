"use client";
import Script from "next/script";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const BillPrint = ({ payments, id }) => {
  const [users, setUsers] = useState(payments);
  const filterData = users.find((user) => user.id === Number.parseInt(id));

  const notDeletedPayments = payments.filter((payment) => !payment.isDelete);

  const filterPayments = notDeletedPayments.filter(
    (user) => !user.isDelete && user.id <= id
  );
  const totalAmount = filterPayments.reduce(
    (acc, user) => (user.isDelete ? acc : acc + user.amount),
    0
  );
  const totalPaid = filterPayments.reduce(
    (acc, user) => (user.isDelete ? acc : acc + user.paid_amount),
    0
  );
  const totalPending = totalAmount - totalPaid;

  const singleUser = { ...filterData, totalPending };
  const date = new Date(singleUser?.createdAt);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedDate = date
    .toLocaleString("en-US", options)
    .replace(",", "")
    .replace(/(\d{2})(?=\d{4})/, "$1-");

  return (
    <div className="print-area">
    <Card className="min-w-[280px] w-fit !bg-transparent border !rounded-none border-black !shadow-none">
      <CardHeader className="text-center space-y-6 pb-6 border-b">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Jeddah Traders
          </h1>
          <h2 className="text-xl  font-bold tracking-tight">
            And Corporations
          </h2>
        </div>
        <div>
          <h3 className="mb-2 tracking-tight">
            Mohsin Town, Jampur Road, Pull Dot,
            <br /> Dera Ghazi Khan
          </h3>
          <h4 className="mb-3 tracking-tight">+92 316 8558212</h4>
        </div>
      </CardHeader>
      <p className="!font-bold text-center mt-2">{formattedDate}</p>

      <CardContent className="p-0">
        <div className="px-6 py-4">
          <div className="mb-3">
            <Table className="border border-gray-400">
              <TableBody>
                <TableRow className="bg-gray-50 border-b border-gray-400">
                  {singleUser?.items?.length >= 1 ? (
                    <TableHead className="font-semibold border-r border-gray-400">
                      Bill No:
                    </TableHead>
                  ) : (
                    <TableHead className="font-semibold border-r border-gray-400">
                      Recipt Id:
                    </TableHead>
                  )}
                  <TableCell className="text-blue-600 font-medium border-gray-400">
                    {singleUser?.id}
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-400">
                  <TableHead className="font-semibold border-r border-gray-400">
                    Customer:
                  </TableHead>
                  <TableCell className="font-medium border-gray-400">
                    <span>{singleUser?.customer?.fullname}</span>
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-400">
                  <TableHead className="font-semibold border-r border-gray-400">
                    Customer ID:
                  </TableHead>
                  <TableCell className="font-medium border-gray-400">
                    <span>{singleUser?.customer?.account_number}</span>
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-400">
                  <TableHead className="font-semibold border-r border-gray-400">
                    Description
                  </TableHead>
                  <TableCell className="border-gray-400">
                    {singleUser?.description || "-"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {singleUser?.items?.length >= 1 ? (
            <p className="!font-bold text-center text-lg">Bill Details</p>
          ) : (
            <p className="!font-bold text-center text-lg">Payment Recipt</p>
          )}

          {singleUser?.items?.length >= 1 ? (
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
                  {singleUser.items.map((item, index) => {
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
                {singleUser?.items?.length >= 1 ? (
                  <TableRow className="bg-gray-50 border-b border-gray-400">
                    <TableHead className="font-semibold border-r border-gray-400">
                      Total
                    </TableHead>
                    <TableCell className="font-bold border-gray-400">
                      {singleUser?.amount}
                    </TableCell>
                  </TableRow>
                ) : null}

                <TableRow className="border-b border-gray-400">
                  <TableHead className="font-semibold border-r border-gray-400">
                    Payment
                  </TableHead>
                  <TableCell className="font-bold border-gray-400">
                    {singleUser?.paid_amount || 0}
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-gray-400">
                  {singleUser?.items?.length >= 1 ? (
                    <>
                      <TableHead className="font-semibold border-r border-gray-400">
                        Bill
                      </TableHead>
                      <TableCell className="border-gray-400 font-bold">
                        {singleUser?.amount - singleUser?.paid_amount || 0}
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableHead className="font-semibold border-r border-gray-400">
                        Remaining
                      </TableHead>
                      <TableCell className="border-gray-400 font-bold">
                        {singleUser?.totalPending || 0}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 text-center text-sm">
            [ {singleUser?.user?.fullname} ]
          </div>

          <div className="mt-1 text-center text-sm">www.jeddahtraders.com</div>
        </div>
      </CardContent>

      <Script strategy="afterInteractive">
        {`
        setTimeout(() => { print(); }, 600);
        `}
      </Script>
    </Card>
    </div>
  );
};
