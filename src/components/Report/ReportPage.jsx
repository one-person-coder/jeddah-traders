"use client";
import React, { useState, useEffect } from "react";

function calculateDaysAgo(selectedDate) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Normalize today to UTC midnight

  const inputDate = new Date(selectedDate);
  inputDate.setUTCHours(0, 0, 0, 0); // Normalize selectedDate to UTC

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

// ✅ Function to format date as "3-Mar-2025, Monday"
function formatCurrentUTCDate() {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0); // Ensure consistency

  const day = now.getUTCDate();
  const month = now.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }); // "Mar"
  const year = now.getUTCFullYear();
  const weekday = now.toLocaleString("en-GB", { weekday: "long", timeZone: "UTC" }); // "Monday"

  return `${day}-${month}-${year}, ${weekday}`;
}

const ReportPage = () => {
  const [statsHeading, setStatsHeading] = useState("Loading Stats...");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formattedUTCDate = formatCurrentUTCDate();
    setFormattedDate(formattedUTCDate);
    
    const isoDate = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    const daysAgo = calculateDaysAgo(isoDate);
    setStatsHeading(getStatsHeading(daysAgo));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">
        {statsHeading} [
        <span className="font-semibold text-blue-700">{formattedDate}</span>]
      </h2>
    </div>
  );
};

export default ReportPage;
