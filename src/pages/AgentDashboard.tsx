
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { BarChart, CreditCard, Package, ShoppingBag, Store, Users } from "lucide-react";

const AgentDashboard = () => {
  // Sample data for dashboard stats
  const stats = [
    { title: "Total Penjualan", value: "Rp 4,875,000", change: "+8.3%", icon: CreditCard, iconClass: "text-primary" },
    { title: "Pesanan Baru", value: "12", change: "+3.7%", icon: ShoppingBag, iconClass: "text-secondary" },
    { title: "Pelanggan", value: "27", change: "+1.5%", icon: Store, iconClass: "text-amber-500" },
    { title: "Komisi", value: "Rp 487,500", change: "+8.3%", icon: Users, iconClass: "text-emerald-500" },
  ];

  return (
    <DashboardLayout role="agent" pageTitle="Dashboard Agen">
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
              <CardTitle>Performa Penjualan</CardTitle>
              <CardDescription>
                Statistik penjualan 30 hari terakhir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-gray-50">
                <div className="text-center">
                  <BarChart className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Chart Performa Penjualan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produk Terlaris</CardTitle>
              <CardDescription>
                5 produk dengan penjualan tertinggi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((product) => (
                  <div key={product} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center mr-3">
                        <Package className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">Produk #{product}</p>
                        <p className="text-sm text-gray-500">{Math.floor(Math.random() * 100)} terjual</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      Rp {(Math.random() * 500000).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pelanggan B2B Teratas</CardTitle>
            <CardDescription>
              Daftar 5 pelanggan B2B dengan transaksi tertinggi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Pelanggan</th>
                    <th className="text-left py-3 px-4">Total Belanja</th>
                    <th className="text-left py-3 px-4">Pesanan</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 px-4">Pelanggan #{index}</td>
                      <td className="py-3 px-4">Rp {(Math.random() * 5000000).toFixed(0)}</td>
                      <td className="py-3 px-4">{Math.floor(Math.random() * 30)}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Aktif
                        </span>
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

export default AgentDashboard;
