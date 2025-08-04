import { useState } from "react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Card, CardContent } from "@/components/ui";
import { 
  Search, 
  Package, 
  Filter,
  ArrowUpDown,
  Star,
  Percent,
  Tag,
  ShoppingCart,
  Plus,
  Image as ImageIcon,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { agentProducts as allProducts, Product } from "@/lib/data/products";

const AgentCatalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // Menggunakan layanan placeholder.com yang profesional
  const getPlaceholderImage = (width = 400, height = 300) => {
    // Warna background dan text yang sesuai dengan tema
    const bgColor = isDarkMode ? '374151' : 'F3F4F6';
    const textColor = isDarkMode ? 'D1D5DB' : '6B7280';
    
    // Menggunakan placeholder.com dengan kustomisasi
    return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=Product+Image`;
  };

  // Alternatif placeholder dari sumber lain jika placeholder.com tidak tersedia
  const fallbackPlaceholder = "https://placehold.co/400x300/gray/white?text=Product+Image";

  const categories = ["all", "Electronics", "Fashion", "Home", "Beauty"];
  const sortOptions = [
    { value: "popularity", label: "Popularitas" },
    { value: "price_asc", label: "Harga: Rendah ke Tinggi" },
    { value: "price_desc", label: "Harga: Tinggi ke Rendah" },
    { value: "commission", label: "Komisi Tertinggi" }
  ];

  const filteredProducts = allProducts.filter((product) =>
    (selectedCategory === "all" || product.category === selectedCategory) &&
    (product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderRatingStars = (rating: number) => {
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

  // Add new product function - navigate to add product page
  const handleAddProduct = () => {
    navigate("/dashboard/agent/product/add");
  };

  // View product detail function
  const handleViewProductDetail = (productId: string) => {
    navigate(`/dashboard/agent/product/${productId}`);
  };

  return (
    <DashboardLayout role="agent" pageTitle="Katalog Produk">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Katalog Produk</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Jelajahi dan kelola produk yang tersedia untuk dijual
            </p>
          </div>
          <Button 
            onClick={handleAddProduct}
            className={cn(
              "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Produk
          </Button>
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
                  placeholder="Cari produk berdasarkan nama atau deskripsi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "pl-10 transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={cn(
                    "rounded-md border px-3 py-2 text-sm min-w-[150px]",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  )}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "Semua Kategori" : category}
                    </option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={cn(
                    "rounded-md border px-3 py-2 text-sm min-w-[180px]",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  )}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.product_id} className={cn(
              "overflow-hidden transition-all duration-300 group",
              isDarkMode 
                ? "bg-gray-800 border-gray-700 hover:border-gray-600" 
                : "bg-white border-gray-200 hover:border-gray-300"
            )}>
              <div className="relative aspect-[4/3]">
                <img
                  src={product.image_urls[0] || getPlaceholderImage()}
                  alt={product.product_name}
                  className={cn(
                    "object-cover w-full h-full transition-opacity duration-200",
                    !product.image_urls[0] && "hover:opacity-75"
                  )}
                  onError={(e) => {
                    // Fallback ke placeholder alternatif jika placeholder.com tidak tersedia
                    e.currentTarget.src = fallbackPlaceholder;
                  }}
                />
                {!product.image_urls[0] && (
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
                      Gambar Belum Tersedia
                    </p>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className={cn(
                      "font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-1",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>{product.product_name}</h3>
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
                      )}>(120)</span>
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
                      )}>{`Rp ${product.base_price.toLocaleString()}`}</p>
                      <p className={cn(
                        "text-sm flex items-center",
                        isDarkMode ? "text-green-400" : "text-green-600"
                      )}>
                        <Percent className="h-3.5 w-3.5 mr-1" />
                        Komisi 10%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      )}>Stok</p>
                      <p className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{product.is_active ? 'Tersedia' : 'Habis'}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className={cn(
                        "flex-1 transition-all duration-200",
                        "bg-blue-600 text-white hover:bg-blue-700",
                        "shadow-sm hover:shadow"
                      )}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Jual
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleViewProductDetail(product.product_id)}
                      className={cn(
                        "flex-1 transition-all duration-200",
                        isDarkMode 
                          ? "border-gray-600 text-gray-300 hover:bg-gray-700" 
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
    </DashboardLayout>
  );
};

export default AgentCatalog;