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
import { Search, UserPlus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

const AgentCustomers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();

  // Dummy data for customers
  const customers: Customer[] = [
    {
      id: "1",
      name: "PT Maju Jaya",
      company: "PT Maju Jaya",
      email: "contact@majujaya.com",
      phone: "+62812-3456-7890",
      status: "active",
      totalOrders: 12,
      totalSpent: 25000000,
      lastOrder: "2024-03-01",
    },
    {
      id: "2",
      name: "CV Berkah Abadi",
      company: "CV Berkah Abadi",
      email: "info@berkah.com",
      phone: "+62812-3456-7891",
      status: "active",
      totalOrders: 8,
      totalSpent: 15000000,
      lastOrder: "2024-02-28",
    },
    // Add more customers as needed
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

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="agent" pageTitle="Manajemen Pelanggan">
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
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{customer.email}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{customer.phone}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(customer.status)}`}>
                      {getStatusText(customer.status)}
                    </span>
                  </TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{customer.totalOrders}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(customer.totalSpent)}
                  </TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{customer.lastOrder}</TableCell>
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

export default AgentCustomers; 