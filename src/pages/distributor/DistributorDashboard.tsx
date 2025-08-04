import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import DashboardLayout from "@/components/DashboardLayout";
import { CreditCard, Package, ShoppingBag, Users, Warehouse } from "lucide-react";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { LineChart } from "@/components/ui";
import { Button } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { orders } from "@/lib/data/orders";

type TimePeriod = "daily" | "weekly" | "monthly" | "yearly";

const DistributorDashboard = () => {
  const { isDarkMode } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("weekly");

  // Sample data for dashboard stats - tailored for a distributor
  const stats = [
    { 
      title: "Total Penjualan", 
      value: "Rp 8,765,000", 
      change: "+9.8%", 
      icon: CreditCard, 
      iconClass: "text-green-500 dark:text-green-400" 
    },
    { 
      title: "Pesanan Baru", 
      value: "35", 
      change: "+3.5%", 
      icon: ShoppingBag, 
      iconClass: "text-blue-500 dark:text-blue-400" 
    },
    { 
      title: "Jumlah Agen", 
      value: "12", 
      change: "+1 new agent", 
      icon: Users, 
      iconClass: "text-orange-500 dark:text-orange-400" 
    },
    { 
      title: "Stok Inventaris", 
      value: "1,200 Unit", 
      change: "-2.1%", 
      icon: Warehouse, 
      iconClass: "text-red-500 dark:text-red-400" 
    },
  ];

  // Sample sales data for different periods
  const salesData = {
    daily: [
      { day: "00:00", sales: 800000 },
      { day: "04:00", sales: 1200000 },
      { day: "08:00", sales: 1800000 },
      { day: "12:00", sales: 2500000 },
      { day: "16:00", sales: 2100000 },
      { day: "20:00", sales: 1600000 },
      { day: "23:59", sales: 1000000 },
    ],
    weekly: [
      { day: "Senin", sales: 3500000 },
      { day: "Selasa", sales: 4200000 },
      { day: "Rabu", sales: 3800000 },
      { day: "Kamis", sales: 5100000 },
      { day: "Jumat", sales: 4800000 },
      { day: "Sabtu", sales: 6200000 },
      { day: "Minggu", sales: 5500000 },
    ],
    monthly: [
      { day: "Jan", sales: 35000000 },
      { day: "Feb", sales: 42000000 },
      { day: "Mar", sales: 38000000 },
      { day: "Apr", sales: 51000000 },
      { day: "Mei", sales: 48000000 },
      { day: "Jun", sales: 62000000 },
      { day: "Jul", sales: 55000000 },
      { day: "Agu", sales: 58000000 },
      { day: "Sep", sales: 60000000 },
      { day: "Okt", sales: 65000000 },
      { day: "Nov", sales: 70000000 },
      { day: "Des", sales: 75000000 },
    ],
    yearly: [
      { day: "2020", sales: 480000000 },
      { day: "2021", sales: 650000000 },
      { day: "2022", sales: 720000000 },
      { day: "2023", sales: 850000000 },
    ],
  };

  const periodLabels = {
    daily: "Harian",
    weekly: "Mingguan",
    monthly: "Bulanan",
    yearly: "Tahunan",
  };

  // Get orders for distributor
  const recentOrders = orders.slice(0, 5).map(order => ({
    id: order.orderId,
    orderNumber: order.orderId,
    agentName: "Agen Sample", // This would come from agent data
    total: `Rp ${order.totalAmount.toLocaleString()}`
  }));

  // Sample data for inventory overview
  const inventoryData = [
    { id: 1, productName: "Produk A", stock: 150, location: "Gudang Utama" },
    { id: 2, productName: "Produk B", stock: 80, location: "Gudang Utama" },
    { id: 3, productName: "Produk C", stock: 200, location: "Gudang Cabang" },
    { id: 4, productName: "Produk D", stock: 50, location: "Gudang Utama" },
    { id: 5, productName: "Produk E", stock: 120, location: "Gudang Cabang" },
  ];

  return (
    <DashboardLayout 
      role="distributor" 
      pageTitle="Distributor Dashboard"
    >
      <div className="space-y-6">
        {/* Main Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className={cn(
              "transition-all duration-300",
              isDarkMode 
                ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
                : "bg-white border-gray-200 hover:bg-gray-50"
            )}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>{stat.title}</p>
                    <h3 className={cn(
                      "text-2xl font-bold tracking-tight",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>{stat.value}</h3>
                    <p className={cn(
                      "text-xs",
                      stat.change.startsWith("+") 
                        ? "text-emerald-500 dark:text-emerald-400" 
                        : "text-rose-500 dark:text-rose-400"
                    )}>{stat.change} bulan ini</p>
                  </div>
                  <div className={cn(
                    "rounded-full p-2",
                    isDarkMode ? "bg-gray-700" : "bg-gray-100",
                    stat.iconClass
                  )}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
          {/* Sales Chart */}
          <Card className={cn(
            "lg:col-span-5 transition-all duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-50" : "text-gray-900"
                )}>Penjualan {periodLabels[selectedPeriod]}</CardTitle>
                <CardDescription className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Statistik penjualan untuk periode yang dipilih.
                </CardDescription>
              </div>
              <Select
                value={selectedPeriod}
                onValueChange={(value: TimePeriod) => setSelectedPeriod(value)}
              >
                <SelectTrigger className={cn(
                  "w-[180px] transition-colors duration-300",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-650" 
                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                )}>
                  <SelectValue placeholder="Pilih Periode" className={cn(
                    isDarkMode ? "text-white" : "text-gray-900"
                  )} />
                </SelectTrigger>
                <SelectContent className={cn(
                  isDarkMode 
                    ? "bg-gray-800 border-gray-700" 
                    : "bg-white border-gray-200"
                )}>
                  <SelectItem value="daily" className={cn(
                    isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"
                  )}>Harian</SelectItem>
                  <SelectItem value="weekly" className={cn(
                    isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"
                  )}>Mingguan</SelectItem>
                  <SelectItem value="monthly" className={cn(
                    isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"
                  )}>Bulanan</SelectItem>
                  <SelectItem value="yearly" className={cn(
                    isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"
                  )}>Tahunan</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-[3/1] min-h-[200px]">
                <LineChart 
                  data={salesData[selectedPeriod]}
                  isDarkMode={isDarkMode}
                  className="w-full h-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className={cn(
            "lg:col-span-2 transition-all duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>Pesanan Terbaru</CardTitle>
              <CardDescription className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                5 pesanan terbaru dari agen Anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow className={cn(
                      "border-b",
                      isDarkMode 
                        ? "bg-gray-750 border-gray-700" 
                        : "bg-gray-50 border-gray-200"
                    )}>
                      <TableHead className={cn("text-left py-3 px-4 font-medium", isDarkMode ? "text-gray-200" : "text-gray-900")}>Nomor Pesanan</TableHead>
                      <TableHead className={cn("text-left py-3 px-4 font-medium", isDarkMode ? "text-gray-200" : "text-gray-900")}>Nama Agen</TableHead>
                      <TableHead className={cn("text-left py-3 px-4 font-medium", isDarkMode ? "text-gray-200" : "text-gray-900")}>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <TableRow key={order.id} className={cn(
                          "border-b last:border-0 transition-colors duration-200",
                          isDarkMode 
                            ? "border-gray-700 bg-gray-800 hover:bg-gray-700" 
                            : "border-gray-200 bg-white hover:bg-gray-100"
                        )}>
                          <TableCell className={cn("py-3 px-4 font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>{order.orderNumber}</TableCell>
                          <TableCell className={cn("py-3 px-4", isDarkMode ? "text-gray-300" : "text-gray-900")}>{order.agentName}</TableCell>
                          <TableCell className={cn("py-3 px-4", isDarkMode ? "text-blue-400" : "text-blue-600")}>{order.total}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                          Tidak ada pesanan terbaru yang ditemukan.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Overview */}
        <Card className={cn(
          "transition-all duration-300",
          isDarkMode 
            ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
            : "bg-white border-gray-200 hover:bg-gray-50"
        )}>
          <CardHeader>
            <CardTitle className={cn(
              "transition-colors duration-300",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>Ringkasan Inventaris</CardTitle>
            <CardDescription className={cn(
              "transition-colors duration-300",
              isDarkMode ? "text-gray-300" : "text-gray-600"
            )}>
              Status stok produk Anda saat ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full border-collapse">
                <thead>
                  <tr className={cn(
                    "border-b",
                    isDarkMode 
                      ? "bg-gray-750 border-gray-700" 
                      : "bg-gray-50 border-gray-200"
                  )}>
                    <th className={cn(
                      "text-left py-3 px-4 font-medium",
                      isDarkMode ? "text-gray-200" : "text-gray-900"
                    )}>Nama Produk</th>
                    <th className={cn(
                      "text-left py-3 px-4 font-medium",
                      isDarkMode ? "text-gray-200" : "text-gray-900"
                    )}>Stok</th>
                    <th className={cn(
                      "text-left py-3 px-4 font-medium",
                      isDarkMode ? "text-gray-200" : "text-gray-900"
                    )}>Lokasi</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((item) => (
                    <tr key={item.id} className={cn(
                      "border-b last:border-0 transition-colors duration-200",
                      isDarkMode 
                        ? "border-gray-700 bg-gray-800 hover:bg-gray-700" 
                        : "border-gray-200 bg-white hover:bg-gray-100"
                    )}>
                      <td className={cn(
                        "py-3 px-4",
                        isDarkMode ? "text-gray-300" : "text-gray-900"
                      )}>{item.productName}</td>
                      <td className={cn(
                        "py-3 px-4",
                        isDarkMode ? "text-gray-300" : "text-gray-900"
                      )}>{item.stock}</td>
                      <td className={cn(
                        "py-3 px-4",
                        isDarkMode ? "text-gray-300" : "text-gray-900"
                      )}>{item.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DistributorDashboard;