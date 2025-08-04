import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Textarea } from "@/components/ui";

const Contact = () => {
  const { isDarkMode } = useTheme();

  const contactInfo = [
    {
      icon: Phone,
      title: "Telepon",
      details: "+62 21 1234 5678",
      description: "Senin - Jumat, 09:00 - 17:00 WIB"
    },
    {
      icon: Mail,
      title: "Email",
      details: "support@slsb2b.id",
      description: "Respon cepat untuk setiap pertanyaan"
    },
    {
      icon: MapPin,
      title: "Lokasi",
      details: "Jakarta, Indonesia",
      description: "Sudirman Central Business District"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      details: "Chat Langsung",
      description: "Tersedia 24/7 untuk bantuan"
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
                Hubungi
                <span className="text-blue-500"> Tim Kami</span>
              </h1>
              <p className={cn(
                "text-lg sm:text-xl leading-8 max-w-2xl mx-auto",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Kami siap membantu Anda dengan segala pertanyaan dan kebutuhan bisnis B2B Anda
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className={cn(
              "rounded-xl p-8 transition-colors duration-300",
              isDarkMode ? "bg-gray-800" : "bg-white"
            )}>
              <h2 className={cn(
                "text-2xl font-bold mb-6 font-poppins",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                Kirim Pesan
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={cn(
                      "block text-sm font-medium mb-2",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      Nama
                    </label>
                    <Input
                      type="text"
                      placeholder="Nama lengkap"
                      className={cn(
                        "w-full",
                        isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                      )}
                    />
                  </div>
                  <div>
                    <label className={cn(
                      "block text-sm font-medium mb-2",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="email@perusahaan.com"
                      className={cn(
                        "w-full",
                        isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                      )}
                    />
                  </div>
                </div>
                <div>
                  <label className={cn(
                    "block text-sm font-medium mb-2",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    Subjek
                  </label>
                  <Input
                    type="text"
                    placeholder="Subjek pesan"
                    className={cn(
                      "w-full",
                      isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                    )}
                  />
                </div>
                <div>
                  <label className={cn(
                    "block text-sm font-medium mb-2",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    Pesan
                  </label>
                  <Textarea
                    placeholder="Tulis pesan Anda di sini..."
                    rows={6}
                    className={cn(
                      "w-full",
                      isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                    )}
                  />
                </div>
                <Button className="w-full py-6 text-lg bg-blue-500 text-white hover:bg-blue-600">
                  Kirim Pesan
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={cn(
                    "rounded-xl p-6 transition-colors duration-300",
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  )}
                >
                  <div className={cn(
                    "rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4",
                    isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-500/10 text-blue-500"
                  )}>
                    <info.icon className="w-6 h-6" />
                  </div>
                  <h3 className={cn(
                    "text-xl font-semibold mb-2 font-poppins",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>
                    {info.title}
                  </h3>
                  <p className={cn(
                    "text-base font-medium mb-1",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    {info.details}
                  </p>
                  <p className={cn(
                    "text-sm",
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    {info.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
