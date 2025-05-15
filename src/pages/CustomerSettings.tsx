
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { User, Shield, Bell, CreditCard } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "@/hooks/use-toast";

const CustomerSettings = () => {
  const [loading, setLoading] = useState(false);

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        description: "Profil Anda berhasil diperbarui",
      });
    }, 1000);
  };

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        description: "Kata sandi Anda berhasil diperbarui",
      });
    }, 1000);
  };

  return (
    <DashboardLayout role="customer" pageTitle="Pengaturan">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Pengaturan Akun</h2>
            <p className="text-gray-500">
              Kelola informasi dan preferensi akun Anda
            </p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="security">Keamanan</TabsTrigger>
            <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
            <TabsTrigger value="billing">Pembayaran</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <div>
                      <CardTitle>Informasi Profil</CardTitle>
                      <CardDescription>
                        Perbarui informasi pribadi Anda
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={saveProfile} className="space-y-4">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <User className="h-12 w-12 text-gray-500" />
                        </div>
                        <Button variant="outline" size="sm" className="absolute bottom-0 right-0 rounded-full">
                          Ubah
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nama Depan</Label>
                          <Input id="firstName" defaultValue="Ahmad" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nama Belakang</Label>
                          <Input id="lastName" defaultValue="Setiawan" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="ahmad@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input id="phone" defaultValue="081234567890" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Nama Perusahaan</Label>
                        <Input id="company" defaultValue="PT Sejahtera Makmur" />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alamat</CardTitle>
                  <CardDescription>
                    Kelola alamat pengiriman Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between mb-2">
                        <p className="font-medium">Alamat Utama</p>
                        <Badge className="bg-primary">Utama</Badge>
                      </div>
                      <p>PT Sejahtera Makmur</p>
                      <p className="text-gray-500">
                        Jl. Sudirman No. 123<br />
                        Jakarta Pusat, DKI Jakarta<br />
                        10220<br />
                        Indonesia
                      </p>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between mb-2">
                        <p className="font-medium">Alamat Kantor Cabang</p>
                      </div>
                      <p>PT Sejahtera Makmur (Cabang)</p>
                      <p className="text-gray-500">
                        Jl. Gatot Subroto No. 456<br />
                        Jakarta Selatan, DKI Jakarta<br />
                        12930<br />
                        Indonesia
                      </p>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                        <Button variant="outline" size="sm">Set as Primary</Button>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      Tambah Alamat Baru
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    <div>
                      <CardTitle>Ganti Kata Sandi</CardTitle>
                      <CardDescription>
                        Perbarui kata sandi akun Anda
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={changePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Kata Sandi Saat Ini</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Kata Sandi Baru</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Menyimpan..." : "Perbarui Kata Sandi"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Verifikasi Dua Faktor</CardTitle>
                  <CardDescription>
                    Tingkatkan keamanan akun Anda dengan verifikasi dua faktor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="font-medium">Verifikasi SMS</p>
                        <p className="text-sm text-gray-500">
                          Gunakan nomor telepon Anda untuk verifikasi
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="font-medium">Verifikasi Email</p>
                        <p className="text-sm text-gray-500">
                          Gunakan email Anda untuk verifikasi
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="font-medium">Aplikasi Autentikator</p>
                        <p className="text-sm text-gray-500">
                          Gunakan aplikasi autentikator seperti Google Authenticator
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <div>
                    <CardTitle>Preferensi Notifikasi</CardTitle>
                    <CardDescription>
                      Atur preferensi notifikasi Anda
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Notifikasi Email</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p>Status Pesanan</p>
                          <p className="text-sm text-gray-500">
                            Dapatkan notifikasi tentang status pesanan Anda
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p>Promo & Diskon</p>
                          <p className="text-sm text-gray-500">
                            Dapatkan informasi tentang promo dan diskon terbaru
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p>Produk Baru</p>
                          <p className="text-sm text-gray-500">
                            Dapatkan informasi tentang produk-produk baru
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p>Newsletter</p>
                          <p className="text-sm text-gray-500">
                            Dapatkan berita dan pembaruan bulanan
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Notifikasi SMS</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p>Status Pesanan</p>
                          <p className="text-sm text-gray-500">
                            Dapatkan SMS tentang perubahan status pesanan
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p>Promo & Diskon</p>
                          <p className="text-sm text-gray-500">
                            Dapatkan SMS tentang promo dan diskon terbatas
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Simpan Preferensi</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <CardTitle>Metode Pembayaran</CardTitle>
                      <CardDescription>
                        Kelola metode pembayaran Anda
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-md">
                          <CreditCard className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">VISA **** 1234</p>
                          <p className="text-sm text-gray-500">Kadaluwarsa: 05/26</p>
                        </div>
                      </div>
                      <Badge className="bg-primary">Utama</Badge>
                    </div>

                    <div className="border rounded-md p-4 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-md">
                          <CreditCard className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">Mastercard **** 5678</p>
                          <p className="text-sm text-gray-500">Kadaluwarsa: 08/27</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Jadikan Utama</Button>
                    </div>

                    <Button className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Tambah Metode Pembayaran
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informasi Penagihan</CardTitle>
                  <CardDescription>
                    Perbarui informasi penagihan Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="billingName">Nama Perusahaan</Label>
                      <Input id="billingName" defaultValue="PT Sejahtera Makmur" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="billingTaxId">NPWP</Label>
                      <Input id="billingTaxId" defaultValue="01.234.567.8-901.000" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Alamat Penagihan</Label>
                      <Textarea 
                        id="billingAddress" 
                        defaultValue="Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220, Indonesia"
                        rows={3}
                      />
                    </div>
                    
                    <Button className="w-full">
                      Simpan Informasi Penagihan
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CustomerSettings;
