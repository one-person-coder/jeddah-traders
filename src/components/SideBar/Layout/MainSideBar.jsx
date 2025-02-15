"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ChevronRight,
  Settings,
  Users,
  User,
  ChartColumn,
  Box,
} from "lucide-react";
import TopNav from "./TopNavBar";
import AnchorLink from "@/components/utils/AnchorLink";

export default function Sidebar({ children, userType }) {
  let navigation;

  console.log(userType);

  if (userType === "customer") {
    navigation = [
      {
        title: "Dashboards",
        icon: LayoutDashboard,
        url: "/dashboard",
      },
      {
        title: "Settings",
        icon: Settings,
        url: "/dashboard/settings/profile",
      },
    ];
  } else if (userType === "admin" || userType === "manager") {
    navigation = [
      {
        title: "Dashboards",
        icon: LayoutDashboard,
        url: "/dashboard",
      },
      {
        title: "Stats",
        icon: ChartColumn,
        url: "/dashboard/stats",
      },
      {
        title: "Users",
        icon: User,
        url: "/dashboard/users",
      },
      {
        title: "Customers",
        icon: Users,
        url: "/dashboard/customers",
      },
      {
        title: "Products",
        icon: Box,
        url: "/dashboard/products",
      },
      {
        title: "Settings",
        icon: Settings,
        url: "/dashboard/settings/profile",
      },
    ];
  }
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Handle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleMenu = (menuTitle) => {
    setOpenMenus((current) =>
      current.includes(menuTitle)
        ? current.filter((title) => title !== menuTitle)
        : [...current, menuTitle]
    );
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const isMenuOpen = (menuTitle) => openMenus.includes(menuTitle);

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="transition-colors duration-200">
        <TopNav
          onMenuClick={toggleSidebar}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        {/* Sidebar Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed top-0 left-0 z-40 h-full
            bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
            transition-all duration-300 ease-in-out
            ${isCollapsed && !isMobile ? "w-20" : "w-64"}
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            md:mt-16
          `}
        >
          {/* Navigation */}
          <nav className="p-4 flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {navigation.map((item) => (
              <div key={item.title} className="relative group">
                {item.items ? (
                  <>
                    <button
                      onClick={() => toggleMenu(item.title)}
                      className={`
                        flex items-center w-full p-2 rounded-lg
                        text-gray-700 dark:text-gray-300
                        hover:bg-gray-100 dark:hover:bg-gray-800 
                        transition-all duration-200
                        ${
                          isMenuOpen(item.title)
                            ? "bg-gray-100 dark:bg-gray-800"
                            : ""
                        }
                      `}
                    >
                      <item.icon className="h-5 w-5" />
                      {(!isCollapsed || isMobile) && (
                        <>
                          <span className="ml-3 text-sm">{item.title}</span>
                          <ChevronRight
                            className={`
                              ml-auto h-4 w-4 transition-transform duration-200
                              ${isMenuOpen(item.title) ? "rotate-90" : ""}
                            `}
                          />
                        </>
                      )}
                    </button>
                    {/* Submenu */}
                    <div
                      className={`
                        overflow-hidden transition-all duration-200
                        ${
                          isMenuOpen(item.title) && (!isCollapsed || isMobile)
                            ? "max-h-[1000px] opacity-100"
                            : "max-h-0 opacity-0"
                        }
                      `}
                    >
                      <div className="pl-11 pr-2 py-1 space-y-1">
                        {item.items.map((subItem) => (
                          <a
                            key={subItem.title}
                            href={subItem.url}
                            className="
                              flex items-center justify-between p-2 rounded-lg
                              text-gray-700 dark:text-gray-300
                              hover:bg-gray-100 dark:hover:bg-gray-800
                              transition-colors duration-200
                              group
                            "
                          >
                            <div className="flex items-center">
                              {subItem.icon && (
                                <subItem.icon className="h-4 w-4 mr-3" />
                              )}
                              <span className="text-sm">{subItem.title}</span>
                            </div>
                            {subItem.badge && (
                              <span
                                className="
                                px-2 py-0.5 text-xs font-medium rounded-full
                                bg-purple-100 dark:bg-purple-900 
                                text-purple-600 dark:text-purple-300
                              "
                              >
                                {subItem.badge}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <AnchorLink
                    href={item.url}
                    classes="
                      flex items-center p-3 rounded-lg
                      text-gray-700 dark:text-gray-300
                      hover:bg-gray-200 dark:hover:bg-gray-800
                      transition-colors duration-200
                    "
                  >
                    <item.icon className="h-5 w-5" />
                    {(!isCollapsed || isMobile) && (
                      <span className="ml-3 text-sm">{item.title}</span>
                    )}
                  </AnchorLink>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`
            transition-all duration-300 ease-in-out
            ${isCollapsed && !isMobile ? "md:pl-20" : "md:pl-64"}
            pt-16
          `}
        >
          <div className="p-3">{children}</div>
        </main>
      </div>
    </div>
  );
}
