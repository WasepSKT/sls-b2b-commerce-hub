import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { useProductDetail } from "@/hooks/useProductDetail";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Import modular components
import ProductImageGallery from "@/components/product-detail/ProductImageGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import ProductActions from "@/components/product-detail/ProductActions";
import ProductTabs from "@/components/product-detail/ProductTabs";
import SimilarProducts from "@/components/product-detail/SimilarProducts";
import ProductDetailSkeleton from "@/components/product-detail/ProductDetailSkeleton";
import ProductNotFound from "@/components/product-detail/ProductNotFound";

const AgentProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Use custom hook for product data (agent role)
  const {
    product,
    inventory,
    reviews,
    averageRating,
    reviewCount,
    similarProducts,
    loading,
    error
  } = useProductDetail(productId);

  // Loading state
  if (loading) {
    return <ProductDetailSkeleton />;
  }

  // Error state
  if (error || !product) {
    return <ProductNotFound onBack={() => navigate('/dashboard/agent/catalog')} />;
  }

  // Calculate agent-specific pricing and targets
  const agentPrice = product.basePrice;
  const customerPrice = Math.round(product.basePrice * 1.25); // 25% markup
  const profitPerUnit = customerPrice - agentPrice;
  const commission = Math.round((profitPerUnit / customerPrice) * 100);

  // Mock sales data for agent
  const monthlyTarget = 50;
  const currentSales = 32;
  const salesProgress = (currentSales / monthlyTarget) * 100;

  // Agent-specific event handlers
  const handleAddToCart = () => {
    // Agent-specific cart logic
    console.log('Adding to agent cart:', product.productId);
    // TODO: Implement agent cart functionality
  };

  const handleBuyNow = () => {
    // Agent-specific checkout logic
    console.log('Agent buying now:', product.productId);
    navigate('/dashboard/agent/checkout', {
      state: { productId: product.productId }
    });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/dashboard/agent/product/${product.productId}`;
    navigator.clipboard.writeText(shareUrl);
    console.log('Agent product link copied to clipboard:', shareUrl);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement agent wishlist functionality
    console.log('Agent wishlist toggled:', product.productId);
  };

  const handleWriteReview = () => {
    // Agent-specific review logic
    navigate('/dashboard/agent/review', {
      state: { productId: product.productId }
    });
  };

  const handleViewAll = () => {
    navigate('/dashboard/agent/catalog');
  };

  const handleProductClick = (productId: string) => {
    navigate(`/dashboard/agent/product/${productId}`);
  };

  const handleViewSalesReport = () => {
    navigate('/dashboard/agent/sales-report', {
      state: { productId: product.productId }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <ProductImageGallery
          imageUrls={product.imageUrls || []}
          productName={product.productName}
        />

        {/* Product Info and Actions */}
        <div className="space-y-8">
          <ProductInfo
            product={product}
            averageRating={averageRating}
            reviewCount={reviewCount}
            inventory={inventory}
          />

          {/* Agent-specific pricing info */}
          <div className={cn(
            "p-6 rounded-xl border",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <h3 className={cn(
              "text-lg font-semibold mb-4",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Informasi Harga Agent
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Harga Beli (Agent):
                </span>
                <span className="text-lg font-bold text-green-600">
                  Rp {agentPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Harga Jual (Customer):
                </span>
                <span className="text-lg font-bold text-blue-600">
                  Rp {customerPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Profit per Unit:
                </span>
                <span className="text-lg font-bold text-green-600">
                  Rp {profitPerUnit.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Komisi:
                </span>
                <Badge variant="secondary" className="text-green-600">
                  {commission}%
                </Badge>
              </div>
            </div>
          </div>

          <ProductActions
            product={product}
            inventory={inventory}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />

          {/* Agent-specific features */}
          <div className={cn(
            "p-6 rounded-xl border",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <h3 className={cn(
              "text-lg font-semibold mb-4",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Fitur Khusus Agent
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div className="flex items-center">
                <div className="w-5 h-5 mr-3 text-blue-500">💰</div>
                <div>
                  <div className={cn(
                    "font-medium",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    Komisi {commission}%
                  </div>
                  <div className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    Per penjualan
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 mr-3 text-green-500">📊</div>
                <div>
                  <div className={cn(
                    "font-medium",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    Sales Target
                  </div>
                  <div className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    Tracking real-time
                  </div>
                </div>
              </div>
            </div>

            {/* Sales Progress Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className={cn(
                  "font-medium",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Target Penjualan Bulanan
                </h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewSalesReport}
                >
                  Lihat Laporan
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={cn(
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    Progress: {currentSales} / {monthlyTarget} unit
                  </span>
                  <span className={cn(
                    "font-medium",
                    salesProgress >= 80 ? "text-green-600" :
                      salesProgress >= 60 ? "text-yellow-600" : "text-red-600"
                  )}>
                    {salesProgress.toFixed(1)}%
                  </span>
                </div>
                <Progress value={salesProgress} className="h-2" />
                <div className="flex justify-between text-xs">
                  <span className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    Sisa: {monthlyTarget - currentSales} unit
                  </span>
                  <span className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    Bonus: {salesProgress >= 100 ? "Rp 500.000" : "Rp 0"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Performance Stats */}
          <div className={cn(
            "p-6 rounded-xl border",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <h3 className={cn(
              "text-lg font-semibold mb-4",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Performa Agent
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className={cn(
                  "text-2xl font-bold text-blue-600",
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                )}>
                  {currentSales}
                </div>
                <div className={cn(
                  "text-xs",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Terjual Bulan Ini
                </div>
              </div>
              <div>
                <div className={cn(
                  "text-2xl font-bold text-green-600",
                  isDarkMode ? "text-green-400" : "text-green-600"
                )}>
                  Rp {(currentSales * profitPerUnit).toLocaleString()}
                </div>
                <div className={cn(
                  "text-xs",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Total Komisi
                </div>
              </div>
              <div>
                <div className={cn(
                  "text-2xl font-bold text-purple-600",
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                )}>
                  {salesProgress >= 100 ? "A+" : salesProgress >= 80 ? "A" : salesProgress >= 60 ? "B" : "C"}
                </div>
                <div className={cn(
                  "text-xs",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Grade
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <ProductTabs
        product={product}
        reviews={reviews}
        averageRating={averageRating}
        reviewCount={reviewCount}
        onWriteReview={handleWriteReview}
      />

      {/* Similar Products */}
      <SimilarProducts
        similarProducts={similarProducts}
        onViewAll={handleViewAll}
        onProductClick={handleProductClick}
      />
    </div>
  );
};

export default AgentProductDetail; 