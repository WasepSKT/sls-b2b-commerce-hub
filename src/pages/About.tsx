import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { Building2, Target, Users2, Trophy, ArrowRight } from "lucide-react";
import MainNav from "@/components/MainNav";

const About = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const stats = [
    { label: "Tahun Pengalaman", value: "10+" },
    { label: "UMKM Terdaftar", value: "1000+" },
    { label: "Transaksi Bulanan", value: "50rb+" },
    { label: "Kota di Indonesia", value: "100+" },
  ];

  const values = [
    {
      icon: Building2,
      title: "Inovasi Berkelanjutan",
      description: "Kami terus berinovasi untuk menghadirkan solusi terbaik bagi pertumbuhan UMKM Indonesia."
    },
    {
      icon: Target,
      title: "Fokus pada Pelanggan",
      description: "Kepuasan pelanggan adalah prioritas utama dalam setiap layanan yang kami berikan."
    },
    {
      icon: Users2,
      title: "Kolaborasi",
      description: "Kami percaya dalam membangun ekosistem yang saling mendukung antara semua pemangku kepentingan."
    },
    {
      icon: Trophy,
      title: "Keunggulan",
      description: "Berkomitmen untuk memberikan layanan berkualitas tinggi dan hasil yang optimal."
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
                Membangun Masa Depan
                <span className="text-blue-500"> UMKM Indonesia</span>
              </h1>
              <p className={cn(
                "text-lg sm:text-xl leading-8 max-w-2xl mx-auto",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                SLS B2B Commerce Hub hadir untuk mendukung pertumbuhan UMKM Indonesia
                melalui platform distribusi yang modern, efisien, dan terpercaya.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={cn(
                  "text-4xl font-bold font-poppins mb-2",
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                )}>
                  {stat.value}
                </div>
                <div className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className={cn(
          "py-24 transition-colors duration-300",
          isDarkMode ? "bg-gray-800" : "bg-white"
        )}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className={cn(
                "text-3xl font-bold tracking-tight sm:text-4xl font-poppins mb-4",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Nilai-Nilai Kami
              </h2>
              <p className={cn(
                "text-lg leading-8 max-w-2xl mx-auto",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Prinsip yang memandu kami dalam memberikan layanan terbaik
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div key={index} className={cn(
                  "rounded-xl p-8 transition-colors duration-300",
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                )}>
                  <div className={cn(
                    "rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4",
                    isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-500/10 text-blue-500"
                  )}>
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className={cn(
                    "text-xl font-semibold mb-2 font-poppins",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    {value.title}
                  </h3>
                  <p className={cn(
                    "text-sm leading-6",
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className={cn(
            "rounded-2xl px-8 py-16 text-center transition-colors duration-300",
            isDarkMode ? "bg-gray-800" : "bg-white"
          )}>
            <h2 className={cn(
              "text-3xl font-bold tracking-tight sm:text-4xl font-poppins mb-4",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Bergabung dengan Kami
            </h2>
            <p className={cn(
              "text-lg leading-8 mb-8 max-w-2xl mx-auto",
              isDarkMode ? "text-gray-300" : "text-gray-600"
            )}>
              Mari bersama membangun ekosistem B2B yang lebih baik untuk Indonesia
            </p>
            <Link to="/register">
              <Button className={cn(
                "text-lg px-8 py-6 transition-colors duration-300",
                "bg-blue-500 text-white hover:bg-blue-600"
              )}>
                Mulai Perjalanan Anda
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={cn(
        "border-t py-12 transition-colors duration-300",
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={cn(
            "text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-500"
          )}>
            © {new Date().getFullYear()} SLS B2B Commerce Hub. Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About; 