import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { Textarea } from "@/components/ui";
import { Badge } from "@/components/ui";
import { CreditCard, Truck, User, MapPin, Phone, Mail, ShoppingCart, Package, Check, Home, Building, Wallet } from "lucide-react";
import { useTheme } from "@/lib/store/theme";
import { useAddressStore, Address } from "@/lib/store/addresses";
import { usePaymentMethodStore, PaymentMethod } from "@/lib/store/paymentMethods";
import { cn } from "@/lib/utils";
import { getProductsByRole, getInventoryByProductId } from "@/lib/data/products";
import { useState } from "react";

const ResellerCheckout = () => {
  const { isDarkMode } = useTheme();

  // Get addresses and payment methods from stores
  const { getActiveAddresses, getDefaultAddress } = useAddressStore();
  const { getActivePaymentMethods, getDefaultPaymentMethod } = usePaymentMethodStore();

  const addresses = getActiveAddresses();
  const paymentMethods = getActivePaymentMethods();
  const defaultAddress = getDefaultAddress();
  const defaultPaymentMethod = getDefaultPaymentMethod();

  // State for selected address and payment method
  const [selectedAddress, setSelectedAddress] = useState<string>(defaultAddress?.id || "");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(defaultPaymentMethod?.id || "");
  const [orderNotes, setOrderNotes] = useState<string>("");

  // Get sample cart items using real product data
  const getCartItems = () => {
    const products = getProductsByRole('reseller');
    return products.slice(0, 2).map((product, index) => ({
      id: product.productId,
      name: product.productName,
      price: product.basePrice,
      quantity: index === 0 ? 2 : 1,
      image: product.imageUrls?.[0] || '/placeholder.webp',
    }));
  };

  const cartItems = getCartItems();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 25000;
  const total = subtotal + shipping;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "p-3 rounded-full",
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          )}>
            <CreditCard className={cn(
              "h-6 w-6",
              isDarkMode ? "text-gray-300" : "text-gray-600"
            )} />
          </div>
          <div>
            <h1 className={cn(
              "text-2xl font-bold tracking-tight",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Checkout
            </h1>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              Lengkapi informasi pengiriman dan pembayaran
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Checkout Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <Card className={cn(
            "transition-all duration-300",
            isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <Truck className={cn(
                  "h-5 w-5",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )} />
                <CardTitle className={cn(
                  "text-lg",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Informasi Pengiriman
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Address Summary */}
              {selectedAddress && addresses.length > 0 && (
                <div className={cn(
                  "p-4 rounded-lg border",
                  isDarkMode ? "bg-blue-900/10 border-blue-500/30" : "bg-blue-50 border-blue-200"
                )}>
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="h-4 w-4 text-blue-500" />
                    <span className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-blue-400" : "text-blue-700"
                    )}>
                      Alamat Pengiriman Terpilih
                    </span>
                  </div>
                  {(() => {
                    const selectedAddr = addresses.find(addr => addr.id === selectedAddress);
                    if (selectedAddr) {
                      return (
                        <div className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-700")}>
                          <p className="font-medium">{selectedAddr.recipient}</p>
                          <p>{selectedAddr.street}</p>
                          <p>{selectedAddr.city}, {selectedAddr.province} {selectedAddr.postalCode}</p>
                          <p>Tel: {selectedAddr.phone}</p>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}

              {/* Address Selection */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Home className={cn(
                    "h-4 w-4",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )} />
                  <h3 className={cn(
                    "text-sm font-medium",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    Pilih Alamat Pengiriman
                  </h3>
                </div>

                {addresses.length > 0 ? (
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
                ) : (
                  <div className={cn(
                    "p-6 text-center rounded-lg border",
                    isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
                  )}>
                    <Home className={cn(
                      "mx-auto h-12 w-12 mb-3",
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    )} />
                    <h3 className={cn(
                      "text-lg font-medium mb-1",
                      isDarkMode ? "text-gray-100" : ""
                    )}>Belum ada alamat</h3>
                    <p className={cn(
                      "mb-4",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>Tambahkan alamat pengiriman di pengaturan terlebih dahulu</p>
                    <Button
                      variant="outline"
                      onClick={() => window.location.href = '/settings/reseller'}
                      className={cn(
                        "transition-colors duration-300",
                        isDarkMode
                          ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700"
                          : ""
                      )}
                    >
                      Tambah Alamat
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className={cn(
            "transition-all duration-300",
            isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <CreditCard className={cn(
                  "h-5 w-5",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )} />
                <CardTitle className={cn(
                  "text-lg",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Metode Pembayaran
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Payment Method Summary */}
              {selectedPaymentMethod && paymentMethods.length > 0 && (
                <div className={cn(
                  "p-4 rounded-lg border",
                  isDarkMode ? "bg-blue-900/10 border-blue-500/30" : "bg-blue-50 border-blue-200"
                )}>
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="h-4 w-4 text-blue-500" />
                    <span className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-blue-400" : "text-blue-700"
                    )}>
                      Metode Pembayaran Terpilih
                    </span>
                  </div>
                  {(() => {
                    const selectedMethod = paymentMethods.find(method => method.id === selectedPaymentMethod);
                    if (selectedMethod) {
                      return (
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-md",
                            isDarkMode ? "bg-gray-700" : "bg-gray-100"
                          )}>
                            {selectedMethod.type === "credit_card" && (
                              <CreditCard className={cn("h-5 w-5", isDarkMode ? "text-gray-300" : "text-gray-600")} />
                            )}
                            {selectedMethod.type === "bank_transfer" && (
                              <Building className={cn("h-5 w-5", isDarkMode ? "text-gray-300" : "text-gray-600")} />
                            )}
                            {selectedMethod.type === "ewallet" && (
                              <Wallet className={cn("h-5 w-5", isDarkMode ? "text-gray-300" : "text-gray-600")} />
                            )}
                          </div>
                          <div className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-700")}>
                            <p className="font-medium">{selectedMethod.name}</p>
                            <p>{selectedMethod.info}</p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CreditCard className={cn(
                    "h-4 w-4",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )} />
                  <h3 className={cn(
                    "text-sm font-medium",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    Pilih Metode Pembayaran
                  </h3>
                </div>

                {paymentMethods.length > 0 ? (
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
                                <CreditCard className={cn("h-5 w-5", isDarkMode ? "text-gray-300" : "text-gray-600")} />
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
                ) : (
                  <div className={cn(
                    "p-6 text-center rounded-lg border",
                    isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
                  )}>
                    <CreditCard className={cn(
                      "mx-auto h-12 w-12 mb-3",
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    )} />
                    <h3 className={cn(
                      "text-lg font-medium mb-1",
                      isDarkMode ? "text-gray-100" : ""
                    )}>Belum ada metode pembayaran</h3>
                    <p className={cn(
                      "mb-4",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>Tambahkan metode pembayaran di pengaturan terlebih dahulu</p>
                    <Button
                      variant="outline"
                      onClick={() => window.location.href = '/settings/reseller'}
                      className={cn(
                        "transition-colors duration-300",
                        isDarkMode
                          ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700"
                          : ""
                      )}
                    >
                      Tambah Metode Pembayaran
                    </Button>
                  </div>
                )}
              </div>

              {/* Order Notes */}
              <div className="space-y-2">
                <Label htmlFor="orderNotes" className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Catatan Pesanan (Opsional)
                </Label>
                <Textarea
                  id="orderNotes"
                  placeholder="Tambahkan instruksi khusus atau catatan untuk pesanan"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                />
              </div>

              <div className={cn(
                "p-4 rounded-lg border",
                isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
              )}>
                <p className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  💡 <strong>Tips:</strong> Pembayaran via transfer bank akan diproses dalam 1-2 jam kerja
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className={cn(
            "transition-all duration-300 sticky top-6",
            isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <ShoppingCart className={cn(
                  "h-5 w-5",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )} />
                <CardTitle className={cn(
                  "text-lg",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Ringkasan Pesanan
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Package className={cn(
                    "h-4 w-4",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )} />
                  <span className={cn(
                    "text-sm font-medium",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    Item Pesanan ({cartItems.length})
                  </span>
                </div>
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className={cn(
                      "flex items-center justify-between p-3 rounded-lg border",
                      isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
                    )}>
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded-md"
                        />
                        <div>
                          <p className={cn(
                            "text-sm font-medium",
                            isDarkMode ? "text-gray-300" : "text-gray-900"
                          )}>
                            {item.name}
                          </p>
                          <p className={cn(
                            "text-xs",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className={cn(
                        "text-sm font-medium",
                        isDarkMode ? "text-gray-300" : "text-gray-900"
                      )}>
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className={cn(
                "border-t pt-4 space-y-3",
                isDarkMode ? "border-gray-700" : "border-gray-200"
              )}>
                <div className="flex justify-between items-center">
                  <span className={cn(
                    "text-sm",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    Subtotal ({cartItems.length} item)
                  </span>
                  <span className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-300" : "text-gray-900"
                  )}>
                    Rp {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Truck className={cn(
                      "h-4 w-4",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )} />
                    <span className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Pengiriman
                    </span>
                  </div>
                  <span className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-300" : "text-gray-900"
                  )}>
                    Rp {shipping.toLocaleString()}
                  </span>
                </div>

                <div className={cn(
                  "border-t pt-3",
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                )}>
                  <div className="flex justify-between items-center">
                    <span className={cn(
                      "text-lg font-bold",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      Total
                    </span>
                    <span className={cn(
                      "text-lg font-bold",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      Rp {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  className="w-full"
                  size="lg"
                  disabled={!selectedAddress || !selectedPaymentMethod}
                  onClick={() => {
                    if (!selectedAddress) {
                      alert('Silakan pilih alamat pengiriman terlebih dahulu');
                      return;
                    }
                    if (!selectedPaymentMethod) {
                      alert('Silakan pilih metode pembayaran terlebih dahulu');
                      return;
                    }
                    // Handle order submission
                    console.log('Order submitted:', {
                      address: selectedAddress,
                      paymentMethod: selectedPaymentMethod,
                      orderNotes,
                      items: cartItems,
                      total
                    });
                    alert('Pesanan berhasil dibuat!');
                  }}
                >
                  Buat Pesanan
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.history.back()}
                >
                  Kembali ke Keranjang
                </Button>
              </div>

              <div className={cn(
                "text-xs text-center pt-4",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                *Dengan melanjutkan, Anda menyetujui syarat dan ketentuan
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResellerCheckout;

