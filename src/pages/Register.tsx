
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Building, Store, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import RegisterForm from "@/components/RegisterForm";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";

const roles = [
  {
    id: "principal",
    name: "Principal (UMKM)",
    description: "Untuk pemilik bisnis yang ingin mengelola keseluruhan sistem distribusi.",
    icon: Building,
  },
  {
    id: "agent",
    name: "Agen",
    description: "Untuk mitra distribusi yang mengelola jaringan pelanggan B2B.",
    icon: Users,
  },
  {
    id: "customer",
    name: "Pelanggan B2B",
    description: "Untuk bisnis yang ingin membeli produk dengan harga khusus B2B.",
    icon: Store,
  },
];

const Register = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <div className="flex flex-grow flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Daftar Akun Baru</h1>
            <p className="mt-3 text-lg text-gray-600">
              Bergabunglah dengan SLS-B2B Commerce Hub untuk mengoptimalkan distribusi produk UMKM Anda
            </p>
          </div>

          {!selectedRole ? (
            <div className="mt-12">
              <h2 className="text-center text-xl font-semibold text-gray-900">
                Pilih jenis akun yang sesuai dengan kebutuhan Anda
              </h2>
              
              <RadioGroup
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                defaultValue={selectedRole || ""}
                onValueChange={(value) => setSelectedRole(value)}
              >
                {roles.map((role) => (
                  <Label
                    key={role.id}
                    htmlFor={role.id}
                    className="cursor-pointer"
                  >
                    <RadioGroupItem
                      id={role.id}
                      value={role.id}
                      className="sr-only"
                    />
                    <Card className={`border-2 transition-all ${
                      selectedRole === role.id 
                        ? "border-primary bg-primary-50" 
                        : "border-gray-200 hover:border-primary-200"
                    }`}>
                      <CardHeader>
                        <div className="flex items-center gap-x-4">
                          <div className="rounded-lg bg-primary-100 p-3 text-primary-700">
                            <role.icon className="h-6 w-6" />
                          </div>
                          <CardTitle>{role.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {role.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Label>
                ))}
              </RadioGroup>

              <div className="mt-8 text-center">
                <Button
                  onClick={() => selectedRole && setSelectedRole(selectedRole)}
                  disabled={!selectedRole}
                  size="lg"
                >
                  Lanjutkan
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <div className="mb-6">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedRole(null)}
                  className="text-gray-600 hover:text-primary"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke pilihan jenis akun
                </Button>
              </div>
              
              <RegisterForm role={selectedRole} />
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Sudah memiliki akun?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
};

export default Register;
