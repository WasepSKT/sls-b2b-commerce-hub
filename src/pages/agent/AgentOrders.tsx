import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import DashboardLayout from "@/components/DashboardLayout";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { orders, getOrderItemsByOrderId } from "@/lib/data/orders";
import { getUserProfileByUserId } from "@/lib/data/users";
import { Search, Eye, Download, Filter } from "lucide-react";

const AgentOrders = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Filter orders based on search and filters
  const filteredOrders = orders.filter((order) => {
    const userProfile = getUserProfileByUserId(order.customerId);
    const matchesSearch = order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (userProfile?.fullName.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-orange-100 text-orange-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
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
        return "bg-orange-900/20 text-orange-300";
      case "shipped":
        return "bg-purple-900/20 text-purple-300";
      case "delivered":
        return "bg-green-900/20 text-green-300";
      case "cancelled":
        return "bg-red-900/20 text-red-300";
      default:
        return "bg-gray-900/20 text-gray-300";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColorDark = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-900/20 text-yellow-300";
      case "paid":
        return "bg-green-900/20 text-green-300";
      case "failed":
        return "bg-red-900/20 text-red-300";
      case "refunded":
        return "bg-blue-900/20 text-blue-300";
      default:
        return "bg-gray-900/20 text-gray-300";
    }
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

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Menunggu";
      case "paid":
        return "Lunas";
      case "failed":
        return "Gagal";
      case "refunded":
        return "Dikembalikan";
      default:
        return status;
    }
  };

  return (
    <DashboardLayout role="agent" pageTitle="Manajemen Pesanan">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Pesanan</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Kelola pesanan dan status pengiriman
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
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari ID pesanan atau pelanggan..."
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
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className={cn(isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white")}>
                  <SelectValue placeholder="Filter pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Pembayaran</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="paid">Lunas</SelectItem>
                  <SelectItem value="failed">Gagal</SelectItem>
                  <SelectItem value="refunded">Dikembalikan</SelectItem>
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
              Semua pesanan yang telah diproses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className={cn(
                    "transition-colors duration-300",
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  )}>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      ID Pesanan
                    </TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      Pelanggan
                    </TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      Tanggal
                    </TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      Status
                    </TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      Total
                    </TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      Item
                    </TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      Pembayaran
                    </TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      Komisi
                    </TableHead>
                    <TableHead className={cn("text-right", isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const userProfile = getUserProfileByUserId(order.customerId);
                    const orderItems = getOrderItemsByOrderId(order.orderId);
                    const commission = orderItems.reduce((sum, item) => sum + (item.subtotal * 0.1), 0); // 10% commission

                    return (
                      <TableRow key={order.orderId} className={cn(
                        "transition-colors duration-300",
                        isDarkMode 
                          ? "hover:bg-gray-700/50 border-gray-700" 
                          : "hover:bg-gray-50 border-gray-200"
                      )}>
                        <TableCell className={cn("font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                          {order.orderId}
                        </TableCell>
                        <TableCell className={cn(isDarkMode ? "text-gray-300" : "text-gray-900")}>
                          {userProfile?.fullName || "N/A"}
                        </TableCell>
                        <TableCell className={cn(isDarkMode ? "text-gray-300" : "text-gray-900")}>
                          {new Date(order.orderDate).toLocaleDateString('id-ID')}
                        </TableCell>
                        <TableCell>
                          <Badge className={cn(
                            getStatusColor(order.orderStatus),
                            isDarkMode ? getStatusColorDark(order.orderStatus) : ""
                          )}>
                            {getStatusText(order.orderStatus)}
                          </Badge>
                        </TableCell>
                        <TableCell className={cn(isDarkMode ? "text-blue-400" : "text-blue-600")}>
                          Rp {order.totalAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className={cn(isDarkMode ? "text-gray-300" : "text-gray-900")}>
                          {orderItems.length} item
                        </TableCell>
                        <TableCell>
                          <Badge className={cn(
                            getPaymentStatusColor(order.paymentStatus),
                            isDarkMode ? getPaymentStatusColorDark(order.paymentStatus) : ""
                          )}>
                            {getPaymentStatusText(order.paymentStatus)}
                          </Badge>
                        </TableCell>
                        <TableCell className={cn("text-green-600", isDarkMode ? "text-green-400" : "")}>
                          Rp {commission.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn("text-blue-600 hover:text-blue-700", isDarkMode ? "text-blue-400 hover:text-blue-300" : "")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
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
    </DashboardLayout>
  );
};

export default AgentOrders; 