import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { Card, CardContent, CardFooter } from "@/components/ui";
import { Input } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import {
  ShoppingCart,
  Search,
  Star,
  Tag,
  Percent,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react";
import CustomerLayout from "@/components/CustomerLayout";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/lib/store/products";
import { useCart } from "@/lib/store/cart";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { useNavigate } from "react-router-dom";
import RecommendedStoresCarousel from "@/components/RecommendedStoresCarousel";
import RecommendedProductsCarousel from "@/components/RecommendedProductsCarousel";
import ScrollToTop from "@/components/ScrollToTop";
import ProductCard from "@/components/business/ProductCard";

const CustomerCatalog = () => {
  const { toast } = useToast();
  const { isDarkMode } = useTheme();
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    getFilteredProducts,
  } = useProducts();

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = getFilteredProducts();
  const categories = ["Electronics", "Fashion", "Home", "Sports", "Beauty"];

  // Helper for generating placeholder images
  const getPlaceholderImage = (width = 400, height = 300) => {
    const bgColor = isDarkMode ? "374151" : "F3F4F6";
    const textColor = isDarkMode ? "D1D5DB" : "6B7280";
    return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=Product+Image`;
  };

  const fallbackPlaceholder =
    "https://placehold.co/400x300/gray/white?text=Product+Image";

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(productId, 1);
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart`,
    });
  };

  // Helper function to render rating stars
  const renderRatingStars = (rating: number = 4.5) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={cn(
          "h-4 w-4",
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        )}
      />
    ));
  };

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name" },
  ];

  return (
    <CustomerLayout pageTitle="Katalog Produk">
      <ScrollToTop />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/customer")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Home
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="space-y-1">
            <p
              className={cn(
                "text-sm",
                isDarkMode ? "text-gray-300" : "text-gray-500"
              )}
            >
              Temukan produk berkualitas untuk kebutuhan bisnis Anda
            </p>
          </div>
          <Link to="/dashboard/customer/cart">
            <Button
              className={cn(
                "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              View Cart
            </Button>
          </Link>
        </div>

        {/* Recommended Stores Carousel */}
        <div className="mb-8">
          <RecommendedStoresCarousel />
        </div>

        {/* Recommended Products Carousel */}
        <div className="mb-8">
          <RecommendedProductsCarousel />
        </div>
        <div className="text-center">
          <h2
            className={cn(
              "text-2xl font-bold",
              isDarkMode ? "text-white" : "text-gray-900"
            )}
          >
            Temukan Produk Yang Anda Cari
          </h2>
          <p
            className={cn(
              "text-sm mt-2",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}
          >
            Jelajahi berbagai pilihan produk yang sesuai dengan kebutuhan Anda
          </p>
        </div>
        <Card
          className={cn(
            "transition-colors duration-300",
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          )}
        >
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "pl-10 transition-colors duration-300",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger
                    className={cn(
                      "w-[180px] transition-colors",
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-200 text-gray-900"
                    )}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent
                    className={cn(
                      isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""
                    )}
                  >
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger
                    className={cn(
                      "w-[180px] transition-colors",
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-200 text-gray-900"
                    )}
                  >
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent
                    className={cn(
                      isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""
                    )}
                  >
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                    onAddToCart={(productId, productName) =>
                      handleAddToCart(productId, productName)
                    }
                    renderRatingStars={renderRatingStars}
                    onCardClick={() =>
                      navigate(`/dashboard/customer/product/${product.productId}`)
                    }
                    hideDetailButton
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerCatalog;
