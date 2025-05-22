import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/DashboardLayout";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/dialog";

interface Address {
  id: string;
  label: string;
  recipient: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

const CustomerSettings = () => {
  const { isDarkMode } = useTheme();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr-1",
      label: "Rumah",
      recipient: "Budi Santoso",
      street: "Jl. Merdeka No. 123",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12150",
      phone: "081234567890",
      isDefault: true
    },
    {
      id: "addr-2",
      label: "Kantor",
      recipient: "Budi Santoso",
      street: "Gedung Centennial Tower Lt. 28, Jl. Gatot Subroto Kav. 24-25",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12930",
      phone: "081234567890",
      isDefault: false
    }
  ]);
  
  const [addAddressOpen, setAddAddressOpen] = useState(false);
  
  // Form state for new address
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'isDefault'>>({
    label: "",
    recipient: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    phone: ""
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const setDefaultAddress = (id: string) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
    
    toast({
      description: "Alamat utama telah diperbarui",
    });
  };
  
  const deleteAddress = (id: string) => {
    // Prevent deleting if it's the only address
    if (addresses.length <= 1) {
      toast({
        variant: "destructive",
        description: "Anda harus memiliki setidaknya satu alamat",
      });
      return;
    }
    
    // Prevent deleting default address
    if (addresses.find(a => a.id === id)?.isDefault) {
      toast({
        variant: "destructive",
        description: "Anda tidak dapat menghapus alamat utama",
      });
      return;
    }
    
    setAddresses(addresses.filter(address => address.id !== id));
    toast({
      description: "Alamat telah dihapus",
    });
  };
  
  const addNewAddress = () => {
    // Validate form
    if (!newAddress.label || !newAddress.recipient || !newAddress.street || 
        !newAddress.city || !newAddress.province || !newAddress.postalCode || 
        !newAddress.phone) {
      toast({
        variant: "destructive",
        description: "Semua field harus diisi",
      });
      return;
    }
    
    const id = `addr-${Date.now()}`;
    const isOnlyAddress = addresses.length === 0;
    
    setAddresses([
      ...addresses,
      {
        ...newAddress,
        id,
        isDefault: isOnlyAddress
      }
    ]);
    
    // Reset form
    setNewAddress({
      label: "",
      recipient: "",
      street: "",
      city: "",
      province: "",
      postalCode: "",
      phone: ""
    });
    
    setAddAddressOpen(false);
    toast({
      description: "Alamat baru telah ditambahkan",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <DashboardLayout role="customer" pageTitle="Pengaturan">
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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className={cn(
                "text-lg font-semibold",
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Alamat Pengiriman</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : "hover:bg-gray-100"
                )}
                onClick={() => setAddAddressOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Tambah Alamat
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <div 
                    key={address.id}
                    className={cn(
                      "rounded-md border p-4 relative",
                      address.isDefault 
                        ? isDarkMode ? "border-blue-500 bg-blue-900/10" : "border-blue-500 bg-blue-50" 
                        : isDarkMode ? "border-gray-700" : "border-gray-200"
                    )}
                  >
                    <div className="flex justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className={cn(
                          "font-medium",
                          isDarkMode ? "text-gray-100" : ""
                        )}>{address.label}</h3>
                        {address.isDefault && (
                          <Badge className={cn(
                            isDarkMode ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : ""
                          )}>Utama</Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!address.isDefault && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setDefaultAddress(address.id)}
                              className={cn(
                                isDarkMode ? "hover:bg-gray-700 text-gray-300" : ""
                              )}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Set Utama
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => deleteAddress(address.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className={cn(isDarkMode ? "text-gray-300" : "")}>{address.recipient}</p>
                      <p className={cn(isDarkMode ? "text-gray-300" : "")}>{address.street}</p>
                      <p className={cn(isDarkMode ? "text-gray-300" : "")}>
                        {address.city}, {address.province} {address.postalCode}
                      </p>
                      <p className={cn(isDarkMode ? "text-gray-300" : "")}>Telepon: {address.phone}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <Home className={cn(
                    "mx-auto h-12 w-12 mb-3",
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  )} />
                  <h3 className={cn(
                    "text-lg font-medium mb-1",
                    isDarkMode ? "text-gray-100" : ""
                  )}>Belum ada alamat</h3>
                  <p className={cn(
                    "mb-4",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}>Tambahkan alamat pengiriman untuk mempercepat proses checkout</p>
                  <Button 
                    onClick={() => setAddAddressOpen(true)}
                    className={cn(
                      "transition-colors duration-300",
                      isDarkMode 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : ""
                    )}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Alamat
                  </Button>
                </div>
              )}
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

      {/* Add Address Modal */}
      <Dialog open={addAddressOpen} onOpenChange={setAddAddressOpen}>
        <DialogContent className={cn(
          "sm:max-w-[500px] max-h-[80vh] overflow-y-auto",
          isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
        )}>
          <DialogHeader>
            <DialogTitle className={cn(
              isDarkMode ? "text-gray-100" : ""
            )}>Tambah Alamat Baru</DialogTitle>
            <DialogDescription className={cn(
              isDarkMode ? "text-gray-400" : ""
            )}>
              Lengkapi informasi untuk alamat pengiriman baru
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="label" className={cn(isDarkMode ? "text-gray-300" : "")}>
                Label Alamat
              </Label>
              <Input
                id="label"
                name="label"
                placeholder="Contoh: Rumah, Kantor, dll"
                value={newAddress.label}
                onChange={handleInputChange}
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient" className={cn(isDarkMode ? "text-gray-300" : "")}>
                Nama Penerima
              </Label>
              <Input
                id="recipient"
                name="recipient"
                placeholder="Masukkan nama penerima"
                value={newAddress.recipient}
                onChange={handleInputChange}
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="street" className={cn(isDarkMode ? "text-gray-300" : "")}>
                Alamat Lengkap
              </Label>
              <Input
                id="street"
                name="street"
                placeholder="Masukkan nama jalan, nomor, blok, dll"
                value={newAddress.street}
                onChange={handleInputChange}
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className={cn(isDarkMode ? "text-gray-300" : "")}>
                  Kota
                </Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Masukkan kota"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  className={cn(
                    isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province" className={cn(isDarkMode ? "text-gray-300" : "")}>
                  Provinsi
                </Label>
                <Input
                  id="province"
                  name="province"
                  placeholder="Masukkan provinsi"
                  value={newAddress.province}
                  onChange={handleInputChange}
                  className={cn(
                    isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode" className={cn(isDarkMode ? "text-gray-300" : "")}>
                  Kode Pos
                </Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="Masukkan kode pos"
                  value={newAddress.postalCode}
                  onChange={handleInputChange}
                  className={cn(
                    isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className={cn(isDarkMode ? "text-gray-300" : "")}>
                  Nomor Telepon
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Masukkan nomor telepon"
                  value={newAddress.phone}
                  onChange={handleInputChange}
                  className={cn(
                    isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                  )}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button 
                variant="outline" 
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : ""
                )}
              >
                Batal
              </Button>
            </DialogClose>
            <Button 
              onClick={addNewAddress}
              className={cn(
                "transition-colors duration-300",
                isDarkMode 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : ""
              )}
            >
              <Plus className="mr-2 h-4 w-4" />
              Tambah Alamat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CustomerSettings;
