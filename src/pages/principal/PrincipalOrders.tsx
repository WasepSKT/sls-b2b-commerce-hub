import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui";
import DashboardLayout from "@/components/DashboardLayout";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { orders, getOrderItemsByOrderId } from "@/lib/data/orders";
import { getUserProfileByUserId } from "@/lib/data/users";
import { getProductsByRole } from "@/lib/data/products";
import { Search, Eye, Filter, Package, Calendar, CreditCard, Truck, User } from "lucide-react";

const PrincipalOrders = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Get principal products to filter orders
  const principalProducts = getProductsByRole('principal');
  const principalProductIds = principalProducts.map(p => p.productId);

  // Filter orders that contain principal's products
  const principalOrders = orders.filter(order => {
    const orderItems = getOrderItemsByOrderId(order.orderId);
    return orderItems.some(item => principalProductIds.includes(item.productId));
  });

  // Filter orders based on search and filters
  const filteredOrders = principalOrders.filter((order) => {
    const userProfile = getUserProfileByUserId(order.customerId);
    const matchesSearch = order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (userProfile?.fullName.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleOpenOrderDetail = (order: any) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };

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
    <DashboardLayout role="principal" pageTitle="Manajemen Pesanan">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Manajemen Pesanan</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Kelola pesanan yang mengandung produk Anda
            </p>
          </div>
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
              Pesanan yang mengandung produk Anda
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
                    <TableHead className={cn("text-right", isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const userProfile = getUserProfileByUserId(order.customerId);
                    return (
                      <TableRow key={order.orderId} className={cn(
                        "transition-colors duration-300",
                        isDarkMode ? "border-gray-700 hover:bg-gray-750" : "border-gray-200 hover:bg-gray-50"
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
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenOrderDetail(order)}
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

        {/* Order Detail Dialog */}
        <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
          <DialogContent className={cn(
            "sm:max-w-[700px]",
            isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
          )}>
            <DialogHeader>
              <DialogTitle className={cn(isDarkMode ? "text-gray-100" : "")}>
                Detail Pesanan
              </DialogTitle>
              <DialogDescription className={cn(isDarkMode ? "text-gray-400" : "")}>
                {selectedOrder ? `Pesanan: ${selectedOrder.orderId}` : "Informasi pesanan"}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              {selectedOrder && (() => {
                const userProfile = getUserProfileByUserId(selectedOrder.customerId);
                const orderItems = getOrderItemsByOrderId(selectedOrder.orderId);
                const principalItems = orderItems.filter(item => principalProductIds.includes(item.productId));
                
                return (
                  <>
                    <div className="flex flex-col md:flex-row gap-3 mb-4 pb-4 border-b border-dashed border-gray-200 dark:border-gray-700">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Package className={cn(
                            "h-4 w-4",
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          )} />
                          <span className={cn(
                            "text-xs font-medium",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>Nomor Pesanan</span>
                        </div>
                        <p className={cn(
                          "font-medium",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>{selectedOrder.orderId}</p>
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className={cn(
                            "h-4 w-4",
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          )} />
                          <span className={cn(
                            "text-xs font-medium",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>Tanggal Pesanan</span>
                        </div>
                        <p className={cn(
                          "font-medium",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>{new Date(selectedOrder.orderDate).toLocaleDateString('id-ID')}</p>
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <User className={cn(
                            "h-4 w-4",
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          )} />
                          <span className={cn(
                            "text-xs font-medium",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>Pelanggan</span>
                        </div>
                        <p className={cn(
                          "font-medium",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}>{userProfile?.fullName || "N/A"}</p>
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <CreditCard className={cn(
                            "h-4 w-4",
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          )} />
                          <span className={cn(
                            "text-xs font-medium",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>Pembayaran</span>
                        </div>
                        <Badge className={cn(
                          getPaymentStatusColor(selectedOrder.paymentStatus),
                          isDarkMode ? getPaymentStatusColorDark(selectedOrder.paymentStatus) : ""
                        )}>
                          {getPaymentStatusText(selectedOrder.paymentStatus)}
                        </Badge>
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Truck className={cn(
                            "h-4 w-4",
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          )} />
                          <span className={cn(
                            "text-xs font-medium",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>Status</span>
                        </div>
                        <Badge className={cn(
                          getStatusColor(selectedOrder.orderStatus),
                          isDarkMode ? getStatusColorDark(selectedOrder.orderStatus) : ""
                        )}>
                          {getStatusText(selectedOrder.orderStatus)}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className={cn(
                        "font-semibold",
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      )}>
                        Item Produk Anda ({principalItems.length})
                      </h4>
                      
                      <div className="space-y-3">
                        {principalItems.map((item) => {
                          const product = principalProducts.find(p => p.productId === item.productId);
                          return (
                            <div key={item.orderItemId} className={cn(
                              "flex items-center justify-between p-3 border rounded-lg",
                              isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"
                            )}>
                              <div className="flex items-center space-x-3">
                                <div className={cn(
                                  "w-10 h-10 rounded bg-gray-200",
                                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                                )}>
                                  <img
                                    src={product?.imageUrls[0] || "/placeholder-product.jpg"}
                                    alt={product?.productName || "Product"}
                                    className="w-full h-full object-cover rounded"
                                  />
                                </div>
                                <div>
                                  <p className={cn(
                                    "font-medium",
                                    isDarkMode ? "text-gray-100" : "text-gray-900"
                                  )}>
                                    {product?.productName || "Product"}
                                  </p>
                                  <p className={cn(
                                    "text-sm",
                                    isDarkMode ? "text-gray-400" : "text-gray-500"
                                  )}>
                                    SKU: {product?.sku || "N/A"}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={cn(
                                  "font-medium",
                                  isDarkMode ? "text-gray-100" : "text-gray-900"
                                )}>
                                  {item.quantity} x Rp {item.unitPriceAtOrder.toLocaleString()}
                                </p>
                                <p className={cn(
                                  "text-sm font-bold",
                                  isDarkMode ? "text-blue-400" : "text-blue-600"
                                )}>
                                  Rp {item.subtotal.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className={cn(
                        "border-t pt-4",
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      )}>
                        <div className="flex justify-between items-center">
                          <span className={cn(
                            "font-semibold",
                            isDarkMode ? "text-gray-100" : "text-gray-900"
                          )}>
                            Total Nilai Produk Anda
                          </span>
                          <span className={cn(
                            "text-lg font-bold",
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          )}>
                            Rp {principalItems.reduce((sum, item) => sum + item.subtotal, 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default PrincipalOrders;