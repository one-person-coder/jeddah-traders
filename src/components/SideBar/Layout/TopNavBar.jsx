"use client";
import { ErrorToast } from "@/components/utils/CustomToasts";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopNav({ onMenuClick }) {
  const [userData, setUserData] = useState({
    fullname: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/users/data");
      const data = await response.json();
      if (!data.success) {
        ErrorToast(data.message);
        return;
      }
      setUserData(data.user);
    };
    fetchUserData();
  }, []);
  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-4 flex items-center gap-4 z-30 justify-between">
      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Toggle Menu"
      >
        <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>

      <div className="flex items-center gap-2">
        <Link
          href={"/dashboard/settings/profile"}
          className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <img
            src={"/1.png"}
            alt="Profile"
            className="w-8 h-8 rounded-full ring-2 ring-purple-500"
          />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {userData.fullname}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {userData.role}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
