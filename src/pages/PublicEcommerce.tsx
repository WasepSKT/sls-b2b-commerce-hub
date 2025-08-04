import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
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
            Platform e-commerce terdepan dengan ribuan produk dari berbagai kategori.
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
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.productId);
              const inventory = getInventoryByProductId(product.productId);
              const stock = inventory?.quantityOnHand || 0;

              return viewMode === "grid" ? (
                // Grid View
                <Card key={product.productId} className={cn(
                  "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                  isDarkMode ? "bg-gray-800 border-gray-700 hover:border-gray-600" : "bg-white border-gray-200 hover:border-gray-300"
                )}>
                  <CardHeader className="p-0 relative">
                    <img
                      src={product.imageUrls?.[0] || '/placeholder.webp'}
                      alt={product.productName}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-gray-100/80"
                      onClick={() => handleToggleWishlist(product.productId)}
                    >
                      <Heart className={cn(
                        "h-4 w-4",
                        isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                      )} />
                    </Button>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className={cn(
                          "text-xs",
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        )}>
                          4.5
                        </span>
                      </div>
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

                    <CardTitle className={cn(
                      "text-sm font-semibold mb-2 line-clamp-2",
                      isDarkMode ? "text-gray-200" : "text-gray-900"
                    )}>
                      {product.productName}
                    </CardTitle>

                    <div className="flex items-center justify-between">
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
                        onClick={() => handleAddToCart(product)}
                        disabled={stock === 0}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Beli
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ) : (
                // List View
                <Card key={product.productId} className={cn(
                  "transition-all duration-300 hover:shadow-lg",
                  isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50"
                )}>
                  <div className="flex">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={product.imageUrls?.[0] || '/placeholder.webp'}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className={cn(
                          isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600"
                        )}>
                          {product.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className={cn(
                            "text-xs",
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          )}>
                            4.5
                          </span>
                        </div>
                      </div>
                      <CardTitle className={cn(
                        "text-lg font-semibold mb-2",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        {product.productName}
                      </CardTitle>
                      <p className={cn(
                        "text-sm mb-4",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className={cn(
                            "text-lg font-bold",
                            isDarkMode ? "text-white" : "text-gray-900"
                          )}>
                            Rp {product.basePrice.toLocaleString()}
                          </p>
                          <p className={cn(
                            "text-xs",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>
                            Stok: {stock} unit
                          </p>
                        </div>
                        <div className="flex space-x-2">
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
                            onClick={() => handleAddToCart(product)}
                            disabled={stock === 0}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Beli
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
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