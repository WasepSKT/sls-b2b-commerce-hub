import { useState, useEffect } from "react";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui";

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
}

const PromotionalCarousel = () => {
  const { isDarkMode } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners: BannerSlide[] = [
    {
      id: 1,
      title: "Promo Spesial",
      subtitle: "Diskon Hingga 50%",
      description: "Dapatkan produk berkualitas dengan harga terbaik untuk semua kategori produk B2B",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ctaText: "Belanja Sekarang",
      ctaLink: "/register",
      bgColor: "bg-gradient-to-r from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Gratis Ongkir",
      subtitle: "Minimal Pembelian Rp 500.000",
      description: "Nikmati layanan pengiriman gratis untuk pembelian di atas Rp 500.000",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ctaText: "Lihat Syarat",
      ctaLink: "/about",
      bgColor: "bg-gradient-to-r from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Produk Terbaru",
      subtitle: "Koleksi 2024",
      description: "Temukan produk-produk terbaru dengan teknologi dan kualitas terdepan",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ctaText: "Jelajahi",
      ctaLink: "/",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-600"
    },
    {
      id: 4,
      title: "Mitra Bisnis",
      subtitle: "Bergabung Sekarang",
      description: "Jadilah bagian dari jaringan distribusi terbesar di Indonesia",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ctaText: "Daftar Mitra",
      ctaLink: "/register",
      bgColor: "bg-gradient-to-r from-indigo-500 to-blue-600"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative w-full mb-8 group">
      {/* Banner Container */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-xl">
        {/* Navigation Arrows - Inside Banner, Visible on Hover */}
        <button
          onClick={goToPrevious}
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100",
            isDarkMode
              ? "bg-gray-800/90 text-white hover:bg-gray-700/90 shadow-lg"
              : "bg-white/90 text-gray-800 hover:bg-white shadow-lg"
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={goToNext}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100",
            isDarkMode
              ? "bg-gray-800/90 text-white hover:bg-gray-700/90 shadow-lg"
              : "bg-white/90 text-gray-800 hover:bg-white shadow-lg"
          )}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slides */}
        <div className="relative w-full h-full">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={cn(
                "absolute inset-0 transition-all duration-700 ease-in-out",
                index === currentSlide ? "opacity-100" : "opacity-0"
              )}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center h-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Text Content */}
                    <div className="text-white space-y-6">
                      <div className="space-y-2">
                        <h2 className="text-4xl md:text-6xl font-bold font-poppins">
                          {banner.title}
                        </h2>
                        <h3 className="text-2xl md:text-4xl font-semibold text-yellow-300">
                          {banner.subtitle}
                        </h3>
                      </div>
                      <p className="text-lg md:text-xl text-gray-200 max-w-md">
                        {banner.description}
                      </p>
                      <Button
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                        onClick={() => window.location.href = banner.ctaLink}
                      >
                        {banner.ctaText}
                      </Button>
                    </div>

                    {/* Decorative Element */}
                    <div className="hidden lg:flex justify-center">
                      <div className={cn(
                        "w-64 h-64 rounded-full opacity-20",
                        banner.bgColor
                      )} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentSlide
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/75"
              )}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-300 ease-linear"
            style={{
              width: `${((currentSlide + 1) / banners.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionalCarousel; 