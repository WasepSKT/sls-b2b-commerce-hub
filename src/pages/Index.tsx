import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { ShoppingBag, Users, BarChart, Shield, ArrowRight } from "lucide-react";
import MainNav from "@/components/MainNav";

const Index = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: ShoppingBag,
      title: "Manajemen Produk",
      description: "Kelola katalog produk B2B Anda dengan mudah dan efisien"
    },
    {
      icon: Users,
      title: "Jaringan Distribusi",
      description: "Bangun dan kelola jaringan distribusi yang luas dan terstruktur"
    },
    {
      icon: BarChart,
      title: "Analisis Bisnis",
      description: "Pantau performa bisnis dengan analitik yang mendalam"
    },
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      description: "Transaksi aman dengan sistem keamanan yang terpercaya"
    }
  ];

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDarkMode ? "bg-gray-900" : "bg-white"
    )}>
      <MainNav />

      {/* Hero Section */}
      <main className="pt-16">
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
              <h1 className={cn(
                "text-4xl font-bold tracking-tight sm:text-6xl font-poppins",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Platform B2B Commerce untuk
                <span className="text-blue-500"> Bisnis Modern</span>
              </h1>
              <p className={cn(
                "mt-6 text-lg leading-8 font-inter max-w-2xl mx-auto",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Optimalkan distribusi produk UMKM Anda dengan platform B2B yang terintegrasi.
                Hubungkan supplier, kelola inventori, dan kembangkan bisnis Anda.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/register">
                  <Button className={cn(
                    "text-lg px-8 py-6 transition-colors duration-300",
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  )}>
                    Mulai Sekarang
                  </Button>
                </Link>
                <Link to="/contact" className={cn(
                  "text-lg font-semibold leading-6 transition-colors duration-300",
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                )}>
                  Hubungi Sales <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={cn(
          "py-24 transition-colors duration-300",
          isDarkMode ? "bg-gray-800" : "bg-gray-50"
        )}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className={cn(
                "text-3xl font-bold tracking-tight sm:text-4xl font-poppins mb-4",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Fitur Unggulan
              </h2>
              <p className={cn(
                "text-lg leading-8",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Semua yang Anda butuhkan untuk mengelola bisnis B2B dalam satu platform
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className={cn(
                  "rounded-xl p-8 transition-colors duration-300",
                  isDarkMode ? "bg-gray-700" : "bg-white"
                )}>
                  <div className={cn(
                    "rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4",
                    isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-500/10 text-blue-500"
                  )}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className={cn(
                    "text-xl font-semibold mb-2 font-poppins",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    {feature.title}
                  </h3>
                  <p className={cn(
                    "text-sm leading-6",
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className={cn(
            "rounded-2xl px-8 py-16 transition-colors duration-300",
            isDarkMode ? "bg-gray-800" : "bg-gray-50"
          )}>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className={cn(
                "text-3xl font-bold tracking-tight sm:text-4xl font-poppins mb-4",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Bergabung Sekarang
              </h2>
              <p className={cn(
                "text-lg leading-8 mb-8",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Mulai perjalanan bisnis B2B Anda bersama kami
              </p>
              <Link to="/register">
                <Button className={cn(
                  "text-lg px-8 py-6 transition-colors duration-300",
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                )}>
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={cn(
        "border-t py-12 transition-colors duration-300",
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      )}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className={cn(
                "text-lg font-semibold font-poppins",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Tentang
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  )}>
                    Perusahaan
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  )}>
                    Karir
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className={cn(
                "text-lg font-semibold font-poppins",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Produk
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/features" className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  )}>
                    Fitur
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  )}>
                    Harga
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className={cn(
                "text-lg font-semibold font-poppins",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Dukungan
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  )}>
                    Pusat Bantuan
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  )}>
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className={cn(
                "text-lg font-semibold font-poppins",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  )}>
                    Privasi
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className={cn(
                    "text-sm transition-colors duration-300",
                    isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  )}>
                    Syarat & Ketentuan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center">
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}>
              © {new Date().getFullYear()} SLS B2B Commerce Hub. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
