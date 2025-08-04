
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";
import { Button } from "@/components/ui";
import { Checkbox } from "@/components/ui";
import { useToast } from "@/components/ui";

interface RegisterFormProps {
  role: string;
}

const RegisterForm = ({ role }: RegisterFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    phoneNumber: "",
    address: "",
    agreeTerms: false,
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.password || !formData.companyName || !formData.phoneNumber) {
      toast({
        title: "Form tidak lengkap",
        description: "Harap isi semua kolom yang diperlukan.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password tidak cocok",
        description: "Password dan konfirmasi password harus sama.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    if (!formData.agreeTerms) {
      toast({
        title: "Syarat dan Ketentuan",
        description: "Anda harus menyetujui syarat dan ketentuan kami.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    // Simulate API call for registration
    try {
      // Simulated API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Success message
      toast({
        title: "Pendaftaran Berhasil!",
        description: "Akun Anda telah dibuat. Silakan masuk ke sistem.",
      });
      
      // Navigate to login page
      navigate("/login");
    } catch (error) {
      toast({
        title: "Pendaftaran Gagal",
        description: "Terjadi kesalahan saat mendaftar. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get title based on role
  const getRoleTitle = () => {
    switch (role) {
      case "principal":
        return "Principal (UMKM)";
      case "agent":
        return "Agen";
      case "customer":
        return "Pelanggan B2B";
      default:
        return "Pengguna Baru";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daftar sebagai {getRoleTitle()}</CardTitle>
        <CardDescription>
          Lengkapi formulir di bawah ini untuk membuat akun baru.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                name="name"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nama@perusahaan.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Nama Perusahaan / Bisnis</Label>
            <Input
              id="companyName"
              name="companyName"
              placeholder="Nama perusahaan atau bisnis Anda"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Nomor Telepon</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="08xxxxxxxxxx"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Input
                id="address"
                name="address"
                placeholder="Alamat lengkap"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="agreeTerms" 
              name="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => 
                setFormData({
                  ...formData,
                  agreeTerms: checked as boolean,
                })
              }
            />
            <label
              htmlFor="agreeTerms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Saya menyetujui syarat dan ketentuan yang berlaku
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
