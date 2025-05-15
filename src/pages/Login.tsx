
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "Form tidak lengkap",
        description: "Email dan password diperlukan.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Simulate login
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate different user redirects based on email prefix
      if (email.startsWith("principal")) {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang kembali, Principal!",
        });
        navigate("/dashboard/principal");
      } else if (email.startsWith("agent")) {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang kembali, Agen!",
        });
        navigate("/dashboard/agent");
      } else {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang kembali, Pelanggan B2B!",
        });
        navigate("/dashboard/customer");
      }
    } catch (error) {
      toast({
        title: "Login Gagal",
        description: "Email atau password tidak valid.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              Masuk ke Akun Anda
            </h1>
            <p className="mt-2 text-center text-gray-600">
              Akses sistem SLS-B2B Commerce Hub
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Masukkan kredensial Anda untuk mengakses akun
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Lupa password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Memproses..." : "Masuk"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Belum memiliki akun?{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <LandingFooter />
    </div>
  );
};

export default Login;
