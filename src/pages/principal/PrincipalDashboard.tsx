import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { CreditCard, Package, ShoppingBag, Truck, Users, Plus, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { LineChart } from "@/components/ui/line-chart";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/store/theme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TimePeriod = "daily" | "weekly" | "monthly" | "yearly";

const PrincipalDashboard = () => {
  const { isDarkMode } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("weekly");

  // Sample data for dashboard stats
  const stats = [
    { 
      title: "Total Penjualan", 
      value: "Rp 12,345,000", 
      change: "+12.5%", 
      icon: CreditCard, 
      iconClass: "text-indigo-500 dark:text-indigo-400" 
    },
    { 
      title: "Pesanan Baru", 
      value: "23", 
      change: "+5.2%", 
      icon: ShoppingBag, 
      iconClass: "text-purple-500 dark:text-purple-400" 
    },
    { 
      title: "Total Agen", 
      value: "48", 
      change: "+2.1%", 
      icon: Users, 
      iconClass: "text-violet-500 dark:text-violet-400" 
    },
    { 
      title: "Total Produk", 
      value: "152", 
      change: "+7.8%", 
      icon: Package, 
      iconClass: "text-fuchsia-500 dark:text-fuchsia-400" 
    },
  ];

  // Sample data untuk berbagai periode
  const salesData = {
    daily: [
      { day: "00:00", sales: 1200000 },
      { day: "04:00", sales: 1800000 },
      { day: "08:00", sales: 2500000 },
      { day: "12:00", sales: 3200000 },
      { day: "16:00", sales: 2800000 },
      { day: "20:00", sales: 2100000 },
      { day: "23:59", sales: 1500000 },
    ],
    weekly: [
      { day: "Senin", sales: 4500000 },
      { day: "Selasa", sales: 5200000 },
      { day: "Rabu", sales: 4800000 },
      { day: "Kamis", sales: 6100000 },
      { day: "Jumat", sales: 5800000 },
      { day: "Sabtu", sales: 7200000 },
      { day: "Minggu", sales: 6500000 },
    ],
    monthly: [
      { day: "Jan", sales: 45000000 },
      { day: "Feb", sales: 52000000 },
      { day: "Mar", sales: 48000000 },
      { day: "Apr", sales: 61000000 },
      { day: "Mei", sales: 58000000 },
      { day: "Jun", sales: 72000000 },
      { day: "Jul", sales: 65000000 },
      { day: "Agu", sales: 68000000 },
      { day: "Sep", sales: 70000000 },
      { day: "Okt", sales: 75000000 },
      { day: "Nov", sales: 80000000 },
      { day: "Des", sales: 85000000 },
    ],
    yearly: [
      { day: "2018", sales: 520000000 },
      { day: "2019", sales: 580000000 },
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

  // Sample data untuk pesanan terbaru
  const recentOrders = [
    { id: 1, orderNumber: "12345", customerNumber: "6789", total: "Rp 1,200,000" },
    { id: 2, orderNumber: "23456", customerNumber: "7890", total: "Rp 1,500,000" },
    { id: 3, orderNumber: "34567", customerNumber: "8901", total: "Rp 900,000" },
    { id: 4, orderNumber: "45678", customerNumber: "9012", total: "Rp 1,800,000" },
    { id: 5, orderNumber: "56789", customerNumber: "0123", total: "Rp 1,100,000" },
  ];

  return (
    <DashboardLayout 
      role="principal" 
      pageTitle="Dashboard Principal"
    >
      <div className="space-y-6">
        {/* Statistik Utama */}
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
          {/* Chart Penjualan */}
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
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>Penjualan {periodLabels[selectedPeriod]}</CardTitle>
                <CardDescription className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Statistik penjualan {selectedPeriod === 'daily' ? '24 jam terakhir' :
                    selectedPeriod === 'weekly' ? '7 hari terakhir' :
                    selectedPeriod === 'monthly' ? '12 bulan terakhir' : '6 tahun terakhir'}
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
                  <SelectValue placeholder="Pilih Periode" />
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

          {/* Pesanan Terbaru */}
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
                5 pesanan terbaru dari pelanggan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className={cn(
                    "flex items-center justify-between border-b pb-2 last:border-0",
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  )}>
                    <div>
                      <p className={cn(
                        "font-medium",
                        isDarkMode ? "text-gray-200" : "text-gray-900"
                      )}>Order #{order.orderNumber}</p>
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>Pelanggan #{order.customerNumber}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={cn(
                        "text-sm font-medium",
                        isDarkMode ? "text-indigo-400" : "text-indigo-600"
                      )}>{order.total}</span>
                      <Truck className={cn(
                        "ml-2 h-4 w-4",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabel Performa */}
        <Card className={cn(
          "transition-all duration-300",
          isDarkMode 
            ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
            : "bg-white border-gray-200 hover:bg-gray-50"
        )}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>Performa Agen</CardTitle>
              <CardDescription className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Tabel perbandingan performa 5 agen teratas
              </CardDescription>
            </div>
            <Button
              size="sm"
              className={cn(
                "transition-all duration-300",
                isDarkMode
                  ? "bg-indigo-600 text-white hover:bg-indigo-500"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              )}
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Agen
            </Button>
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
                    )}>Agen</th>
                    <th className={cn(
                      "text-left py-3 px-4 font-medium",
                      isDarkMode ? "text-gray-200" : "text-gray-900"
                    )}>Total Penjualan</th>
                    <th className={cn(
                      "text-left py-3 px-4 font-medium",
                      isDarkMode ? "text-gray-200" : "text-gray-900"
                    )}>Pesanan</th>
                    <th className={cn(
                      "text-left py-3 px-4 font-medium",
                      isDarkMode ? "text-gray-200" : "text-gray-900"
                    )}>Pelanggan</th>
                    <th className={cn(
                      "text-left py-3 px-4 font-medium",
                      isDarkMode ? "text-gray-200" : "text-gray-900"
                    )}>Pertumbuhan</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "PT. Maju Bersama",
                      sales: "Rp 8,750,000",
                      orders: 45,
                      customers: 28,
                      growth: "+15.2%"
                    },
                    {
                      name: "CV. Sukses Mandiri",
                      sales: "Rp 7,250,000",
                      orders: 38,
                      customers: 22,
                      growth: "+12.8%"
                    },
                    {
                      name: "UD. Jaya Abadi",
                      sales: "Rp 6,800,000",
                      orders: 35,
                      customers: 19,
                      growth: "+10.5%"
                    },
                    {
                      name: "PT. Berkah Jaya",
                      sales: "Rp 6,200,000",
                      orders: 32,
                      customers: 17,
                      growth: "+9.7%"
                    },
                    {
                      name: "CV. Makmur Sejati",
                      sales: "Rp 5,900,000",
                      orders: 30,
                      customers: 15,
                      growth: "+8.9%"
                    }
                  ].map((agent, index) => (
                    <tr key={index} className={cn(
                      "border-b last:border-0",
                      isDarkMode 
                        ? "border-gray-700 bg-gray-800 even:bg-gray-750 hover:bg-gray-700" 
                        : "border-gray-200 bg-white even:bg-gray-50 hover:bg-gray-100",
                      "transition-colors duration-200"
                    )}>
                      <td className={cn(
                        "py-3 px-4",
                        isDarkMode ? "text-gray-300" : "text-gray-900"
                      )}>{agent.name}</td>
                      <td className={cn(
                        "py-3 px-4 font-medium",
                        isDarkMode ? "text-indigo-400" : "text-indigo-600"
                      )}>{agent.sales}</td>
                      <td className={cn(
                        "py-3 px-4",
                        isDarkMode ? "text-gray-300" : "text-gray-900"
                      )}>{agent.orders}</td>
                      <td className={cn(
                        "py-3 px-4",
                        isDarkMode ? "text-gray-300" : "text-gray-900"
                      )}>{agent.customers}</td>
                      <td className={cn(
                        "py-3 px-4",
                        "text-emerald-500 dark:text-emerald-400"
                      )}>{agent.growth}</td>
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

export default PrincipalDashboard;
