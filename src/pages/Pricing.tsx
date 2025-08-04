import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

const Pricing = () => {
  const { isDarkMode } = useTheme();

  const plans = [
    {
      name: "Starter",
      price: "Rp 499.000",
      description: "Sempurna untuk UMKM yang baru memulai.",
      features: [
        "Hingga 100 produk",
        "5 akun agen",
        "Manajemen stok dasar",
        "Laporan penjualan standar",
        "Dukungan email",
        "Integrasi WhatsApp",
      ],
    },
    {
      name: "Business",
      price: "Rp 999.000",
      description: "Untuk bisnis yang berkembang.",
      features: [
        "Produk tidak terbatas",
        "25 akun agen",
        "Manajemen stok lanjutan",
        "Analitik bisnis lengkap",
        "Dukungan prioritas",
        "API akses",
        "Sistem reward poin",
        "Multi payment gateway",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Solusi kustom untuk bisnis besar.",
      features: [
        "Semua fitur Business",
        "Akun agen tidak terbatas",
        "Integrasi sistem kustom",
        "Account manager dedikasi",
        "SLA premium",
        "Training on-site",
        "Backup data otomatis",
        "Keamanan tingkat enterprise",
      ],
    },
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
                Pilih Paket yang Sesuai untuk
                <span className="text-blue-500"> Bisnis Anda</span>
              </h1>
              <p className={cn(
                "text-lg sm:text-xl leading-8 max-w-2xl mx-auto",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Kami menawarkan berbagai paket yang dapat disesuaikan dengan kebutuhan dan skala bisnis Anda
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "rounded-xl p-8 transition-all duration-300 relative",
                  isDarkMode
                    ? plan.popular
                      ? "bg-blue-600 ring-2 ring-blue-500"
                      : "bg-gray-800"
                    : plan.popular
                      ? "bg-blue-500 ring-2 ring-blue-400"
                      : "bg-white",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className={cn(
                      "px-4 py-1 rounded-full text-sm font-medium",
                      isDarkMode
                        ? "bg-blue-400 text-blue-950"
                        : "bg-blue-100 text-blue-600"
                    )}>
                      Paling Populer
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={cn(
                    "text-2xl font-bold mb-2 font-poppins",
                    isDarkMode
                      ? plan.popular ? "text-white" : "text-white"
                      : plan.popular ? "text-white" : "text-gray-900"
                  )}>
                    {plan.name}
                  </h3>
                  <p className={cn(
                    "text-sm mb-4",
                    isDarkMode
                      ? plan.popular ? "text-blue-100" : "text-gray-400"
                      : plan.popular ? "text-blue-50" : "text-gray-600"
                  )}>
                    {plan.description}
                  </p>
                  <div className={cn(
                    "text-3xl font-bold font-poppins",
                    isDarkMode
                      ? plan.popular ? "text-white" : "text-white"
                      : plan.popular ? "text-white" : "text-gray-900"
                  )}>
                    {plan.price}
                    {plan.price !== "Custom" && (
                      <span className={cn(
                        "text-base font-normal ml-1",
                        isDarkMode
                          ? plan.popular ? "text-blue-100" : "text-gray-400"
                          : plan.popular ? "text-blue-50" : "text-gray-600"
                      )}>
                        /bulan
                      </span>
                    )}
                  </div>
                </div>

                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className={cn(
                        "h-5 w-5 mr-3 flex-shrink-0",
                        isDarkMode
                          ? plan.popular ? "text-blue-200" : "text-blue-400"
                          : plan.popular ? "text-blue-100" : "text-blue-500"
                      )} />
                      <span className={cn(
                        "text-sm",
                        isDarkMode
                          ? plan.popular ? "text-blue-100" : "text-gray-300"
                          : plan.popular ? "text-blue-50" : "text-gray-600"
                      )}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/register">
                  <Button className={cn(
                    "w-full py-6 text-lg transition-colors duration-300",
                    isDarkMode
                      ? plan.popular
                        ? "bg-white text-blue-600 hover:bg-blue-50"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                      : plan.popular
                        ? "bg-white text-blue-600 hover:bg-blue-50"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                  )}>
                    Mulai Sekarang
                  </Button>
                </Link>
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

export default Pricing;
