
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Package, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  Bell, 
  Award, 
  Headphones,
  Laptop,
  Shield,
  Smartphone,
  Database
} from "lucide-react";

const Features = () => {
  const coreFeatures = [
    {
      name: "Pengelolaan Produk Lengkap",
      description: "Mengelola produk, harga, dan stok dengan mudah melalui panel admin yang intuitif.",
      longDescription: "Sistem manajemen produk yang komprehensif dengan kategori, varian, gambar produk, dan pengelolaan stok real-time. Atur harga berbeda untuk setiap jenis pengguna (Agen, Customer B2B).",
      icon: Package,
    },
    {
      name: "Manajemen Multi-level User",
      description: "Kelola akses untuk Principal, Agen, dan Pelanggan B2B dalam satu platform.",
      longDescription: "Sistem RBAC (Role-Based Access Control) yang kuat dengan kemampuan membatasi akses berdasarkan peran. Principal dapat mengelola seluruh ekosistem, Agen fokus pada distribusi dan pelanggan, sementara Customer B2B mendapatkan akses yang disesuaikan dengan kebutuhan pembelian.",
      icon: Users,
    },
    {
      name: "Pemesanan Otomatis",
      description: "Sistem pemesanan online yang terintegrasi dengan manajemen stok dan pengiriman.",
      longDescription: "Proses pemesanan end-to-end yang sepenuhnya otomatis, mulai dari pemilihan produk, keranjang belanja, hingga checkout. Sistem secara otomatis memperbarui stok dan memberikan notifikasi kepada semua pihak terkait.",
      icon: ShoppingCart,
    },
    {
      name: "Pembayaran Terintegrasi",
      description: "Integrasi dengan berbagai payment gateway untuk pembayaran instan.",
      longDescription: "Integrasi sempurna dengan Xendit, Midtrans, dan DOKU yang memungkinkan berbagai metode pembayaran termasuk transfer bank, virtual account, e-wallet, dan kartu kredit/debit. Konfirmasi pembayaran otomatis tanpa intervensi manual.",
      icon: CreditCard,
    },
    {
      name: "Notifikasi Real-time",
      description: "Pemberitahuan otomatis melalui WhatsApp untuk setiap status pesanan.",
      longDescription: "Sistem notifikasi komprehensif yang mengirimkan update status pesanan melalui WhatsApp menggunakan API seperti Wablas, Qontak, atau Twilio. Pelanggan, Agen, dan Principal akan selalu mendapatkan informasi terbaru tentang pesanan.",
      icon: Bell,
    },
    {
      name: "Sistem Reward Poin",
      description: "Reward pelanggan setia dengan sistem poin yang terhitung otomatis berdasarkan transaksi.",
      longDescription: "Program loyalitas yang menghitung dan memberikan poin secara otomatis berdasarkan nilai transaksi. Pelanggan dapat menukar poin dengan diskon, produk gratis, atau hadiah lainnya, meningkatkan loyalitas dan pembelian berulang.",
      icon: Award,
    },
    {
      name: "Laporan Komprehensif",
      description: "Laporan stok, penjualan, dan komisi yang detail untuk pengambilan keputusan bisnis.",
      longDescription: "Dashboard analitik dan laporan terperinci yang mencakup metrik kunci seperti penjualan per periode, performa produk, analisis pelanggan, tingkat konversi, dan proyeksi pendapatan. Ekspor laporan dalam format Excel, PDF, atau CSV.",
      icon: BarChart,
    },
    {
      name: "Dukungan Teknis",
      description: "Sistem helpdesk terintegrasi untuk penanganan masalah dengan cepat dan efisien.",
      longDescription: "Platform bantuan teknis yang memungkinkan pengguna untuk mengajukan tiket dukungan, melacak status permintaan, dan mendapatkan bantuan tepat waktu. Basis pengetahuan komprehensif berisi FAQ dan tutorial untuk membantu pengguna menyelesaikan masalah umum.",
      icon: Headphones,
    },
  ];

  const technicalFeatures = [
    {
      name: "Keamanan Tingkat Tinggi",
      description: "Implementasi JWT, SSL/TLS, dan password hashing untuk melindungi data sensitif.",
      icon: Shield,
    },
    {
      name: "Desain Responsif",
      description: "Antarmuka yang berfungsi sempurna pada desktop, tablet, dan perangkat mobile.",
      icon: Smartphone,
    },
    {
      name: "Arsitektur Cloud-Ready",
      description: "Aplikasi yang dioptimalkan untuk deployment pada AWS, DigitalOcean, atau GCP.",
      icon: Database,
    },
    {
      name: "API Terdokumentasi",
      description: "REST API lengkap dengan dokumentasi untuk integrasi dengan sistem eksternal.",
      icon: Laptop,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary-50 to-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Fitur Lengkap Platform
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Solusi komprehensif untuk sistem distribusi UMKM dengan model SLS to B2B yang mengotomatisasi seluruh proses bisnis Anda.
            </p>
          </div>
        </div>

        {/* Core Features Section */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Fitur Utama Platform
              </h2>
              <p className="mt-3 text-xl text-gray-600">
                Dirancang khusus untuk mengoptimalkan distribusi produk UMKM
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {coreFeatures.map((feature) => (
                <Card key={feature.name} className="border border-gray-200 transition-all duration-200 hover:border-primary-300 hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-primary p-3 text-white">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle>{feature.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{feature.longDescription}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Features Section */}
        <div className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Keunggulan Teknis
              </h2>
              <p className="mt-3 text-xl text-gray-600">
                Platform yang dibangun dengan teknologi modern untuk performa dan keamanan maksimal
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {technicalFeatures.map((feature) => (
                <Card key={feature.name} className="border border-gray-200 transition-all duration-200 hover:border-primary-300 hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-center">
                      <div className="rounded-full bg-primary/10 p-3 text-primary">
                        <feature.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <CardTitle className="text-center mt-4">{feature.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Integrasi API Eksternal
              </h2>
              <p className="mt-3 text-xl text-gray-600">
                Terhubung dengan layanan pihak ketiga untuk pengalaman bisnis yang mulus
              </p>
            </div>

            <div className="mt-12">
              <div className="grid gap-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Gateway</CardTitle>
                    <CardDescription>
                      Proses pembayaran yang aman dan tanpa hambatan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-700">
                      Platform kami terintegrasi dengan payment gateway terkemuka di Indonesia untuk memastikan transaksi yang cepat dan aman:
                    </p>
                    <ul className="space-y-2 list-disc pl-5 text-gray-700">
                      <li>Xendit (VA, QRIS, e-wallet, kartu kredit)</li>
                      <li>Midtrans (berbagai metode pembayaran)</li>
                      <li>DOKU (solusi pembayaran komprehensif)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>WhatsApp Blast API</CardTitle>
                    <CardDescription>
                      Notifikasi real-time untuk semua pemangku kepentingan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-700">
                      Kirim notifikasi otomatis melalui WhatsApp untuk setiap perubahan status pesanan menggunakan:
                    </p>
                    <ul className="space-y-2 list-disc pl-5 text-gray-700">
                      <li>Wablas (solusi WhatsApp API lokal)</li>
                      <li>Qontak (platform messaging omnichannel)</li>
                      <li>Twilio (layanan komunikasi global)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default Features;
