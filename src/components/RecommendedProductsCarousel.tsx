import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui";
import { Card, CardContent, CardFooter } from "@/components/ui";
import { Badge } from "@/components/ui";
import ProductCard from "@/components/business/ProductCard";
import { getRecommendedProducts, getInventoryByProductId, getAverageRatingByProductId, getReviewCountByProductId, Product } from "@/lib/data/products";



const RecommendedProductsCarousel = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Get recommended products from the modular data system
  const products: Product[] = getRecommendedProducts('featured', 8);

  const itemsPerView = 4; // Number of products visible at once
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleViewProduct = (productId: string) => {
    // Scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/product/${productId}`);
  };

  const handleBuyProduct = (product: Product) => {
    // Scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });

    navigate('/register', {
      state: {
        message: "Silakan daftar atau login terlebih dahulu untuk melakukan pembelian",
        returnTo: `/product/${product.productId}`
      }
    });
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={cn(
            "text-2xl font-bold font-poppins",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            Produk Rekomendasi
          </h2>
          <p className={cn(
            "text-sm mt-1",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Produk-produk terbaik yang direkomendasikan untuk Anda
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            onAddToCart={() => handleBuyProduct(product)}
            renderRatingStars={(rating) => {
              return [...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : isDarkMode ? "text-gray-600" : "text-gray-300"
                  )}
                />
              ));
            }}
            onCardClick={() => handleViewProduct(product.productId)}
            hideDetailButton
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProductsCarousel; 