"use client";
import React, { useState } from "react";

function calculateDaysAgo(selectedDate) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Normalize today to UTC midnight

  // Parse selectedDate correctly as UTC
  const inputDate = new Date(selectedDate + "T00:00:00.000Z"); // Force UTC

  console.log("Today (UTC):", today.toISOString());
  console.log("Selected Date (UTC):", inputDate.toISOString());

  const diffTime = today.getTime() - inputDate.getTime();
  const daysAgo = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Use Math.floor

  console.log("Days Ago:", daysAgo);
  return daysAgo;
}

function getStatsHeading(daysAgo) {
  if (daysAgo === 0) return `Today Stats`;
  if (daysAgo === 1) return `Yesterday Stats`;
  if (daysAgo < 7) return `Last ${daysAgo} Days Stats`;
  if (daysAgo < 30) return `Last Week Stats`;
  if (daysAgo < 90) return `Last ${Math.floor(daysAgo / 30)} Months Stats`;
  return `Yearly Stats`;
}

function getStatsHeadingFromDate(selectedDate) {
  const daysAgo = calculateDaysAgo(selectedDate);
  return getStatsHeading(daysAgo);
}

function convertToISODate(formattedDate) {
  const datePart = formattedDate.split(",")[0]; // "3-Mar-2025"
  const [day, month, year] = datePart.split("-");

  const months = {
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

  // Ensure day is properly formatted
  const formattedDay = String(day).padStart(2, "0");

  const isoDate = `${year}-${months[month]}-${formattedDay}`;
  console.log("Converted ISO Date:", isoDate);

  return isoDate;
}

const ReportPage = ({ formattedDate }) => {
  const [formatDate, setFormatDate] = useState(formattedDate);

  const [statsHeading, setStatsHeading] = useState(() => {
    return getStatsHeadingFromDate(convertToISODate(formatDate));
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">
        {statsHeading} [
        <span className="font-semibold text-blue-700"> {formatDate} </span>]
      </h2>
    </div>
  );
};

export default ReportPage;
