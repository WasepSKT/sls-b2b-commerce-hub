import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { Star, CheckCircle } from "lucide-react";
import { Product, Review } from "@/lib/data/products";
import { PRODUCT_TABS, SHIPPING_INFO, GUARANTEE_INFO } from "@/constants/productDetail";

interface ProductTabsProps {
  product: Product;
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
  onWriteReview: () => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  product,
  reviews,
  averageRating,
  reviewCount,
  onWriteReview
}) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("description");

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5"
    };

    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          sizeClasses[size],
          i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <div className="mt-16">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={cn(
          "grid w-full grid-cols-4",
          isDarkMode ? "bg-gray-800" : "bg-white"
        )}>
          {PRODUCT_TABS.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.id === "reviews" ? `${tab.label} (${reviewCount})` : tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Description Tab */}
        <TabsContent value="description" className="mt-8">
          <div className="space-y-6">
            <div>
              <h3 className={cn(
                "text-xl font-semibold mb-4",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Deskripsi Produk
              </h3>
              <p className={cn(
                "text-base leading-relaxed",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                {product.description}
              </p>
            </div>

            {product.features && product.features.length > 0 && (
              <div>
                <h4 className={cn(
                  "text-lg font-semibold mb-3",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Fitur Utama
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      )}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Specifications Tab */}
        <TabsContent value="specifications" className="mt-8">
          {product.specifications && product.specifications.length > 0 ? (
            <div className="space-y-6">
              <h3 className={cn(
                "text-xl font-semibold mb-4",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Spesifikasi Teknis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className={cn(
                    "flex justify-between py-3 border-b",
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  )}>
                    <span className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      {spec.label}
                    </span>
                    <span className={cn(
                      "text-sm",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className={cn(
                "text-gray-500",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                Spesifikasi produk belum tersedia
              </p>
            </div>
          )}
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className={cn(
                "text-xl font-semibold",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Ulasan Pembeli
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={onWriteReview}
              >
                Tulis Ulasan
              </Button>
            </div>

            {/* Rating Summary */}
            <div className={cn(
              "p-6 rounded-xl",
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            )}>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">{averageRating.toFixed(1)}</div>
                <div className="flex items-center justify-center mt-2">
                  {renderStars(averageRating, "lg")}
                </div>
                <div className={cn(
                  "text-sm mt-1",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  {reviewCount} ulasan
                </div>
              </div>
            </div>

            {/* Reviews List */}
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.reviewId} className={cn(
                    "p-6 rounded-xl border",
                    isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  )}>
                    <div className="space-y-4">
                      {/* Review Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={review.userAvatar || '/placeholder-avatar.png'}
                              alt={review.userName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className={cn(
                                "font-medium",
                                isDarkMode ? "text-white" : "text-gray-900"
                              )}>
                                {review.userName}
                              </span>
                              {review.userVerified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                {renderStars(review.rating, "sm")}
                              </div>
                              <span className={cn(
                                "text-xs",
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              )}>
                                {new Date(review.createdAt).toLocaleDateString('id-ID')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Review Content */}
                      <div>
                        <h4 className={cn(
                          "font-medium mb-2",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>
                          {review.title}
                        </h4>
                        <p className={cn(
                          "text-sm leading-relaxed",
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        )}>
                          {review.comment}
                        </p>
                      </div>

                      {/* Review Images */}
                      {review.reviewImages && review.reviewImages.length > 0 && (
                        <div className="flex space-x-2">
                          {review.reviewImages.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Review image ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}

                      {/* Review Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                        >
                          👍 Bermanfaat ({review.helpfulCount})
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                        >
                          💬 Balas
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className={cn(
                  "text-gray-500",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )}>
                  Belum ada ulasan untuk produk ini
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Shipping Tab */}
        <TabsContent value="shipping" className="mt-8">
          <div className="space-y-6">
            <h3 className={cn(
              "text-xl font-semibold mb-4",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Informasi Pengiriman
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Standard Shipping */}
              <div className={cn(
                "p-6 rounded-xl",
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              )}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-6 h-6 text-blue-500">🚚</div>
                  <h4 className={cn(
                    "font-semibold",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    {SHIPPING_INFO.standard.name}
                  </h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className={cn(
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    • Estimasi: {SHIPPING_INFO.standard.days}
                  </div>
                  <div className={cn(
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    • Ongkir: {SHIPPING_INFO.standard.cost}
                  </div>
                  <div className={cn(
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    • Tracking: {SHIPPING_INFO.standard.tracking ? "Tersedia" : "Tidak tersedia"}
                  </div>
                </div>
              </div>

              {/* Guarantee & Return */}
              <div className={cn(
                "p-6 rounded-xl",
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              )}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-6 h-6 text-green-500">🛡️</div>
                  <h4 className={cn(
                    "font-semibold",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    {GUARANTEE_INFO.warranty.name}
                  </h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className={cn(
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    • Garansi: {GUARANTEE_INFO.warranty.description}
                  </div>
                  <div className={cn(
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    • Return: {GUARANTEE_INFO.return.name}
                  </div>
                  <div className={cn(
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    • Refund: {GUARANTEE_INFO.return.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductTabs; 