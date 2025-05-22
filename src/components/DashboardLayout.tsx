import { ReactNode } from "react";
import { Search, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardSidebar from "./DashboardSidebar";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import CustomerNotificationsDropdown from "./CustomerNotificationsDropdown";
import AgentNotificationsDropdown from "./AgentNotificationsDropdown";
import PrincipalNotificationsDropdown from "./PrincipalNotificationsDropdown";
import UserProfileDropdown from "./UserProfileDropdown";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "principal" | "agent" | "customer";
  pageTitle: string;
  className?: string;
}

const DashboardLayout = ({
  children,
  role,
  pageTitle,
  className,
}: DashboardLayoutProps) => {
  const { isDarkMode, toggleTheme } = useTheme();

  // Render the appropriate notification dropdown based on user role
  const renderNotificationDropdown = () => {
    switch (role) {
      case "customer":
        return <CustomerNotificationsDropdown />;
      case "agent":
        return <AgentNotificationsDropdown />;
      case "principal":
        return <PrincipalNotificationsDropdown />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "min-h-screen",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      <DashboardSidebar role={role} />
      
      <div className="ml-16 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className={cn(
          "h-16 flex items-center px-4 md:px-6 border-b transition-colors duration-300",
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
                placeholder="Cari..."
                className={cn(
                  "pl-8 w-64",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500"
                )}
              />
            </div>
            
            {/* Show role-specific notification dropdown */}
            {renderNotificationDropdown()}
            
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
          
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile view notification dropdown */}
            {renderNotificationDropdown()}
            
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
        
        {/* Main content */}
        <main className={cn(
          "flex-1 p-4 md:p-6",
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        )}>{children}</main>
        
        {/* Footer */}
        <footer className={cn(
          "p-4 text-center border-t transition-colors duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <p className={cn(
            "text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            &copy; {new Date().getFullYear()} SLS-B2B Commerce Hub. Seluruh hak cipta dilindungi undang-undang.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
