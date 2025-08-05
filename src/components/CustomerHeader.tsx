import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

const CustomerHeader = () => {
  const { isDarkMode } = useTheme();

  return (
    <header
      className={cn(
        "h-16 flex items-center px-4 md:px-6 border-b transition-colors duration-300 sticky top-0 z-50",
        isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <Link to="/dashboard/customer" className="text-lg font-bold">
          <span className={cn(isDarkMode ? "text-white" : "text-gray-900")}>
            Customer Dashboard
          </span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/dashboard/customer/catalog"
                className={cn(
                  "text-sm font-medium",
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                )}
              >
                Catalog
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/customer/cart"
                className={cn(
                  "text-sm font-medium",
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                )}
              >
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default CustomerHeader;
