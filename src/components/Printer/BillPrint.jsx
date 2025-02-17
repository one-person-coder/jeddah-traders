"use client";
import Script from "next/script";
import React, { useState } from "react";

const BillPrint = ({ payments, id }) => {
  const [users, setUsers] = useState(payments);
  const filterData = users.find((user) => user.id === parseInt(id));
  const lowerUsers = users.filter((user) => user.id <= parseInt(id));
  let remaining = 0;

  lowerUsers.forEach((user) => {
    remaining += user.amount ? user.amount : 0;
    remaining -= user.paid_amount ? user.paid_amount : 0;
  });

  const singleUser = { ...filterData, remaining: remaining };
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
    <div className="rec">
      <h2 className="text-[1.5em] font-bold">Jeddah Traders</h2>
      <table>
        <tbody>
          <tr>
            <td>Bill No:</td>
            <td>
              <b>{singleUser.id || "-"}</b>
            </td>
          </tr>
          <tr>
            <td>customer: </td>
            <td>
              <span className="nb">
                {" "}
                {singleUser?.customer?.fullname || "-"}{" "}
              </span>
              <p> {singleUser?.customer?.address || "-"}</p>
            </td>
          </tr>
          <tr>
            <td>remarks:</td>
            <td>
              <p>
                <span>{singleUser?.description || "-"}</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <h3 className="text-[1.17em] font-bold">bill details</h3>
      <div>
        {singleUser?.items?.length >= 1 ? (
          <table className="detail">
            <tbody>
              <tr>
                <th>Sr.</th>
                <th className="">caption</th>
                <th className="">qty</th>
                <th className="">amount</th>
              </tr>
              {singleUser?.items.map((item, index) => {
                return (
                  <tr key={index} className="">
                    <td className="serialn">{index + 1}</td>
                    <td className="">
                      <b className="nb"></b> {item?.name}
                    </td>
                    <td className="">{item?.qty}</td>
                    <td className="">{item?.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
        <table className="total">
          <tbody>
            {singleUser?.items?.length >= 1 ? (
              <tr>
                <th>Total:</th>
                <td>{singleUser?.total || "-"}</td>
              </tr>
            ) : null}
            <tr>
              <th>Payment:</th>
              <td className="payment b">
                <span className="fontSmall"></span>
                {singleUser?.paid_amount || "-"}
              </td>
            </tr>
            <tr>
              <th>Ballance:</th>
              <td className="b">{singleUser?.remaining || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="stamp tright">
        {formattedDate}
        <br />
        {/* [ Haroon_Rasheed ] */}
        <br />
        www.jeddahtraders.com
      </p>
      <style jsx>
        {`
          html,
          body {
            height: 100%;
            width: 100%;
          }
          @media print {
            * {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            width: 4in;
            height: 6in;
          }
          * {
            padding: 0;
            margin: 0;
            font-family: monospace;
          }
          .rec {
            /* background-color: whitesmoke; */
            /* border-radius: 8px; */
            border: 1px solid black;
            margin: 4px;
            padding: 11px 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: fit-content;
            /* width: -webkit-fill-available; */
            height: -webkit-fill-available;
          }
          .rec h3 {
            margin-bottom: 8px;
          }
          .detail {
            background-color: white;
            border-collapse: collapse;
            border: 1px dashed;
          }
          .detail th,
          .detail td {
            padding: 1px 4px;
          }
          .detail td {
            border: 1px solid;
          }
          .detail td:nth-last-child(3) {
            text-align: right;
          }
          .detail td:nth-last-child(2) {
            text-align: center;
          }
          .detail td:nth-last-child(1) {
            text-align: right;
          }
          .total {
            width: -webkit-fill-available;
            border: 1px dashed;
            margin: 4px;
            border-collapse: collapse;
          }
          .total th,
          .total td {
            text-align: right;
            padding-right: 10px;
          }
          .total td {
            text-align: right;
          }
          .total td,
          .total th {
            border: 1px solid black;
          }
          .payment {
            color: white;
            background-color: #444;
            font-size: 1.1em;
          }
          .b {
            font-weight: bold;
          }
        `}
      </style>
      <Script strategy="afterInteractive">
        {`
       setTimeout(()=> {print();}, 600);
        `}
      </Script>
    </div>
  );
};

export { BillPrint };
