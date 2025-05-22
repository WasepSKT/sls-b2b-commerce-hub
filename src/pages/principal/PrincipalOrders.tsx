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
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Package, User, Calendar, CreditCard, Truck, ShoppingBag } from "lucide-react";
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
} from "@/components/ui/dialog";

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  agent: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  paymentStatus: "paid" | "pending" | "failed";
}

interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  price: number;
  quantity: number;
  subtotal: number;
}

const PrincipalOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Dummy data - replace with actual API call
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      customer: "PT Maju Jaya",
      agent: "John Doe",
      date: "2024-03-01",
      status: "processing",
      total: 15000000,
      paymentStatus: "paid",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      customer: "CV Berkah Abadi",
      agent: "Jane Smith",
      date: "2024-02-28",
      status: "pending",
      total: 8500000,
      paymentStatus: "pending",
    },
  ];

  // Get order items
  const getOrderItems = (orderId: string): OrderItem[] => {
    // This would be an API call in a real application
    if (orderId === "1") {
      return [
        {
          id: "item1",
          productName: "Laptop Asus TUF Gaming",
          sku: "LP-TUF-001",
          price: 12000000,
          quantity: 1,
          subtotal: 12000000
        },
        {
          id: "item2",
          productName: "Mouse Gaming Logitech",
          sku: "MS-LOG-002",
          price: 750000,
          quantity: 4,
          subtotal: 3000000
        }
      ];
    } else if (orderId === "2") {
      return [
        {
          id: "item3",
          productName: "Smartphone Samsung Galaxy A53",
          sku: "SP-SAM-A53",
          price: 4250000,
          quantity: 2,
          subtotal: 8500000
        }
      ];
    }
    
    return [];
  };

  // Function to handle opening order detail
  const handleOpenOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };

  const getStatusColor = (status: Order["status"]) => {
    if (isDarkMode) {
      switch (status) {
        case "pending":
          return "bg-yellow-500/20 text-yellow-400";
        case "processing":
          return "bg-blue-500/20 text-blue-400";
        case "shipped":
          return "bg-purple-500/20 text-purple-400";
        case "delivered":
          return "bg-green-500/20 text-green-400";
        case "cancelled":
          return "bg-red-500/20 text-red-400";
        default:
          return "bg-gray-500/20 text-gray-400";
      }
    } else {
      switch (status) {
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "processing":
          return "bg-blue-100 text-blue-800";
        case "shipped":
          return "bg-purple-100 text-purple-800";
        case "delivered":
          return "bg-green-100 text-green-800";
        case "cancelled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Menunggu";
      case "processing":
        return "Diproses";
      case "shipped":
        return "Dikirim";
      case "delivered":
        return "Diterima";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
    if (isDarkMode) {
      switch (status) {
        case "paid":
          return "bg-green-500/20 text-green-400";
        case "pending":
          return "bg-yellow-500/20 text-yellow-400";
        case "failed":
          return "bg-red-500/20 text-red-400";
        default:
          return "bg-gray-500/20 text-gray-400";
      }
    } else {
      switch (status) {
        case "paid":
          return "bg-green-100 text-green-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "failed":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  const getPaymentStatusText = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return "Lunas";
      case "pending":
        return "Menunggu";
      case "failed":
        return "Gagal";
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="principal" pageTitle="Manajemen Pesanan">
      <div className="space-y-6">
        {/* Order Detail Dialog */}
        <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
          <DialogContent className={cn(
            "sm:max-w-[700px]",
            isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
          )}>
            <DialogHeader>
              <DialogTitle className={cn(
                isDarkMode ? "text-gray-100" : ""
              )}>Detail Pesanan</DialogTitle>
              <DialogDescription className={cn(
                isDarkMode ? "text-gray-400" : ""
              )}>
                {selectedOrder ? `Pesanan: ${selectedOrder.orderNumber}` : "Informasi pesanan"}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              {selectedOrder && (
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
                      )}>{selectedOrder.orderNumber}</p>
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
                      )}>{selectedOrder.date}</p>
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
                      <Badge className={getPaymentStatusColor(selectedOrder.paymentStatus)}>
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
                      <Badge className={getStatusColor(selectedOrder.status)}>
                        {getStatusText(selectedOrder.status)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className={cn(
                      "p-3 rounded-lg border",
                      isDarkMode ? "bg-gray-750 border-gray-700" : "bg-gray-50 border-gray-200"
                    )}>
                      <div className="flex items-center gap-2 mb-2">
                        <User className={cn(
                          "h-4 w-4",
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        )} />
                        <span className={cn(
                          "text-xs font-medium",
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        )}>Pelanggan</span>
                      </div>
                      <p className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{selectedOrder.customer}</p>
                    </div>
                    
                    <div className={cn(
                      "p-3 rounded-lg border",
                      isDarkMode ? "bg-gray-750 border-gray-700" : "bg-gray-50 border-gray-200"
                    )}>
                      <div className="flex items-center gap-2 mb-2">
                        <User className={cn(
                          "h-4 w-4",
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        )} />
                        <span className={cn(
                          "text-xs font-medium",
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        )}>Agen</span>
                      </div>
                      <p className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{selectedOrder.agent}</p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <h3 className={cn(
                      "text-sm font-medium mb-2",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        <span>Item Pesanan</span>
                      </div>
                    </h3>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className={cn(
                            isDarkMode ? "border-gray-700" : ""
                          )}>
                            <TableHead className={cn(
                              isDarkMode ? "text-gray-300" : ""
                            )}>Produk</TableHead>
                            <TableHead className={cn(
                              isDarkMode ? "text-gray-300" : ""
                            )}>SKU</TableHead>
                            <TableHead className={cn(
                              "text-right",
                              isDarkMode ? "text-gray-300" : ""
                            )}>Harga</TableHead>
                            <TableHead className={cn(
                              "text-right",
                              isDarkMode ? "text-gray-300" : ""
                            )}>Qty</TableHead>
                            <TableHead className={cn(
                              "text-right",
                              isDarkMode ? "text-gray-300" : ""
                            )}>Subtotal</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getOrderItems(selectedOrder.id).map((item) => (
                            <TableRow key={item.id} className={cn(
                              isDarkMode 
                                ? "border-gray-700 hover:bg-gray-700/50" 
                                : "hover:bg-gray-50"
                            )}>
                              <TableCell className={cn(
                                "font-medium",
                                isDarkMode ? "text-gray-200" : ""
                              )}>
                                {item.productName}
                              </TableCell>
                              <TableCell className={cn(
                                isDarkMode ? "text-gray-300" : ""
                              )}>
                                {item.sku}
                              </TableCell>
                              <TableCell className={cn(
                                "text-right",
                                isDarkMode ? "text-gray-300" : ""
                              )}>
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                }).format(item.price)}
                              </TableCell>
                              <TableCell className={cn(
                                "text-right",
                                isDarkMode ? "text-gray-300" : ""
                              )}>
                                {item.quantity}
                              </TableCell>
                              <TableCell className={cn(
                                "text-right font-medium",
                                isDarkMode ? "text-emerald-400" : "text-emerald-600"
                              )}>
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                }).format(item.subtotal)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
                    <div className="w-full md:w-1/3 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={cn(
                          "text-sm",
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        )}>Total:</span>
                        <span className={cn(
                          "font-semibold",
                          isDarkMode ? "text-emerald-400" : "text-emerald-600"
                        )}>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(selectedOrder.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button
                onClick={() => setIsOrderDetailOpen(false)}
                className={cn(
                  isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                )}
              >
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
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
              Kelola pesanan dari pelanggan B2B
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
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
                )}>No. Pesanan</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Pelanggan</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Agen</TableHead>
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
                )}>Pembayaran</TableHead>
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
                  )}>{order.orderNumber}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{order.customer}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{order.agent}</TableCell>
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
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {getPaymentStatusText(order.paymentStatus)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={cn(
                        "transition-colors duration-300",
                        isDarkMode 
                          ? "text-blue-400 hover:text-blue-300 hover:bg-blue-900/30" 
                          : "text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                      )}
                      onClick={() => handleOpenOrderDetail(order)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
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

export default PrincipalOrders;