
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, CreditCard, Package, ShoppingBag, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  // Sample data for dashboard stats
  const stats = [
    { title: "Total Pembelian", value: "Rp 1,245,000", icon: CreditCard, iconClass: "text-primary" },
    { title: "Pesanan Aktif", value: "3", icon: ShoppingBag, iconClass: "text-secondary" },
    { title: "Produk di Keranjang", value: "5", icon: ShoppingCart, iconClass: "text-amber-500" },
    { title: "Poin Reward", value: "750", icon: Award, iconClass: "text-emerald-500" },
  ];

  // Sample order data
  const orders = [
    { id: "ORD-1234", date: "20 Mei 2025", status: "Dikirim", items: 3, total: "Rp 450,000" },
    { id: "ORD-1233", date: "18 Mei 2025", status: "Diproses", items: 2, total: "Rp 275,000" },
    { id: "ORD-1232", date: "15 Mei 2025", status: "Selesai", items: 5, total: "Rp 520,000" },
    { id: "ORD-1231", date: "10 Mei 2025", status: "Selesai", items: 1, total: "Rp 150,000" },
  ];

  // Sample featured products
  const featuredProducts = [
    { id: 1, name: "Produk Premium 1", price: "Rp 150,000", discount: "10%" },
    { id: 2, name: "Produk Premium 2", price: "Rp 225,000", discount: "15%" },
    { id: 3, name: "Produk Premium 3", price: "Rp 175,000", discount: "5%" },
  ];

  return (
    <DashboardLayout role="customer" pageTitle="Dashboard Pelanggan B2B">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                  </div>
                  <div className={`rounded-full p-2 ${stat.iconClass} bg-opacity-10`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pesanan Terakhir</CardTitle>
                <CardDescription>
                  Riwayat pesanan terbaru Anda
                </CardDescription>
              </div>
              <Link to="/dashboard/customer/orders">
                <Button variant="outline" size="sm">Lihat Semua</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm border-b">
                      <th className="py-3 px-4 font-medium">No. Pesanan</th>
                      <th className="py-3 px-4 font-medium">Tanggal</th>
                      <th className="py-3 px-4 font-medium">Item</th>
                      <th className="py-3 px-4 font-medium">Total</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="py-3 px-4">
                          <span className="font-medium">{order.id}</span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{order.date}</td>
                        <td className="py-3 px-4">{order.items} produk</td>
                        <td className="py-3 px-4 font-medium">{order.total}</td>
                        <td className="py-3 px-4">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produk Unggulan</CardTitle>
              <CardDescription>
                Produk dengan harga khusus untuk Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 relative hover:border-primary transition-colors">
                    <div className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full px-2 py-1">
                      -{product.discount}
                    </div>
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded bg-gray-200 flex items-center justify-center mr-4">
                        <Package className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-primary font-medium">{product.price}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end gap-2">
                      <Button variant="outline" size="sm">Detail</Button>
                      <Button size="sm">+ Keranjang</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Program Reward</CardTitle>
            <CardDescription>
              Poin reward Anda dan cara menukarkannya
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-primary text-lg">Level Anda: Silver</h3>
                    <p className="text-gray-600">750 poin terkumpul</p>
                  </div>
                  <Award className="h-12 w-12 text-primary" />
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-primary rounded-full w-3/4"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-gray-600">
                    <span>0 poin</span>
                    <span>750/1000 poin untuk Level Gold</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Tukar Poin Anda</h4>
                <p className="text-sm text-gray-600 mb-4">Pilih hadiah yang tersedia untuk ditukarkan dengan poin Anda.</p>
                <div className="flex justify-end">
                  <Button>Katalog Hadiah</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
