import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Search, Save } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { distributorProducts as allProducts } from "@/lib/data/products"; // Using mock data

const DistributorProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [products, setProducts] = useState(allProducts.map(p => ({ ...p, sellingPrice: p.base_price })));

  const handlePriceChange = (productId: string, newPrice: string) => {
    const price = parseFloat(newPrice);
    if (!isNaN(price)) {
      setProducts(products.map(p => p.product_id === productId ? { ...p, sellingPrice: price } : p));
    }
  };

  const handleSavePrice = (productId: string) => {
    const product = products.find(p => p.product_id === productId);
    toast({
      title: "Harga Disimpan",
      description: `Harga jual untuk ${product?.product_name} telah disimpan.`,
    });
  };

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="distributor" pageTitle="Manajemen Produk">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Produk Distributor</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Lihat produk yang ditugaskan dan tetapkan harga jual Anda.
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
            )}>Daftar Produk</CardTitle>
            <CardDescription className={cn(
              "transition-colors duration-300",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Kelola harga jual untuk produk Anda.
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
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-700")}>Kategori</TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-700")}>Harga Beli</TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-700")}>Harga Jual</TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-700")}>Stok</TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-700")}>Status</TableHead>
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
                        <TableCell className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>{product.category}</TableCell>
                        <TableCell className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>{`Rp ${product.base_price.toLocaleString()}`}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={product.sellingPrice}
                            onChange={(e) => handlePriceChange(product.product_id, e.target.value)}
                            className={cn("w-32", isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white")}
                          />
                        </TableCell>
                        <TableCell className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>{product.stock}</TableCell>
                        <TableCell>
                          <Badge className={cn(product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}>
                            {product.stock > 0 ? "Tersedia" : "Habis"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSavePrice(product.product_id)}
                            className={cn(isDarkMode ? "border-blue-700 text-blue-300 hover:bg-blue-900/30" : "")}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
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

export default DistributorProducts;