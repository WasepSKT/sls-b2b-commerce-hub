import { useState, useEffect } from "react";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Star, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui";
import { Card, CardContent } from "@/components/ui";

interface Store {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  productCount: number;
  category: string;
}

const RecommendedStoresCarousel = () => {
  const { isDarkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const stores: Store[] = [
    {
      id: "1",
      name: "Toko Elektronik Maju",
      description: "Spesialis produk elektronik berkualitas dengan garansi resmi",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviewCount: 1247,
      location: "Jakarta Pusat",
      productCount: 1250,
      category: "Elektronik"
    },
    {
      id: "2",
      name: "Fashion Store Premium",
      description: "Koleksi fashion terbaru untuk pria dan wanita dengan kualitas terbaik",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      reviewCount: 892,
      location: "Bandung",
      productCount: 890,
      category: "Fashion"
    },
    {
      id: "3",
      name: "Toko Makanan Sehat",
      description: "Produk makanan dan minuman sehat dengan bahan berkualitas tinggi",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviewCount: 567,
      location: "Surabaya",
      productCount: 450,
      category: "Makanan"
    },
    {
      id: "4",
      name: "Home & Living Store",
      description: "Perlengkapan rumah tangga dan dekorasi dengan desain modern",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      reviewCount: 734,
      location: "Medan",
      productCount: 680,
      category: "Rumah Tangga"
    },
    {
      id: "5",
      name: "Kesehatan & Kecantikan",
      description: "Produk kesehatan dan kecantikan dengan sertifikasi BPOM",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
      reviewCount: 445,
      location: "Semarang",
      productCount: 320,
      category: "Kesehatan"
    },
    {
      id: "6",
      name: "Sport & Outdoor",
      description: "Peralatan olahraga dan outdoor dengan kualitas premium",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviewCount: 678,
      location: "Yogyakarta",
      productCount: 520,
      category: "Olahraga"
    }
  ];

  const itemsPerView = 4; // Number of stores visible at once
  const maxIndex = Math.max(0, stores.length - itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleStores = stores.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={cn(
            "text-2xl font-bold font-poppins",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            Toko Rekomendasi
          </h2>
          <p className={cn(
            "text-sm mt-1",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Toko-toko terpercaya dengan produk berkualitas
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={cn(
              "p-2 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
              isDarkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className={cn(
              "p-2 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
              isDarkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleStores.map((store) => (
          <Card
            key={store.id}
            className={cn(
              "overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer",
              isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
            )}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2 left-2">
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  isDarkMode ? "bg-gray-800/80 text-white" : "bg-white/80 text-gray-800"
                )}>
                  {store.category}
                </span>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className={cn(
                "font-semibold text-lg mb-2 font-poppins",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                {store.name}
              </h3>

              <p className={cn(
                "text-sm mb-3 line-clamp-2",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                {store.description}
              </p>

              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(store.rating)
                          ? "text-yellow-400 fill-current"
                          : isDarkMode ? "text-gray-600" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className={cn(
                  "text-sm ml-2",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  {store.rating} ({store.reviewCount})
                </span>
              </div>

              {/* Store Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <MapPin className={cn(
                    "h-4 w-4 mr-2",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )} />
                  <span className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    {store.location}
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <Package className={cn(
                    "h-4 w-4 mr-2",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )} />
                  <span className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    {store.productCount} produk
                  </span>
                </div>
              </div>

              {/* Visit Store Button */}
              <Button
                className="w-full mt-4"
                variant="outline"
                size="sm"
              >
                Kunjungi Toko
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedStoresCarousel; 