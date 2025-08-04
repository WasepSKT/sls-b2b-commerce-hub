import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui";
import { LineChart, BarChart } from "@/components/ui";
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { getOrdersByReseller, getOrderStatusColor, getOrderStatusColorDark } from "@/lib/data/orders";
import { getProductsByRole } from "@/lib/data/products";
import { useAuth } from "@/lib/store/auth";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Target,
  BarChart3,
  Download,
  Filter,
  Clock,
  TrendingUpIcon,
  Activity,
  PieChart,
  LineChart as LineChartIcon,
  Eye,
  EyeOff,
  RefreshCw,
  Zap,
  Award,
  Star,
  ArrowLeft,
  Home,
} from "lucide-react";

// Time period options
const TIME_PERIODS = [
  { value: '7d', label: '7 Hari Terakhir', days: 7 },
  { value: '30d', label: '30 Hari Terakhir', days: 30 },
  { value: '90d', label: '90 Hari Terakhir', days: 90 },
  { value: '6m', label: '6 Bulan Terakhir', days: 180 },
  { value: '1y', label: '1 Tahun Terakhir', days: 365 },
  { value: 'ytd', label: 'Tahun Ini', days: 0 },
];

// Chart type options
const CHART_TYPES = [
  { value: 'line', label: 'Garis', icon: LineChartIcon },
  { value: 'bar', label: 'Bar', icon: BarChart3 },
];

// Interface for sales data point
interface SalesDataPoint {
  day: string;
  sales: number;
  orders: number;
}

// Interface for order data
interface OrderData {
  orderId: string;
  orderDate: string;
  totalAmount: number;
  orderStatus: string;
}

// Generate sales data based on time period
const generateSalesData = (orders: OrderData[], timePeriod: string, days: number): SalesDataPoint[] => {
  const now = new Date();
  const startDate = new Date();

  if (timePeriod === 'ytd') {
    startDate.setFullYear(now.getFullYear(), 0, 1);
  } else {
    startDate.setDate(now.getDate() - days);
  }

  // Filter orders within the time period
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.orderDate);
    return orderDate >= startDate && orderDate <= now;
  });

  // Group orders by date
  const ordersByDate: Record<string, { revenue: number; orders: number }> = {};

  filteredOrders.forEach(order => {
    const date = new Date(order.orderDate).toISOString().split('T')[0];
    if (!ordersByDate[date]) {
      ordersByDate[date] = { revenue: 0, orders: 0 };
    }
    ordersByDate[date].revenue += order.totalAmount;
    ordersByDate[date].orders += 1;
  });

  // Generate data points based on time period
  const dataPoints: SalesDataPoint[] = [];

  if (timePeriod === '7d') {
    // Daily data for last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('id-ID', { weekday: 'short' });
      const dayData = ordersByDate[dateStr];

      dataPoints.push({
        day: dayName,
        sales: dayData ? dayData.revenue : 0,
        orders: dayData ? dayData.orders : 0,
      });
    }
  } else if (timePeriod === '30d') {
    // Weekly data for last 30 days
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (i * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      let weekRevenue = 0;
      let weekOrders = 0;

      Object.entries(ordersByDate).forEach(([date, data]) => {
        const orderDate = new Date(date);
        if (orderDate >= weekStart && orderDate <= weekEnd) {
          weekRevenue += data.revenue;
          weekOrders += data.orders;
        }
      });

      dataPoints.push({
        day: `Minggu ${4 - i}`,
        sales: weekRevenue,
        orders: weekOrders,
      });
    }
  } else {
    // Monthly data for longer periods
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let monthCount = timePeriod === '90d' ? 3 : timePeriod === '6m' ? 6 : 12;

    for (let i = monthCount - 1; i >= 0; i--) {
      const month = new Date(currentYear, currentMonth - i, 1);
      const monthName = months[month.getMonth()];
      const monthStr = month.getFullYear() + '-' + String(month.getMonth() + 1).padStart(2, '0');

      let monthRevenue = 0;
      let monthOrders = 0;

      Object.entries(ordersByDate).forEach(([date, data]) => {
        if (date.startsWith(monthStr)) {
          monthRevenue += data.revenue;
          monthOrders += data.orders;
        }
      });

      dataPoints.push({
        day: monthName,
        sales: monthRevenue,
        orders: monthOrders,
      });
    }
  }

  return dataPoints;
};

// Calculate growth percentage
const calculateGrowth = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

const ResellerSalesDashboard = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for filters
  const [timePeriod, setTimePeriod] = useState('30d');
  const [chartType, setChartType] = useState('line');
  const [showDetails, setShowDetails] = useState(false);

  // Get data for current reseller
  const orders = user ? getOrdersByReseller(user.userId) : [];
  const products = getProductsByRole('reseller');

  // Get selected time period config
  const selectedPeriod = TIME_PERIODS.find(p => p.value === timePeriod);
  const days = selectedPeriod?.days || 30;

  // Generate filtered data
  const salesData = useMemo(() => generateSalesData(orders, timePeriod, days), [orders, timePeriod, days]);

  // Calculate comprehensive statistics for selected period
  const now = new Date();
  const startDate = new Date();
  if (timePeriod === 'ytd') {
    startDate.setFullYear(now.getFullYear(), 0, 1);
  } else {
    startDate.setDate(now.getDate() - days);
  }

  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.orderDate);
    return orderDate >= startDate && orderDate <= now;
  });

  // Previous period for comparison
  const previousStartDate = new Date(startDate);
  previousStartDate.setDate(previousStartDate.getDate() - days);
  const previousOrders = orders.filter(order => {
    const orderDate = new Date(order.orderDate);
    return orderDate >= previousStartDate && orderDate < startDate;
  });

  // Current period stats
  const currentRevenue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const currentOrders = filteredOrders.length;
  const currentCompleted = filteredOrders.filter(order => order.orderStatus === 'delivered').length;
  const currentAverage = currentOrders > 0 ? currentRevenue / currentOrders : 0;

  // Previous period stats
  const previousRevenue = previousOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const previousOrdersCount = previousOrders.length;
  const previousCompleted = previousOrders.filter(order => order.orderStatus === 'delivered').length;
  const previousAverage = previousOrdersCount > 0 ? previousRevenue / previousOrdersCount : 0;

  // Growth calculations
  const revenueGrowth = calculateGrowth(currentRevenue, previousRevenue);
  const orderGrowth = calculateGrowth(currentOrders, previousOrdersCount);
  const completedGrowth = calculateGrowth(currentCompleted, previousCompleted);
  const averageGrowth = calculateGrowth(currentAverage, previousAverage);

  // Performance metrics
  const conversionRate = currentOrders > 0 ? (currentCompleted / currentOrders) * 100 : 0;
  const previousConversionRate = previousOrdersCount > 0 ? (previousCompleted / previousOrdersCount) * 100 : 0;
  const conversionGrowth = calculateGrowth(conversionRate, previousConversionRate);

  // Top performing products for the period (using mock data for now)
  const productSales = products.slice(0, 5).map((product, index) => {
    const mockRevenue = Math.floor((10000000 / product.basePrice) * (5 - index) * (0.8 + Math.random() * 0.4));
    const mockOrders = Math.floor((10000000 / product.basePrice) * (5 - index) * (0.8 + Math.random() * 0.4));
    const mockQuantity = Math.floor(mockOrders * (0.5 + Math.random() * 0.5));

    return {
      name: product.productName,
      revenue: mockRevenue,
      orders: mockOrders,
      quantity: mockQuantity,
    };
  }).sort((a, b) => b.revenue - a.revenue);

  // Performance insights
  const insights = [
    {
      type: 'positive',
      icon: TrendingUp,
      title: 'Pertumbuhan Positif',
      description: `Pendapatan meningkat ${revenueGrowth.toFixed(1)}% dari periode sebelumnya`,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      type: 'info',
      icon: Target,
      title: 'Target Tercapai',
      description: `Conversion rate ${conversionRate.toFixed(1)}% dengan ${currentCompleted} pesanan selesai`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      type: 'warning',
      icon: Clock,
      title: 'Perlu Perhatian',
      description: `${filteredOrders.filter(o => o.orderStatus === 'pending').length} pesanan masih pending`,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ];

  const stats = [
    {
      title: "Total Pendapatan",
      value: `Rp ${currentRevenue.toLocaleString()}`,
      change: `${revenueGrowth.toFixed(1)}%`,
      trend: revenueGrowth >= 0 ? "up" : "down",
      icon: DollarSign,
      iconClass: "text-green-500",
      description: selectedPeriod?.label || "Periode terpilih"
    },
    {
      title: "Total Pesanan",
      value: currentOrders.toString(),
      change: `${orderGrowth.toFixed(1)}%`,
      trend: orderGrowth >= 0 ? "up" : "down",
      icon: ShoppingCart,
      iconClass: "text-blue-500",
      description: selectedPeriod?.label || "Periode terpilih"
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate.toFixed(1)}%`,
      change: `${conversionGrowth.toFixed(1)}%`,
      trend: conversionGrowth >= 0 ? "up" : "down",
      icon: Target,
      iconClass: "text-purple-500",
      description: "Pesanan selesai"
    },
    {
      title: "Nilai Rata-rata",
      value: `Rp ${currentAverage.toLocaleString()}`,
      change: `${averageGrowth.toFixed(1)}%`,
      trend: averageGrowth >= 0 ? "up" : "down",
      icon: Award,
      iconClass: "text-orange-500",
      description: "Per pesanan"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className={cn("text-2xl lg:text-3xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
            Laporan Penjualan
          </h1>
          <p className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-500")}>
            Analisis performa penjualan berdasarkan periode waktu
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard/reseller')}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Kembali ke Dashboard</span>
            <span className="sm:hidden">Kembali</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full sm:w-auto"
          >
            {showDetails ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            <span className="hidden sm:inline">
              {showDetails ? "Sembunyikan Detail" : "Tampilkan Detail"}
            </span>
            <span className="sm:hidden">
              {showDetails ? "Sembunyikan" : "Detail"}
            </span>
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export Laporan</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <Card className={cn(
        "transition-all duration-300",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className={cn("h-4 w-4", isDarkMode ? "text-gray-300" : "text-gray-500")} />
                <span className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Filter:
                </span>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_PERIODS.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CHART_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <type.icon className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className={cn("h-4 w-4", isDarkMode ? "text-gray-300" : "text-gray-500")} />
              <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                {selectedPeriod?.label}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                  <p className={cn("text-xs", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                    {stat.description}
                  </p>
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

      {/* Performance Insights */}
      {showDetails && (
        <div className="grid gap-4 md:grid-cols-3">
          {insights.map((insight, index) => (
            <Card key={index} className={cn(
              "transition-all duration-300",
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            )}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={cn("rounded-full p-2", insight.bgColor)}>
                    <insight.icon className={cn("h-5 w-5", insight.color)} />
                  </div>
                  <div>
                    <h4 className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-gray-900")}>
                      {insight.title}
                    </h4>
                    <p className={cn("text-xs mt-1", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                      {insight.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <div className="lg:col-span-2">
          <Card className={cn(
            "transition-all duration-300",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>
                    Tren Penjualan
                  </CardTitle>
                  <CardDescription className={cn(isDarkMode ? "text-gray-300" : "text-gray-500")}>
                    {selectedPeriod?.label} - {chartType === 'line' ? 'Grafik Garis' : 'Grafik Bar'}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    isDarkMode ? "bg-indigo-400" : "bg-indigo-600"
                  )} />
                  <span className={cn(
                    "text-xs font-medium",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    Pendapatan
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                {chartType === 'line' ? (
                  <LineChart data={salesData} className="h-full w-full" isDarkMode={isDarkMode} />
                ) : (
                  <BarChart data={salesData} className="h-full w-full" isDarkMode={isDarkMode} />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-1">
          <Card className={cn(
            "transition-all duration-300",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>
                Produk Terlaris
              </CardTitle>
              <CardDescription className={cn(isDarkMode ? "text-gray-300" : "text-gray-500")}>
                {selectedPeriod?.label}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {productSales.length === 0 ? (
                <div className="text-center py-8">
                  <Package className={cn(
                    "h-12 w-12 mx-auto mb-4",
                    isDarkMode ? "text-gray-400" : "text-gray-300"
                  )} />
                  <p className={cn(
                    "text-sm",
                    isDarkMode ? "text-gray-300" : "text-gray-900"
                  )}>
                    Belum ada penjualan produk
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {productSales.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm",
                          index === 0 ? "bg-yellow-500" :
                            index === 1 ? "bg-gray-400" :
                              index === 2 ? "bg-orange-500" :
                                "bg-blue-500"
                        )}>
                          {index + 1}
                        </div>
                        <div>
                          <p className={cn(
                            "text-sm font-medium",
                            isDarkMode ? "text-gray-300" : "text-gray-900"
                          )}>
                            {product.name}
                          </p>
                          <p className={cn(
                            "text-xs",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>
                            {product.quantity} unit terjual
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={cn(
                          "text-sm font-medium",
                          isDarkMode ? "text-gray-300" : "text-gray-900"
                        )}>
                          Rp {(product.revenue / 1000000).toFixed(1)}M
                        </span>
                        <p className={cn(
                          "text-xs",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>
                          {product.orders} pesanan
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Analytics */}
      {showDetails && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Order Status Distribution */}
          <Card className={cn(
            "transition-all duration-300",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>
                Distribusi Status Pesanan
              </CardTitle>
              <CardDescription className={cn(isDarkMode ? "text-gray-300" : "text-gray-500")}>
                {selectedPeriod?.label}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => {
                  const count = filteredOrders.filter(order => order.orderStatus === status).length;
                  const percentage = filteredOrders.length > 0 ? (count / filteredOrders.length) * 100 : 0;
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "w-3 h-3 rounded-full",
                          isDarkMode
                            ? getOrderStatusColorDark(status).replace('bg-', 'bg-').replace('text-', '')
                            : getOrderStatusColor(status).replace('bg-', 'bg-').replace('text-', '')
                        )} />
                        <span className={cn(
                          "text-sm capitalize",
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        )}>
                          {status}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className={cn(
                          "text-sm font-medium",
                          isDarkMode ? "text-gray-300" : "text-gray-900"
                        )}>
                          {count}
                        </span>
                        <span className={cn(
                          "text-xs ml-2",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>
                          ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Comparison */}
          <Card className={cn(
            "transition-all duration-300",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>
                Perbandingan Periode
              </CardTitle>
              <CardDescription className={cn(isDarkMode ? "text-gray-300" : "text-gray-500")}>
                Periode saat ini vs periode sebelumnya
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-700")}>
                    Pendapatan
                  </span>
                  <div className="text-right">
                    <div className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-gray-900")}>
                      Rp {currentRevenue.toLocaleString()}
                    </div>
                    <div className={cn("text-xs", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                      vs Rp {previousRevenue.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-700")}>
                    Jumlah Pesanan
                  </span>
                  <div className="text-right">
                    <div className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-gray-900")}>
                      {currentOrders}
                    </div>
                    <div className={cn("text-xs", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                      vs {previousOrdersCount}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-700")}>
                    Rata-rata Nilai
                  </span>
                  <div className="text-right">
                    <div className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-gray-900")}>
                      Rp {currentAverage.toLocaleString()}
                    </div>
                    <div className={cn("text-xs", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                      vs Rp {previousAverage.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ResellerSalesDashboard; 