import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Package, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  TrendingUp,
  Bell,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Tag,
  Eye,
  Percent
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

const AgentDashboard = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Penjualan",
      value: "Rp 45.000.000",
      icon: ShoppingCart,
      change: "+12.5%",
      trend: "up",
      description: "dibanding bulan lalu"
    },
    {
      title: "Total Pelanggan",
      value: "24",
      icon: Users,
      change: "+4.5%",
      trend: "up",
      description: "pelanggan baru"
    },
    {
      title: "Produk Terjual",
      value: "145",
      icon: Package,
      change: "-2.2%",
      trend: "down",
      description: "unit bulan ini"
    },
    {
      title: "Total Komisi",
      value: "Rp 4.500.000",
      icon: CreditCard,
      change: "+15.3%",
      trend: "up",
      description: "pendapatan komisi"
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "order",
      title: "Pesanan Baru",
      description: "PT Maju Jaya - 5 produk",
      time: "10 menit yang lalu",
      status: "success"
    },
    {
      id: 2,
      type: "commission",
      title: "Komisi Diterima",
      description: "Rp 750.000 dari Order #1234",
      time: "2 jam yang lalu",
      status: "success"
    },
    {
      id: 3,
      type: "customer",
      title: "Pelanggan Baru",
      description: "CV Berkah Abadi bergabung",
      time: "5 jam yang lalu",
      status: "info"
    }
  ];

  const topProducts = [
    {
      name: "Produk A",
      sold: 45,
      revenue: "Rp 15.000.000",
      growth: "+12%"
    },
    {
      name: "Produk B",
      sold: 38,
      revenue: "Rp 12.500.000",
      growth: "+8%"
    },
    {
      name: "Produk C",
      sold: 32,
      revenue: "Rp 9.800.000",
      growth: "+5%"
    }
  ];

  // Data produk yang sedang dalam penjualan
  const currentSellingProducts = [
    {
      id: 1,
      name: "Produk Premium A",
      category: "Electronics",
      price: "Rp 1.500.000",
      stock: 25,
      commission: "10%",
      salesCount: 12,
      lastSold: "2 jam yang lalu",
      image: "https://via.placeholder.com/200"
    },
    {
      id: 2,
      name: "Produk Unggulan B",
      category: "Fashion",
      price: "Rp 750.000",
      stock: 40,
      commission: "15%",
      salesCount: 8,
      lastSold: "5 jam yang lalu",
      image: "https://via.placeholder.com/200"
    },
    {
      id: 3,
      name: "Produk Spesial C",
      category: "Electronics",
      price: "Rp 2.500.000",
      stock: 15,
      commission: "12%",
      salesCount: 5,
      lastSold: "1 hari yang lalu",
      image: "https://via.placeholder.com/200"
    },
  ];

  // Handler untuk melihat detail produk
  const handleViewProductDetail = (productId: number) => {
    navigate(`/dashboard/agent/product/${productId}`);
  };

  // Handler untuk melihat semua produk di katalog
  const handleViewAllProducts = () => {
    navigate('/dashboard/agent/catalog');
  };

  // Handler untuk melihat produk yang sedang dijual
  const handleViewSellingProducts = () => {
    navigate('/dashboard/agent/selling-products');
  };

  return (
    <DashboardLayout role="agent" pageTitle="Dashboard Agen">
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
              Selamat datang kembali, lihat ringkasan aktivitas Anda
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className={cn(
              isDarkMode ? "border-gray-700 text-gray-300" : "border-gray-200"
            )}>
              <Calendar className="h-4 w-4 mr-2" />
              Filter Tanggal
            </Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <Bell className="h-4 w-4 mr-2" />
              Notifikasi
            </Button>
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
                  <div className="space-y-1">
                    <p className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    )}>{stat.title}</p>
                    <h3 className={cn(
                      "text-2xl font-bold tracking-tight",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>{stat.value}</h3>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-xs flex items-center",
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      )}>
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {stat.change}
                      </span>
                      <span className={cn(
                        "text-xs",
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      )}>
                        {stat.description}
                      </span>
                    </div>
                  </div>
                  <div className={cn(
                    "rounded-full p-2",
                    stat.trend === "up" 
                      ? "bg-green-500/20 text-green-500" 
                      : "bg-red-500/20 text-red-500"
                  )}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
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
              )}>Aktivitas Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className={cn(
                    "flex items-center justify-between p-3 rounded-lg",
                    isDarkMode 
                      ? "bg-gray-750 hover:bg-gray-700" 
                      : "bg-gray-50 hover:bg-gray-100"
                  )}>
                    <div className="flex items-center space-x-4">
                      <div className={cn(
                        "p-2 rounded-full",
                        activity.status === "success" 
                          ? "bg-green-500/20 text-green-500" 
                          : "bg-blue-500/20 text-blue-500"
                      )}>
                        {activity.type === "order" && <ShoppingCart className="h-4 w-4" />}
                        {activity.type === "commission" && <CreditCard className="h-4 w-4" />}
                        {activity.type === "customer" && <Users className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className={cn(
                          "font-medium",
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        )}>{activity.title}</p>
                        <p className={cn(
                          "text-sm",
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        )}>{activity.description}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>{activity.time}</span>
                  </div>
                ))}
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
              )}>Produk Terlaris</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className={cn(
                    "flex items-center justify-between p-3 rounded-lg",
                    isDarkMode 
                      ? "bg-gray-750 hover:bg-gray-700" 
                      : "bg-gray-50 hover:bg-gray-100"
                  )}>
                    <div className="flex items-center space-x-4">
                      <div className={cn(
                        "p-2 rounded-full",
                        "bg-blue-500/20 text-blue-500"
                      )}>
                        <Package className="h-4 w-4" />
                      </div>
                      <div>
                        <p className={cn(
                          "font-medium",
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        )}>{product.name}</p>
                        <p className={cn(
                          "text-sm",
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        )}>{product.sold} unit terjual</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "font-medium",
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      )}>{product.revenue}</p>
                      <span className="text-xs text-green-500">{product.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Produk yang Sedang Dijual */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className={cn(
                "text-xl font-semibold",
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Produk dalam Penjualan</h2>
              <p className={cn(
                "text-sm",
                isDarkMode ? "text-gray-300" : "text-gray-500"
              )}>
                Produk yang sedang Anda jual saat ini
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleViewSellingProducts}
              className={cn(
                isDarkMode ? "border-gray-700 text-gray-300 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-100"
              )}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Lihat Semua
            </Button>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {currentSellingProducts.map((product) => (
              <Card key={product.id} className={cn(
                "overflow-hidden",
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              )}>
                <div className="relative aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={cn(
                    "absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium",
                    isDarkMode ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"
                  )}>
                    Aktif
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className={cn(
                        "font-semibold line-clamp-1",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{product.name}</h3>
                      <div className="flex items-center mt-1">
                        <Tag className={cn(
                          "h-3.5 w-3.5 mr-1",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )} />
                        <span className={cn(
                          "text-xs",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>
                          {product.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={cn(
                          "font-semibold",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>{product.price}</p>
                        <p className={cn(
                          "text-xs flex items-center",
                          isDarkMode ? "text-green-400" : "text-green-600"
                        )}>
                          <Percent className="h-3 w-3 mr-1" />
                          Komisi {product.commission}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={cn(
                          "text-sm font-medium",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>{product.salesCount} <span className={cn(
                          "font-normal",
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        )}>terjual</span></p>
                        <p className={cn(
                          "text-xs",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>
                          Terakhir: {product.lastSold}
                        </p>
                      </div>
                    </div>

                    <Button 
                      variant="outline"
                      onClick={() => handleViewProductDetail(product.id)}
                      className={cn(
                        "w-full",
                        isDarkMode 
                          ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                          : "border-gray-200 hover:bg-gray-100"
                      )}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Lihat Detail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentDashboard; 