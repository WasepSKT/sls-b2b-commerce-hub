import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

const AgentSettings = () => {
  const { isDarkMode } = useTheme();

  return (
    <DashboardLayout role="agent" pageTitle="Pengaturan">
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
              Kelola pengaturan akun dan preferensi Anda
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
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Informasi Profil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Nama Lengkap</Label>
                <Input 
                  placeholder="Masukkan nama lengkap" 
                  className={cn(
                    "transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" 
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>
              <div>
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>ID Agen</Label>
                <Input 
                  placeholder="Masukkan ID agen" 
                  readOnly 
                  className={cn(
                    "transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" 
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>
              <div>
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Foto Profil</Label>
                <Input 
                  type="file" 
                  accept="image/*" 
                  className={cn(
                    "transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-200 text-gray-900"
                  )}
                />
              </div>
              <div>
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Bio</Label>
                <Textarea 
                  placeholder="Masukkan bio Anda" 
                  className={cn(
                    "transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" 
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
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
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Informasi Kontak</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Email</Label>
                <Input 
                  type="email" 
                  placeholder="Masukkan alamat email" 
                  className={cn(
                    "transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" 
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>
              <div>
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Nomor Telepon</Label>
                <Input 
                  placeholder="Masukkan nomor telepon" 
                  className={cn(
                    "transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" 
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>
              <div>
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Nomor WhatsApp</Label>
                <Input 
                  placeholder="Masukkan nomor WhatsApp" 
                  className={cn(
                    "transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" 
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>
              <div>
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Alamat</Label>
                <Textarea 
                  placeholder="Masukkan alamat lengkap" 
                  className={cn(
                    "transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" 
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
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
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Pengaturan Komisi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Nama Bank</Label>
                <Input 
                  placeholder="Masukkan nama bank" 
                  className={cn(
                    "transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" 
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>
              <div>
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Nomor Rekening</Label>
                <Input 
                  placeholder="Masukkan nomor rekening" 
                  className={cn(
                    "transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" 
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>
              <div>
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Nama Pemilik Rekening</Label>
                <Input 
                  placeholder="Masukkan nama pemilik rekening" 
                  className={cn(
                    "transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" 
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Terima Update Komisi</Label>
                <Switch defaultChecked />
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
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Pengaturan Notifikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Notifikasi Pesanan Baru</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Notifikasi Pembayaran Komisi</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Update Produk</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Pertanyaan Pelanggan</Label>
                <Switch defaultChecked />
              </div>
              <div>
                <Label className={cn(
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>Metode Kontak Pilihan</Label>
                <select className={cn(
                  "w-full mt-1 rounded-md p-2 transition-colors duration-300",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white" 
                    : "bg-white border-gray-200 text-gray-900"
                )}>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-4">
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
          <Button className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-blue-600 text-white hover:bg-blue-700" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}>
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentSettings; 