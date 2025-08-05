import { Button } from "@/components/ui";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Dialog } from "@/components/ui";
import { Input } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { getProductsByRole, getInventoryByProductId, Product } from "@/lib/data/products";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Check,
  Package,
  Users,
  Star,
  Share2,
  Eye,
  DollarSign,
  Building,
  Tag,
  ExternalLink,
  Search,
  Filter,
  Grid3X3,
  List
} from "lucide-react";

// Mock data for agents with commission rates
const agents = [
  {
    id: "agent-001",
    name: "PT Maju Bersama",
    owner: "Ahmad Sulaiman",
    commission: 15,
    rating: 4.8,
    totalProducts: 45,
    verified: true
  },
  {
    id: "agent-002",
    name: "CV Sukses Mandiri",
    owner: "Siti Nurhaliza",
    commission: 12,
    rating: 4.6,
    totalProducts: 38,
    verified: true
  },
  {
    id: "agent-003",
    name: "UD Berkah Jaya",
    owner: "Budi Santoso",
    commission: 18,
    rating: 4.4,
    totalProducts: 52,
    verified: true
  }
];

const ResellerCatalog = () => {
  const { isDarkMode } = useTheme();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const navigate = useNavigate();

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get products from all agents
  const agentProducts = getProductsByRole('agent');

  // Get reseller's current catalog (products they've added)
  const resellerCatalog = getProductsByRole('reseller');

  const getAgentForProduct = (productId: string) => {
    const agentIndex = parseInt(productId.slice(-1)) % agents.length;
    return agents[agentIndex];
  };

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return agentProducts.filter((product) => {
      const agent = getAgentForProduct(product.productId);

      // Search filter
      const matchesSearch = searchQuery === "" ||
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Agent filter
      const matchesAgent = selectedAgent === "all" || agent.id === selectedAgent;

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

      return matchesSearch && matchesAgent && matchesCategory && matchesPrice;
    });
  }, [agentProducts, searchQuery, selectedAgent, selectedCategory, priceRange]);

  // Filter reseller catalog with the same filters
  const filteredResellerCatalog = useMemo(() => {
    return resellerCatalog.filter((product) => {
      const agent = getAgentForProduct(product.productId);

      // Search filter
      const matchesSearch = searchQuery === "" ||
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Agent filter
      const matchesAgent = selectedAgent === "all" || agent.id === selectedAgent;

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

      return matchesSearch && matchesAgent && matchesCategory && matchesPrice;
    });
  }, [resellerCatalog, searchQuery, selectedAgent, selectedCategory, priceRange]);

  const handleAddToCatalog = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleBulkAddToCatalog = () => {
    console.log('Adding products to catalog:', selectedProducts);
    setSelectedProducts([]);
  };

  const handleViewProductDetail = (product: Product) => {
    navigate(`/reseller/product/${product.productId}`);
  };

  const handleShareProduct = (product: Product) => {
    const shareUrl = `${window.location.origin}/reseller/product/${product.productId}`;
    navigator.clipboard.writeText(shareUrl);
    console.log('Product link copied to clipboard:', shareUrl);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={cn(
            "text-2xl font-bold tracking-tight",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            Katalog Produk
          </h2>
          <p className={cn(
            "text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Pilih produk dari berbagai Agent untuk ditambahkan ke katalog Anda
          </p>
        </div>
        {selectedProducts.length > 0 && (
          <Button onClick={handleBulkAddToCatalog}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah {selectedProducts.length} Produk ke Katalog
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className={cn(
        "p-4 rounded-lg border",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari produk, kategori, atau agent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Pilih Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Agent</SelectItem>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="elektronik">Elektronik</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="makanan">Makanan</SelectItem>
                <SelectItem value="kesehatan">Kesehatan</SelectItem>
                <SelectItem value="hobi">Hobi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Rentang Harga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Harga</SelectItem>
                <SelectItem value="0-100000">Rp 0 - 100.000</SelectItem>
                <SelectItem value="100000-500000">Rp 100.000 - 500.000</SelectItem>
                <SelectItem value="500000-1000000">Rp 500.000 - 1.000.000</SelectItem>
                <SelectItem value="1000000+">Rp 1.000.000+</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "grid"
                    ? isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                    : isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "list"
                    ? isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                    : isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className={cn(
            "text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Menampilkan {filteredProducts.length} dari {agentProducts.length} produk
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={cn(
          "transition-all duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                  Produk di Katalog
                </p>
                <p className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
                  {resellerCatalog.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "transition-all duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                  Agent Mitra
                </p>
                <p className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
                  {agents.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "transition-all duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                  Rata-rata Komisi
                </p>
                <p className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
                  {(agents.reduce((sum, agent) => sum + agent.commission, 0) / agents.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "transition-all duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                  Rata-rata Rating Agent
                </p>
                <p className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
                  {(agents.reduce((sum, agent) => sum + agent.rating, 0) / agents.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Products Section */}
      <div>
        <h3 className={cn(
          "text-lg font-semibold mb-4",
          isDarkMode ? "text-white" : "text-gray-900"
        )}>
          Produk dari Agent Mitra
        </h3>
        <p className={cn(
          "text-sm mb-6",
          isDarkMode ? "text-gray-400" : "text-gray-600"
        )}>
          Pilih produk yang ingin Anda tambahkan ke katalog Anda
        </p>

        {filteredProducts.length === 0 ? (
          <div className={cn(
            "text-center py-12",
            isDarkMode ? "text-gray-400" : "text-gray-500"
          )}>
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Tidak ada produk ditemukan</h3>
            <p className="text-sm">Coba ubah filter atau kata kunci pencarian Anda</p>
          </div>
        ) : (
          <div className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "space-y-4"
          )}>
            {filteredProducts.map((product) => {
              const isSelected = selectedProducts.includes(product.productId);
              const isInCatalog = resellerCatalog.some(p => p.productId === product.productId);
              const agent = getAgentForProduct(product.productId);

              return viewMode === "grid" ? (
                <Card key={product.productId} className={cn(
                  "overflow-hidden transition-all duration-300 hover:shadow-lg",
                  isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
                  isSelected && "ring-2 ring-blue-500"
                )}>
                  <CardHeader className="p-0 relative">
                    <img
                      src={product.imageUrls?.[0] || '/placeholder.webp'}
                      alt={product.productName}
                      className="w-full h-48 object-cover"
                    />
                    {isInCatalog && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-500 text-white">
                          <Check className="h-3 w-3 mr-1" />
                          Sudah di Katalog
                        </Badge>
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute top-2 left-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-blue-500 text-white">
                        <Tag className="h-3 w-3 mr-1" />
                        {agent.commission}% Komisi
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={cn(
                        isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600"
                      )}>
                        {agent.name}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className={cn("text-xs", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                          {agent.rating}
                        </span>
                      </div>
                    </div>
                    <CardTitle className={cn(
                      "text-lg font-semibold mb-2",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>{product.productName}</CardTitle>
                    <p className={cn(
                      "text-sm mb-4",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>{product.description || '-'}</p>
                    <div className="flex justify-between items-center mb-2">
                      <p className={cn(
                        "text-lg font-bold",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        Rp {typeof product.basePrice === 'number' ? product.basePrice.toLocaleString() : '-'}
                      </p>
                      {(() => {
                        const inventory = getInventoryByProductId(product.productId);
                        const stock = inventory?.quantityOnHand ?? 0;
                        return (
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
                        );
                      })()}
                    </div>
                    <p className={cn(
                      "text-xs",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>
                      Stok: {getInventoryByProductId(product.productId)?.quantityOnHand ?? '-'} unit
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProductDetail(product)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Detail
                      </Button>
                      {isInCatalog ? (
                        <Button variant="outline" size="sm" disabled>
                          <Check className="h-4 w-4 mr-2" />
                          Sudah di Katalog
                        </Button>
                      ) : (
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleAddToCatalog(product.productId)}
                          disabled={getInventoryByProductId(product.productId)?.quantityOnHand === 0}
                        >
                          {isSelected ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Dipilih
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-2" />
                              Pilih
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ) : (
                // List View
                <Card key={product.productId} className={cn(
                  "transition-all duration-300 hover:shadow-lg",
                  isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
                  isSelected && "ring-2 ring-blue-500"
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
                          {agent.name}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className={cn("text-xs", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                            {agent.rating}
                          </span>
                        </div>
                      </div>
                      <CardTitle className={cn(
                        "text-lg font-semibold mb-2",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{product.productName}</CardTitle>
                      <p className={cn(
                        "text-sm mb-4",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>{product.description || '-'}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className={cn(
                            "text-lg font-bold",
                            isDarkMode ? "text-white" : "text-gray-900"
                          )}>
                            Rp {typeof product.basePrice === 'number' ? product.basePrice.toLocaleString() : '-'}
                          </p>
                          <p className={cn(
                            "text-xs",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>
                            Stok: {getInventoryByProductId(product.productId)?.quantityOnHand ?? '-'} unit
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProductDetail(product)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Detail
                          </Button>
                          {isInCatalog ? (
                            <Button variant="outline" size="sm" disabled>
                              <Check className="h-4 w-4 mr-2" />
                              Sudah di Katalog
                            </Button>
                          ) : (
                            <Button
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleAddToCatalog(product.productId)}
                              disabled={getInventoryByProductId(product.productId)?.quantityOnHand === 0}
                            >
                              {isSelected ? (
                                <>
                                  <Check className="h-4 w-4 mr-2" />
                                  Dipilih
                                </>
                              ) : (
                                <>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Pilih
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* My Catalog Section */}
      <div>
        <h3 className={cn(
          "text-lg font-semibold mb-4",
          isDarkMode ? "text-white" : "text-gray-900"
        )}>
          Katalog Saya
        </h3>
        <p className={cn(
          "text-sm mb-6",
          isDarkMode ? "text-gray-400" : "text-gray-600"
        )}>
          Produk yang sudah Anda tambahkan ke katalog untuk dijual
        </p>

        {filteredResellerCatalog.length === 0 ? (
          <Card className={cn(
            "text-center py-12",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <CardContent>
              <Package className={cn(
                "h-12 w-12 mx-auto mb-4",
                isDarkMode ? "text-gray-400" : "text-gray-300"
              )} />
              <h4 className={cn(
                "text-lg font-medium mb-2",
                isDarkMode ? "text-gray-300" : "text-gray-900"
              )}>
                {resellerCatalog.length === 0 ? "Katalog Kosong" : "Tidak ada produk ditemukan"}
              </h4>
              <p className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                {resellerCatalog.length === 0
                  ? "Pilih produk dari Agent di atas untuk menambahkan ke katalog Anda"
                  : "Coba ubah filter atau kata kunci pencarian Anda"
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "space-y-4"
          )}>
            {filteredResellerCatalog.map((product) => {
              const agent = getAgentForProduct(product.productId);

              return viewMode === "grid" ? (
                <Card key={product.productId} className={cn(
                  "overflow-hidden transition-all duration-300 hover:shadow-lg",
                  isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50"
                )}>
                  <CardHeader className="p-0 relative">
                    <img
                      src={product.imageUrls?.[0] || '/placeholder.webp'}
                      alt={product.productName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-green-500 text-white">
                        <Tag className="h-3 w-3 mr-1" />
                        {agent.commission}% Komisi
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={cn(
                        isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600"
                      )}>
                        {agent.name}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className={cn("text-xs", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                          {agent.rating}
                        </span>
                      </div>
                    </div>
                    <CardTitle className={cn(
                      "text-lg font-semibold mb-2",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>{product.productName}</CardTitle>
                    <p className={cn(
                      "text-sm mb-4",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>{product.description || '-'}</p>
                    <div className="flex justify-between items-center mb-2">
                      <p className={cn(
                        "text-lg font-bold",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        Rp {typeof product.basePrice === 'number' ? product.basePrice.toLocaleString() : '-'}
                      </p>
                      {(() => {
                        const inventory = getInventoryByProductId(product.productId);
                        const stock = inventory?.quantityOnHand ?? 0;
                        return (
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
                        );
                      })()}
                    </div>
                    <p className={cn(
                      "text-xs",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>
                      Stok: {getInventoryByProductId(product.productId)?.quantityOnHand ?? '-'} unit
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProductDetail(product)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Detail
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShareProduct(product)}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
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
                          {agent.name}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className={cn("text-xs", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                            {agent.rating}
                          </span>
                        </div>
                      </div>
                      <CardTitle className={cn(
                        "text-lg font-semibold mb-2",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{product.productName}</CardTitle>
                      <p className={cn(
                        "text-sm mb-4",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>{product.description || '-'}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className={cn(
                            "text-lg font-bold",
                            isDarkMode ? "text-white" : "text-gray-900"
                          )}>
                            Rp {typeof product.basePrice === 'number' ? product.basePrice.toLocaleString() : '-'}
                          </p>
                          <p className={cn(
                            "text-xs",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>
                            Stok: {getInventoryByProductId(product.productId)?.quantityOnHand ?? '-'} unit
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProductDetail(product)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Detail
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShareProduct(product)}
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
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
      </div>

      {/* Product Detail Modal removed: now using product detail page navigation */}
    </div>
  );
};

export default ResellerCatalog;