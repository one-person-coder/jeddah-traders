"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function aggregateMonthlyData(dataList) {
  let monthlySummary = {};

  dataList.forEach((obj) => {
    if (obj.createdAt) {
      let dateObj = new Date(obj.createdAt);
      let monthYear = dateObj.toLocaleString("en-GB", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });

      if (!monthlySummary[monthYear]) {
        monthlySummary[monthYear] = {
          month: monthYear,
          bill: 0,
          receipt: 0,
          market: 0,
        };
      }

      monthlySummary[monthYear].bill += obj.amount || 0;
      monthlySummary[monthYear].receipt += obj.paid_amount || 0;

      let remaining =
        monthlySummary[monthYear].bill - monthlySummary[monthYear].receipt;
      monthlySummary[monthYear].market = remaining > 0 ? remaining : 0;
    }
  });

  // Convert numbers to comma-separated format
  return Object.values(monthlySummary)
    .map((entry) => ({
      month: entry.month,
      bill: entry.bill,
      receipt: entry.receipt,
      market: entry.market,
    }))
    .sort(
      (a, b) =>
        new Date(Date.parse("01 " + a.month)) -
        new Date(Date.parse("01 " + b.month))
    ); // Sorting correctly
}

export default function Stats({ statsData }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const monthlyData = aggregateMonthlyData(statsData);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  const handleMouseMove = (data) => {
    if (data.activeTooltipIndex !== undefined && data.activeLabel) {
      const activeData = monthlyData[data.activeTooltipIndex];
      setActiveTooltip(activeData);
    }
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  const maxYValue = Math.max(
    ...monthlyData.flatMap((d) => [d.bill, d.receipt, d.market])
  );

  return (
    <div className="min-h-screen">
      <main className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Analytic Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(value) => value.toLocaleString()}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    domain={[0, maxYValue]}
                    tickCount={10}
                  />
                  <Tooltip />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="square"
                    iconSize={10}
                  />
                  <Line
                    type="monotone"
                    dataKey="receipt"
                    name="Receipt"
                    stroke="#4285F4"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="bill"
                    name="Bill"
                    stroke="#EA4335"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="market"
                    name="Market"
                    stroke="#34A853"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xl mt-3 text-center">
              Record by Months [{" "}
              <span className="font-semibold text-purple-600">
                {monthlyData?.length}
              </span>{" "}
              ]
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
