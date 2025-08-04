import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Eye,
  Calendar,
  ArrowLeft,
  RefreshCcw
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { getProductsByRole, type Product } from "@/lib/data/products";

// Using Product interface from products.ts instead of local interface

const AgentSellingProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // Placeholder image helper
  const getPlaceholderImage = (width = 400, height = 300) => {
    const bgColor = isDarkMode ? '374151' : 'F3F4F6';
    const textColor = isDarkMode ? 'D1D5DB' : '6B7280';
    return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=Product+Image`;
  };

  // Use centralized data from lib/data/products.ts
  const sellingProducts: Product[] = getProductsByRole('agent');

  const categories = ["all", "Electronics", "Fashion", "Home", "Beauty"];
  const statusFilters = [
    { value: "all", label: "Semua Status" },
    { value: "active", label: "Aktif" },
    { value: "out_of_stock", label: "Stok Habis" },
    { value: "pending", label: "Belum Terjual" }
  ];
  const sortOptions = [
    { value: "recent", label: "Terbaru Ditambahkan" },
    { value: "best_selling", label: "Terlaris" },
    { value: "price_low", label: "Harga Terendah" },
    { value: "price_high", label: "Harga Tertinggi" },
    { value: "commission", label: "Komisi Tertinggi" }
  ];

  // Filter products based on search, category, and status
  const filteredProducts = sellingProducts.filter((product) =>
    (selectedCategory === "all" || product.category === selectedCategory) &&
    (selectedStatus === "all" || (product.isActive ? "active" : "out_of_stock") === selectedStatus) &&
    (product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Function to get status badge style
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'active':
        return isDarkMode
          ? "bg-green-500/20 text-green-500"
          : "bg-green-100 text-green-700";
      case 'out_of_stock':
        return isDarkMode
          ? "bg-red-500/20 text-red-500"
          : "bg-red-100 text-red-700";
      case 'pending':
        return isDarkMode
          ? "bg-yellow-500/20 text-yellow-500"
          : "bg-yellow-100 text-yellow-700";
      default:
        return isDarkMode
          ? "bg-gray-500/20 text-gray-500"
          : "bg-gray-100 text-gray-700";
    }
  };

  // Function to get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return "Aktif";
      case 'out_of_stock':
        return "Stok Habis";
      case 'pending':
        return "Belum Terjual";
      default:
        return "Unknown";
    }
  };

  // Handler for view product detail
  const handleViewProductDetail = (productId: string) => {
    navigate(`/dashboard/agent/product/${productId}`);
  };

  // Handler for add product to selling list
  const handleAddProductToSelling = () => {
    navigate("/dashboard/agent/catalog");
  };

  // Handler for back to dashboard
  const handleBackToDashboard = () => {
    navigate("/dashboard/agent");
  };

  return (
    <DashboardLayout role="agent" pageTitle="Produk dalam Penjualan">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleBackToDashboard}
            className={cn(
              "transition-colors duration-200",
              isDarkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-200 hover:bg-gray-100"
            )}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <div className="flex-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Produk dalam Penjualan</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Kelola produk yang sedang Anda jual saat ini
            </p>
          </div>
          <Button
            onClick={handleAddProductToSelling}
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
                  placeholder="Cari produk yang sedang dijual..."
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
              <div className="flex gap-2 flex-wrap md:flex-nowrap">
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
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className={cn(
                    "rounded-md border px-3 py-2 text-sm min-w-[150px]",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  )}
                >
                  {statusFilters.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
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

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.productId} className={cn(
              "overflow-hidden transition-all duration-300",
              isDarkMode
                ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                : "bg-white border-gray-200 hover:border-gray-300"
            )}>
              <div className="relative aspect-[4/3]">
                <img
                  src={product.imageUrls?.[0] || getPlaceholderImage()}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 inset-x-0 p-3 flex justify-between items-start">
                  <div className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-medium",
                    getStatusBadgeStyle(product.isActive ? "active" : "out_of_stock")
                  )}>
                    {getStatusLabel(product.isActive ? "active" : "out_of_stock")}
                  </div>
                  <div className="flex gap-1">
                    {product.features?.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className={cn(
                          "px-2.5 py-1 text-xs rounded-full font-medium",
                          "bg-blue-500/90 text-white"
                        )}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <CardContent className="p-5 space-y-4">
                <div>
                  <h3 className={cn(
                    "font-semibold text-lg line-clamp-1",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>{product.productName}</h3>
                  <p className={cn(
                    "text-sm line-clamp-2 mt-1",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>{product.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Tag className={cn(
                      "h-4 w-4 mr-1.5",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )} />
                    <span className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>{product.category}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className={cn(
                      "h-4 w-4 mr-1.5",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )} />
                    <span className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>{new Date(product.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-2 border-b border-dashed">
                  <div>
                    <p className={cn(
                      "text-lg font-bold",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>Rp {product.basePrice.toLocaleString()}</p>
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
                      "text-lg font-bold",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>0</p>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Belum Terjual
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <div>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>Stok tersedia</p>
                    <p className={cn(
                      "font-semibold",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>50 unit</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleViewProductDetail(product.productId)}
                    className={cn(
                      isDarkMode
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-200 hover:bg-gray-100"
                    )}
                  >
                    <Eye className="h-4 w-4 mr-1.5" />
                    Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className={cn(
            "flex flex-col items-center justify-center py-12 text-center",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}>
            <Package className="w-12 h-12 mb-3 opacity-30" />
            <h3 className="text-lg font-medium mb-1">Tidak ada produk ditemukan</h3>
            <p className="text-sm max-w-md">Tidak ada produk yang sesuai dengan kriteria pencarian saat ini. Coba ubah filter atau tambahkan produk baru.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedStatus("all");
              }}
              className={cn(
                "mt-4",
                isDarkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-200 hover:bg-gray-100"
              )}
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AgentSellingProducts; 