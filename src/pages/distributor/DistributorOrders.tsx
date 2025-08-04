import { useState } from "react";
import { Button } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Input } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Search, Eye } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { orders as allOrders, Order, getOrderItemsByOrderId } from "@/lib/data/orders";
import { getUserProfileByUserId } from "@/lib/data/users";
import { distributorProducts as products } from "@/lib/data/products";

const DistributorOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState(allOrders);

  const getStatusColor = (status: Order["status"]) => {
    if (isDarkMode) {
      switch (status) {
        case "pending": return "bg-yellow-500/20 text-yellow-400";
        case "processing": return "bg-blue-500/20 text-blue-400";
        case "shipped": return "bg-purple-500/20 text-purple-400";
        case "delivered": return "bg-green-500/20 text-green-400";
        case "cancelled": return "bg-red-500/20 text-red-400";
        default: return "bg-gray-500/20 text-gray-400";
      }
    } else {
      switch (status) {
        case "pending": return "bg-yellow-100 text-yellow-800";
        case "processing": return "bg-blue-100 text-blue-800";
        case "shipped": return "bg-purple-100 text-purple-800";
        case "delivered": return "bg-green-100 text-green-800";
        case "cancelled": return "bg-red-100 text-red-800";
        default: return "bg-gray-100 text-gray-800";
      }
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending": return "Menunggu";
      case "processing": return "Diproses";
      case "shipped": return "Dikirim";
      case "delivered": return "Diterima";
      case "cancelled": return "Dibatalkan";
      default: return status;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const userProfile = getUserProfileByUserId(order.customerId);
    return order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (userProfile?.fullName.toLowerCase() || "").includes(searchQuery.toLowerCase());
  });

  return (
    <DashboardLayout role="distributor" pageTitle="Dasbor Pesanan">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn("text-2xl font-semibold tracking-tight", isDarkMode ? "text-gray-50" : "text-slate-900")}>Pesanan</h2>
            <p className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-500")}>Kelola pesanan dari agen dan pelanggan.</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Cari pesanan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn("pl-10", isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white")}
          />
        </div>

        <div className={cn("border rounded-lg", isDarkMode ? "border-gray-700" : "")}>
          <Table>
            <TableHeader>
              <TableRow className={cn(isDarkMode ? "border-gray-700" : "")}>
                <TableHead className={cn(isDarkMode ? "text-gray-100" : "")}>ID Pesanan</TableHead>
                <TableHead className={cn(isDarkMode ? "text-gray-100" : "")}>Pelanggan</TableHead>
                <TableHead className={cn(isDarkMode ? "text-gray-100" : "")}>Tanggal</TableHead>
                <TableHead className={cn(isDarkMode ? "text-gray-100" : "")}>Total</TableHead>
                <TableHead className={cn(isDarkMode ? "text-gray-100" : "")}>Status</TableHead>
                <TableHead className={cn("text-right", isDarkMode ? "text-gray-100" : "")}>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const userProfile = getUserProfileByUserId(order.customerId);
                return (
                  <TableRow key={order.orderId} className={cn(isDarkMode ? "border-gray-700" : "")}>
                    <TableCell className={cn("font-medium", isDarkMode ? "text-gray-100" : "")}>{order.orderId}</TableCell>
                    <TableCell className={cn(isDarkMode ? "text-gray-100" : "")}>{userProfile?.fullName || 'N/A'}</TableCell>
                    <TableCell className={cn(isDarkMode ? "text-gray-100" : "")}>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className={cn(isDarkMode ? "text-gray-100" : "")}>{`Rp ${order.totalAmount.toLocaleString()}`}</TableCell>
                    <TableCell><Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => { setSelectedOrder(order); setIsOrderDetailOpen(true); }}><Eye className={cn("h-4 w-4", isDarkMode ? "text-gray-100" : "")} /></Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
          <DialogContent className={cn("sm:max-w-3xl", isDarkMode ? "bg-gray-800" : "")}>
            <DialogHeader>
              <DialogTitle className={cn(isDarkMode ? "text-white" : "")}>Detail Pesanan</DialogTitle>
              <DialogDescription className={cn(isDarkMode ? "text-gray-300" : "")}>Informasi lengkap pesanan.</DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="py-4">
                <p className={cn(isDarkMode ? "text-gray-100" : "")}><strong>ID Pesanan:</strong> {selectedOrder.orderId}</p>
                <p className={cn(isDarkMode ? "text-gray-100" : "")}><strong>Pelanggan:</strong> {getUserProfileByUserId(selectedOrder.customerId)?.fullName || 'N/A'}</p>
                <p className={cn(isDarkMode ? "text-gray-100" : "")}><strong>Tanggal:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                <p className={cn(isDarkMode ? "text-gray-100" : "")}><strong>Total:</strong> Rp {selectedOrder.totalAmount.toLocaleString()}</p>
                <p className={cn(isDarkMode ? "text-gray-100" : "")}><strong>Status:</strong> {getStatusText(selectedOrder.status)}</p>
                <h4 className={cn("mt-4 font-bold", isDarkMode ? "text-gray-100" : "")}>Item Pesanan:</h4>
                <ul>
                  {getOrderItemsByOrderId(selectedOrder.orderId).map(item => {
                    const product = products.find(p => p.productId === item.productId);
                    return <li key={item.orderItemId} className={cn(isDarkMode ? "text-gray-100" : "")}>{product?.productName || 'N/A'} - {item.quantity} x Rp {item.unitPriceAtOrder.toLocaleString()}</li>
                  })}
                </ul>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsOrderDetailOpen(false)} className={cn(isDarkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "")}>Tutup</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default DistributorOrders;