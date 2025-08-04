import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import { ShoppingBag, Users, BarChart, Shield, Truck, CreditCard, Globe, Headphones } from "lucide-react";

const Features = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: ShoppingBag,
      title: "Manajemen Produk",
      description: "Kelola katalog produk B2B Anda dengan mudah. Atur harga, stok, dan kategori produk secara efisien."
    },
    {
      icon: Users,
      title: "Jaringan Distribusi",
      description: "Bangun dan kelola jaringan distribusi yang luas. Hubungkan principal, agen, dan pelanggan B2B dalam satu platform."
    },
    {
      icon: BarChart,
      title: "Analisis Bisnis",
      description: "Dapatkan insight bisnis dengan analitik mendalam. Monitor performa penjualan dan pertumbuhan bisnis."
    },
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      description: "Transaksi aman dengan sistem keamanan yang terpercaya. Lindungi data bisnis Anda dengan enkripsi terkini."
    },
    {
      icon: Truck,
      title: "Manajemen Pengiriman",
      description: "Kelola pengiriman dengan mudah. Integrasi dengan berbagai jasa ekspedisi untuk pengiriman yang efisien."
    },
    {
      icon: CreditCard,
      title: "Pembayaran Fleksibel",
      description: "Berbagai metode pembayaran yang aman. Proses transaksi B2B dengan cepat dan terpercaya."
    },
    {
      icon: Globe,
      title: "Akses 24/7",
      description: "Akses platform kapan saja dan di mana saja. Kelola bisnis Anda dengan lebih fleksibel."
    },
    {
      icon: Headphones,
      title: "Dukungan Premium",
      description: "Dapatkan dukungan teknis profesional. Tim kami siap membantu Anda 24/7."
    }
  ];

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      <MainNav />

      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h1 className={cn(
                "text-4xl font-bold tracking-tight sm:text-6xl mb-6 font-poppins",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Fitur Unggulan untuk
                <span className="text-blue-500"> Bisnis B2B</span>
              </h1>
              <p className={cn(
                "text-lg sm:text-xl leading-8 max-w-2xl mx-auto",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Tingkatkan efisiensi bisnis B2B Anda dengan fitur-fitur canggih yang kami tawarkan
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-xl p-8 transition-colors duration-300",
                  isDarkMode ? "bg-gray-800" : "bg-white"
                )}
              >
                <div className={cn(
                  "rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4",
                  isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-500/10 text-blue-500"
                )}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className={cn(
                  "text-xl font-semibold mb-3 font-poppins",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  {feature.title}
                </h3>
                <p className={cn(
                  "text-base leading-7",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Features;
