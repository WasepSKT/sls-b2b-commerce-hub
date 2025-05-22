import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash, CreditCard, Package, Plus, Minus, ShoppingCart, Building, Wallet, Check, Home, CreditCard as CreditCardIcon } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  quantity: number;
  image: string;
  discount: string;
}

interface Address {
  id: string;
  label: string;
  recipient: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: "credit_card" | "bank_transfer" | "ewallet";
  name: string;
  info: string;
  isDefault: boolean;
}

// Checkout Modal Component
interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  selectedAddress: string;
  setSelectedAddress: (id: string) => void;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (id: string) => void;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  loading: boolean;
  handleSubmitOrder: (e: React.FormEvent) => void;
  isDarkMode: boolean;
}

const CheckoutModal = ({
  open,
  onOpenChange,
  addresses,
  paymentMethods,
  selectedAddress,
  setSelectedAddress,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  orderNotes,
  setOrderNotes,
  subtotal,
  discount,
  shipping,
  total,
  loading,
  handleSubmitOrder,
  isDarkMode
}: CheckoutModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "sm:max-w-[600px] max-h-[80vh] overflow-y-auto",
        isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
      )}>
        <DialogHeader>
          <DialogTitle className={cn(
            isDarkMode ? "text-gray-100" : ""
          )}>Checkout</DialogTitle>
          <DialogDescription className={cn(
            isDarkMode ? "text-gray-400" : ""
          )}>
            Tinjau pesanan Anda dengan alamat dan metode pembayaran yang terpilih
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitOrder} className="space-y-6">
          <div className="space-y-4">
            {/* Payment Method Selection */}
            <div>
              <h3 className={cn(
                "text-sm font-medium mb-3 flex items-center",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                <CreditCardIcon className="h-4 w-4 mr-2" />
                Metode Pembayaran
              </h3>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={cn(
                      "rounded-md border p-4 cursor-pointer transition-colors",
                      selectedPaymentMethod === method.id 
                        ? isDarkMode ? "border-blue-500 bg-blue-900/20" : "border-blue-500 bg-blue-50" 
                        : isDarkMode ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-md",
                          isDarkMode ? "bg-gray-700" : "bg-gray-100"
                        )}>
                          {method.type === "credit_card" && (
                            <CreditCardIcon className={cn("h-5 w-5", isDarkMode ? "text-gray-300" : "text-gray-600")} />
                          )}
                          {method.type === "bank_transfer" && (
                            <Building className={cn("h-5 w-5", isDarkMode ? "text-gray-300" : "text-gray-600")} />
                          )}
                          {method.type === "ewallet" && (
                            <Wallet className={cn("h-5 w-5", isDarkMode ? "text-gray-300" : "text-gray-600")} />
                          )}
                        </div>
                        <div>
                          <p className={cn("font-medium", isDarkMode ? "text-gray-100" : "")}>{method.name}</p>
                          <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>{method.info}</p>
                        </div>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <Check className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Address Selection */}
            <div>
              <h3 className={cn(
                "text-sm font-medium mb-3 flex items-center",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                <Home className="h-4 w-4 mr-2" />
                Alamat Pengiriman
              </h3>
              
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div 
                    key={address.id}
                    onClick={() => setSelectedAddress(address.id)}
                    className={cn(
                      "rounded-md border p-4 cursor-pointer transition-colors",
                      selectedAddress === address.id 
                        ? isDarkMode ? "border-blue-500 bg-blue-900/20" : "border-blue-500 bg-blue-50" 
                        : isDarkMode ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <p className={cn("font-medium", isDarkMode ? "text-gray-100" : "")}>{address.label}</p>
                        {address.isDefault && (
                          <Badge className={cn(
                            isDarkMode ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : ""
                          )}>Default</Badge>
                        )}
                      </div>
                      {selectedAddress === address.id && (
                        <Check className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div className="mt-2">
                      <p className={cn(isDarkMode ? "text-gray-300" : "")}>{address.recipient}</p>
                      <p className={cn(isDarkMode ? "text-gray-300" : "")}>{address.street}</p>
                      <p className={cn(isDarkMode ? "text-gray-300" : "")}>
                        {address.city}, {address.province} {address.postalCode}
                      </p>
                      <p className={cn(isDarkMode ? "text-gray-300" : "")}>{address.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Catatan (Opsional)</Label>
              <Textarea 
                placeholder="Tambahkan instruksi khusus" 
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )} 
              />
            </div>
          </div>
          
          <div className={cn(
            "space-y-3 pt-4 border-t",
            isDarkMode ? "border-gray-700" : ""
          )}>
            <div className="flex justify-between">
              <span className={cn(isDarkMode ? "text-gray-300" : "")}>Subtotal</span>
              <span className={cn(isDarkMode ? "text-gray-300" : "")}>Rp {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className={cn(isDarkMode ? "text-gray-300" : "")}>Diskon</span>
              <span className="text-green-500">- Rp {discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className={cn(isDarkMode ? "text-gray-300" : "")}>Biaya Pengiriman</span>
              <span className={cn(isDarkMode ? "text-gray-300" : "")}>Rp {shipping.toLocaleString()}</span>
            </div>
            <div className={cn(
              "flex justify-between font-bold text-lg pt-2 border-t",
              isDarkMode ? "border-gray-700 text-white" : ""
            )}>
              <span>Total</span>
              <span>Rp {total.toLocaleString()}</span>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className={cn(
                isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : ""
              )}
              type="button"
            >
              Batal
            </Button>
            <Button 
              type="submit" 
              className={cn(
                "transition-colors duration-300",
                isDarkMode 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : ""
              )} 
              disabled={loading || !selectedAddress || !selectedPaymentMethod}
            >
              {loading ? "Memproses..." : "Buat Pesanan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const CustomerCart = () => {
  const { isDarkMode } = useTheme();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [orderNotes, setOrderNotes] = useState("");
  
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

  // Sample addresses
  const addresses: Address[] = [
    {
      id: "addr-1",
      label: "Rumah",
      recipient: "Budi Santoso",
      street: "Jl. Merdeka No. 123",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12150",
      phone: "081234567890",
      isDefault: true
    },
    {
      id: "addr-2",
      label: "Kantor",
      recipient: "Budi Santoso",
      street: "Gedung Centennial Tower Lt. 28, Jl. Gatot Subroto Kav. 24-25",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12930",
      phone: "081234567890",
      isDefault: false
    }
  ];

  // Sample payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: "pm-1",
      type: "credit_card",
      name: "VISA **** 1234",
      info: "Kadaluwarsa: 05/26",
      isDefault: true
    },
    {
      id: "pm-2",
      type: "credit_card",
      name: "Mastercard **** 5678",
      info: "Kadaluwarsa: 08/27",
      isDefault: false
    },
    {
      id: "pm-3",
      type: "bank_transfer",
      name: "Bank BCA",
      info: "Transfer Manual",
      isDefault: false
    },
    {
      id: "pm-4",
      type: "ewallet",
      name: "GoPay",
      info: "081234567890",
      isDefault: false
    }
  ];

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
    // Set default address and payment method based on isDefault flag
    setSelectedAddress(addresses.find(a => a.isDefault)?.id || addresses[0]?.id || "");
    setSelectedPaymentMethod(paymentMethods.find(p => p.isDefault)?.id || paymentMethods[0]?.id || "");
    setOrderNotes("");
    setCheckoutOpen(true);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      setCheckoutOpen(false);
      toast({
        title: "Pesanan berhasil dibuat",
        description: "Pesanan Anda sedang diproses",
      });
      
      // Optionally clear cart here
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memproses pesanan Anda",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="customer" pageTitle="Keranjang Belanja">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Keranjang Belanja</h2>
            <p className={cn(
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              {cartItems.length} produk di keranjang Anda
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.history.back()}
            className={cn(
              isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : "hover:bg-gray-100"
            )}
          >
            Lanjutkan Belanja
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className={cn(
              "transition-colors duration-300",
              isDarkMode 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-200"
            )}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className={cn(
                    isDarkMode ? "text-gray-50" : "text-slate-900"
                  )}>Produk di Keranjang</CardTitle>
                  <CardDescription className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    Produk yang siap untuk dipesan
                  </CardDescription>
                </div>
                <ShoppingCart className={cn(
                  "h-5 w-5",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )} />
              </CardHeader>
              <CardContent>
                {cartItems.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className={cn(
                          isDarkMode ? "border-gray-700 hover:bg-transparent" : "hover:bg-white"
                        )}>
                          <TableHead className={cn(
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          )}>Produk</TableHead>
                          <TableHead className={cn(
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          )}>Harga</TableHead>
                          <TableHead className={cn(
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          )}>Jumlah</TableHead>
                          <TableHead className={cn(
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          )}>Subtotal</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.id} className={cn(
                            isDarkMode ? "border-gray-700 hover:bg-transparent" : "hover:bg-white"
                          )}>
                            <TableCell className={cn(
                              isDarkMode ? "text-gray-300" : ""
                            )}>
                              <div className="flex items-center gap-3">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div>
                                  <p className={cn(
                                    "font-medium", 
                                    isDarkMode ? "text-gray-100" : ""
                                  )}>{item.name}</p>
                                  <Badge className={cn(
                                    "mt-1 border transition-colors",
                                    isDarkMode 
                                      ? "bg-blue-500/20 text-blue-400 border-blue-500/30" 
                                      : "bg-red-100 text-red-700 border-red-200 font-medium"
                                  )}>{item.discount}</Badge>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className={cn(
                              isDarkMode ? "text-gray-300" : ""
                            )}>{item.price}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className={cn(
                                    "h-8 w-8 rounded-r-none",
                                    isDarkMode ? "border-gray-600 bg-gray-700 text-gray-300" : ""
                                  )}
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                  className={cn(
                                    "h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                                    isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                                  )}
                                />
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className={cn(
                                    "h-8 w-8 rounded-l-none",
                                    isDarkMode ? "border-gray-600 bg-gray-700 text-gray-300" : ""
                                  )}
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className={cn(
                              "font-medium",
                              isDarkMode ? "text-gray-100" : ""
                            )}>
                              Rp {(item.priceValue * item.quantity).toLocaleString('id-ID')}
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className={cn(
                                  isDarkMode ? "hover:bg-gray-700" : ""
                                )}
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
                    <Package className={cn(
                      "mx-auto h-12 w-12 mb-3",
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    )} />
                    <h3 className={cn(
                      "text-lg font-medium mb-1",
                      isDarkMode ? "text-gray-100" : ""
                    )}>Keranjang Anda kosong</h3>
                    <p className={cn(
                      "mb-4",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>Jelajahi katalog untuk menemukan produk yang Anda inginkan</p>
                    <Button 
                      asChild
                      className={cn(
                        "transition-colors duration-300",
                        isDarkMode 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : ""
                      )}
                    >
                      <a href="/dashboard/customer/catalog">Lihat Katalog</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className={cn(
              "transition-colors duration-300",
              isDarkMode 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-200"
            )}>
              <CardHeader>
                <CardTitle className={cn(
                  isDarkMode ? "text-gray-50" : "text-slate-900"
                )}>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className={cn(isDarkMode ? "text-gray-300" : "text-gray-500")}>Subtotal</p>
                    <p className={cn("font-medium", isDarkMode ? "text-gray-100" : "")}>
                      Rp {subtotal.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className={cn(isDarkMode ? "text-gray-300" : "text-gray-500")}>Diskon</p>
                    <p className="font-medium text-green-600">
                      - Rp {discount.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className={cn(isDarkMode ? "text-gray-300" : "text-gray-500")}>Pengiriman</p>
                    <p className={cn("font-medium", isDarkMode ? "text-gray-100" : "")}>
                      Rp {shipping.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <Separator className={cn(isDarkMode ? "bg-gray-700" : "")} />

                <div className="flex justify-between">
                  <p className={cn("font-semibold", isDarkMode ? "text-gray-100" : "")}>Total</p>
                  <p className={cn("font-semibold text-lg", isDarkMode ? "text-gray-100" : "")}>
                    Rp {total.toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Kode promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className={cn(
                      isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                    )}
                  />
                  <Button 
                    variant="outline" 
                    onClick={applyPromoCode}
                    className={cn(
                      isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : ""
                    )}
                  >
                    Terapkan
                  </Button>
                </div>

                <Button 
                  className={cn(
                    "w-full transition-colors duration-300",
                    isDarkMode 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : ""
                  )}
                  size="lg"
                  onClick={checkout}
                  disabled={cartItems.length === 0}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Checkout
                </Button>

                <p className={cn(
                  "text-xs text-center mt-2",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )}>
                  Dengan menekan tombol Checkout, Anda menyetujui syarat & ketentuan yang berlaku
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Use the CheckoutModal component */}
      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        addresses={addresses}
        paymentMethods={paymentMethods}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        orderNotes={orderNotes}
        setOrderNotes={setOrderNotes}
        subtotal={subtotal}
        discount={discount}
        shipping={shipping}
        total={total}
        loading={loading}
        handleSubmitOrder={handleSubmitOrder}
        isDarkMode={isDarkMode}
      />
    </DashboardLayout>
  );
};

export default CustomerCart;
