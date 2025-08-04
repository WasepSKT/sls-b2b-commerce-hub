import { useState } from "react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Textarea } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Label } from "@/components/ui";
import { Switch } from "@/components/ui";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

const PrincipalSettings = () => {
  const { isDarkMode } = useTheme();

  return (
    <DashboardLayout role="principal" pageTitle="Pengaturan">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Pengaturan</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Kelola pengaturan perusahaan dan sistem
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Profil Perusahaan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Nama Perusahaan</Label>
                <Input placeholder="Masukkan nama perusahaan" className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                )} />
              </div>
              <div>
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Nomor Registrasi Bisnis</Label>
                <Input placeholder="Masukkan nomor registrasi" className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                )} />
              </div>
              <div>
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Deskripsi Perusahaan</Label>
                <Textarea placeholder="Masukkan deskripsi perusahaan" className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                )} />
              </div>
              <div>
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Logo Perusahaan</Label>
                <Input type="file" accept="image/*" className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white file:bg-gray-600 file:text-white file:border-gray-500"
                    : "bg-white border-gray-200 text-gray-900 file:bg-gray-100 file:text-gray-900 file:border-gray-200"
                )} />
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Informasi Kontak</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Email Bisnis</Label>
                <Input type="email" placeholder="Masukkan email bisnis" className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                )} />
              </div>
              <div>
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Nomor Telepon</Label>
                <Input placeholder="Masukkan nomor telepon" className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                )} />
              </div>
              <div>
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Alamat Bisnis</Label>
                <Textarea placeholder="Masukkan alamat bisnis" className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                )} />
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Manajemen Agen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Otomatis Setujui Aplikasi Agen</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Izinkan Kustomisasi Produk Agen</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Aktifkan Sistem Komisi Agen</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Preferensi Notifikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Notifikasi Pesanan Baru</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Notifikasi Aplikasi Agen</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Notifikasi Stok Menipis</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(
                  "transition-colors duration-300",
                  isDarkMode ? "text-gray-100" : "text-gray-700"
                )}>Notifikasi Pembayaran</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            className={cn(
              "transition-colors duration-300",
              isDarkMode 
                ? "border-gray-600 text-gray-300 hover:bg-gray-700" 
                : "border-gray-200 text-gray-700 hover:bg-gray-100"
            )}
          >
            Reset
          </Button>
          <Button 
            className={cn(
              "transition-colors duration-300",
              isDarkMode 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PrincipalSettings; 