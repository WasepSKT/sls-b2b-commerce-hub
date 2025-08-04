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
import { Search, Download } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

interface Commission {
  id: string;
  orderId: string;
  customer: string;
  date: string;
  amount: number;
  status: "pending" | "paid" | "cancelled";
  paymentDate: string | null;
  paymentMethod: string | null;
}

const AgentCommissions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();

  // Dummy data for commissions
  const commissions: Commission[] = [
    {
      id: "COM-001",
      orderId: "ORD-001",
      customer: "PT Maju Jaya",
      date: "2024-03-01",
      amount: 1500000,
      status: "paid",
      paymentDate: "2024-03-05",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "COM-002",
      orderId: "ORD-002",
      customer: "CV Berkah Abadi",
      date: "2024-02-28",
      amount: 800000,
      status: "pending",
      paymentDate: null,
      paymentMethod: null,
    },
    // Add more commissions as needed
  ];

  const totalCommissions = commissions.reduce((total, commission) => total + commission.amount, 0);
  const paidCommissions = commissions
    .filter(commission => commission.status === "paid")
    .reduce((total, commission) => total + commission.amount, 0);
  const pendingCommissions = commissions
    .filter(commission => commission.status === "pending")
    .reduce((total, commission) => total + commission.amount, 0);

  const getStatusColor = (status: Commission["status"]) => {
    if (isDarkMode) {
      switch (status) {
        case "paid":
          return "bg-emerald-500/20 text-emerald-400";
        case "pending":
          return "bg-yellow-500/20 text-yellow-400";
        case "cancelled":
          return "bg-red-500/20 text-red-400";
        default:
          return "bg-gray-500/20 text-gray-400";
      }
    } else {
      switch (status) {
        case "paid":
          return "bg-emerald-100 text-emerald-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "cancelled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  const getStatusText = (status: Commission["status"]) => {
    switch (status) {
      case "paid":
        return "Dibayar";
      case "pending":
        return "Menunggu";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  const filteredCommissions = commissions.filter((commission) =>
    commission.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    commission.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    commission.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="agent" pageTitle="Komisi">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Komisi</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Kelola dan pantau komisi penjualan Anda
            </p>
          </div>
          <Button className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-blue-600 text-white hover:bg-blue-700" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}>
            <Download className="w-4 h-4 mr-2" />
            Unduh Laporan
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-200"
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-gray-300" : "text-gray-500"
              )}>Total Komisi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(totalCommissions)}
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-200"
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-gray-300" : "text-gray-500"
              )}>Komisi Dibayar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold text-emerald-500",
                isDarkMode ? "text-emerald-400" : "text-emerald-600"
              )}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(paidCommissions)}
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-200"
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-gray-300" : "text-gray-500"
              )}>Komisi Tertunda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold text-yellow-500",
                isDarkMode ? "text-yellow-400" : "text-yellow-600"
              )}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(pendingCommissions)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari komisi..."
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
                )}>ID Komisi</TableHead>
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
                )}>Jumlah</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Status</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Tanggal Pembayaran</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Metode Pembayaran</TableHead>
                <TableHead className={cn(
                  "text-right",
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCommissions.map((commission) => (
                <TableRow key={commission.id} className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "hover:bg-gray-700/50 border-gray-700" 
                    : "hover:bg-gray-50 border-gray-200"
                )}>
                  <TableCell className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{commission.id}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{commission.orderId}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{commission.customer}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{commission.date}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(commission.amount)}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(commission.status)}`}>
                      {getStatusText(commission.status)}
                    </span>
                  </TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{commission.paymentDate || "-"}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{commission.paymentMethod || "-"}</TableCell>
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

export default AgentCommissions; 