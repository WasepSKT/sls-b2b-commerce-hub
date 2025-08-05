import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import ProductCard from "@/components/business/ProductCard";
import { Badge } from "@/components/ui";
import { Input } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { getProductsByRole, getInventoryByProductId, getRecommendedProducts, Product } from "@/lib/data/products";
import Footer from "@/components/Footer";
import PromotionalCarousel from "@/components/PromotionalCarousel";
import RecommendedStoresCarousel from "@/components/RecommendedStoresCarousel";
import RecommendedProductsCarousel from "@/components/RecommendedProductsCarousel";
import ScrollToTop from "@/components/ScrollToTop";
import {
  Search,
  Star,
  Eye,
  ShoppingCart,
  Heart,
  Package,
  Filter,
  Grid,
  List,
  User,
  LogIn
} from "lucide-react";

const PublicEcommerce = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Get all products from different roles
  const allProducts = useMemo(() => [
    ...getProductsByRole('customer'),
    ...getProductsByRole('agent'),
    ...getProductsByRole('reseller')
  ], []);

  // Get recommended products
  const featuredProducts = getRecommendedProducts('featured', 6);
  const trendingProducts = getRecommendedProducts('trending', 6);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Search filter
      const matchesSearch = searchTerm === "" ||
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      // Price range filter
      let matchesPrice = true;
      if (priceRange !== "all") {
        const price = product.basePrice || 0;
        switch (priceRange) {
          case "0-100000":
            matchesPrice = price >= 0 && price <= 100000;
            break;
          case "100000-500000":
            matchesPrice = price > 100000 && price <= 500000;
            break;
          case "500000-1000000":
            matchesPrice = price > 500000 && price <= 1000000;
            break;
          case "1000000+":
            matchesPrice = price > 1000000;
            break;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [allProducts, searchTerm, selectedCategory, priceRange]);

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleViewProduct = (productId: string) => {
    // Navigate to product detail page
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (product: Product) => {
    // Scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Redirect to registration/login
    navigate('/register', {
      state: {
        message: "Silakan daftar atau login terlebih dahulu untuk menambahkan produk ke keranjang",
        returnTo: `/product/${product.productId}`
      }
    });
  };

  const handleCheckout = () => {
    // Scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/register', {
      state: {
        message: "Silakan daftar atau login terlebih dahulu untuk melakukan checkout",
        returnTo: '/checkout'
      }
    });
  };

  const categories = ["all", "elektronik", "fashion", "makanan", "minuman", "kesehatan", "rumah tangga"];

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      <ScrollToTop />
      {/* Header */}
      <header className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                SLS-B2B Store
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate('/about');
                }}
                className={cn(
                  "transition-colors duration-300",
                  isDarkMode
                    ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : ""
                )}
              >
                Tentang Kami
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate('/login');
                }}
                className={cn(
                  "transition-colors duration-300",
                  isDarkMode
                    ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : ""
                )}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate('/register');
                }}
                className="transition-colors duration-300"
              >
                <User className="h-4 w-4 mr-2" />
                Daftar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Promotional Carousel Banner */}
        <PromotionalCarousel />

        {/* Recommended Stores Carousel */}
        <RecommendedStoresCarousel />

        {/* Recommended Products Carousel */}
        <RecommendedProductsCarousel />

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className={cn(
            "text-4xl font-bold tracking-tight mb-4",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            Temukan Produk Berkualitas
          </h2>
          <p className={cn(
            "text-lg max-w-2xl mx-auto",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}>
            Platform e-commerce B2B terdepan dengan ribuan produk dari berbagai kategori.
            Daftar sekarang untuk mulai berbelanja!
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          {/* Search */}
          <div className="relative">
            <Search className={cn(
              "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )} />
            <Input
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "pl-10 h-12 text-lg",
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
              )}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={cn(
                  "rounded-md border px-3 py-2 text-sm",
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                )}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "Semua Kategori" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className={cn(
                  "rounded-md border px-3 py-2 text-sm",
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                )}
              >
                <option value="all">Semua Harga</option>
                <option value="0-100000">Rp 0 - 100.000</option>
                <option value="100000-500000">Rp 100.000 - 500.000</option>
                <option value="500000-1000000">Rp 500.000 - 1.000.000</option>
                <option value="1000000+">Rp 1.000.000+</option>
              </select>

              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className={cn(
            "text-sm",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}>
            Menampilkan {filteredProducts.length} dari {allProducts.length} produk
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <Card className={cn(
            "text-center py-16",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <CardContent>
              <Package className={cn(
                "h-16 w-16 mx-auto mb-4",
                isDarkMode ? "text-gray-400" : "text-gray-300"
              )} />
              <h3 className={cn(
                "text-lg font-medium mb-2",
                isDarkMode ? "text-gray-200" : "text-gray-900"
              )}>
                Tidak ada produk ditemukan
              </h3>
              <p className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                Coba ubah pencarian atau filter Anda
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              : "space-y-4"
          )}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.productId}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onBuy={() => handleAddToCart(product)}
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
        )}

        {/* CTA Section */}
        <div className={cn(
          "mt-16 text-center p-8 rounded-lg",
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <h3 className={cn(
            "text-2xl font-bold mb-4",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            Siap untuk Berbelanja?
          </h3>
          <p className={cn(
            "text-lg mb-6 max-w-2xl mx-auto",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}>
            Daftar sekarang untuk mendapatkan akses ke fitur lengkap seperti keranjang belanja,
            riwayat pesanan, dan program reward poin.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              onClick={() => navigate('/register')}
              className="transition-colors duration-300"
            >
              <User className="h-5 w-5 mr-2" />
              Daftar Sekarang
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/login')}
              className={cn(
                "transition-colors duration-300",
                isDarkMode
                  ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : ""
              )}
            >
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicEcommerce; 