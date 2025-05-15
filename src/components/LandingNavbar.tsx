
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Fitur", path: "/features" },
    { name: "Harga", path: "/pricing" },
    { name: "FAQ", path: "/faq" },
    { name: "Kontak", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">SLS-B2B</span>
              <span className="ml-2 text-sm font-medium text-gray-600">Commerce Hub</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
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
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/login">
              <Button variant="outline" className="mr-2">
                Masuk
              </Button>
            </Link>
            <Link to="/register">
              <Button>Daftar</Button>
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Masuk
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full">Daftar</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
