import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import MainNav from "@/components/MainNav";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const { isDarkMode } = useTheme();

  const faqs = [
    {
      question: "Apa itu SLS B2B Commerce Hub?",
      answer: "SLS B2B Commerce Hub adalah platform e-commerce B2B yang menghubungkan principal, distributor, dan pelanggan bisnis dalam satu ekosistem digital yang terintegrasi. Platform ini dirancang untuk memudahkan transaksi dan manajemen bisnis B2B."
    },
    {
      question: "Bagaimana cara mendaftar sebagai mitra bisnis?",
      answer: "Untuk mendaftar sebagai mitra bisnis, Anda dapat mengklik tombol 'Register' di halaman utama dan pilih jenis akun yang sesuai (Principal, Agen, atau Customer). Isi formulir pendaftaran dan tim kami akan memverifikasi informasi Anda dalam 1-2 hari kerja."
    },
    {
      question: "Apa saja fitur utama yang tersedia?",
      answer: "Fitur utama kami meliputi manajemen produk, jaringan distribusi, analisis bisnis, sistem keamanan terpadu, manajemen pengiriman, sistem pembayaran terintegrasi, akses 24/7, dan dukungan pelanggan premium."
    },
    {
      question: "Bagaimana sistem pembayaran berfungsi?",
      answer: "Kami menyediakan berbagai metode pembayaran yang aman dan terpercaya. Pembayaran dapat dilakukan melalui transfer bank, virtual account, atau metode pembayaran digital lainnya. Semua transaksi dijamin keamanannya dengan enkripsi tingkat tinggi."
    },
    {
      question: "Apakah ada biaya berlangganan?",
      answer: "Ya, kami menyediakan beberapa paket berlangganan yang dapat disesuaikan dengan kebutuhan bisnis Anda. Mulai dari paket Starter untuk UMKM, Business untuk bisnis berkembang, hingga Enterprise untuk korporasi besar."
    },
    {
      question: "Bagaimana dengan keamanan data?",
      answer: "Keamanan data adalah prioritas utama kami. Kami menggunakan teknologi enkripsi terkini dan mengikuti standar keamanan industri untuk melindungi data dan transaksi Anda. Semua data disimpan di server yang aman dan dilindungi."
    },
    {
      question: "Apakah tersedia layanan dukungan pelanggan?",
      answer: "Ya, kami menyediakan dukungan pelanggan 24/7 melalui berbagai channel termasuk live chat, email, dan telepon. Tim dukungan kami siap membantu Anda dengan segala pertanyaan dan kendala yang mungkin Anda hadapi."
    },
    {
      question: "Bagaimana cara mengintegrasikan sistem saya yang ada?",
      answer: "Untuk pelanggan Business dan Enterprise, kami menyediakan API dan layanan integrasi yang dapat disesuaikan dengan sistem yang sudah Anda miliki. Tim teknis kami akan membantu proses integrasi untuk memastikan transisi yang lancar."
    }
  ];

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      <MainNav />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h1 className={cn(
                "text-4xl font-bold tracking-tight sm:text-6xl mb-6 font-poppins",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Pertanyaan yang Sering
                <span className="text-blue-500"> Diajukan</span>
              </h1>
              <p className={cn(
                "text-lg sm:text-xl leading-8 max-w-2xl mx-auto",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Temukan jawaban untuk pertanyaan umum tentang layanan dan platform kami
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={cn(
                  "rounded-xl overflow-hidden",
                  isDarkMode ? "bg-gray-800" : "bg-white"
                )}
              >
                <AccordionTrigger className={cn(
                  "px-6 py-4 text-left hover:no-underline",
                  isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-900 hover:bg-gray-50"
                )}>
                  <span className="font-semibold font-poppins">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className={cn(
                  "px-6 pb-4",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>

      {/* Footer */}
      <footer className={cn(
        "border-t py-12 transition-colors duration-300",
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={cn(
            "text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-500"
          )}>
            © {new Date().getFullYear()} SLS B2B Commerce Hub. Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
