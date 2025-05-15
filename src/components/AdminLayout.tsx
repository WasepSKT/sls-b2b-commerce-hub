import { ReactNode, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Settings,
  Users,
  LogOut,
  Bell,
  Search,
  Database,
  Shield,
  Globe,
  Newspaper,
  MessageSquare,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/store/auth";
import { useTheme } from "@/lib/store/theme";
import { useToast } from "@/components/ui/use-toast";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const adminLinks = [
    { name: "Dashboard", href: "/admin", icon: BarChart },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
    { name: "Database", href: "/admin/database", icon: Database },
    { name: "Security", href: "/admin/security", icon: Shield },
    { name: "Website", href: "/admin/website", icon: Globe },
    { name: "News", href: "/admin/news", icon: Newspaper },
    { name: "WhatsApp", href: "/admin/whatsapp", icon: MessageSquare },
    { name: "Notifications", href: "/admin/notifications", icon: Bell },
  ];

  // Get current page title from adminLinks
  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    const currentLink = adminLinks.find(link => 
      currentPath === link.href || currentPath.startsWith(`${link.href}/`)
    );
    return currentLink?.name || "Admin Panel";
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "Thank you for using SLS B2B Commerce Hub.",
    });
    navigate("/");
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 border-r transition-colors duration-300",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className={cn(
          "flex h-16 items-center border-b px-6 transition-colors duration-300",
          isDarkMode ? "border-gray-700" : "border-gray-200"
        )}>
          <Link to="/admin" className={cn(
            "text-xl font-bold font-poppins transition-colors duration-300",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            SLS B2B Admin
          </Link>
        </div>
        <nav className="flex flex-col h-[calc(100vh-4rem)] justify-between p-4">
          <div className="space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300",
                  location.pathname === link.href
                    ? isDarkMode 
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-primary"
                    : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className={cn(
              "w-full justify-start space-x-3 transition-colors duration-300",
              isDarkMode
                ? "bg-red-900 hover:bg-red-800 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            )}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className={cn(
          "sticky top-0 z-30 flex h-16 items-center border-b px-6 transition-colors duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <div className="flex flex-1 items-center justify-between">
            <h1 className={cn(
              "text-2xl font-semibold font-poppins transition-colors duration-300",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>{getCurrentPageTitle()}</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className={cn(
                  "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )} />
                <Input
                  type="search"
                  placeholder="Search..."
                  className={cn(
                    "pl-10 w-64 transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                )}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <NotificationsDropdown className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={cn(
          "p-6 transition-colors duration-300",
          isDarkMode ? "text-gray-100" : "text-gray-900"
        )}>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout; 