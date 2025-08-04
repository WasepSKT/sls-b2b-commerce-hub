import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useProductDetail } from "@/hooks/useProductDetail";

// Import modular components
import ProductHeader from "@/components/product-detail/ProductHeader";
import ProductImageGallery from "@/components/product-detail/ProductImageGallery";
import ProductInfo from "@/components/product-detail/ProductInfo";
import ProductActions from "@/components/product-detail/ProductActions";
import ProductTabs from "@/components/product-detail/ProductTabs";
import SimilarProducts from "@/components/product-detail/SimilarProducts";
import ProductDetailSkeleton from "@/components/product-detail/ProductDetailSkeleton";
import ProductNotFound from "@/components/product-detail/ProductNotFound";

const PublicProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Use custom hook for product data
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
    return <ProductNotFound onBack={() => navigate('/')} />;
  }

  // Event handlers
  const handleAddToCart = () => {
    navigate('/register');
  };

  const handleBuyNow = () => {
    navigate('/register');
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/product/${product.productId}`;
    navigator.clipboard.writeText(shareUrl);
    console.log('Product link copied to clipboard:', shareUrl);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleWriteReview = () => {
    navigate('/register');
  };

  const handleViewAll = () => {
    navigate('/');
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      <ScrollToTop />

      {/* Header */}
      <ProductHeader
        onBack={() => navigate('/')}
        onShare={handleShare}
        onWishlist={handleWishlist}
        onLogin={() => navigate('/login')}
        isWishlisted={isWishlisted}
      />

      {/* Product Detail Content */}
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

      <Footer />
    </div>
  );
};

export default PublicProductDetail; 