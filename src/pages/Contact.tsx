
import { useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  MapPin, 
  MessageSquare, 
  Phone 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formState.name || !formState.email || !formState.message) {
      toast({
        title: "Form tidak lengkap",
        description: "Silakan lengkapi semua field yang diperlukan",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih telah menghubungi kami. Tim kami akan segera merespon.",
    });
    
    setFormState({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
    
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary-50 to-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Hubungi Kami
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Kami siap membantu menjawab pertanyaan dan memberikan solusi untuk kebutuhan bisnis Anda
            </p>
          </div>
        </div>

        {/* Contact Form & Info */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Informasi Kontak
                  </h2>
                  <p className="mt-2 text-lg text-gray-600">
                    Jangan ragu untuk menghubungi kami melalui salah satu channel di bawah ini.
                  </p>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary">
                        <Phone className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Telepon
                      </h3>
                      <p className="mt-1 text-gray-600">
                        +62 21 1234 5678
                      </p>
                      <p className="text-gray-600">
                        Senin - Jumat, 09:00 - 17:00 WIB
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary">
                        <Mail className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Email
                      </h3>
                      <p className="mt-1 text-gray-600">
                        info@slsb2b.id
                      </p>
                      <p className="text-gray-600">
                        support@slsb2b.id
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Live Chat
                      </h3>
                      <p className="mt-1 text-gray-600">
                        Tersedia di dashboard pelanggan
                      </p>
                      <p className="text-gray-600">
                        24/7 untuk pelanggan Business & Enterprise
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary">
                        <MapPin className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Kantor
                      </h3>
                      <p className="mt-1 text-gray-600">
                        Jl. Sudirman No. 123
                      </p>
                      <p className="text-gray-600">
                        Jakarta Selatan, 12190
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Kirim Pesan</CardTitle>
                    <CardDescription>
                      Isi formulir di bawah untuk menghubungi tim kami
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="Nama lengkap Anda"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="nama@perusahaan.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Nomor Telepon</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            placeholder="08xxxxxxxxxx"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Perusahaan</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formState.company}
                            onChange={handleChange}
                            placeholder="Nama perusahaan/bisnis Anda"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Pesan</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Silakan jelaskan kebutuhan atau pertanyaan Anda"
                          rows={5}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? "Mengirim..." : "Kirim Pesan"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Lokasi Kami
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Kunjungi kantor kami untuk konsultasi langsung
              </p>
            </div>

            <div className="mt-8 h-96 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-200">
              {/* Placeholder for map - in a real app, you would integrate Google Maps or similar */}
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <p className="text-gray-600">Map akan ditampilkan di sini</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default Contact;
