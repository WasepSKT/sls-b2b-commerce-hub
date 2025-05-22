import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, CreditCard, Package, ShoppingBag, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { useProducts } from "@/lib/store/products";
import { useCart } from "@/lib/store/cart";
import { useToast } from "@/hooks/use-toast";

const CustomerDashboard = () => {
  const { isDarkMode } = useTheme();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Sample data for dashboard stats with dark mode compatible icon classes
  const stats = [
    { 
      title: "Total Pembelian", 
      value: "Rp 1,245,000", 
      icon: CreditCard, 
      iconClass: isDarkMode ? "text-blue-400" : "text-primary" 
    },
    { 
      title: "Pesanan Aktif", 
      value: "3", 
      icon: ShoppingBag, 
      iconClass: isDarkMode ? "text-purple-400" : "text-secondary" 
    },
    { 
      title: "Produk di Keranjang", 
      value: "5", 
      icon: ShoppingCart, 
      iconClass: "text-amber-500" 
    },
    { 
      title: "Poin Reward", 
      value: "750", 
      icon: Award, 
      iconClass: "text-emerald-500" 
    },
  ];

  // Sample order data
  const orders = [
    { id: "ORD-1234", date: "20 Mei 2025", status: "Dikirim", items: 3, total: "Rp 450,000" },
    { id: "ORD-1233", date: "18 Mei 2025", status: "Diproses", items: 2, total: "Rp 275,000" },
    { id: "ORD-1232", date: "15 Mei 2025", status: "Selesai", items: 5, total: "Rp 520,000" },
    { id: "ORD-1231", date: "10 Mei 2025", status: "Selesai", items: 1, total: "Rp 150,000" },
  ];

  // Get featured products from the product catalog (use first 3 products)
  const featuredProducts = products
    .filter(product => product.discount > 0) // Only get products with discount
    .slice(0, 3)
    .map(product => ({
      id: product.id,
      name: product.name,
      price: `Rp ${product.price.toLocaleString()}`,
      discount: `${product.discount}%`,
      originalProduct: product
    }));
    
  // Handle adding product to cart
  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
    toast({
      title: "Added to cart",
      description: `Product has been added to your cart`,
    });
  };
  
  // Handle view product details
  const handleViewDetail = (productId: string) => {
    navigate(`/dashboard/customer/product/${productId}`);
  };

  return (
    <DashboardLayout role="customer" pageTitle="Dashboard Pelanggan B2B">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Dashboard</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Selamat datang, lihat ringkasan aktivitas belanja Anda
            </p>
          </div>
        </div>
      
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
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
                  <div className={cn(
                    "rounded-full p-2",
                    `${stat.iconClass} ${isDarkMode ? "bg-opacity-20" : "bg-opacity-10"}`
                  )}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className={cn(
            "col-span-2 transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-200"
          )}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className={cn(
                  "text-lg font-semibold",
                  isDarkMode ? "text-gray-50" : "text-slate-900"
                )}>Pesanan Terakhir</CardTitle>
                <CardDescription className={cn(
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )}>
                  Riwayat pesanan terbaru Anda
                </CardDescription>
              </div>
              <Link to="/dashboard/customer/orders">
                <Button variant="outline" size="sm" className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : "hover:bg-gray-100"
                )}>Lihat Semua</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={cn(
                      "text-left text-sm border-b",
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    )}>
                      <th className={cn(
                        "py-3 px-4 font-medium",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      )}>No. Pesanan</th>
                      <th className={cn(
                        "py-3 px-4 font-medium",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      )}>Tanggal</th>
                      <th className={cn(
                        "py-3 px-4 font-medium",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      )}>Item</th>
                      <th className={cn(
                        "py-3 px-4 font-medium",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      )}>Total</th>
                      <th className={cn(
                        "py-3 px-4 font-medium",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      )}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className={cn(
                        "border-b last:border-0",
                        isDarkMode 
                          ? "border-gray-700 hover:bg-transparent" 
                          : "border-gray-200 hover:bg-white"
                      )}>
                        <td className={cn(
                          "py-3 px-4",
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        )}>
                          <span className="font-medium">{order.id}</span>
                        </td>
                        <td className={cn(
                          "py-3 px-4",
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        )}>{order.date}</td>
                        <td className={cn(
                          "py-3 px-4",
                          isDarkMode ? "text-gray-300" : "text-gray-900"
                        )}>{order.items} produk</td>
                        <td className={cn(
                          "py-3 px-4 font-medium",
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        )}>{order.total}</td>
                        <td className="py-3 px-4">
                          <Badge
                            className={cn(
                              "border transition-colors hover:bg-opacity-0 hover:bg-transparent",
                              order.status === "Selesai"
                                ? isDarkMode 
                                  ? "bg-green-500/20 text-green-400 border-green-500/30" 
                                  : "bg-green-100 text-green-800 border-green-300"
                                : order.status === "Dikirim"
                                ? isDarkMode 
                                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30" 
                                  : "bg-blue-100 text-blue-800 border-blue-300"
                                : isDarkMode 
                                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30" 
                                  : "bg-amber-50 text-amber-800 border-amber-300 font-medium"
                            )}
                          >
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

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
              )}>Produk Unggulan</CardTitle>
              <CardDescription className={cn(
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                Produk dengan harga khusus untuk Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredProducts.map((product) => (
                  <div key={product.id} className={cn(
                    "border rounded-lg p-4 relative transition-colors",
                    isDarkMode 
                      ? "border-gray-700 hover:border-blue-500" 
                      : "hover:border-primary"
                  )}>
                    <div className={cn(
                      "absolute -top-2 -right-2 text-white text-xs rounded-full px-2 py-1",
                      isDarkMode ? "bg-blue-600" : "bg-red-500"
                    )}>
                      -{product.discount}
                    </div>
                    <div className="flex items-center">
                      <div className={cn(
                        "h-12 w-12 rounded flex items-center justify-center mr-4",
                        isDarkMode ? "bg-gray-700" : "bg-gray-200"
                      )}>
                        <Package className={cn(
                          "h-6 w-6",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )} />
                      </div>
                      <div>
                        <h4 className={cn(
                          "font-semibold",
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        )}>{product.name}</h4>
                        <p className={cn(
                          "text-sm font-medium",
                          isDarkMode ? "text-blue-400" : "text-primary"
                        )}>{product.price}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={cn(
                          isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : "hover:bg-gray-100"
                        )}
                        onClick={() => handleViewDetail(product.id)}
                      >
                        Detail
                      </Button>
                      <Button 
                        size="sm" 
                        className={cn(
                          "transition-colors duration-300",
                          isDarkMode 
                            ? "bg-blue-600 text-white hover:bg-blue-700" 
                            : "bg-primary text-white hover:bg-primary/90"
                        )}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        + Keranjang
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

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
            )}>Program Reward</CardTitle>
            <CardDescription className={cn(
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}>
              Poin reward Anda dan cara menukarkannya
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={cn(
                "rounded-lg p-6 relative",
                isDarkMode 
                  ? "bg-gray-750 border-gray-700" 
                  : "bg-primary-50 border border-primary-100"
              )}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={cn(
                      "font-semibold text-lg",
                      isDarkMode ? "text-blue-400" : "text-primary"
                    )}>Level Anda: Silver</h3>
                    <p className={cn(
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>750 poin terkumpul</p>
                  </div>
                  <Award className={cn(
                    "h-12 w-12",
                    isDarkMode ? "text-blue-400" : "text-primary"
                  )} />
                </div>
                <div className="mt-4">
                  <div className={cn(
                    "h-2 rounded-full",
                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                  )}>
                    <div className={cn(
                      "h-2 rounded-full w-3/4",
                      isDarkMode ? "bg-blue-600" : "bg-primary"
                    )}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-gray-600">
                    <span className={cn(
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>0 poin</span>
                    <span className={cn(
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>750/1000 poin untuk Level Gold</span>
                  </div>
                </div>
              </div>

              <div className={cn(
                "border rounded-lg p-4",
                isDarkMode ? "border-gray-700" : ""
              )}>
                <h4 className={cn(
                  "font-semibold mb-2",
                  isDarkMode ? "text-gray-100" : ""
                )}>Tukar Poin Anda</h4>
                <p className={cn(
                  "text-sm mb-4",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>Pilih hadiah yang tersedia untuk ditukarkan dengan poin Anda.</p>
                <div className="flex justify-end">
                  <Button 
                    onClick={() => navigate("/dashboard/customer/rewards")}
                    className={cn(
                      "transition-colors duration-300",
                      isDarkMode 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "bg-primary text-white hover:bg-primary/90"
                    )}
                  >
                    Katalog Hadiah
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
