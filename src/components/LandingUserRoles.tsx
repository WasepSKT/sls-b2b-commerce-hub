
import {
  Building,
  Users,
  Store
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const userRoles = [
  {
    name: "Principal (UMKM)",
    description: 
      "Sebagai pemilik bisnis, kelola semua aspek distribusi produk secara efisien dengan dashboard komprehensif.",
    features: [
      "Dashboard manajemen bisnis",
      "Pengelolaan produk dan harga",
      "Manajemen stok gudang",
      "Laporan penjualan dan komisi",
      "Pengaturan agen dan pelanggan B2B"
    ],
    icon: Building,
    color: "bg-primary"
  },
  {
    name: "Agen",
    description: 
      "Akses khusus untuk mitra distribusi dengan fitur pengelolaan pelanggan dan komisi.",
    features: [
      "Dashboard agen",
      "Katalog produk dengan harga khusus",
      "Laporan aktivitas dan komisi",
      "Manajemen pelanggan B2B",
      "Notifikasi pesanan baru"
    ],
    icon: Users,
    color: "bg-secondary"
  },
  {
    name: "Pelanggan B2B",
    description: 
      "Akses mudah untuk melakukan pembelian, melihat riwayat transaksi, dan mengumpulkan poin reward.",
    features: [
      "Katalog produk dengan harga B2B",
      "Sistem pemesanan online",
      "Pembayaran terintegrasi",
      "Notifikasi status pesanan",
      "Program poin reward"
    ],
    icon: Store,
    color: "bg-accent"
  }
];

const LandingUserRoles = () => {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Solusi untuk Setiap Peran Bisnis
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-600">
            Platform kami menyediakan fitur khusus untuk setiap peran dalam ekosistem distribusi UMKM
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {userRoles.map((role) => (
            <Card key={role.name} className="border border-gray-200 transition-all duration-200 hover:border-primary-300 hover:shadow-md">
              <CardHeader>
                <div className={`inline-flex rounded-lg p-3 ${role.color} text-white ring-4 ring-white`}>
                  <role.icon className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 text-xl">{role.name}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {role.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <svg className="mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingUserRoles;
