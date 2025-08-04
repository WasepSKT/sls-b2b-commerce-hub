import { useState } from "react";
import { Button } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Download } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { LineChart } from "@/components/ui";
import { orders } from "@/lib/data/orders";
import { getUserProfileByUserId } from "@/lib/data/users";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";

const DistributorReports = () => {
  const { isDarkMode } = useTheme();

  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;

  const salesData = [
    { day: 'Sen', sales: 4000000 },
    { day: 'Sel', sales: 3000000 },
    { day: 'Rab', sales: 5000000 },
    { day: 'Kam', sales: 4500000 },
    { day: 'Jum', sales: 6000000 },
    { day: 'Sab', sales: 2500000 },
    { day: 'Min', sales: 1500000 },
  ];

  return (
    <DashboardLayout role="distributor" pageTitle="Laporan Penjualan">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn("text-2xl font-semibold tracking-tight", isDarkMode ? "text-gray-50" : "text-slate-900")}>Laporan Penjualan</h2>
            <p className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-500")}>Ringkasan penjualan Anda.</p>
          </div>
          <Button className={cn(isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "")}>
            <Download className="w-4 h-4 mr-2" />
            Unduh Laporan
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className={cn(isDarkMode ? "bg-transparent backdrop-blur-sm border-blue-900/50" : "bg-white")}>
            <CardHeader>
              <CardTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>Total Penjualan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>{`Rp ${totalSales.toLocaleString()}`}</p>
            </CardContent>
          </Card>
          <Card className={cn(isDarkMode ? "bg-transparent backdrop-blur-sm border-blue-900/50" : "bg-white")}>
            <CardHeader>
              <CardTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>Total Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>{totalOrders}</p>
            </CardContent>
          </Card>
        </div>

        <Card className={cn(isDarkMode ? "bg-transparent backdrop-blur-sm border-blue-900/50" : "bg-white")}>
          <CardHeader>
            <CardTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>Penjualan Minggu Ini</CardTitle>
            <CardDescription className={cn(isDarkMode ? "text-gray-300" : "text-gray-500")}>Grafik penjualan dalam seminggu terakhir.</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart data={salesData} className="h-64" isDarkMode={isDarkMode} />
          </CardContent>
        </Card>

        <Card className={cn(isDarkMode ? "bg-transparent backdrop-blur-sm border-blue-900/50" : "bg-white")}>
          <CardHeader>
            <CardTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>Transaksi Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className={cn(isDarkMode ? "border-gray-700" : "")}>
                  <TableHead className={cn(isDarkMode ? "text-gray-100" : "")}>ID Pesanan</TableHead>
                  <TableHead className={cn(isDarkMode ? "text-gray-100" : "")}>Pelanggan</TableHead>
                  <TableHead className={cn(isDarkMode ? "text-gray-100" : "")}>Tanggal</TableHead>
                  <TableHead className={cn("text-right", isDarkMode ? "text-gray-100" : "")}>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 5).map((order) => {
                  const userProfile = getUserProfileByUserId(order.customerId);
                  return (
                    <TableRow key={order.orderId} className={cn(isDarkMode ? "border-gray-700" : "")}>
                      <TableCell className={cn(isDarkMode ? "text-gray-100" : "")}>{order.orderId}</TableCell>
                      <TableCell className={cn(isDarkMode ? "text-gray-100" : "")}>{userProfile?.fullName || 'N/A'}</TableCell>
                      <TableCell className={cn(isDarkMode ? "text-gray-100" : "")}>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className={cn("text-right", isDarkMode ? "text-gray-100" : "")}>{`Rp ${order.totalAmount.toLocaleString()}`}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DistributorReports;