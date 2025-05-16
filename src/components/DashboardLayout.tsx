import { ReactNode } from "react";
import { Bell, Search, User, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardSidebar from "./DashboardSidebar";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";

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
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "relative",
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className={cn(
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex md:hidden items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className={cn(
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              <User className="h-5 w-5" />
            </Button>
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
