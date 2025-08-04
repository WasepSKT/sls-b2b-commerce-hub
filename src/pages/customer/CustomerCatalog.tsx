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
import { Slider } from "@/components/ui";
import { Dialog } from "@/components/ui";
import {
  ShoppingCart,
  Search,
  Star,
  Tag,
  Percent,
  Image as ImageIcon
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
import ProductDetail from "@/components/ProductDetail";
import { getInventoryByProductId, Product } from "@/lib/data/products";

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
    const bgColor = isDarkMode ? '374151' : 'F3F4F6';
    const textColor = isDarkMode ? 'D1D5DB' : '6B7280';
    return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=Product+Image`;
  };

  const fallbackPlaceholder = "https://placehold.co/400x300/gray/white?text=Product+Image";

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
    { value: "name", label: "Name" }
  ];

  return (
    <CustomerLayout pageTitle="Katalog Produk">
      <ScrollToTop />
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="space-y-1">
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>Temukan produk berkualitas untuk kebutuhan bisnis Anda</p>
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

        <Card className={cn(
          "transition-colors duration-300",
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        )}>
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
                  <SelectTrigger className={cn(
                    "w-[180px] transition-colors",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  )}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className={cn(
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""
                  )}>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className={cn(
                    "w-[180px] transition-colors",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  )}>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className={cn(
                    isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""
                  )}>
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

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className="w-full md:w-64 space-y-6">
            <Card className={cn(
              "transition-colors duration-300",
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            )}>
              <CardContent className="p-6">
                <h2 className={cn(
                  "text-lg font-semibold mb-4",
                  isDarkMode ? "text-gray-50" : "text-slate-900"
                )}>Filters</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className={cn(
                      "font-medium mb-2 text-sm",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>Price Range</h3>
                    <Slider
                      min={0}
                      max={5000000}
                      step={100000}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="mt-2"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span className={isDarkMode ? "text-gray-400" : ""}>Rp {priceRange[0].toLocaleString()}</span>
                      <span className={isDarkMode ? "text-gray-400" : ""}>Rp {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.productId} className={cn(
                  "overflow-hidden transition-all duration-300 group",
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                    : "bg-white border-gray-200 hover:border-gray-300"
                )}>
                  <div className="relative aspect-[4/3]">
                    <img
                      src={product.imageUrls?.[0] || getPlaceholderImage()}
                      alt={product.productName}
                      className={cn(
                        "object-cover w-full h-full transition-opacity duration-200",
                        !product.imageUrls?.[0] && "hover:opacity-75"
                      )}
                      onError={(e) => {
                        e.currentTarget.src = fallbackPlaceholder;
                      }}
                    />
                    {!product.imageUrls?.[0] && (
                      <div className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b",
                        isDarkMode
                          ? "from-gray-800/0 to-gray-800/60"
                          : "from-gray-50/0 to-gray-50/60"
                      )}>
                        <ImageIcon className={cn(
                          "w-10 h-10",
                          isDarkMode ? "text-gray-300" : "text-gray-500"
                        )} />
                        <p className={cn(
                          "text-sm font-medium mt-2",
                          isDarkMode ? "text-gray-200" : "text-gray-600"
                        )}>
                          Image Not Available
                        </p>
                      </div>
                    )}
                    {/* Discount badge removed as Product interface doesn't have discount property */}
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Link to={`/dashboard/customer/product/${product.productId}`}>
                          <h3 className={cn(
                            "font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-1",
                            isDarkMode ? "text-white" : "text-gray-900"
                          )}>{product.productName}</h3>
                        </Link>
                        <p className={cn(
                          "text-sm line-clamp-2",
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        )}>{product.description}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {renderRatingStars(4.5)}
                          <span className={cn(
                            "text-sm ml-1",
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          )}>({Math.floor(Math.random() * 100) + 10})</span>
                        </div>
                        <span className={cn(
                          "text-sm px-2 py-1 rounded-full bg-opacity-10",
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-600"
                        )}>
                          <Tag className="h-3.5 w-3.5 inline mr-1" />
                          {product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className={cn(
                            "text-lg font-bold",
                            isDarkMode ? "text-white" : "text-gray-900"
                          )}>Rp {product.basePrice.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className={cn(
                            "text-sm",
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          )}>Stock</p>
                          <p className={cn(
                            "font-medium",
                            isDarkMode ? "text-white" : "text-gray-900"
                          )}>{getInventoryByProductId(product.productId)?.quantityOnHand || 0}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className={cn(
                            "flex-1 transition-all duration-200",
                            "bg-blue-600 text-white hover:bg-blue-700",
                            "shadow-sm hover:shadow"
                          )}
                          onClick={() => handleAddToCart(product.productId, product.productName)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/dashboard/customer/product/${product.productId}`)}
                          className={cn(
                            "flex-1 transition-all duration-200",
                            isDarkMode
                              ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700"
                              : "border-gray-200 hover:bg-gray-100",
                            "shadow-sm hover:shadow"
                          )}
                        >
                          Detail
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerCatalog;
