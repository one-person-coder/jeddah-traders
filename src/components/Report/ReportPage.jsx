"use client";
import React, { useState, useEffect } from "react";

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

const ReportPage = () => {
  const [statsHeading, setStatsHeading] = useState("Loading Stats...");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // ✅ Get correctly formatted **local** date
    const formattedDate = getCurrentFormattedDate();
    setFormattedDate(formattedDate);

    // ✅ Use local time instead of UTC
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
