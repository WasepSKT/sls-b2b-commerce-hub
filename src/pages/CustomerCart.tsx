
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash, CreditCard, Package, Plus, Minus, ShoppingCart } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  quantity: number;
  image: string;
  discount: string;
}

const CustomerCart = () => {
  // Sample cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Produk Premium 1",
      price: "Rp 135,000",
      priceValue: 135000,
      quantity: 2,
      image: "https://placehold.co/100x100",
      discount: "10%"
    },
    {
      id: 2,
      name: "Produk Premium 2",
      price: "Rp 191,250",
      priceValue: 191250,
      quantity: 1,
      image: "https://placehold.co/100x100",
      discount: "15%"
    },
    {
      id: 3,
      name: "Produk Premium 3",
      price: "Rp 166,250",
      priceValue: 166250,
      quantity: 3,
      image: "https://placehold.co/100x100",
      discount: "5%"
    }
  ]);

  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      description: "Produk telah dihapus dari keranjang",
    });
  };

  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      toast({
        variant: "destructive",
        description: "Masukkan kode promo terlebih dahulu",
      });
      return;
    }
    
    // For demo, always accept promo code
    toast({
      title: "Kode promo berhasil diterapkan",
      description: "Diskon 10% telah ditambahkan",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0);
  const discount = 0.1 * subtotal; // 10% discount for demo
  const shipping = 25000;
  const total = subtotal - discount + shipping;

  const checkout = () => {
    toast({
      title: "Checkout berhasil",
      description: "Pesanan Anda akan segera diproses",
    });
  };

  return (
    <DashboardLayout role="customer" pageTitle="Keranjang Belanja">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Keranjang Belanja</h2>
            <p className="text-gray-500">
              {cartItems.length} produk di keranjang Anda
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            Lanjutkan Belanja
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Produk di Keranjang</CardTitle>
                  <CardDescription>
                    Produk yang siap untuk dipesan
                  </CardDescription>
                </div>
                <ShoppingCart className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                {cartItems.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produk</TableHead>
                          <TableHead>Harga</TableHead>
                          <TableHead>Jumlah</TableHead>
                          <TableHead>Subtotal</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <Badge className="mt-1 bg-secondary">{item.discount}</Badge>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-r-none"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                  className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-l-none"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              Rp {(item.priceValue * item.quantity).toLocaleString('id-ID')}
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium mb-1">Keranjang Anda kosong</h3>
                    <p className="text-gray-500 mb-4">Jelajahi katalog untuk menemukan produk yang Anda inginkan</p>
                    <Button asChild>
                      <a href="/dashboard/customer/catalog">Lihat Katalog</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-500">Subtotal</p>
                    <p className="font-medium">Rp {subtotal.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Diskon</p>
                    <p className="font-medium text-green-600">- Rp {discount.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Pengiriman</p>
                    <p className="font-medium">Rp {shipping.toLocaleString('id-ID')}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <p className="font-semibold">Total</p>
                  <p className="font-semibold text-lg">Rp {total.toLocaleString('id-ID')}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Kode promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    onClick={applyPromoCode}
                  >
                    Terapkan
                  </Button>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={checkout}
                  disabled={cartItems.length === 0}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Checkout
                </Button>

                <p className="text-xs text-gray-500 text-center mt-2">
                  Dengan menekan tombol Checkout, Anda menyetujui syarat & ketentuan yang berlaku
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerCart;
