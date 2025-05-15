
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { BarChart, CreditCard, Package, ShoppingBag, Truck, Users } from "lucide-react";

const PrincipalDashboard = () => {
  // Sample data for dashboard stats
  const stats = [
    { title: "Total Penjualan", value: "Rp 12,345,000", change: "+12.5%", icon: CreditCard, iconClass: "text-primary" },
    { title: "Pesanan Baru", value: "23", change: "+5.2%", icon: ShoppingBag, iconClass: "text-secondary" },
    { title: "Total Agen", value: "48", change: "+2.1%", icon: Users, iconClass: "text-amber-500" },
    { title: "Total Produk", value: "152", change: "+7.8%", icon: Package, iconClass: "text-emerald-500" },
  ];

  return (
    <DashboardLayout role="principal" pageTitle="Dashboard Principal">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                    <p className="text-xs text-green-500">{stat.change} bulan ini</p>
                  </div>
                  <div className={`rounded-full p-2 ${stat.iconClass} bg-opacity-10`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Penjualan Mingguan</CardTitle>
              <CardDescription>
                Statistik penjualan 7 hari terakhir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-gray-50">
                <div className="text-center">
                  <BarChart className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Chart Penjualan Mingguan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pesanan Terbaru</CardTitle>
              <CardDescription>
                5 pesanan terbaru dari pelanggan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((order) => (
                  <div key={order} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">Order #{(Math.random() * 10000).toFixed(0)}</p>
                      <p className="text-sm text-gray-500">Pelanggan #{(Math.random() * 100).toFixed(0)}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-green-600">Rp {(Math.random() * 1000000).toFixed(0)}</span>
                      <Truck className="ml-2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performa Agen</CardTitle>
            <CardDescription>
              Tabel perbandingan performa 5 agen teratas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Agen</th>
                    <th className="text-left py-3 px-4">Total Penjualan</th>
                    <th className="text-left py-3 px-4">Pesanan</th>
                    <th className="text-left py-3 px-4">Pelanggan</th>
                    <th className="text-left py-3 px-4">Pertumbuhan</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 px-4">Agen #{index}</td>
                      <td className="py-3 px-4">Rp {(Math.random() * 10000000).toFixed(0)}</td>
                      <td className="py-3 px-4">{Math.floor(Math.random() * 100)}</td>
                      <td className="py-3 px-4">{Math.floor(Math.random() * 50)}</td>
                      <td className="py-3 px-4">
                        <span className="text-green-600">+{(Math.random() * 20).toFixed(1)}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PrincipalDashboard;
