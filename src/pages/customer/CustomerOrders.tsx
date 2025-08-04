import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { Eye, Filter, PackageSearch, ShoppingBag, X, Check, CreditCard, MapPin, Building, Wallet } from "lucide-react";
import CustomerLayout from "@/components/CustomerLayout";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import FilterModal from "@/components/orders/FilterModal";
import PaymentModal from "@/components/orders/PaymentModal";
import { orders, getOrderItemsByOrderId, Order } from "@/lib/data/orders";
import { useAuth } from "@/lib/store/auth";

const CustomerOrders = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("transfer_bank");
  const [selectedAddress, setSelectedAddress] = useState("address1");
  const [loading, setLoading] = useState(false);

  // Get customer orders
  const customerOrders = orders.filter(order => order.customerId === user?.userId);

  // Sample user payment order data
  const pendingOrder = {
    orderId: "ORD-1235",
    orderDate: "2025-05-22",
    orderStatus: "pending",
    totalAmount: 350000,
    dueDate: "2025-05-23T23:59:00Z"
  };

  // Sample user address data
  const userAddresses = [
    {
      id: "address1",
      label: "Alamat Kantor (Utama)",
      address: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta, 10220",
      recipient: "PT. Maju Bersama",
      phone: "08123456789",
      isDefault: true
    },
    {
      id: "address2",
      label: "Alamat Gudang",
      address: "Jl. Industri Blok C2, Kawasan Industri Pulogadung, Jakarta Timur, 13920",
      recipient: "PT. Maju Bersama (Gudang)",
      phone: "08198765432",
      isDefault: false
    }
  ];

  // Sample payment methods
  const paymentMethods = [
    {
      id: "transfer_bank",
      name: "Transfer Bank",
      description: "BCA **** 1234",
      icon: Building,
      isDefault: true
    },
    {
      id: "credit_card",
      name: "Kartu Kredit",
      description: "Visa **** 4321",
      icon: CreditCard,
      isDefault: false
    }
  ];

  const applyFilter = () => {
    let filtered = [...customerOrders];

    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.orderStatus === statusFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter(order => order.orderDate.includes(dateFilter));
    }

    setFilteredOrders(filtered);
    setIsFiltered(statusFilter !== "all" || dateFilter !== "");
    setFilterOpen(false);
  };

  const resetFilter = () => {
    setStatusFilter("all");
    setDateFilter("");
    setIsFiltered(false);
    setFilteredOrders([]);
  };

  const handlePayNow = () => {
    setPaymentOpen(true);
  };

  const processPayment = async () => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setPaymentOpen(false);
      toast({
        title: "Pembayaran berhasil",
        description: "Pesanan Anda akan segera diproses",
      });

      // Update order status here in a real application
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Pembayaran gagal",
        description: "Terjadi kesalahan saat memproses pembayaran",
      });
    } finally {
      setLoading(false);
    }
  };

  // Display filtered orders if filter is applied, otherwise show all orders
  const displayedOrders = isFiltered ? filteredOrders : customerOrders;

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

  return (
    <CustomerLayout pageTitle="Pesanan Saya">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Lihat dan lacak pesanan Anda
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : "hover:bg-gray-100",
                isFiltered && "border-blue-500 bg-blue-100/10 text-blue-600"
              )}
              onClick={() => setFilterOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter {isFiltered && `(${filteredOrders.length})`}
            </Button>
            <Link to="/dashboard/customer/order-tracking">
              <Button variant="outline" size="sm" className={cn(
                isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : "hover:bg-gray-100"
              )}>
                <PackageSearch className="mr-2 h-4 w-4" />
                Lacak Pesanan
              </Button>
            </Link>
          </div>
        </div>

        {/* Pending Payment Card */}
        {customerOrders.some(order => order.paymentStatus === 'pending') && (
          <Card className={cn(
            "border-orange-200 bg-orange-50",
            isDarkMode ? "border-orange-800 bg-orange-900/20" : ""
          )}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "p-2 rounded-full",
                    isDarkMode ? "bg-orange-800/50" : "bg-orange-100"
                  )}>
                    <Wallet className={cn(
                      "h-5 w-5",
                      isDarkMode ? "text-orange-300" : "text-orange-600"
                    )} />
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-semibold",
                      isDarkMode ? "text-orange-200" : "text-orange-800"
                    )}>
                      Ada pesanan yang belum dibayar
                    </h3>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-orange-300" : "text-orange-600"
                    )}>
                      {pendingOrder.orderId} • {new Date(pendingOrder.orderDate).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-orange-200" : "text-orange-800"
                    )}>
                      Total Pembayaran
                    </p>
                    <p className={cn(
                      "text-lg font-bold",
                      isDarkMode ? "text-orange-100" : "text-orange-900"
                    )}>
                      Rp {pendingOrder.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    onClick={handlePayNow}
                    className={cn(
                      "bg-orange-600 hover:bg-orange-700 text-white",
                      isDarkMode ? "bg-orange-500 hover:bg-orange-600" : ""
                    )}
                  >
                    Bayar Sekarang
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Orders Table */}
        <Card className={cn(
          "transition-all duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardHeader>
            <CardTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>
              Riwayat Pesanan ({displayedOrders.length})
            </CardTitle>
            <CardDescription className={cn(isDarkMode ? "text-gray-300" : "text-gray-500")}>
              Semua pesanan yang telah Anda buat
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
                      Tanggal
                    </TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      Status
                    </TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      Item
                    </TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      Total
                    </TableHead>
                    <TableHead className={cn(isDarkMode ? "text-gray-100" : "text-gray-900")}>
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedOrders.map((order) => {
                    const orderItems = getOrderItemsByOrderId(order.orderId);
                    return (
                      <TableRow key={order.orderId} className={cn(
                        "transition-colors duration-300",
                        isDarkMode ? "border-gray-700 hover:bg-gray-750" : "border-gray-200 hover:bg-gray-50"
                      )}>
                        <TableCell className={cn("font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                          {order.orderId}
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
                        <TableCell className={cn(isDarkMode ? "text-gray-300" : "text-gray-900")}>
                          {orderItems.length} item
                        </TableCell>
                        <TableCell className={cn(isDarkMode ? "text-blue-400" : "text-blue-600")}>
                          Rp {order.totalAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn("text-blue-600 hover:text-blue-700", isDarkMode ? "text-blue-400 hover:text-blue-300" : "")}
                            onClick={() => navigate(`/dashboard/customer/order-detail/${order.orderId}`)}
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

            {displayedOrders.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBag className={cn("mx-auto h-12 w-12", isDarkMode ? "text-gray-400" : "text-gray-300")} />
                <h3 className={cn("mt-2 text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-900")}>
                  Belum ada pesanan
                </h3>
                <p className={cn("mt-1 text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                  Mulai berbelanja untuk melihat pesanan Anda di sini.
                </p>
                <div className="mt-6">
                  <Link to="/dashboard/customer/catalog">
                    <Button className={cn(
                      "bg-blue-600 hover:bg-blue-700 text-white",
                      isDarkMode ? "bg-blue-500 hover:bg-blue-600" : ""
                    )}>
                      Mulai Belanja
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Filter Modal */}
        <FilterModal
          open={filterOpen}
          onOpenChange={setFilterOpen}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          applyFilter={applyFilter}
          isDarkMode={isDarkMode}
        />

        {/* Payment Modal */}
        <PaymentModal
          open={paymentOpen}
          onOpenChange={setPaymentOpen}
          pendingOrder={pendingOrder}
          paymentMethods={paymentMethods}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          userAddresses={userAddresses}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          processPayment={processPayment}
          loading={loading}
          isDarkMode={isDarkMode}
        />
      </div>
    </CustomerLayout>
  );
};

export default CustomerOrders;