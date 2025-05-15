
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Filter, PackageSearch, ShoppingBag } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const CustomerOrders = () => {
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

  return (
    <DashboardLayout role="customer" pageTitle="Pesanan">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Daftar Pesanan</h2>
            <p className="text-gray-500">
              Lihat dan lacak pesanan Anda
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <PackageSearch className="mr-2 h-4 w-4" />
              Lacak Pesanan
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pesanan Terbaru</CardTitle>
              <CardDescription>
                Daftar pesanan Anda
              </CardDescription>
            </div>
            <ShoppingBag className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No. Pesanan</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Jumlah Item</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>No. Resi</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items} produk</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          order.status === "Selesai"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Dikirim"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.tracking}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Status Pengiriman</CardTitle>
              <CardDescription>
                Status pengiriman untuk pesanan terbaru Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">ORD-1234</p>
                    <Badge className="bg-blue-100 text-blue-800">Dikirim</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Nomor Resi: JNE-12345678</p>
                  
                  <div className="relative">
                    <div className="absolute left-2.5 top-0 h-full w-0.5 bg-gray-200"></div>
                    <div className="space-y-6">
                      <div className="relative flex gap-3">
                        <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center z-10">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <div>
                          <p className="font-medium">Paket dalam pengiriman</p>
                          <p className="text-sm text-gray-500">20 Mei 2025, 10:23</p>
                        </div>
                      </div>
                      <div className="relative flex gap-3">
                        <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center z-10">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <div>
                          <p className="font-medium">Paket telah diterima di gudang Jakarta</p>
                          <p className="text-sm text-gray-500">19 Mei 2025, 18:45</p>
                        </div>
                      </div>
                      <div className="relative flex gap-3">
                        <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center z-10">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <div>
                          <p className="font-medium">Pesanan dikonfirmasi</p>
                          <p className="text-sm text-gray-500">19 Mei 2025, 08:30</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pesanan Menunggu Pembayaran</CardTitle>
              <CardDescription>
                Pesanan yang belum dibayar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium">ORD-1235</p>
                      <p className="text-sm text-gray-500">22 Mei 2025</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800">Belum Dibayar</Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm">Total: <span className="font-semibold">Rp 350,000</span></p>
                    <p className="text-sm mt-1">Batas pembayaran: <span className="text-red-500 font-semibold">23 Mei 2025, 23:59</span></p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button>Bayar Sekarang</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerOrders;
