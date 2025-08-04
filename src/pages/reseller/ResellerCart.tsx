import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Input } from "@/components/ui";
import { Trash2, ShoppingCart, Package, Truck, CreditCard } from "lucide-react";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { getProductsByRole, getInventoryByProductId } from "@/lib/data/products";
import ScrollToTop from "@/components/ScrollToTop";

// Sample cart items using real product data
const getCartItems = () => {
  const products = getProductsByRole('reseller');
  return products.slice(0, 2).map((product, index) => {
    const inventory = getInventoryByProductId(product.productId);
    return {
      id: product.productId,
      name: product.productName,
      price: product.basePrice,
      quantity: index === 0 ? 2 : 1,
      image: product.imageUrls?.[0] || '/placeholder.webp',
      stock: inventory?.quantityOnHand ?? 0,
    };
  });
};

const ResellerCart = () => {
  const { isDarkMode } = useTheme();
  const cartItems = getCartItems();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 25000;
  const total = subtotal + shipping;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <ScrollToTop />
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "p-3 rounded-full",
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          )}>
            <ShoppingCart className={cn(
              "h-6 w-6",
              isDarkMode ? "text-gray-300" : "text-gray-600"
            )} />
          </div>
          <div>
            <h1 className={cn(
              "text-xl sm:text-2xl font-bold tracking-tight",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Keranjang Belanja
            </h1>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              {cartItems.length} item di keranjang
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8 max-w-full">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 order-1 min-w-0">
          <Card className={cn(
            "transition-all duration-300",
            isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <Package className={cn(
                  "h-5 w-5",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )} />
                <CardTitle className={cn(
                  "text-lg",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Item di Keranjang
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className={cn(
                    "h-12 w-12 mx-auto mb-4",
                    isDarkMode ? "text-gray-400" : "text-gray-300"
                  )} />
                  <p className={cn(
                    "text-lg font-medium",
                    isDarkMode ? "text-gray-300" : "text-gray-900"
                  )}>
                    Keranjang belanja kosong
                  </p>
                  <p className={cn(
                    "text-sm",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    Tambahkan produk ke keranjang untuk melanjutkan
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-w-full">
                  {cartItems.map((item) => (
                    <div key={item.id} className={cn(
                      "flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border max-w-full",
                      isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
                    )}>
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0 max-w-full">
                          <h3 className={cn(
                            "font-medium text-sm sm:text-base truncate",
                            isDarkMode ? "text-gray-300" : "text-gray-900"
                          )}>
                            {item.name}
                          </h3>
                          <p className={cn(
                            "text-xs sm:text-sm",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>
                            Stok tersedia: {item.stock} unit
                          </p>
                          <p className={cn(
                            "text-xs sm:text-sm mt-1",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>
                            Rp {item.price.toLocaleString()} per unit
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <Input
                            type="number"
                            value={item.quantity}
                            min="1"
                            max={item.stock}
                            className={cn(
                              "w-16 sm:w-20 text-center text-xs sm:text-sm",
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                : "bg-white border-gray-200"
                            )}
                          />
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-2">
                          <div className="text-center sm:text-right">
                            <p className={cn(
                              "font-bold text-sm sm:text-base",
                              isDarkMode ? "text-gray-300" : "text-gray-900"
                            )}>
                              Rp {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-8 w-8 p-0",
                              isDarkMode ? "hover:bg-red-900/20" : "hover:bg-red-50"
                            )}
                          >
                            <Trash2 className={cn(
                              "h-4 w-4",
                              isDarkMode ? "text-gray-400 hover:text-red-400" : "text-gray-500 hover:text-red-600"
                            )} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1 order-2 min-w-0">
          <Card className={cn(
            "transition-all duration-300 sticky top-6 max-w-full",
            isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="pb-4 px-3 sm:px-6">
              <div className="flex items-center space-x-2">
                <CreditCard className={cn(
                  "h-5 w-5",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )} />
                <CardTitle className={cn(
                  "text-base sm:text-lg",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  Ringkasan Pesanan
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 px-3 sm:px-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={cn(
                    "text-xs sm:text-sm",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    Subtotal ({cartItems.length} item)
                  </span>
                  <span className={cn(
                    "font-medium text-xs sm:text-sm",
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
                      "text-xs sm:text-sm",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Pengiriman
                    </span>
                  </div>
                  <span className={cn(
                    "font-medium text-xs sm:text-sm",
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
                      "text-base sm:text-lg font-bold",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      Total
                    </span>
                    <span className={cn(
                      "text-base sm:text-lg font-bold",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      Rp {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  className="w-full text-sm sm:text-base"
                  size="lg"
                  disabled={cartItems.length === 0}
                >
                  Lanjutkan ke Checkout
                </Button>

                <Button
                  variant="outline"
                  className="w-full text-sm sm:text-base"
                >
                  Lanjutkan Belanja
                </Button>
              </div>

              <div className={cn(
                "text-xs text-center pt-4",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                *Harga sudah termasuk PPN
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResellerCart;
