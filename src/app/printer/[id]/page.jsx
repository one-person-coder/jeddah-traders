"use client";
import Script from "next/script";
import React from "react";

const Printer = () => {
  return (
    <div className="rec">
      <h2 className="text-[1.5em] font-bold">Jeddah Traders</h2>
      <table>
        <tbody>
          <tr>
            <td>Bill No:</td>
            <td>
              <b>24005</b>
            </td>
          </tr>
          <tr>
            <td>customer:</td>
            <td>
              <span className="nb">Abdul Rehman </span>
              <p>Game wala ,Muslim Town DGKhan</p>
            </td>
          </tr>
          <tr>
            <td>remarks:</td>
            <td>
              <p>
                {" "}
                <span></span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <h3 className="text-[1.17em] font-bold">bill details</h3>
      <div>
        <table className="detail">
          <tbody>
            <tr>
              <th>Sr.</th>
              <th className="">caption</th>
              <th className="">qty</th>
              <th className="">amount</th>
            </tr>
            <tr className="">
              <td className="serialn">1</td>
              <td className="">
                <b className="nb"></b> Cloth
              </td>
              <td className="">1</td>
              <td className="">1800</td>
            </tr>
          </tbody>
        </table>
        <table className="total">
          <tbody>
            <tr>
              <th>Total:</th>
              <td>1800</td>
            </tr>

            <tr>
              <th>Bill:</th>
              <td className="b">
                <span className="fontSmall"></span>1,800
              </td>
            </tr>
            <tr>
              <th>Payment:</th>
              <td className="payment b">
                <span className="fontSmall"></span>200
              </td>
            </tr>
            <tr>
              <th>Ballance:</th>
              <td className="b">1600</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="stamp tright">
        12:37:28 AM 07-Mar-2024
        <br />[ Haroon_Rasheed ]<br />
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
      <Script strategy="beforeInteractive">
        {`
           setTimeout(()=> {print();}, 600);
        `}
      </Script>
    </div>
  );
};

export default Printer;
