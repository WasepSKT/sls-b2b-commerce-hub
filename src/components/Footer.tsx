import { Link } from "react-router-dom";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Truck,
  CreditCard,
  Headphones,
  Heart
} from "lucide-react";

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "border-t transition-colors duration-300",
      isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
    )}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                SLS-B2B Store
              </h3>
              <p className={cn(
                "text-sm mt-2",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Platform e-commerce terdepan untuk bisnis B2B dengan solusi lengkap dari hulu hingga hilir.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className={cn("h-4 w-4", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                  +62 21 1234 5678
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className={cn("h-4 w-4", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                  info@slsb2b.com
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className={cn("h-4 w-4 mt-0.5", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                  Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 12345
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className={cn(
                  "p-2 rounded-full transition-colors duration-300",
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className={cn(
                  "p-2 rounded-full transition-colors duration-300",
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className={cn(
                  "p-2 rounded-full transition-colors duration-300",
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className={cn(
                  "p-2 rounded-full transition-colors duration-300",
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className={cn(
                  "p-2 rounded-full transition-colors duration-300",
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className={cn(
              "text-lg font-semibold",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Fitur
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Harga
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Kontak
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className={cn(
              "text-lg font-semibold",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Kategori Produk
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/?category=elektronik"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Elektronik
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=fashion"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=makanan"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Makanan & Minuman
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=kesehatan"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Kesehatan
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=rumah-tangga"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Rumah Tangga
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=olahraga"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Olahraga
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className={cn(
              "text-lg font-semibold",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Layanan Pelanggan
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Informasi Pengiriman
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Kebijakan Pengembalian
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={cn(
        "border-t transition-colors duration-300",
        isDarkMode ? "border-gray-800" : "border-gray-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Truck className={cn("h-6 w-6", isDarkMode ? "text-blue-400" : "text-blue-600")} />
              <div>
                <h5 className={cn(
                  "font-semibold text-sm",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Pengiriman Cepat
                </h5>
                <p className={cn(
                  "text-xs",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Gratis ongkir untuk order di atas Rp 500.000
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Shield className={cn("h-6 w-6", isDarkMode ? "text-green-400" : "text-green-600")} />
              <div>
                <h5 className={cn(
                  "font-semibold text-sm",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Garansi 100%
                </h5>
                <p className={cn(
                  "text-xs",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Produk original dengan garansi resmi
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <CreditCard className={cn("h-6 w-6", isDarkMode ? "text-purple-400" : "text-purple-600")} />
              <div>
                <h5 className={cn(
                  "font-semibold text-sm",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Pembayaran Aman
                </h5>
                <p className={cn(
                  "text-xs",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Berbagai metode pembayaran tersedia
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Headphones className={cn("h-6 w-6", isDarkMode ? "text-orange-400" : "text-orange-600")} />
              <div>
                <h5 className={cn(
                  "font-semibold text-sm",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Layanan 24/7
                </h5>
                <p className={cn(
                  "text-xs",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Customer service siap membantu Anda
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={cn(
        "border-t transition-colors duration-300",
        isDarkMode ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-gray-50"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                © {currentYear} SLS-B2B Store. Made with
              </span>
              <Heart className={cn("h-4 w-4", isDarkMode ? "text-red-400" : "text-red-500")} />
              <span className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                in Indonesia
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className={cn("h-4 w-4", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                <span className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Senin - Jumat: 08:00 - 17:00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 