import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { useProductDetail } from "@/hooks/useProductDetail";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import modular components
import ProductImageGallery from "@/components/product-detail/ProductImageGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import ProductActions from "@/components/product-detail/ProductActions";
import ProductTabs from "@/components/product-detail/ProductTabs";
import SimilarProducts from "@/components/product-detail/SimilarProducts";
import ProductDetailSkeleton from "@/components/product-detail/ProductDetailSkeleton";
import ProductNotFound from "@/components/product-detail/ProductNotFound";

const ResellerProductDetail = () => {
  const { productId } = useParams();
  // Debug log untuk melihat productId yang diterima
  console.log('Current productId from URL:', productId);

  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [bulkQuantity, setBulkQuantity] = useState(10);

  // Use custom hook for product data (reseller role)
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
    return <ProductNotFound onBack={() => navigate('/dashboard/reseller/catalog')} />;
  }

  // Calculate reseller-specific pricing
  const resellerPrice = product.basePrice;
  const customerPrice = Math.round(product.basePrice * 1.35); // 35% markup
  const profitPerUnit = customerPrice - resellerPrice;
  const commission = Math.round((profitPerUnit / customerPrice) * 100);

  // Reseller-specific event handlers
  const handleAddToCart = () => {
    // Reseller-specific cart logic
    console.log('Adding to reseller cart:', product.productId);
    // TODO: Implement reseller cart functionality
  };

  const handleBuyNow = () => {
    // Reseller-specific checkout logic
    console.log('Reseller buying now:', product.productId);
    navigate('/dashboard/reseller/checkout', {
      state: { productId: product.productId }
    });
  };

  const handleBulkOrder = () => {
    // Reseller-specific bulk order logic
    console.log('Reseller bulk order:', product.productId, bulkQuantity);
    navigate('/dashboard/reseller/bulk-order', {
      state: { productId: product.productId, quantity: bulkQuantity }
    });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/dashboard/reseller/product/${product.productId}`;
    navigator.clipboard.writeText(shareUrl);
    console.log('Reseller product link copied to clipboard:', shareUrl);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement reseller wishlist functionality
    console.log('Reseller wishlist toggled:', product.productId);
  };

  const handleWriteReview = () => {
    // Reseller-specific review logic
    navigate('/dashboard/reseller/review', {
      state: { productId: product.productId }
    });
  };

  const handleViewAll = () => {
    navigate('/dashboard/reseller/catalog');
  };

  const handleProductClick = (productId: string) => {
    navigate(`/dashboard/reseller/product/${productId}`);
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

          {/* Reseller-specific pricing info */}
          <div className={cn(
            "p-6 rounded-xl border",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <h3 className={cn(
              "text-lg font-semibold mb-4",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Informasi Harga Reseller
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Harga Beli (Reseller):
                </span>
                <span className="text-lg font-bold text-green-600">
                  Rp {resellerPrice.toLocaleString()}
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

          {/* Reseller-specific features */}
          <div className={cn(
            "p-6 rounded-xl border",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <h3 className={cn(
              "text-lg font-semibold mb-4",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Fitur Khusus Reseller
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
                <div className="w-5 h-5 mr-3 text-green-500">📦</div>
                <div>
                  <div className={cn(
                    "font-medium",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    Bulk Order
                  </div>
                  <div className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    Diskon khusus
                  </div>
                </div>
              </div>
            </div>

            {/* Bulk Order Section */}
            <div className="space-y-4">
              <h4 className={cn(
                "font-medium",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Bulk Order
              </h4>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setBulkQuantity(Math.max(10, bulkQuantity - 5))}
                    className="h-10 w-10"
                  >
                    -
                  </Button>
                  <span className={cn(
                    "px-4 py-2 text-lg font-medium min-w-[80px] text-center",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    {bulkQuantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setBulkQuantity(bulkQuantity + 5)}
                    className="h-10 w-10"
                  >
                    +
                  </Button>
                </div>
                <Button
                  onClick={handleBulkOrder}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Bulk Order
                </Button>
              </div>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Minimal 10 unit untuk bulk order dengan diskon 5%
              </p>
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

export default ResellerProductDetail; 