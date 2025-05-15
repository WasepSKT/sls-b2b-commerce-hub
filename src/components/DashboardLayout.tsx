
import { ReactNode } from "react";
import { Bell, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "principal" | "agent" | "customer";
  pageTitle: string;
}

const DashboardLayout = ({ children, role, pageTitle }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar role={role} />
      
      <div className="ml-16 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{pageTitle}</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari..."
                className="pl-8 w-64 bg-gray-50"
              />
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex md:hidden items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-600">
            &copy; 2025 SLS-B2B Commerce Hub. Seluruh hak cipta dilindungi undang-undang.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
