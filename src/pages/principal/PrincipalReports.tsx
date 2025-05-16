import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

interface ReportMetric {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down" | "neutral";
  percentage: string;
}

const PrincipalReports = () => {
  const [timeRange, setTimeRange] = useState("this-month");
  const { isDarkMode } = useTheme();

  // Dummy data - replace with actual API call
  const metrics: ReportMetric[] = [
    {
      title: "Total Penjualan",
      value: "Rp 250.000.000",
      description: "Total penjualan bulan ini",
      trend: "up",
      percentage: "12.5%",
    },
    {
      title: "Jumlah Pesanan",
      value: "125",
      description: "Pesanan bulan ini",
      trend: "up",
      percentage: "8.3%",
    },
    {
      title: "Rata-rata Pesanan",
      value: "Rp 2.000.000",
      description: "Nilai rata-rata per pesanan",
      trend: "down",
      percentage: "3.2%",
    },
    {
      title: "Pelanggan Aktif",
      value: "45",
      description: "Pelanggan dengan pesanan aktif",
      trend: "neutral",
      percentage: "0%",
    },
  ];

  return (
    <DashboardLayout role="principal" pageTitle="Laporan & Analisis">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Laporan & Analisis</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Lihat laporan dan analisis performa bisnis
            </p>
          </div>
          <div className="flex gap-4">
            <Select
              value={timeRange}
              onValueChange={(value) => setTimeRange(value)}
            >
              <SelectTrigger className={cn(
                "w-[180px] transition-colors duration-300",
                isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-white" 
                  : "bg-white border-gray-200 text-gray-900"
              )}>
                <SelectValue placeholder="Pilih periode" />
              </SelectTrigger>
              <SelectContent className={cn(
                isDarkMode 
                  ? "bg-gray-800 border-gray-700" 
                  : "bg-white border-gray-200"
              )}>
                <SelectItem value="today" className={cn(
                  isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"
                )}>Hari Ini</SelectItem>
                <SelectItem value="this-week" className={cn(
                  isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"
                )}>Minggu Ini</SelectItem>
                <SelectItem value="this-month" className={cn(
                  isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"
                )}>Bulan Ini</SelectItem>
                <SelectItem value="last-month" className={cn(
                  isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"
                )}>Bulan Lalu</SelectItem>
                <SelectItem value="this-year" className={cn(
                  isDarkMode ? "text-gray-200 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"
                )}>Tahun Ini</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              className={cn(
                "transition-colors duration-300",
                isDarkMode 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              <Download className="w-4 h-4 mr-2" />
              Unduh Laporan
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <Card key={metric.title} className={cn(
              "transition-colors duration-300",
              isDarkMode 
                ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
                : "bg-white border-gray-200 hover:bg-gray-50"
            )}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={cn(
                  "text-sm font-medium",
                  isDarkMode ? "text-white" : "text-slate-900"
                )}>
                  {metric.title}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className={`h-4 w-4 ${
                    metric.trend === "up"
                      ? "text-emerald-500 dark:text-emerald-400"
                      : metric.trend === "down"
                      ? "text-rose-500 dark:text-rose-400"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <path d="M7 17l5-5 5 5M7 7l5 5 5-5" />
                  ) : metric.trend === "down" ? (
                    <path d="M7 7l5 5 5-5M7 17l5-5 5 5" />
                  ) : (
                    <path d="M17 8l4 4-4 4M7 12h14" />
                  )}
                </svg>
              </CardHeader>
              <CardContent>
                <div className={cn(
                  "text-2xl font-bold",
                  isDarkMode ? "text-white" : "text-slate-900"
                )}>{metric.value}</div>
                <p className={cn(
                  "text-xs",
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                )}>
                  {metric.description}
                </p>
                <div
                  className={`text-xs font-medium mt-2 ${
                    metric.trend === "up"
                      ? "text-emerald-500 dark:text-emerald-400"
                      : metric.trend === "down"
                      ? "text-rose-500 dark:text-rose-400"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {metric.percentage} dari periode sebelumnya
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Penjualan per Kategori</CardTitle>
              <CardDescription className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-gray-300" : "text-gray-500"
              )}>
                Distribusi penjualan berdasarkan kategori produk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "h-[300px] flex items-center justify-center",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                Chart akan ditampilkan di sini
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Performa Agen</CardTitle>
              <CardDescription className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-gray-300" : "text-gray-500"
              )}>
                Perbandingan penjualan antar agen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "h-[300px] flex items-center justify-center",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                Chart akan ditampilkan di sini
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PrincipalReports; 