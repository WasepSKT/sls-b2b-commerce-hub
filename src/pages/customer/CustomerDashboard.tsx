import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import CustomerLayout from "@/components/CustomerLayout";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { Award, CreditCard, Package, ShoppingBag, ShoppingCart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { useProducts } from "@/lib/store/products";
import { useCart } from "@/lib/store/cart";
import { useToast } from "@/hooks/use-toast";
import { orders, getOrderItemsByOrderId } from "@/lib/data/orders";
import { useAuth } from "@/lib/store/auth";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get customer orders
  const customerOrders = orders.filter(order => order.customerId === user?.userId);
  const activeOrders = customerOrders.filter(order =>
    ['pending', 'confirmed', 'processing', 'shipped'].includes(order.orderStatus)
  );
  const totalSpent = customerOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  // Calculate growth percentages (mock data)
  const purchaseGrowth = 8.5;
  const orderGrowth = 12.3;
  const cartGrowth = 5.7;
  const rewardGrowth = 15.2;

  // Sample data for dashboard stats with dark mode compatible icon classes
  const stats = [
    {
      title: "Total Pembelian",
      value: `Rp ${totalSpent.toLocaleString()}`,
      change: `${purchaseGrowth}%`,
      trend: "up",
      icon: CreditCard,
      iconClass: isDarkMode ? "text-blue-400" : "text-primary"
    },
    {
      title: "Pesanan Aktif",
      value: activeOrders.length.toString(),
      change: `${orderGrowth}%`,
      trend: "up",
      icon: ShoppingBag,
      iconClass: isDarkMode ? "text-purple-400" : "text-secondary"
    },
    {
      title: "Produk di Keranjang",
      value: "5",
      change: `${cartGrowth}%`,
      trend: "down",
      icon: ShoppingCart,
      iconClass: "text-amber-500"
    },
    {
      title: "Poin Reward",
      value: "750",
      change: `${rewardGrowth}%`,
      trend: "up",
      icon: Award,
      iconClass: "text-emerald-500"
    },
  ];

  // Get recent orders
  const recentOrders = customerOrders.slice(0, 4).map(order => ({
    id: order.orderId,
    date: new Date(order.orderDate).toLocaleDateString('id-ID'),
    status: order.orderStatus,
    items: getOrderItemsByOrderId(order.orderId).length,
    total: `Rp ${order.totalAmount.toLocaleString()}`
  }));

  // Get featured products from the product catalog (use first 3 products)
  const featuredProducts = products
    .slice(0, 3)
    .map(product => ({
      productId: product.productId,
      productName: product.productName,
      basePrice: product.basePrice,
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Menunggu";
      case "confirmed":
        return "Dikonfirmasi";
      case "processing":
        return "Diproses";
      case "shipped":
        return "Dikirim";
      case "delivered":
        return "Selesai";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColorDark = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-900/20 text-yellow-300";
      case "confirmed":
        return "bg-blue-900/20 text-blue-300";
      case "processing":
        return "bg-purple-900/20 text-purple-300";
      case "shipped":
        return "bg-indigo-900/20 text-indigo-300";
      case "delivered":
        return "bg-green-900/20 text-green-300";
      case "cancelled":
        return "bg-red-900/20 text-red-300";
      default:
        return "bg-gray-900/20 text-gray-300";
    }
  };

  return (
    <CustomerLayout pageTitle="Dashboard Pelanggan B2B">
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <p className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-500")}>
              Selamat datang, lihat ringkasan aktivitas belanja Anda
            </p>
          </div>
          <Button
            onClick={() => navigate('/dashboard/customer/catalog')}
            className={cn(
              "bg-blue-600 hover:bg-blue-700 text-white",
              isDarkMode ? "bg-blue-500 hover:bg-blue-600" : ""
            )}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Belanja Sekarang
          </Button>
        </div>

        {/* Statistics Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className={cn(
              "transition-all duration-300",
              isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50"
            )}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                      {stat.title}
                    </p>
                    <h3 className={cn("text-2xl font-bold tracking-tight", isDarkMode ? "text-white" : "text-gray-900")}>
                      {stat.value}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      <p className={cn(
                        "text-xs font-medium",
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      )}>
                        {stat.change}
                      </p>
                    </div>
                  </div>
                  <div className={cn("rounded-full p-2", stat.iconClass, "bg-opacity-10")}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <Card className={cn(
            "col-span-2 transition-colors duration-300",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-50" : "text-slate-900"
                )}>Pesanan Terbaru</CardTitle>
                <CardDescription className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Pesanan terbaru Anda
                </CardDescription>
              </div>
              <Link to="/dashboard/customer/orders">
                <Button variant="outline" size="sm" className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : "hover:bg-gray-100"
                )}>
                  Lihat Semua
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div key={order.id} className={cn(
                      "flex items-center justify-between p-4 rounded-lg border",
                      isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
                    )}>
                      <div className="flex items-center space-x-4">
                        <div className={cn(
                          "p-2 rounded-full",
                          isDarkMode ? "bg-gray-700" : "bg-gray-100"
                        )}>
                          <Package className={cn(
                            "h-4 w-4",
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          )} />
                        </div>
                        <div>
                          <p className={cn(
                            "text-sm font-medium",
                            isDarkMode ? "text-gray-100" : "text-gray-900"
                          )}>
                            Pesanan #{order.id}
                          </p>
                          <p className={cn(
                            "text-xs",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>
                            {order.date} • {order.items} item
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={cn(
                          getStatusColor(order.status),
                          isDarkMode ? getStatusColorDark(order.status) : ""
                        )}>
                          {getStatusText(order.status)}
                        </Badge>
                        <p className={cn(
                          "text-sm font-medium",
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        )}>
                          {order.total}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={cn(
                    "text-center py-8",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Belum ada pesanan</p>
                    <p className="text-sm">Mulai belanja untuk melihat pesanan Anda di sini</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Featured Products */}
          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Produk Unggulan</CardTitle>
              <CardDescription className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Produk dengan diskon terbaik
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredProducts.length > 0 ? (
                  featuredProducts.map((product) => (
                    <div key={product.productId} className={cn(
                      "flex items-center space-x-4 p-3 rounded-lg border",
                      isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
                    )}>
                      <div className="flex-1">
                        <p className={cn(
                          "text-sm font-medium",
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        )}>
                          {product.productName}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <p className={cn(
                            "text-sm",
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          )}>
                            Rp {product.basePrice.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetail(product.productId)}
                          className="text-xs"
                        >
                          Detail
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product.productId)}
                          className="text-xs"
                        >
                          + Keranjang
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={cn(
                    "text-center py-8",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Tidak ada produk unggulan</p>
                    <p className="text-sm">Cek katalog untuk produk terbaru</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;
