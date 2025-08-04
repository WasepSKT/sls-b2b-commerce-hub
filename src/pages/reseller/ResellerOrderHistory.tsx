import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { getOrdersByReseller, getOrderStatusColor, getOrderStatusColorDark } from "@/lib/data/orders";
import { useAuth } from "@/lib/store/auth";
import { Search, Filter, Download, Eye } from "lucide-react";

const ResellerOrderHistory = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Get orders for current reseller
  const orders = user ? getOrdersByReseller(user.userId) : [];

  // Filter orders based on search and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter;
    const matchesDate = dateFilter === "all" || true; // Add date filtering logic if needed

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'processing':
        return 'outline';
      case 'pending':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu';
      case 'confirmed':
        return 'Dikonfirmasi';
      case 'processing':
        return 'Diproses';
      case 'shipped':
        return 'Dikirim';
      case 'delivered':
        return 'Selesai';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn("text-3xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
            Riwayat Pesanan
          </h1>
          <p className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-500")}>
            Lihat semua riwayat pesanan Anda
          </p>
        </div>
        <Button className={cn(
          "bg-blue-600 hover:bg-blue-700 text-white",
          isDarkMode ? "bg-blue-500 hover:bg-blue-600" : ""
        )}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card className={cn(
        "transition-all duration-300",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <CardHeader>
          <CardTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>
            Filter & Pencarian
          </CardTitle>
          <CardDescription className={cn(isDarkMode ? "text-gray-300" : "text-gray-500")}>
            Filter pesanan berdasarkan kriteria tertentu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari ID pesanan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn("pl-9", isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white")}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className={cn(isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white")}>
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
                <SelectItem value="processing">Diproses</SelectItem>
                <SelectItem value="shipped">Dikirim</SelectItem>
                <SelectItem value="delivered">Selesai</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className={cn(isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white")}>
                <SelectValue placeholder="Filter tanggal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tanggal</SelectItem>
                <SelectItem value="today">Hari Ini</SelectItem>
                <SelectItem value="week">Minggu Ini</SelectItem>
                <SelectItem value="month">Bulan Ini</SelectItem>
                <SelectItem value="year">Tahun Ini</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className={cn(
        "transition-all duration-300",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <CardHeader>
          <CardTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>
            Daftar Pesanan ({filteredOrders.length})
          </CardTitle>
          <CardDescription className={cn(isDarkMode ? "text-gray-300" : "text-gray-500")}>
            Semua pesanan yang telah Anda buat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={cn("border-b", isDarkMode ? "border-gray-700" : "border-gray-200")}>
                  <th className={cn("text-left py-3 px-4 font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                    ID Pesanan
                  </th>
                  <th className={cn("text-left py-3 px-4 font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                    Tanggal
                  </th>
                  <th className={cn("text-left py-3 px-4 font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                    Status
                  </th>
                  <th className={cn("text-left py-3 px-4 font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                    Total
                  </th>
                  <th className={cn("text-left py-3 px-4 font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.orderId} className={cn(
                    "border-b transition-colors hover:bg-gray-50",
                    isDarkMode ? "border-gray-700 hover:bg-gray-750" : "border-gray-200"
                  )}>
                    <TableCell className={cn("py-3 px-4 font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                      {order.orderId}
                    </TableCell>
                    <TableCell className={cn("py-3 px-4", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                      {new Date(order.orderDate).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <Badge className={cn(
                        getOrderStatusColor(order.orderStatus),
                        isDarkMode ? getOrderStatusColorDark(order.orderStatus) : ""
                      )}>
                        {getStatusText(order.orderStatus)}
                      </Badge>
                    </TableCell>
                    <TableCell className={cn("py-3 px-4", isDarkMode ? "text-blue-400" : "text-blue-600")}>
                      Rp {order.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn("text-blue-600 hover:text-blue-700", isDarkMode ? "text-blue-400 hover:text-blue-300" : "")}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className={cn("mx-auto h-12 w-12", isDarkMode ? "text-gray-400" : "text-gray-300")}>
                <Search className="h-full w-full" />
              </div>
              <h3 className={cn("mt-2 text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                Tidak ada pesanan ditemukan
              </h3>
              <p className={cn("mt-1 text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                Coba ubah filter atau kata kunci pencarian Anda.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Helper components
const TableRow = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <tr className={className}>{children}</tr>
);

const TableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={className}>{children}</td>
);

export default ResellerOrderHistory;
