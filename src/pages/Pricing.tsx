
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "499.000",
    description: "Untuk UMKM yang baru memulai distribusi B2B digital",
    features: [
      "Hingga 2 Agen",
      "Hingga 50 Pelanggan B2B",
      "Maksimal 100 produk",
      "Laporan dasar",
      "Dukungan email",
      "Penyimpanan 5GB",
    ],
    highlighted: false,
    buttonText: "Mulai Sekarang",
    buttonVariant: "outline",
  },
  {
    name: "Business",
    price: "999.000",
    description: "Untuk UMKM dengan jaringan distribusi yang berkembang",
    features: [
      "Hingga 10 Agen",
      "Hingga 200 Pelanggan B2B",
      "Produk tidak terbatas",
      "Laporan lengkap & analitik",
      "Dukungan prioritas",
      "Penyimpanan 20GB",
      "Sistem reward poin",
      "Notifikasi WhatsApp",
    ],
    highlighted: true,
    buttonText: "Rekomendasi Terbaik",
    buttonVariant: "default",
  },
  {
    name: "Enterprise",
    price: "1.999.000",
    description: "Untuk UMKM dengan operasi distribusi skala besar",
    features: [
      "Agen tidak terbatas",
      "Pelanggan B2B tidak terbatas",
      "Produk tidak terbatas",
      "Analitik bisnis lanjutan",
      "Dukungan 24/7",
      "Penyimpanan tidak terbatas",
      "API eksternal",
      "Setup khusus",
      "Deployment cloud khusus",
    ],
    highlighted: false,
    buttonText: "Hubungi Kami",
    buttonVariant: "outline",
  },
];

const Pricing = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary-50 to-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Pilih Paket Yang Sesuai
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Kami menyediakan berbagai paket layanan sesuai dengan skala distribusi dan kebutuhan bisnis UMKM Anda
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`border ${
                    plan.highlighted
                      ? "border-primary shadow-lg scale-105"
                      : "border-gray-200"
                  } transition-all`}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4 flex items-baseline text-gray-900">
                      <span className="text-4xl font-extrabold tracking-tight">
                        Rp {plan.price}
                      </span>
                      <span className="ml-1 text-xl font-semibold text-gray-500">
                        /bulan
                      </span>
                    </div>
                    <CardDescription className="mt-2 text-base">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex">
                          <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="ml-3 text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Link to="/register">
                        <Button
                          variant={plan.buttonVariant as "default" | "outline"}
                          className={`w-full ${
                            plan.highlighted
                              ? "bg-primary hover:bg-primary-600"
                              : ""
                          }`}
                        >
                          {plan.buttonText}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Pertanyaan Umum
              </h2>
              <p className="mt-3 text-xl text-gray-600">
                Jawaban untuk beberapa pertanyaan yang sering diajukan
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {[
                {
                  question: "Apakah ada masa percobaan gratis?",
                  answer:
                    "Ya, kami menyediakan masa percobaan gratis selama 14 hari untuk semua paket tanpa perlu kartu kredit. Anda dapat mencoba semua fitur platform sebelum berlangganan.",
                },
                {
                  question: "Bisakah saya beralih paket kapan saja?",
                  answer:
                    "Tentu! Anda dapat beralih antar paket kapan saja. Jika Anda meningkatkan paket, perubahan akan segera diterapkan. Jika Anda menurunkan paket, perubahan akan berlaku pada siklus penagihan berikutnya.",
                },
                {
                  question: "Apakah ada biaya pemasangan awal?",
                  answer:
                    "Tidak ada biaya pemasangan untuk paket Starter dan Business. Untuk paket Enterprise, kami menyediakan layanan penyiapan khusus yang mungkin memerlukan biaya tambahan tergantung pada kebutuhan spesifik Anda.",
                },
                {
                  question: "Bagaimana jika saya membutuhkan fitur tambahan?",
                  answer:
                    "Untuk kebutuhan khusus yang tidak tercakup dalam paket standar, kami menawarkan layanan kustomisasi. Silakan hubungi tim penjualan kami untuk membahas kebutuhan spesifik bisnis Anda.",
                },
                {
                  question: "Apakah data saya aman?",
                  answer:
                    "Keamanan data adalah prioritas utama kami. Kami menerapkan enkripsi end-to-end, SSL/TLS, dan protokol keamanan industri terkini untuk melindungi data Anda. Semua data disimpan dengan aman di pusat data bersertifikat.",
                },
                {
                  question: "Bagaimana dukungan teknis disediakan?",
                  answer:
                    "Kami menyediakan dukungan teknis melalui email, live chat, dan sistem tiket. Untuk paket Business dan Enterprise, kami juga menyediakan dukungan telepon. Paket Enterprise mendapatkan akses ke tim dukungan khusus 24/7.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default Pricing;
