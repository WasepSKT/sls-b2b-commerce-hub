import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, Label, Switch, Separator } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import AddressManagement from "@/components/AddressManagement";
import PaymentMethodManagement from "@/components/PaymentMethodManagement";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  Globe,
  Save
} from "lucide-react";

const ResellerSettings = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pengaturan</h2>
        <p className="text-muted-foreground">
          Kelola pengaturan akun dan preferensi Anda
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className={cn(
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informasi Profil
            </CardTitle>
            <CardDescription>
              Update informasi profil dan data pribadi Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama lengkap"
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  placeholder="+62 812-3456-7890"
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Input
                  id="address"
                  placeholder="Masukkan alamat lengkap"
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className={cn(
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Keamanan
            </CardTitle>
            <CardDescription>
              Kelola keamanan akun dan kata sandi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
                <Input
                  id="current-password"
                  type="password"
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Kata Sandi Baru</Label>
                <Input
                  id="new-password"
                  type="password"
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Konfirmasi Kata Sandi Baru</Label>
              <Input
                id="confirm-password"
                type="password"
                className={cn(
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-200"
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className={cn(
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifikasi
            </CardTitle>
            <CardDescription>
              Atur preferensi notifikasi Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifikasi Email</Label>
                <p className="text-sm text-muted-foreground">
                  Terima notifikasi melalui email
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifikasi SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Terima notifikasi melalui SMS
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifikasi Pesanan</Label>
                <p className="text-sm text-muted-foreground">
                  Notifikasi status pesanan
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifikasi Komisi</Label>
                <p className="text-sm text-muted-foreground">
                  Notifikasi komisi dan bonus
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Language & Region Settings */}
        <Card className={cn(
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Bahasa & Wilayah
            </CardTitle>
            <CardDescription>
              Atur bahasa dan zona waktu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Bahasa</Label>
                <select
                  id="language"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200"
                  )}
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Zona Waktu</Label>
                <select
                  id="timezone"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200"
                  )}
                >
                  <option value="Asia/Jakarta">WIB (UTC+7)</option>
                  <option value="Asia/Makassar">WITA (UTC+8)</option>
                  <option value="Asia/Jayapura">WIT (UTC+9)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Management */}
        <Card className={cn(
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardContent className="p-6">
            <AddressManagement />
          </CardContent>
        </Card>

        {/* Payment Method Management */}
        <Card className={cn(
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardContent className="p-6">
            <PaymentMethodManagement />
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Simpan Perubahan
        </Button>
      </div>
    </div>
  );
};

export default ResellerSettings; 