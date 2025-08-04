import { useState, useRef } from "react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Textarea } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Label } from "@/components/ui";
import { Switch } from "@/components/ui";
import CustomerLayout from "@/components/CustomerLayout";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui";
import { Check, Home, Plus, Trash, Upload, Image } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui";
import AddressManagement from "@/components/AddressManagement";



const CustomerSettings = () => {
  const { isDarkMode } = useTheme();


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <CustomerLayout pageTitle="Pengaturan">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Kelola informasi akun dan preferensi Anda
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "text-lg font-semibold",
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Informasi Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Nama Lengkap</Label>
                <Input placeholder="Masukkan nama lengkap" className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )} />
              </div>
              <div>
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>ID Pelanggan</Label>
                <Input placeholder="ID Pelanggan" readOnly className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )} />
              </div>
              <div>
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Foto Profil</Label>
                <div className="mt-1.5">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div
                    onClick={triggerFileInput}
                    className={cn(
                      "flex items-center justify-center gap-2 border rounded-md py-2.5 px-3 cursor-pointer transition-colors",
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 hover:bg-gray-650 text-gray-200"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    {selectedFile ? (
                      <>
                        <Image className={cn("h-4 w-4", isDarkMode ? "text-gray-300" : "text-gray-500")} />
                        <span className="text-sm">{selectedFile.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className={cn("h-4 w-4", isDarkMode ? "text-gray-300" : "text-gray-500")} />
                        <span className="text-sm">Pilih file foto</span>
                      </>
                    )}
                  </div>
                  <p className={cn(
                    "text-xs mt-1.5",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    Format: JPG, PNG, atau GIF (maks. 2MB)
                  </p>
                </div>
              </div>
              <div>
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Nama Perusahaan (Opsional)</Label>
                <Input placeholder="Masukkan nama perusahaan" className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )} />
              </div>
              <div>
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Alamat Email</Label>
                <Input type="email" placeholder="Masukkan alamat email" className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )} />
              </div>
              <div>
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Nomor Telepon</Label>
                <Input placeholder="Masukkan nomor telepon" className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )} />
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          )}>
            <CardContent className="p-6">
              <AddressManagement />
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "text-lg font-semibold",
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Preferensi Notifikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Update Status Pesanan</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Email Promosi</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Pemberitahuan Penurunan Harga</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Notifikasi Produk Baru</Label>
                <Switch defaultChecked />
              </div>
              <div>
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Metode Kontak Pilihan</Label>
                <select className={cn(
                  "w-full mt-1 rounded-md p-2",
                  isDarkMode
                    ? "border-gray-600 bg-gray-700 text-gray-200"
                    : "border-gray-300"
                )}>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                "text-lg font-semibold",
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Pengaturan Privasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Bagikan Riwayat Pesanan dengan Agen</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Izinkan Rekomendasi Produk</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(isDarkMode ? "text-gray-300" : "")}>Simpan Informasi Pembayaran</Label>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" className={cn(
            isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : ""
          )}>Reset</Button>
          <Button className={cn(
            "transition-colors duration-300",
            isDarkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : ""
          )}>Simpan Perubahan</Button>
        </div>
      </div>

    </CustomerLayout>
  );
};

export default CustomerSettings;
