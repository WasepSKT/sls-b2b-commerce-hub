import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui";
import { Card, CardContent, CardFooter } from "@/components/ui";
import { Badge } from "@/components/ui";
import { getRecommendedProducts, getInventoryByProductId, getAverageRatingByProductId, getReviewCountByProductId } from "@/lib/data/products";

interface RecommendedProduct {
  productId: string;
  productName: string;
  description: string;
  imageUrls: string[];
  basePrice: number;
  category: string;
  recommendationType?: string;
  priority?: number;
  algorithm?: string;
}

const RecommendedProductsCarousel = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Get recommended products from the modular data system
  const products: RecommendedProduct[] = getRecommendedProducts('featured', 8);

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

  const handleBuyProduct = (product: RecommendedProduct) => {
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
        {visibleProducts.map((product) => {
          const isWishlisted = wishlist.includes(product.productId);
          const inventory = getInventoryByProductId(product.productId);
          const stock = inventory?.quantityOnHand || 0;
          const averageRating = getAverageRatingByProductId(product.productId);
          const reviewCount = getReviewCountByProductId(product.productId);

          return (
            <Card
              key={product.productId}
              className={cn(
                "overflow-hidden transition-all duration-300 hover:shadow-lg",
                isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
              )}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.imageUrls[0]}
                  alt={product.productName}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* Wishlist Button */}
                <button
                  onClick={() => handleToggleWishlist(product.productId)}
                  className={cn(
                    "absolute top-2 right-2 p-2 rounded-full transition-all duration-300",
                    isDarkMode ? "bg-gray-800/80 hover:bg-gray-700/80" : "bg-white/80 hover:bg-gray-100/80"
                  )}
                >
                  <Heart className={cn(
                    "h-4 w-4",
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                  )} />
                </button>

                {/* Stock Status */}
                <div className="absolute bottom-2 left-2">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    stock > 10
                      ? isDarkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"
                      : stock > 0
                        ? isDarkMode ? "bg-yellow-900 text-yellow-300" : "bg-yellow-100 text-yellow-800"
                        : isDarkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-800"
                  )}>
                    {stock > 10 ? "Tersedia" : stock > 0 ? "Terbatas" : "Habis"}
                  </span>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>

                <h3 className={cn(
                  "font-semibold text-lg mb-2 font-poppins line-clamp-2",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  {product.productName}
                </h3>

                <p className={cn(
                  "text-sm mb-3 line-clamp-2",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(averageRating)
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
                    {averageRating.toFixed(1)} ({reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className={cn(
                      "text-lg font-bold",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      Rp {product.basePrice.toLocaleString()}
                    </p>
                  </div>
                  <p className={cn(
                    "text-xs",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    Stok: {stock}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewProduct(product.productId)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Detail
                  </Button>
                  <Button
                    size="sm"
                    disabled={stock === 0}
                    onClick={() => handleBuyProduct(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Beli
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedProductsCarousel; 