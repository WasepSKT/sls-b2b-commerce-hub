import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

const MainNav = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300",
      isDarkMode ? "bg-gray-900/95 border-gray-800" : "bg-white/95 border-gray-200"
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className={cn(
              "text-2xl font-bold font-poppins",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              SLS B2B
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  location.pathname === link.href
                    ? isDarkMode
                      ? "text-white"
                      : "text-gray-900"
                    : isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={cn(
                "rounded-full",
                isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className={cn(
                    "transition-colors duration-200",
                    isDarkMode
                      ? "text-gray-400 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  className={cn(
                    "bg-blue-500 text-white hover:bg-blue-600",
                    "transition-colors duration-200"
                  )}
                >
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainNav; 