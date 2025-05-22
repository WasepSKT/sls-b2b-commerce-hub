import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { isDarkMode } = useTheme();

  // Mock cart data - replace with actual cart data
  const cart = {
    items: [
      {
        id: 1,
        name: "Premium Product",
        price: 1500000,
        quantity: 2,
        image: "/product-1.jpg",
      },
      {
        id: 2,
        name: "Standard Product",
        price: 750000,
        quantity: 1,
        image: "/product-2.jpg",
      },
    ],
    subtotal: 3750000,
    shipping: 50000,
    tax: 375000,
    total: 4175000,
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Implement order submission logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      toast({
        title: "Order Placed Successfully",
        description: "Your order has been placed and is being processed.",
      });
      
      // Redirect to order confirmation page
      // Implementation will be added later
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="customer" pageTitle="Checkout">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Checkout</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Selesaikan pesanan anda
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <Card className={cn(
            "lg:col-span-2 transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "text-lg font-semibold",
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className={cn(
                    "flex gap-4 py-4 border-b",
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  )}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className={cn(
                        "font-semibold",
                        isDarkMode ? "text-gray-100" : ""
                      )}>{item.name}</h3>
                      <p className={cn(
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>Jumlah: {item.quantity}</p>
                      <p className="text-primary font-medium">
                        Rp {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "text-lg font-semibold",
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Detail Pembayaran</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Metode Pembayaran</Label>
                    <Select>
                      <SelectTrigger className={cn(
                        isDarkMode ? "border-gray-700 bg-gray-750 text-gray-200" : ""
                      )}>
                        <SelectValue placeholder="Pilih metode pembayaran" />
                      </SelectTrigger>
                      <SelectContent className={cn(
                        isDarkMode ? "border-gray-700 bg-gray-750 text-gray-200" : ""
                      )}>
                        <SelectItem value="bank_transfer">Transfer Bank</SelectItem>
                        <SelectItem value="credit_card">Kartu Kredit</SelectItem>
                        <SelectItem value="ewallet">E-Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Alamat Pengiriman</Label>
                    <Textarea placeholder="Masukkan alamat pengiriman" className={cn(
                      isDarkMode ? "border-gray-700 bg-gray-750 text-gray-200" : ""
                    )} />
                  </div>

                  <div>
                    <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Catatan (Opsional)</Label>
                    <Textarea placeholder="Tambahkan instruksi khusus" className={cn(
                      isDarkMode ? "border-gray-700 bg-gray-750 text-gray-200" : ""
                    )} />
                  </div>
                </div>

                <div className={cn(
                  "space-y-3 pt-4 border-t",
                  isDarkMode ? "border-gray-700" : ""
                )}>
                  <div className="flex justify-between">
                    <span className={cn(isDarkMode ? "text-gray-300" : "")}>Subtotal</span>
                    <span className={cn(isDarkMode ? "text-gray-300" : "")}>Rp {cart.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={cn(isDarkMode ? "text-gray-300" : "")}>Biaya Pengiriman</span>
                    <span className={cn(isDarkMode ? "text-gray-300" : "")}>Rp {cart.shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={cn(isDarkMode ? "text-gray-300" : "")}>Pajak (10%)</span>
                    <span className={cn(isDarkMode ? "text-gray-300" : "")}>Rp {cart.tax.toLocaleString()}</span>
                  </div>
                  <div className={cn(
                    "flex justify-between font-bold text-lg pt-2 border-t",
                    isDarkMode ? "border-gray-700 text-white" : ""
                  )}>
                    <span>Total</span>
                    <span>Rp {cart.total.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className={cn(
                    "w-full transition-colors duration-300",
                    isDarkMode 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : ""
                  )} 
                  disabled={loading}
                >
                  {loading ? "Memproses..." : "Buat Pesanan"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Checkout; 