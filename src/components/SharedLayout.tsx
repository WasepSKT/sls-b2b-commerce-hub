import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Moon, Sun, Menu, X } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import GenericSidebar from "./GenericSidebar";
import UserProfileDropdown from "./UserProfileDropdown";
import { menuConfig, getRoleName } from "@/lib/config/menu";

interface SharedLayoutProps {
  role: string;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ role }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to derive page title from current path
  const getPageTitle = () => {
    const path = location.pathname;
    const pathSegments = path.split('/');
    const currentPage = pathSegments[pathSegments.length - 1];

    const pageTitles: { [key: string]: string } = {
      dashboard: `Dashboard ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      profile: "Profil",
      catalog: "Katalog Produk",
      cart: "Keranjang Belanja",
      checkout: "Checkout",
      "order-tracking": "Lacak Pesanan",
      "order-history": "Riwayat Pesanan",
      "sales-dashboard": "Dasbor Penjualan",
      "commission-report": "Laporan Komisi",
      "agent-directory": "Direktori Agent",
      "shopping": "Belanja",
      settings: "Pengaturan",
      products: "Produk",
      agents: "Agen",
      customers: "Pelanggan",
      orders: "Pesanan",
      reports: "Laporan",
      inventory: "Inventaris",
      commissions: "Komisi",
      payments: "Pembayaran",
      rewards: "Rewards",
    };

    return pageTitles[currentPage] || role.charAt(0).toUpperCase() + role.slice(1);
  };

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set hasScrolled to true when user starts scrolling
      if (currentScrollY > 0) {
        setHasScrolled(true);
      }

      // Show title when scrolling down, hide when scrolling up
      if (currentScrollY > lastScrollY) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={cn(
      "min-h-screen",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <GenericSidebar
          role={role}
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
        />
      </div>

      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-300",
        sidebarCollapsed ? "md:ml-16" : "md:ml-64"
      )}>
        {/* Header */}
        <header className={cn(
          "h-16 flex items-center px-4 md:px-6 py-3 border-b transition-all duration-300 sticky top-0 z-10 backdrop-blur-sm",
          isDarkMode ? "bg-gray-800/95 border-gray-700" : "bg-white/95 border-gray-200"
        )}>
          <div className="flex-1">
            <h1 className={cn(
              "text-lg sm:text-xl md:text-2xl font-semibold tracking-tight leading-none transition-all duration-300",
              isDarkMode ? "text-gray-50" : "text-slate-900",
              hasScrolled && isScrollingUp
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform -translate-y-2"
            )}>
              {getPageTitle()}
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                isDarkMode
                  ? "text-gray-300 hover:text-gray-200 hover:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Menu className="h-5 w-5" />
            </Button>

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
        )}>
          <Outlet />
        </main>

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

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div className={cn(
            "absolute top-0 left-0 h-full w-80 max-w-[80vw] transform transition-transform duration-300 flex flex-col",
            isDarkMode ? "bg-gray-800 border-r border-gray-700" : "bg-white border-r border-gray-200",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            {/* Header - Fixed */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className={cn(
                  "text-lg font-semibold",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Menu
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                <div className={cn(
                  "p-3 rounded-lg transition-colors",
                  isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                )}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {role.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{getRoleName(role)}</p>
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        Dashboard
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                  {menuConfig[role]?.map((item, index) => (
                    <div key={index}>
                      {item.divider && (
                        <div className={cn(
                          "px-3 py-2 text-xs font-medium uppercase tracking-wider",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>
                          {item.name}
                        </div>
                      )}
                      {!item.divider && (
                        <a
                          href={item.href}
                          className={cn(
                            "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                            isDarkMode
                              ? "text-gray-300 hover:text-white hover:bg-gray-700"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </a>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedLayout; 