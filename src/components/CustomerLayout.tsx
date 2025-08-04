import { ReactNode } from "react";
import { Search, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import CustomerNotificationsDropdown from "./CustomerNotificationsDropdown";
import UserProfileDropdown from "./UserProfileDropdown";

interface CustomerLayoutProps {
  children: ReactNode;
  pageTitle: string;
  className?: string;
}

const CustomerLayout = ({
  children,
  pageTitle,
  className,
}: CustomerLayoutProps) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={cn(
      "min-h-screen",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className={cn(
          "h-16 flex items-center px-4 md:px-6 border-b transition-colors duration-300 sticky top-0 z-50",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <div className="flex-1">
            <h1 className={cn(
              "text-2xl font-semibold tracking-tight transition-colors duration-300",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>
              {pageTitle}
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className={cn(
                "absolute left-2.5 top-2.5 h-4 w-4",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )} />
              <Input
                type="search"
                placeholder="Cari produk..."
                className={cn(
                  "pl-8 w-64",
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500"
                )}
              />
            </div>

            {/* Customer Notifications */}
            <CustomerNotificationsDropdown />

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={cn(
                isDarkMode
                  ? "text-yellow-300 hover:text-yellow-200 hover:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <UserProfileDropdown />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={cn(
                isDarkMode
                  ? "text-yellow-300 hover:text-yellow-200 hover:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <UserProfileDropdown />
          </div>
        </header>

        {/* Main Content */}
        <main className={cn(
          "flex-1 p-4 md:p-6",
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout; 