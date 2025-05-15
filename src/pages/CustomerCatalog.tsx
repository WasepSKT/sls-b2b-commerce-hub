
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Package, ShoppingCart, Heart } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "@/hooks/use-toast";

const CustomerCatalog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Produk Premium 1",
      price: "Rp 150,000",
      discountPrice: "Rp 135,000",
      discount: "10%",
      category: "Elektronik",
      stock: 25,
      image: "https://placehold.co/300x200"
    },
    {
      id: 2,
      name: "Produk Premium 2",
      price: "Rp 225,000",
      discountPrice: "Rp 191,250",
      discount: "15%",
      category: "Fashion",
      stock: 15,
      image: "https://placehold.co/300x200"
    },
    {
      id: 3,
      name: "Produk Premium 3",
      price: "Rp 175,000",
      discountPrice: "Rp 166,250",
      discount: "5%",
      category: "Kesehatan",
      stock: 30,
      image: "https://placehold.co/300x200"
    },
    {
      id: 4,
      name: "Produk Premium 4",
      price: "Rp 320,000",
      discountPrice: "Rp 256,000",
      discount: "20%",
      category: "Elektronik",
      stock: 10,
      image: "https://placehold.co/300x200"
    },
    {
      id: 5,
      name: "Produk Premium 5",
      price: "Rp 180,000",
      discountPrice: "Rp 162,000",
      discount: "10%",
      category: "Rumah Tangga",
      stock: 22,
      image: "https://placehold.co/300x200"
    },
    {
      id: 6,
      name: "Produk Premium 6",
      price: "Rp 250,000",
      discountPrice: "Rp 225,000",
      discount: "10%",
      category: "Fashion",
      stock: 18,
      image: "https://placehold.co/300x200"
    },
  ];

  const categories = [
    "Semua",
    "Elektronik",
    "Fashion",
    "Kesehatan",
    "Rumah Tangga"
  ];

  const addToCart = (productId: number, productName: string) => {
    toast({
      title: "Produk ditambahkan",
      description: `${productName} telah ditambahkan ke keranjang`,
    });
  };

  return (
    <DashboardLayout role="customer" pageTitle="Katalog Produk">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Katalog Produk</h2>
            <p className="text-gray-500">
              Jelajahi produk terbaik dengan harga khusus untuk Anda
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="justify-start hover:bg-primary/5"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <p className="text-gray-500">
            Menampilkan {products.length} produk
          </p>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter & Urutkan
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-secondary">
                  -{product.discount}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 left-2 bg-white/70 hover:bg-white rounded-full"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2 mb-4">
                  <Badge variant="outline" className="font-normal">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-primary">{product.discountPrice}</p>
                    <p className="text-sm text-gray-500 line-through">{product.price}</p>
                  </div>
                  <p className="text-xs text-gray-500">Stok: {product.stock}</p>
                </div>
                <div className="flex justify-between gap-2">
                  <Button variant="outline" className="flex-1">
                    <Package className="h-4 w-4 mr-2" />
                    Detail
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => addToCart(product.id, product.name)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Beli
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerCatalog;
