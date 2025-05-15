
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Package, Plus, Edit, Trash } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "@/hooks/use-toast";

const PrincipalProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
            <h2 className="text-2xl font-semibold">Produk</h2>
            <p className="text-gray-500">
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
                className="pl-10 pr-4"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Produk
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {productStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                  </div>
                  <div className={`rounded-full p-2 ${stat.iconClass} bg-opacity-10`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Daftar Produk</CardTitle>
              <CardDescription>
                Kelola semua produk Anda
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nama Produk</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            product.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteProduct(product.id)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
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
