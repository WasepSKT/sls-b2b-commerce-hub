import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Filter, PackageSearch, ShoppingBag, X, Check, CreditCard, MapPin, Building, Wallet } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import FilterModal from "@/components/orders/FilterModal";
import PaymentModal from "@/components/orders/PaymentModal";

const CustomerOrders = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("transfer_bank");
  const [selectedAddress, setSelectedAddress] = useState("address1");
  const [loading, setLoading] = useState(false);
  
  // Sample order data
  const orders = [
    { 
      id: "ORD-1234", 
      date: "20 Mei 2025", 
      status: "Dikirim", 
      items: 3, 
      total: "Rp 450,000",
      tracking: "JNE-12345678"
    },
    { 
      id: "ORD-1233", 
      date: "18 Mei 2025", 
      status: "Diproses", 
      items: 2, 
      total: "Rp 275,000",
      tracking: "JNT-87654321"
    },
    { 
      id: "ORD-1232", 
      date: "15 Mei 2025", 
      status: "Selesai", 
      items: 5, 
      total: "Rp 520,000",
      tracking: "SiCepat-23456789"
    },
    { 
      id: "ORD-1231", 
      date: "10 Mei 2025", 
      status: "Selesai", 
      items: 1, 
      total: "Rp 150,000",
      tracking: "AnterAja-98765432"
    },
    { 
      id: "ORD-1230", 
      date: "05 Mei 2025", 
      status: "Selesai", 
      items: 4, 
      total: "Rp 380,000",
      tracking: "JNE-56789012"
    }
  ];

  // Sample user payment order data
  const pendingOrder = {
    id: "ORD-1235",
    date: "22 Mei 2025",
    status: "Belum Dibayar",
    items: 2,
    total: 350000,
    dueDate: "23 Mei 2025, 23:59"
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
      description: "BCA - 8941234567",
      icon: Building,
      isDefault: true
    },
    {
      id: "ewallet",
      name: "E-Wallet",
      description: "Dana - 08123456789",
      icon: Wallet,
      isDefault: false
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
    let filtered = [...orders];
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    if (dateFilter) {
      filtered = filtered.filter(order => order.date.includes(dateFilter));
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
  const displayedOrders = isFiltered ? filteredOrders : orders;

  return (
    <DashboardLayout role="customer" pageTitle="Pesanan">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Daftar Pesanan</h2>
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

        <Card className={cn(
          "transition-colors duration-300",
          isDarkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-200"
        )}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className={cn(
                "text-lg font-semibold",
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Pesanan Terbaru</CardTitle>
              <CardDescription className={cn(
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                Daftar pesanan Anda {isFiltered && " (difilter)"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {isFiltered && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilter}
                  className={cn(
                    isDarkMode ? "text-gray-300 hover:bg-gray-700" : ""
                  )}
                >
                  <X className="h-4 w-4 mr-1" />
                  Reset Filter
                </Button>
              )}
              <ShoppingBag className={cn(
                "h-5 w-5 ml-2",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )} />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className={cn(
                  isDarkMode ? "border-gray-700" : ""
                )}>
                  <TableHead className={cn(
                    isDarkMode ? "text-gray-300" : ""
                  )}>No. Pesanan</TableHead>
                  <TableHead className={cn(
                    isDarkMode ? "text-gray-300" : ""
                  )}>Tanggal</TableHead>
                  <TableHead className={cn(
                    isDarkMode ? "text-gray-300" : ""
                  )}>Jumlah Item</TableHead>
                  <TableHead className={cn(
                    isDarkMode ? "text-gray-300" : ""
                  )}>Total</TableHead>
                  <TableHead className={cn(
                    isDarkMode ? "text-gray-300" : ""
                  )}>Status</TableHead>
                  <TableHead className={cn(
                    isDarkMode ? "text-gray-300" : ""
                  )}>No. Resi</TableHead>
                  <TableHead className={cn(
                    "text-right",
                    isDarkMode ? "text-gray-300" : ""
                  )}>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedOrders.length > 0 ? (
                  displayedOrders.map((order) => (
                    <TableRow key={order.id} className={cn(
                      isDarkMode 
                        ? "border-gray-700 hover:bg-transparent" 
                        : "hover:bg-white"
                    )}>
                      <TableCell className={cn(
                        "font-medium",
                        isDarkMode ? "text-gray-100" : ""
                      )}>{order.id}</TableCell>
                      <TableCell className={cn(
                        isDarkMode ? "text-gray-300" : ""
                      )}>{order.date}</TableCell>
                      <TableCell className={cn(
                        isDarkMode ? "text-gray-300" : ""
                      )}>{order.items} produk</TableCell>
                      <TableCell className={cn(
                        isDarkMode ? "text-gray-300" : ""
                      )}>{order.total}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "border transition-colors hover:bg-opacity-0 hover:bg-transparent",
                            order.status === "Selesai"
                              ? isDarkMode 
                                ? "bg-green-500/20 text-green-400 border-green-500/30" 
                                : "bg-green-100 text-green-800 border-green-300"
                              : order.status === "Dikirim"
                              ? isDarkMode 
                                ? "bg-blue-500/20 text-blue-400 border-blue-500/30" 
                                : "bg-blue-100 text-blue-800 border-blue-300"
                              : isDarkMode 
                                ? "bg-amber-500/20 text-amber-400 border-amber-500/30" 
                                : "bg-amber-50 text-amber-800 border-amber-300 font-medium"
                          )}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className={cn(
                        isDarkMode ? "text-gray-300" : ""
                      )}>{order.tracking}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className={cn(
                          isDarkMode ? "hover:bg-gray-700 text-gray-300" : ""
                        )}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className={cn(
                      "text-center py-8",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>
                      {isFiltered 
                        ? "Tidak ada pesanan yang sesuai dengan filter" 
                        : "Tidak ada pesanan yang tersedia"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "text-lg font-semibold",
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Status Pengiriman</CardTitle>
              <CardDescription className={cn(
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                Status pengiriman untuk pesanan terbaru Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={cn(
                  "border rounded-md p-4",
                  isDarkMode ? "border-gray-700" : ""
                )}>
                  <div className="flex justify-between mb-2">
                    <p className={cn(
                      "font-medium",
                      isDarkMode ? "text-gray-100" : ""
                    )}>ORD-1234</p>
                    <Badge className={cn(
                      "border transition-colors hover:bg-opacity-0 hover:bg-transparent",
                      isDarkMode 
                        ? "bg-blue-500/20 text-blue-400 border-blue-500/30" 
                        : "bg-blue-100 text-blue-800 border-blue-300"
                    )}>Dikirim</Badge>
                  </div>
                  <p className={cn(
                    "text-sm mb-4",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>Nomor Resi: JNE-12345678</p>
                  
                  <div className="relative">
                    <div className={cn(
                      "absolute left-2.5 top-0 h-full w-0.5",
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    )}></div>
                    <div className="space-y-6">
                      <div className="relative flex gap-3">
                        <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center z-10">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <div>
                          <p className={cn(
                            "font-medium",
                            isDarkMode ? "text-gray-100" : ""
                          )}>Paket dalam pengiriman</p>
                          <p className={cn(
                            "text-sm",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>20 Mei 2025, 10:23</p>
                        </div>
                      </div>
                      <div className="relative flex gap-3">
                        <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center z-10">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <div>
                          <p className={cn(
                            "font-medium",
                            isDarkMode ? "text-gray-100" : ""
                          )}>Paket telah diterima di gudang Jakarta</p>
                          <p className={cn(
                            "text-sm",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>19 Mei 2025, 18:45</p>
                        </div>
                      </div>
                      <div className="relative flex gap-3">
                        <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center z-10">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <div>
                          <p className={cn(
                            "font-medium",
                            isDarkMode ? "text-gray-100" : ""
                          )}>Pesanan dikonfirmasi</p>
                          <p className={cn(
                            "text-sm",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>19 Mei 2025, 08:30</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "text-lg font-semibold",
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Pesanan Menunggu Pembayaran</CardTitle>
              <CardDescription className={cn(
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                Pesanan yang belum dibayar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={cn(
                  "border rounded-md p-4",
                  isDarkMode ? "border-gray-700" : ""
                )}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className={cn(
                        "font-medium",
                        isDarkMode ? "text-gray-100" : ""
                      )}>{pendingOrder.id}</p>
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>{pendingOrder.date}</p>
                    </div>
                    <Badge className={cn(
                      "border transition-colors hover:bg-opacity-0 hover:bg-transparent",
                      isDarkMode 
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/30" 
                        : "bg-amber-50 text-amber-800 border-amber-300 font-medium"
                    )}>Belum Dibayar</Badge>
                  </div>
                  <div className="mt-4">
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-300" : ""
                    )}>Total: <span className={cn(
                      "font-semibold",
                      isDarkMode ? "text-white" : ""
                    )}>Rp {pendingOrder.total.toLocaleString()}</span></p>
                    <p className={cn(
                      "text-sm mt-1",
                      isDarkMode ? "text-gray-300" : ""
                    )}>Batas pembayaran: <span className="text-red-500 font-semibold">{pendingOrder.dueDate}</span></p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button 
                      className={cn(
                        "transition-colors duration-300",
                        isDarkMode 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : ""
                      )}
                      onClick={handlePayNow}
                    >
                      Bayar Sekarang
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Use FilterModal component */}
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

      {/* Use PaymentModal component */}
      <PaymentModal
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        pendingOrder={pendingOrder}
        userAddresses={userAddresses}
        paymentMethods={paymentMethods}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        loading={loading}
        processPayment={processPayment}
        isDarkMode={isDarkMode}
      />
    </DashboardLayout>
  );
};

export default CustomerOrders;
