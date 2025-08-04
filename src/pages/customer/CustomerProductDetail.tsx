import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { useProductDetail } from "@/hooks/useProductDetail";

// Import modular components
import ProductImageGallery from "@/components/product-detail/ProductImageGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import ProductActions from "@/components/product-detail/ProductActions";
import ProductTabs from "@/components/product-detail/ProductTabs";
import SimilarProducts from "@/components/product-detail/SimilarProducts";
import ProductDetailSkeleton from "@/components/product-detail/ProductDetailSkeleton";
import ProductNotFound from "@/components/product-detail/ProductNotFound";

const CustomerProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Use custom hook for product data (customer role)
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
    return <ProductNotFound onBack={() => navigate('/dashboard/customer/catalog')} />;
  }

  // Customer-specific event handlers
  const handleAddToCart = () => {
    // Customer-specific cart logic
    console.log('Adding to customer cart:', product.productId);
    // TODO: Implement customer cart functionality
  };

  const handleBuyNow = () => {
    // Customer-specific checkout logic
    console.log('Customer buying now:', product.productId);
    navigate('/dashboard/customer/checkout', {
      state: { productId: product.productId }
    });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/dashboard/customer/product/${product.productId}`;
    navigator.clipboard.writeText(shareUrl);
    console.log('Customer product link copied to clipboard:', shareUrl);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement customer wishlist functionality
    console.log('Customer wishlist toggled:', product.productId);
  };

  const handleWriteReview = () => {
    // Customer-specific review logic
    navigate('/dashboard/customer/review', {
      state: { productId: product.productId }
    });
  };

  const handleViewAll = () => {
    navigate('/dashboard/customer/catalog');
  };

  const handleProductClick = (productId: string) => {
    navigate(`/dashboard/customer/product/${productId}`);
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

          <ProductActions
            product={product}
            inventory={inventory}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />

          {/* Customer-specific features */}
          <div className={cn(
            "p-6 rounded-xl border",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <h3 className={cn(
              "text-lg font-semibold mb-4",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Fitur Khusus Customer
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-5 h-5 mr-3 text-blue-500">🎁</div>
                <div>
                  <div className={cn(
                    "font-medium",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    Cashback 5%
                  </div>
                  <div className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    Setiap pembelian
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 mr-3 text-green-500">⭐</div>
                <div>
                  <div className={cn(
                    "font-medium",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    VIP Customer
                  </div>
                  <div className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    Prioritas pengiriman
                  </div>
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

export default CustomerProductDetail;