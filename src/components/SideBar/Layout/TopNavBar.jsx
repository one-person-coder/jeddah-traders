import { Menu } from "lucide-react";
import Link from "next/link";

export default function TopNav({ onMenuClick }) {
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
        <Link
          href={"/dashboard/settings/profile"}
          className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
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
        </Link>
      </div>
    </header>
  );
}
