import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Package, Plus, Edit, Trash } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

const PrincipalProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Produk Premium 1",
      sku: "SKU-001",
      price: "Rp 150,000",
      category: "Elektronik",
      stock: 25,
      status: "Active"
    },
    {
      id: 2,
      name: "Produk Premium 2",
      sku: "SKU-002",
      price: "Rp 225,000",
      category: "Fashion",
      stock: 15,
      status: "Active"
    },
    {
      id: 3,
      name: "Produk Premium 3",
      sku: "SKU-003",
      price: "Rp 175,000",
      category: "Kesehatan",
      stock: 30,
      status: "Active"
    },
    {
      id: 4,
      name: "Produk Premium 4",
      sku: "SKU-004",
      price: "Rp 320,000",
      category: "Elektronik",
      stock: 10,
      status: "Out of Stock"
    },
    {
      id: 5,
      name: "Produk Premium 5",
      sku: "SKU-005",
      price: "Rp 180,000",
      category: "Rumah Tangga",
      stock: 22,
      status: "Active"
    },
    {
      id: 6,
      name: "Produk Premium 6",
      sku: "SKU-006",
      price: "Rp 250,000",
      category: "Fashion",
      stock: 0,
      status: "Out of Stock"
    },
    {
      id: 7,
      name: "Produk Premium 7",
      sku: "SKU-007",
      price: "Rp 300,000",
      category: "Elektronik",
      stock: 18,
      status: "Active"
    }
  ];

  const deleteProduct = (productId: number) => {
    toast({
      title: "Produk dihapus",
      description: `Produk #${productId} telah dihapus`,
    });
  };

  const productStats = [
    { title: "Total Produk", value: "152", icon: Package, iconClass: "text-primary" },
    { title: "Produk Aktif", value: "134", icon: Package, iconClass: "text-green-500" },
    { title: "Stok Menipis", value: "8", icon: Package, iconClass: "text-amber-500" },
    { title: "Habis Stok", value: "10", icon: Package, iconClass: "text-red-500" },
  ];

  return (
    <DashboardLayout role="principal" pageTitle="Manajemen Produk">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Produk</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Kelola produk dan inventaris Anda
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
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
            <Button 
              className={cn(
                "transition-colors duration-300",
                isDarkMode 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              <Plus className="mr-2 h-4 w-4" />
              Tambah Produk
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {productStats.map((stat, index) => (
            <Card key={index} className={cn(
              "transition-colors duration-300",
              isDarkMode 
                ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
                : "bg-white border-gray-200 hover:bg-gray-50"
            )}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    )}>{stat.title}</p>
                    <h3 className={cn(
                      "text-2xl font-bold tracking-tight",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>{stat.value}</h3>
                  </div>
                  <div className={`rounded-full p-2 ${stat.iconClass} ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <stat.icon className="h-6 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className={cn(
          "transition-colors duration-300",
          isDarkMode 
            ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
            : "bg-white border-gray-200 hover:bg-gray-50"
        )}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>Daftar Produk</CardTitle>
              <CardDescription className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-gray-300" : "text-gray-500"
              )}>
                Kelola semua produk Anda
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className={cn(
                "transition-colors duration-300",
                isDarkMode 
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700" 
                  : "border-gray-200 text-gray-700 hover:bg-gray-100"
              )}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className={cn(
                    "transition-colors duration-300",
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  )}>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>ID</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>Nama Produk</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>SKU</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>Kategori</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>Harga</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>Stok</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>Status</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300 text-right",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className={cn(
                      "transition-colors duration-300",
                      isDarkMode 
                        ? "hover:bg-gray-700/50 border-gray-700" 
                        : "hover:bg-gray-50 border-gray-200"
                    )}>
                      <TableCell className={cn(
                        "transition-colors duration-300",
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      )}>{product.id}</TableCell>
                      <TableCell className={cn(
                        "font-medium transition-colors duration-300",
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      )}>{product.name}</TableCell>
                      <TableCell className={cn(
                        "transition-colors duration-300",
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      )}>{product.sku}</TableCell>
                      <TableCell className={cn(
                        "transition-colors duration-300",
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      )}>{product.category}</TableCell>
                      <TableCell className={cn(
                        "transition-colors duration-300",
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      )}>{product.price}</TableCell>
                      <TableCell className={cn(
                        "transition-colors duration-300",
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      )}>{product.stock}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            product.status === "Active"
                              ? isDarkMode 
                                ? "bg-green-500/20 text-green-400"
                                : "bg-green-100 text-green-800"
                              : isDarkMode
                                ? "bg-red-500/20 text-red-400"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className={cn(
                              "transition-colors duration-300",
                              isDarkMode 
                                ? "text-gray-400 hover:text-white hover:bg-gray-700" 
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            )}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteProduct(product.id)}
                            className={cn(
                              "transition-colors duration-300",
                              isDarkMode 
                                ? "text-red-400 hover:text-red-300 hover:bg-red-900/30" 
                                : "text-red-600 hover:text-red-700 hover:bg-red-100"
                            )}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PrincipalProducts;
