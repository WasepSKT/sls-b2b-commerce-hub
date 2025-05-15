import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { path: "/features", label: "Fitur" },
    { path: "/pricing", label: "Harga" },
    { path: "/about", label: "Tentang Kami" },
    { path: "/contact", label: "Kontak" },
  ];

  return (
    <nav className={cn(
      "fixed w-full z-50 border-b transition-colors duration-300",
      isDarkMode ? "bg-gray-900/95 border-gray-800 backdrop-blur-sm" : "bg-white/95 border-gray-200 backdrop-blur-sm"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className={cn(
              "text-2xl font-bold font-poppins transition-colors duration-300",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              SLS B2B
            </Link>
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    location.pathname === link.path
                      ? isDarkMode
                        ? "text-white"
                        : "text-gray-900"
                      : isDarkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
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
            <Link to="/login">
              <Button variant="outline" className={cn(
                "transition-colors duration-300",
                isDarkMode 
                  ? "border-gray-700 text-gray-300 hover:text-white hover:border-gray-600"
                  : "border-gray-200 text-gray-600 hover:text-gray-900"
              )}>
                Masuk
              </Button>
            </Link>
            <Link to="/register">
              <Button className={cn(
                "transition-colors duration-300",
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              )}>
                Daftar
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300",
                isDarkMode 
                  ? "text-gray-300 hover:text-white hover:bg-gray-800"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              )}
              aria-expanded="false"
            >
              <span className="sr-only">Buka menu utama</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className={cn(
          "md:hidden border-t transition-colors duration-300",
          isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
        )}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300",
                  location.pathname === link.path
                    ? isDarkMode
                      ? "text-white bg-gray-800"
                      : "text-gray-900 bg-gray-100"
                    : isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 px-3 space-y-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className={cn(
                  "w-full transition-colors duration-300",
                  isDarkMode 
                    ? "border-gray-700 text-gray-300 hover:text-white hover:border-gray-600"
                    : "border-gray-200 text-gray-600 hover:text-gray-900"
                )}>
                  Masuk
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className={cn(
                  "w-full transition-colors duration-300",
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                )}>
                  Daftar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
