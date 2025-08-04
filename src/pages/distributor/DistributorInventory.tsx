import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Search, Save } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { distributorProducts as allProducts, Product } from "@/lib/data/products"; // Using mock data

// Define a new type that includes the inventory and location properties
interface InventoryProduct extends Product {
  inventory: number;
  location: string;
}

const DistributorInventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  // Initialize state with inventory and location for each product
  const [products, setProducts] = useState<InventoryProduct[]>(
    allProducts.map(p => ({ ...p, inventory: Math.floor(Math.random() * 100) + 10, location: 'Gudang Utama' }))
  );

  const handleStockChange = (productId: string, newStock: string) => {
    const stock = parseInt(newStock, 10);
    if (!isNaN(stock)) {
      setProducts(products.map(p => p.product_id === productId ? { ...p, inventory: stock } : p));
    }
  };

  const handleSaveStock = (productId: string) => {
    const product = products.find(p => p.product_id === productId);
    toast({
      title: "Stok Disimpan",
      description: `Stok untuk ${product?.product_name} telah diperbarui.`,
    });
  };

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="distributor" pageTitle="Manajemen Inventaris">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Inventaris Distributor</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Kelola kuantitas stok produk di gudang Anda.
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-10 pr-4 transition-colors duration-300",
                isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
              )}
            />
          </div>
        </div>

        <Card className={cn(
          "transition-colors duration-300",
          isDarkMode 
            ? "bg-transparent backdrop-blur-sm border-blue-900/50" 
            : "bg-white border-gray-200 hover:bg-gray-50"
        )}>
          <CardHeader>
            <CardTitle className={cn(
              "transition-colors duration-300",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>Daftar Stok Produk</CardTitle>
            <CardDescription className={cn(
              "transition-colors duration-300",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Perbarui jumlah stok untuk setiap produk.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className={cn(
                    "transition-colors duration-300",
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  )}>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-700")}>Nama Produk</TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-700")}>SKU</TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-700")}>Stok Saat Ini</TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-700")}>Lokasi</TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-700")}>Ubah Stok</TableHead>
                    <TableHead className={cn("text-right", isDarkMode ? "text-gray-100" : "text-gray-700")}>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <TableRow key={product.product_id} className={cn(
                        "transition-colors duration-300",
                        isDarkMode 
                          ? "hover:bg-blue-900/20 border-gray-700" 
                          : "hover:bg-blue-50/70 border-gray-200"
                      )}>
                        <TableCell className={cn("font-medium", isDarkMode ? "text-gray-100" : "text-gray-900")}>{product.product_name}</TableCell>
                        <TableCell className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>{product.SKU || 'N/A'}</TableCell>
                        <TableCell className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>{product.inventory}</TableCell>
                        <TableCell className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>{product.location}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={product.inventory}
                            onChange={(e) => handleStockChange(product.product_id, e.target.value)}
                            className={cn("w-24", isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white")}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSaveStock(product.product_id)}
                            className={cn(isDarkMode ? "border-blue-700 text-blue-300 hover:bg-blue-900/30" : "")}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Tidak ada produk yang ditemukan.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DistributorInventory;