
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqs = [
  {
    category: "Umum",
    questions: [
      {
        question: "Apa itu SLS-B2B Commerce Hub?",
        answer:
          "SLS-B2B Commerce Hub adalah platform digital lengkap untuk UMKM dengan model distribusi Single Level Selling (SLS) untuk melakukan penjualan produk ke pelanggan B2B secara otomatis dan efisien. Platform ini mengelola seluruh proses distribusi dari hulu ke hilir, mulai dari manajemen produk, pemesanan, pembayaran, hingga pengiriman.",
      },
      {
        question: "Apa itu model Single Level Selling (SLS) to B2B?",
        answer:
          "Model Single Level Selling (SLS) to B2B adalah model distribusi di mana UMKM (Principal) memiliki jaringan Agen yang secara langsung memasarkan produk ke pelanggan bisnis (B2B), bukan ke konsumen akhir (B2C). Model ini memungkinkan efisiensi distribusi dan fokus pada volume transaksi yang lebih besar.",
      },
      {
        question: "Siapa saja yang dapat menggunakan platform ini?",
        answer:
          "Platform ini dirancang untuk tiga peran utama: Principal (pemilik UMKM), Agen (mitra distribusi), dan Pelanggan B2B (bisnis yang membeli produk). Setiap peran memiliki akses ke fitur yang disesuaikan dengan kebutuhan mereka.",
      },
      {
        question: "Berapa lama waktu yang diperlukan untuk memulai menggunakan platform?",
        answer:
          "Setelah registrasi dan verifikasi, Anda dapat mulai menggunakan platform dalam hitungan menit. Untuk Principal, pengaturan awal seperti penambahan produk dan pengaturan harga mungkin memerlukan waktu 1-2 hari kerja. Kami juga menyediakan layanan onboarding untuk membantu Anda memulai.",
      },
    ],
  },
  {
    category: "Fitur & Fungsionalitas",
    questions: [
      {
        question: "Bagaimana cara mengelola produk di platform?",
        answer:
          "Principal dapat mengelola produk melalui dashboard admin yang intuitif. Fitur ini memungkinkan menambahkan produk baru, mengedit detail produk, mengatur harga berbeda untuk Agen dan Pelanggan B2B, mengelola stok, dan mengatur kategori produk. Semua perubahan akan terlihat secara real-time untuk Agen dan pelanggan.",
      },
      {
        question: "Bagaimana sistem pembayaran bekerja?",
        answer:
          "Platform terintegrasi dengan berbagai payment gateway seperti Xendit, Midtrans, dan DOKU. Pembayaran diproses secara otomatis, dan pesanan hanya akan diproses setelah pembayaran berhasil. Principal dan Agen akan menerima notifikasi pembayaran secara real-time.",
      },
      {
        question: "Apakah platform ini menyediakan laporan dan analitik?",
        answer:
          "Ya, platform menyediakan laporan komprehensif dan analitik bisnis untuk Principal dan Agen. Laporan mencakup data penjualan, performa produk, aktivitas pelanggan, komisi agen, dan banyak lagi. Laporan dapat diekspor dalam berbagai format seperti PDF, Excel, atau CSV.",
      },
      {
        question: "Bagaimana cara sistem reward poin bekerja?",
        answer:
          "Sistem reward poin menghitung poin secara otomatis berdasarkan nilai transaksi pelanggan B2B. Poin dapat ditukarkan dengan diskon, produk gratis, atau hadiah lainnya. Principal dapat mengatur parameter perhitungan poin dan hadiah yang tersedia untuk ditukarkan.",
      },
      {
        question: "Apakah ada notifikasi otomatis untuk pesanan dan pembayaran?",
        answer:
          "Ya, platform mengirimkan notifikasi otomatis melalui WhatsApp untuk setiap perubahan status pesanan, konfirmasi pembayaran, dan update pengiriman. Semua pihak (Principal, Agen, dan Pelanggan B2B) akan menerima notifikasi yang relevan dengan peran mereka.",
      },
    ],
  },
  {
    category: "Teknis & Keamanan",
    questions: [
      {
        question: "Seberapa aman data saya di platform ini?",
        answer:
          "Keamanan data adalah prioritas utama kami. Platform menerapkan enkripsi SSL/TLS, password hashing, dan protokol keamanan terkini. Kami secara rutin melakukan audit keamanan dan memastikan kepatuhan terhadap standar keamanan data industri.",
      },
      {
        question: "Apakah platform ini responsif dan dapat diakses melalui perangkat mobile?",
        answer:
          "Ya, platform dikembangkan dengan desain responsif yang bekerja dengan baik di desktop, tablet, dan smartphone. Hal ini memungkinkan Anda mengelola bisnis dari mana saja dan kapan saja.",
      },
      {
        question: "Bagaimana jika saya membutuhkan fitur kustom?",
        answer:
          "Untuk kebutuhan khusus, kami menawarkan layanan pengembangan fitur kustom, terutama untuk pelanggan paket Enterprise. Tim pengembangan kami akan bekerja sama dengan Anda untuk memahami kebutuhan spesifik dan mengimplementasikan solusi yang sesuai.",
      },
      {
        question: "Apakah platform ini menyediakan API untuk integrasi dengan sistem lain?",
        answer:
          "Ya, platform menyediakan REST API yang terdokumentasi dengan baik untuk integrasi dengan sistem eksternal seperti ERP, sistem akuntansi, atau aplikasi bisnis lainnya. API tersedia terutama untuk pelanggan paket Business dan Enterprise.",
      },
    ],
  },
  {
    category: "Harga & Pembayaran",
    questions: [
      {
        question: "Bagaimana model harga untuk platform ini?",
        answer:
          "Kami menawarkan model berlangganan bulanan dengan tiga paket utama: Starter, Business, dan Enterprise. Setiap paket menawarkan fitur dan batasan yang berbeda sesuai dengan skala bisnis. Lihat halaman Harga untuk detail lengkap.",
      },
      {
        question: "Apakah ada kontrak jangka panjang?",
        answer:
          "Pelanggan dapat memilih berlangganan bulanan atau tahunan. Berlangganan tahunan menawarkan diskon hingga 20% dibandingkan dengan total biaya bulanan. Tidak ada keterikatan jangka panjang untuk berlangganan bulanan, Anda dapat berhenti kapan saja.",
      },
      {
        question: "Metode pembayaran apa yang diterima untuk berlangganan?",
        answer:
          "Kami menerima berbagai metode pembayaran termasuk kartu kredit/debit, transfer bank, virtual account, dan e-wallet (GoPay, OVO, Dana). Untuk pelanggan Enterprise, kami juga menerima pembayaran melalui invoice.",
      },
      {
        question: "Apakah ada biaya tambahan di luar biaya berlangganan?",
        answer:
          "Biaya berlangganan mencakup semua fitur inti platform. Biaya tambahan mungkin berlaku untuk layanan opsional seperti penyimpanan data melebihi kuota, pengembangan fitur kustom, atau layanan konsultasi lanjutan.",
      },
    ],
  },
  {
    category: "Dukungan & Bantuan",
    questions: [
      {
        question: "Bagaimana saya bisa mendapatkan bantuan jika mengalami masalah?",
        answer:
          "Kami menyediakan berbagai channel dukungan termasuk email, live chat, dan sistem tiket helpdesk. Pelanggan Business dan Enterprise juga memiliki akses ke dukungan telepon. Setiap masalah akan segera ditanggapi oleh tim dukungan teknis kami.",
      },
      {
        question: "Apakah ada pelatihan untuk menggunakan platform?",
        answer:
          "Ya, kami menyediakan materi pelatihan komprehensif termasuk video tutorial, dokumentasi online, dan webinar reguler. Untuk pelanggan Enterprise, kami juga menawarkan sesi pelatihan khusus untuk tim Anda.",
      },
      {
        question: "Bagaimana cara mengajukan fitur baru atau perbaikan?",
        answer:
          "Anda dapat mengajukan permintaan fitur atau perbaikan melalui sistem feedback di dalam platform atau menghubungi tim dukungan kami. Kami secara rutin meninjau semua saran dan memprioritaskannya dalam roadmap pengembangan kami.",
      },
      {
        question: "Apa yang harus saya lakukan jika saya lupa password?",
        answer:
          "Di halaman login, klik tautan 'Lupa Password'. Sistem akan mengirimkan email dengan instruksi untuk mereset password ke alamat email terdaftar. Jika Anda masih mengalami masalah, hubungi tim dukungan kami.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary-50 to-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Jawaban untuk pertanyaan umum tentang platform SLS-B2B Commerce Hub
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {faqs.map((category) => (
              <div key={category.category} className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${category.category}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Masih Punya Pertanyaan?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Jika Anda tidak menemukan jawaban yang Anda cari, jangan ragu untuk menghubungi tim kami.
            </p>
            <div className="mt-8">
              <Link to="/contact">
                <Button size="lg">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default FAQ;
