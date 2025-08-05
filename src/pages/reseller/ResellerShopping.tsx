import { Button } from "@/components/ui";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Input } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { getProductsByRole, getInventoryByProductId, Product } from "@/lib/data/products";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecommendedStoresCarousel from "@/components/RecommendedStoresCarousel";
import RecommendedProductsCarousel from "@/components/RecommendedProductsCarousel";
import ScrollToTop from "@/components/ScrollToTop";
import {
  Search,
  Star,
  Eye,
  ShoppingCart,
  Heart,
  Tag,
  Building,
  Package,
  DollarSign
} from "lucide-react";

const agents = [
  { id: "agent-001", name: "PT Maju Bersama", commission: 15, rating: 4.8 },
  { id: "agent-002", name: "CV Sukses Mandiri", commission: 12, rating: 4.6 },
  { id: "agent-003", name: "UD Berkah Jaya", commission: 18, rating: 4.4 }
];

const ResellerShopping = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);

  const allProducts = getProductsByRole('agent');
  const filteredProducts = allProducts.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product);
  };

  const handleViewProduct = (productId: string) => {
    // Scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/reseller/product/${productId}`);
  };

  const handleBuyProduct = (product: Product) => {
    // Scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/register', {
      state: {
        message: "Silakan daftar atau login terlebih dahulu untuk melakukan pembelian",
        returnTo: `/product/${product.productId}`
      }
    });
  };

  const getAgentForProduct = (productId: string) => {
    const agentIndex = parseInt(productId.slice(-1)) % agents.length;
    return agents[agentIndex];
  };

  return (
    <div className="space-y-6">
      <ScrollToTop />
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className={cn(
            "text-3xl font-bold tracking-tight",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            Belanja Produk
          </h1>
          <p className={cn(
            "text-lg",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}>
            Temukan produk berkualitas dari berbagai Agent mitra kami
          </p>
        </div>
      </div>

      {/* Recommended Stores Carousel */}
      <div className="mb-8">
        <RecommendedStoresCarousel />
      </div>

      {/* Recommended Products Carousel */}
      <div className="mb-8">
        <RecommendedProductsCarousel />
      </div>

      {/* Search */}
      <div className="relative">
        <Search className={cn(
          "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
          isDarkMode ? "text-gray-400" : "text-gray-500"
        )} />
        <Input
          placeholder="Cari produk, kategori, atau Agent..."
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

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className={cn(
          "text-sm",
          isDarkMode ? "text-gray-300" : "text-gray-600"
        )}>
          Menampilkan {filteredProducts.length} dari {allProducts.length} produk
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="outline">
            <Building className="h-3 w-3 mr-1" />
            {agents.length} Agent
          </Badge>
          <Badge variant="outline">
            <DollarSign className="h-3 w-3 mr-1" />
            Komisi hingga {(Math.max(...agents.map(a => a.commission)))}%
          </Badge>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Tidak ada produk ditemukan</h3>
            <p className="text-sm text-gray-500">Coba ubah pencarian Anda</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => {
            const agent = getAgentForProduct(product.productId);
            const isWishlisted = wishlist.includes(product.productId);

            return (
              <Card key={product.productId} className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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

                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-blue-500 text-white">
                      <Tag className="h-3 w-3 mr-1" />
                      {agent.commission}% Komisi
                    </Badge>
                  </div>

                  <div className="absolute top-2 left-2">
                    <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                      {agent.name}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">{agent.rating}</span>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Tersedia
                    </span>
                  </div>

                  <CardTitle className="text-sm font-semibold mb-2 line-clamp-2">
                    {product.productName}
                  </CardTitle>

                  <div className="flex items-center justify-between">
                    <p className={cn(
                      "text-lg font-bold",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      Rp {typeof product.basePrice === 'number' ? product.basePrice.toLocaleString() : '-'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Stok: {getInventoryByProductId(product.productId)?.quantityOnHand ?? '-'}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button variant="outline" size="sm" onClick={() => handleViewProduct(product.productId)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Detail
                    </Button>
                    <Button size="sm" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Beli
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResellerShopping; 