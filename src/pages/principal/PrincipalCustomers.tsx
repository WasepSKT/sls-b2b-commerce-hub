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
import { Search, UserPlus, Edit, Trash, ShoppingBag, Users, Building2, CreditCard } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "corporate" | "retail";
  status: "active" | "inactive";
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

const PrincipalCustomers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();

  // Dummy data untuk statistik pelanggan
  const customerStats = {
    totalCustomers: 152,
    activeCustomers: 134,
    totalOrders: 450,
    totalRevenue: 750000000,
  };

  // Dummy data untuk daftar pelanggan
  const customers: Customer[] = [
    {
      id: "1",
      name: "PT Maju Bersama",
      email: "contact@majubersama.com",
      phone: "+62812-3456-7890",
      type: "corporate",
      status: "active",
      totalOrders: 25,
      totalSpent: 150000000,
      lastOrder: "2024-03-01",
    },
    {
      id: "2",
      name: "CV Sukses Mandiri",
      email: "info@suksesmandiri.com",
      phone: "+62812-3456-7891",
      type: "corporate",
      status: "active",
      totalOrders: 18,
      totalSpent: 120000000,
      lastOrder: "2024-02-28",
    },
    {
      id: "3",
      name: "Toko Makmur",
      email: "toko.makmur@email.com",
      phone: "+62812-3456-7892",
      type: "retail",
      status: "inactive",
      totalOrders: 12,
      totalSpent: 45000000,
      lastOrder: "2024-02-15",
    },
  ];

  const getStatusColor = (status: Customer["status"]) => {
    if (isDarkMode) {
      switch (status) {
        case "active":
          return "bg-emerald-500/20 text-emerald-400";
        case "inactive":
          return "bg-red-500/20 text-red-400";
        default:
          return "bg-gray-500/20 text-gray-400";
      }
    } else {
      switch (status) {
        case "active":
          return "bg-emerald-100 text-emerald-800";
        case "inactive":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  const getTypeColor = (type: Customer["type"]) => {
    if (isDarkMode) {
      switch (type) {
        case "corporate":
          return "bg-blue-500/20 text-blue-400";
        case "retail":
          return "bg-purple-500/20 text-purple-400";
        default:
          return "bg-gray-500/20 text-gray-400";
      }
    } else {
      switch (type) {
        case "corporate":
          return "bg-blue-100 text-blue-800";
        case "retail":
          return "bg-purple-100 text-purple-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  const getStatusText = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "inactive":
        return "Tidak Aktif";
      default:
        return status;
    }
  };

  const getTypeText = (type: Customer["type"]) => {
    switch (type) {
      case "corporate":
        return "Korporat";
      case "retail":
        return "Retail";
      default:
        return type;
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="principal" pageTitle="Manajemen Pelanggan">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Pelanggan</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Kelola pelanggan dan data transaksi
            </p>
          </div>
          <Button className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-blue-600 text-white hover:bg-blue-700" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}>
            <UserPlus className="w-4 h-4 mr-2" />
            Tambah Pelanggan
          </Button>
        </div>

        {/* Statistik Pelanggan */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Total Pelanggan</CardTitle>
              <Users className={cn(
                "h-4 w-4",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )} />
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>{customerStats.totalCustomers}</div>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                +12 pelanggan bulan ini
              </p>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Pelanggan Aktif</CardTitle>
              <Building2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>{customerStats.activeCustomers}</div>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                {((customerStats.activeCustomers / customerStats.totalCustomers) * 100).toFixed(1)}% dari total pelanggan
              </p>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Total Pesanan</CardTitle>
              <ShoppingBag className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>{customerStats.totalOrders}</div>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                +45 pesanan bulan ini
              </p>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Total Pendapatan</CardTitle>
              <CreditCard className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-emerald-400" : "text-emerald-600"
              )}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(customerStats.totalRevenue)}
              </div>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                +15.2% dari bulan lalu
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari pelanggan..."
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
                )}>Nama</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Email</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Telepon</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Tipe</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Status</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Total Pesanan</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Total Pembelian</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Pesanan Terakhir</TableHead>
                <TableHead className={cn(
                  "text-right",
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "hover:bg-gray-700/50 border-gray-700" 
                    : "hover:bg-gray-50 border-gray-200"
                )}>
                  <TableCell className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{customer.name}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-700"
                  )}>{customer.email}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-700"
                  )}>{customer.phone}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(customer.type)}>
                      {getTypeText(customer.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>
                      {getStatusText(customer.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{customer.totalOrders}</TableCell>
                  <TableCell className={cn(
                    "font-medium",
                    isDarkMode ? "text-emerald-400" : "text-emerald-600"
                  )}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(customer.totalSpent)}
                  </TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>{customer.lastOrder}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                          "transition-colors duration-300",
                          isDarkMode 
                            ? "text-red-400 hover:text-red-300 hover:bg-red-900/30" 
                            : "text-red-600 hover:text-red-700 hover:bg-red-100"
                        )}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
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

export default PrincipalCustomers; 