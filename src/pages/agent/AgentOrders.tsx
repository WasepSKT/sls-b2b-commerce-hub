import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

interface Order {
  id: string;
  customer: string;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  items: number;
  paymentStatus: "paid" | "unpaid" | "partial";
  commission: number;
}

const AgentOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();

  // Dummy data for orders
  const orders: Order[] = [
    {
      id: "ORD-001",
      customer: "PT Maju Jaya",
      date: "2024-03-01",
      status: "completed",
      total: 15000000,
      items: 5,
      paymentStatus: "paid",
      commission: 1500000,
    },
    {
      id: "ORD-002",
      customer: "CV Berkah Abadi",
      date: "2024-02-28",
      status: "processing",
      total: 8000000,
      items: 3,
      paymentStatus: "partial",
      commission: 800000,
    },
    // Add more orders as needed
  ];

  const getStatusColor = (status: Order["status"]) => {
    if (isDarkMode) {
      switch (status) {
        case "completed":
          return "bg-emerald-500/20 text-emerald-400";
        case "processing":
          return "bg-yellow-500/20 text-yellow-400";
        case "cancelled":
          return "bg-red-500/20 text-red-400";
        case "pending":
          return "bg-blue-500/20 text-blue-400";
        default:
          return "bg-gray-500/20 text-gray-400";
      }
    } else {
      switch (status) {
        case "completed":
          return "bg-emerald-100 text-emerald-800";
        case "processing":
          return "bg-yellow-100 text-yellow-800";
        case "cancelled":
          return "bg-red-100 text-red-800";
        case "pending":
          return "bg-blue-100 text-blue-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
    if (isDarkMode) {
      switch (status) {
        case "paid":
          return "bg-emerald-500/20 text-emerald-400";
        case "partial":
          return "bg-yellow-500/20 text-yellow-400";
        case "unpaid":
          return "bg-red-500/20 text-red-400";
        default:
          return "bg-gray-500/20 text-gray-400";
      }
    } else {
      switch (status) {
        case "paid":
          return "bg-emerald-100 text-emerald-800";
        case "partial":
          return "bg-yellow-100 text-yellow-800";
        case "unpaid":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "processing":
        return "Diproses";
      case "cancelled":
        return "Dibatalkan";
      case "pending":
        return "Menunggu";
      default:
        return status;
    }
  };

  const getPaymentStatusText = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return "Lunas";
      case "partial":
        return "Sebagian";
      case "unpaid":
        return "Belum Bayar";
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="agent" pageTitle="Manajemen Pesanan">
      <div className="space-y-6">
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
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari pesanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-10 transition-colors duration-300",
                isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
              )}
            />
          </div>
        </div>

        <div className={cn(
          "border rounded-lg transition-colors duration-300",
          isDarkMode ? "border-gray-700" : "border-gray-200"
        )}>
          <Table>
            <TableHeader>
              <TableRow className={cn(
                "transition-colors duration-300",
                isDarkMode ? "border-gray-700" : "border-gray-200"
              )}>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>ID Pesanan</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Pelanggan</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Tanggal</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Status</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Total</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Item</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Pembayaran</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Komisi</TableHead>
                <TableHead className={cn(
                  "text-right",
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "hover:bg-gray-700/50 border-gray-700" 
                    : "hover:bg-gray-50 border-gray-200"
                )}>
                  <TableCell className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{order.id}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{order.customer}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{order.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(order.total)}
                  </TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{order.items}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {getPaymentStatusText(order.paymentStatus)}
                    </span>
                  </TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(order.commission)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={cn(
                        "transition-colors duration-300",
                        isDarkMode 
                          ? "text-gray-400 hover:text-white hover:bg-gray-700" 
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      )}
                    >
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentOrders; 