
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, Filter } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const CustomerPayments = () => {
  // Sample payment data
  const payments = [
    {
      id: "INV-001",
      date: "20 Mei 2025",
      amount: "Rp 450,000",
      method: "Transfer Bank",
      status: "Berhasil"
    },
    {
      id: "INV-002",
      date: "18 Mei 2025",
      amount: "Rp 275,000",
      method: "Kartu Kredit",
      status: "Berhasil"
    },
    {
      id: "INV-003",
      date: "15 Mei 2025",
      amount: "Rp 520,000",
      method: "E-Wallet",
      status: "Berhasil"
    },
    {
      id: "INV-004",
      date: "10 Mei 2025",
      amount: "Rp 150,000",
      method: "Transfer Bank",
      status: "Berhasil"
    },
    {
      id: "INV-005",
      date: "05 Mei 2025",
      amount: "Rp 380,000",
      method: "Kartu Debit",
      status: "Berhasil"
    }
  ];

  return (
    <DashboardLayout role="customer" pageTitle="Pembayaran">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Riwayat Pembayaran</h2>
            <p className="text-gray-500">
              Lihat dan kelola catatan pembayaran Anda
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Ekspor
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pembayaran Terakhir</CardTitle>
              <CardDescription>
                Daftar transaksi pembayaran Anda
              </CardDescription>
            </div>
            <CreditCard className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Pembayaran</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Metode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metode Pembayaran</CardTitle>
            <CardDescription>
              Kelola metode pembayaran Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <CreditCard className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">VISA **** 1234</p>
                    <p className="text-sm text-gray-500">Kadaluwarsa: 05/26</p>
                  </div>
                </div>
                <Badge>Utama</Badge>
              </div>

              <div className="border rounded-md p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-2 rounded-md">
                    <CreditCard className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Mastercard **** 5678</p>
                    <p className="text-sm text-gray-500">Kadaluwarsa: 08/27</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Jadikan Utama</Button>
              </div>

              <div className="text-center mt-6">
                <Button>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Tambah Metode Pembayaran
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomerPayments;
