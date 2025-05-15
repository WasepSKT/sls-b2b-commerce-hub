
import { 
  BarChart, 
  Package, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  Bell, 
  Award, 
  Headphones 
} from "lucide-react";

const features = [
  {
    name: "Pengelolaan Produk Lengkap",
    description: "Mengelola produk, harga, dan stok dengan mudah melalui panel admin yang intuitif.",
    icon: Package,
  },
  {
    name: "Manajemen Multi-level User",
    description: "Kelola akses untuk Principal, Agen, dan Pelanggan B2B dalam satu platform.",
    icon: Users,
  },
  {
    name: "Pemesanan Otomatis",
    description: "Sistem pemesanan online yang terintegrasi dengan manajemen stok dan pengiriman.",
    icon: ShoppingCart,
  },
  {
    name: "Pembayaran Terintegrasi",
    description: "Integrasi dengan berbagai payment gateway (Xendit, Midtrans, DOKU) untuk pembayaran instan.",
    icon: CreditCard,
  },
  {
    name: "Notifikasi Real-time",
    description: "Pemberitahuan otomatis melalui WhatsApp untuk setiap status pesanan.",
    icon: Bell,
  },
  {
    name: "Sistem Reward Poin",
    description: "Reward pelanggan setia dengan sistem poin yang terhitung otomatis berdasarkan transaksi.",
    icon: Award,
  },
  {
    name: "Laporan Komprehensif",
    description: "Laporan stok, penjualan, dan komisi yang detail untuk pengambilan keputusan bisnis.",
    icon: BarChart,
  },
  {
    name: "Dukungan Teknis",
    description: "Sistem helpdesk terintegrasi untuk penanganan masalah dengan cepat dan efisien.",
    icon: Headphones,
  },
];

const LandingFeatures = () => {
  return (
    <div className="bg-white py-16 sm:py-24" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Fitur Utama Platform
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-600">
            Solusi lengkap untuk sistem distribusi UMKM dengan model SLS to B2B
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6 h-full">
                <div className="flow-root h-full rounded-lg bg-gray-50 px-6 pb-8 border border-gray-100 transition-all duration-200 hover:border-primary-300 hover:shadow-md">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-primary p-3 shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-medium tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFeatures;
