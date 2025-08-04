import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button, Input, Label, Textarea } from '@/components/ui';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import { Badge } from '@/components/ui';
import { useTheme } from '@/lib/store/theme';
import { useAddressStore, Address } from '@/lib/store/addresses';
import { cn } from '@/lib/utils';
import {
  Plus,
  Edit,
  Trash2,
  Home,
  Building,
  MapPin,
  Phone,
  User,
  Star,
  StarOff,
  Check,
  X,
} from 'lucide-react';

interface AddressFormData {
  label: string;
  recipient: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

const AddressManagement = () => {
  const { isDarkMode } = useTheme();
  const {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddressStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<AddressFormData>({
    label: '',
    recipient: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    phone: '',
    isDefault: false,
  });

  const resetForm = () => {
    setFormData({
      label: '',
      recipient: '',
      street: '',
      city: '',
      province: '',
      postalCode: '',
      phone: '',
      isDefault: false,
    });
    setEditingAddress(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAddress) {
      updateAddress(editingAddress.id, formData);
    } else {
      addAddress(formData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      label: address.label,
      recipient: address.recipient,
      street: address.street,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
      phone: address.phone,
      isDefault: address.isDefault,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus alamat ini?')) {
      deleteAddress(id);
    }
  };

  const getAddressIcon = (label: string) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('rumah') || lowerLabel.includes('home')) return Home;
    if (lowerLabel.includes('kantor') || lowerLabel.includes('office')) return Building;
    return MapPin;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={cn(
            "text-xl font-semibold",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            Alamat Pengiriman
          </h2>
          <p className={cn(
            "text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Kelola alamat pengiriman Anda
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Alamat
            </Button>
          </DialogTrigger>
          <DialogContent className={cn(
            "max-w-2xl",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <DialogHeader>
              <DialogTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>
                {editingAddress ? 'Edit Alamat' : 'Tambah Alamat Baru'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="label" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                    Label Alamat
                  </Label>
                  <Input
                    id="label"
                    placeholder="Contoh: Rumah, Kantor"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    className={cn(
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        : "bg-white border-gray-200"
                    )}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="recipient" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                    Nama Penerima
                  </Label>
                  <Input
                    id="recipient"
                    placeholder="Nama lengkap penerima"
                    value={formData.recipient}
                    onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                    className={cn(
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        : "bg-white border-gray-200"
                    )}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="street" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Alamat Lengkap
                </Label>
                <Textarea
                  id="street"
                  placeholder="Masukkan alamat lengkap"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                    Kota
                  </Label>
                  <Input
                    id="city"
                    placeholder="Kota"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={cn(
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        : "bg-white border-gray-200"
                    )}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="province" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                    Provinsi
                  </Label>
                  <Input
                    id="province"
                    placeholder="Provinsi"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className={cn(
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        : "bg-white border-gray-200"
                    )}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="postalCode" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                    Kode Pos
                  </Label>
                  <Input
                    id="postalCode"
                    placeholder="Kode pos"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className={cn(
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        : "bg-white border-gray-200"
                    )}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Nomor Telepon
                </Label>
                <Input
                  id="phone"
                  placeholder="Nomor telepon"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isDefault" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Set sebagai alamat utama
                </Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Batal
                </Button>
                <Button type="submit">
                  <Check className="h-4 w-4 mr-2" />
                  {editingAddress ? 'Update' : 'Simpan'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Address List */}
      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((address) => {
          const AddressIcon = getAddressIcon(address.label);

          return (
            <Card
              key={address.id}
              className={cn(
                "transition-all duration-300",
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
                address.isDefault && "ring-2 ring-blue-500"
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AddressIcon className={cn(
                      "h-5 w-5",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )} />
                    <CardTitle className={cn(
                      "text-lg",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      {address.label}
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    {address.isDefault && (
                      <Badge className="bg-blue-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Utama
                      </Badge>
                    )}
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(address)}
                        className={cn(
                          "h-8 w-8 p-0",
                          isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(address.id)}
                        className={cn(
                          "h-8 w-8 p-0",
                          isDarkMode ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-700"
                        )}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <User className={cn(
                    "h-4 w-4 mt-0.5",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )} />
                  <div>
                    <p className={cn(
                      "font-medium",
                      isDarkMode ? "text-gray-300" : "text-gray-900"
                    )}>
                      {address.recipient}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <MapPin className={cn(
                    "h-4 w-4 mt-0.5",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )} />
                  <div>
                    <p className={cn(
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      {address.street}
                    </p>
                    <p className={cn(
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      {address.city}, {address.province} {address.postalCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Phone className={cn(
                    "h-4 w-4",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )} />
                  <p className={cn(
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    {address.phone}
                  </p>
                </div>

                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDefaultAddress(address.id)}
                    className="w-full"
                  >
                    <StarOff className="h-4 w-4 mr-2" />
                    Set sebagai Alamat Utama
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {addresses.length === 0 && (
        <Card className={cn(
          "text-center py-12",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardContent>
            <MapPin className={cn(
              "h-12 w-12 mx-auto mb-4",
              isDarkMode ? "text-gray-400" : "text-gray-300"
            )} />
            <h3 className={cn(
              "text-lg font-medium mb-2",
              isDarkMode ? "text-gray-300" : "text-gray-900"
            )}>
              Belum ada alamat
            </h3>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}>
              Tambahkan alamat pengiriman pertama Anda
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddressManagement; 