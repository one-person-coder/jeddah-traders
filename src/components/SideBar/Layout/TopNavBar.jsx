"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Sun,
  Moon,
  Menu,
} from "lucide-react";

export default function TopNav({ onMenuClick, isDarkMode, toggleDarkMode }) {
  const [notifications] = useState([
    { id: 1, text: "New message received", time: "5m ago" },
    { id: 2, text: "Your report is ready", time: "1h ago" },
    { id: 3, text: "Meeting in 30 minutes", time: "2h ago" },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showNotifications &&
        !event.target.closest(".notifications-container")
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showNotifications]);

  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-4 flex items-center gap-4 z-30 justify-between">
      {/* Left section */}
      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Toggle Menu"
      >
        <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>


      {/* Right section */}
      <div className="flex items-center gap-2">

        <div className="relative notifications-container">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Notifications
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      {notification.text}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {notification.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <img
            src={"/1.png"}
            alt="Profile"
            className="w-8 h-8 rounded-full ring-2 ring-purple-500"
          />
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              John Doe
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
          </div>
        </button>
      </div>
    </header>
  );
}
