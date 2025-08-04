import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import { Badge } from '@/components/ui';
import { useTheme } from '@/lib/store/theme';
import { usePaymentMethodStore, PaymentMethod } from '@/lib/store/paymentMethods';
import { cn } from '@/lib/utils';
import {
  Plus,
  Edit,
  Trash2,
  CreditCard,
  Building,
  Smartphone,
  Wallet,
  Star,
  StarOff,
  Check,
  X,
  Eye,
  EyeOff,
} from 'lucide-react';

interface PaymentMethodFormData {
  type: 'credit_card' | 'bank_transfer' | 'ewallet' | 'virtual_account';
  name: string;
  info: string;
  accountNumber?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  bankName?: string;
  isDefault: boolean;
}

const PaymentMethodManagement = () => {
  const { isDarkMode } = useTheme();
  const {
    paymentMethods,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
  } = usePaymentMethodStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | null>(null);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [formData, setFormData] = useState<PaymentMethodFormData>({
    type: 'credit_card',
    name: '',
    info: '',
    accountNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    bankName: '',
    isDefault: false,
  });

  const resetForm = () => {
    setFormData({
      type: 'credit_card',
      name: '',
      info: '',
      accountNumber: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      bankName: '',
      isDefault: false,
    });
    setEditingPaymentMethod(null);
    setShowCardDetails(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPaymentMethod) {
      updatePaymentMethod(editingPaymentMethod.id, formData);
    } else {
      addPaymentMethod(formData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (paymentMethod: PaymentMethod) => {
    setEditingPaymentMethod(paymentMethod);
    setFormData({
      type: paymentMethod.type,
      name: paymentMethod.name,
      info: paymentMethod.info,
      accountNumber: paymentMethod.accountNumber || '',
      cardNumber: paymentMethod.cardNumber || '',
      expiryDate: paymentMethod.expiryDate || '',
      cvv: paymentMethod.cvv || '',
      bankName: paymentMethod.bankName || '',
      isDefault: paymentMethod.isDefault,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus metode pembayaran ini?')) {
      deletePaymentMethod(id);
    }
  };

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'credit_card':
        return CreditCard;
      case 'bank_transfer':
        return Building;
      case 'ewallet':
        return Smartphone;
      case 'virtual_account':
        return Wallet;
      default:
        return CreditCard;
    }
  };

  const getPaymentMethodTypeLabel = (type: string) => {
    switch (type) {
      case 'credit_card':
        return 'Kartu Kredit';
      case 'bank_transfer':
        return 'Transfer Bank';
      case 'ewallet':
        return 'E-Wallet';
      case 'virtual_account':
        return 'Virtual Account';
      default:
        return type;
    }
  };

  const renderFormFields = () => {
    switch (formData.type) {
      case 'credit_card':
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cardNumber" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Nomor Kartu
                </Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="**** **** **** ****"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    type={showCardDetails ? "text" : "password"}
                    className={cn(
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 pr-10"
                        : "bg-white border-gray-200 pr-10"
                    )}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowCardDetails(!showCardDetails)}
                  >
                    {showCardDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="name" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Nama pada Kartu
                </Label>
                <Input
                  id="name"
                  placeholder="Nama pemilik kartu"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="expiryDate" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Tanggal Kadaluwarsa
                </Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  type="password"
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                  required
                />
              </div>
              <div>
                <Label htmlFor="info" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Label (Opsional)
                </Label>
                <Input
                  id="info"
                  placeholder="Contoh: Kartu Utama"
                  value={formData.info}
                  onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                />
              </div>
            </div>
          </>
        );

      case 'bank_transfer':
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Nama Bank
                </Label>
                <Input
                  id="bankName"
                  placeholder="Contoh: Bank BCA"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                  required
                />
              </div>
              <div>
                <Label htmlFor="accountNumber" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Nomor Rekening
                </Label>
                <Input
                  id="accountNumber"
                  placeholder="1234567890"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Nama Pemilik Rekening
                </Label>
                <Input
                  id="name"
                  placeholder="Nama pemilik rekening"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                  required
                />
              </div>
              <div>
                <Label htmlFor="info" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Label (Opsional)
                </Label>
                <Input
                  id="info"
                  placeholder="Contoh: Rekening Utama"
                  value={formData.info}
                  onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                />
              </div>
            </div>
          </>
        );

      case 'ewallet':
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Nama E-Wallet
                </Label>
                <Input
                  id="name"
                  placeholder="Contoh: GoPay, OVO, DANA"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200"
                  )}
                  required
                />
              </div>
              <div>
                <Label htmlFor="accountNumber" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Nomor Telepon
                </Label>
                <Input
                  id="accountNumber"
                  placeholder="081234567890"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
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
              <Label htmlFor="info" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                Label (Opsional)
              </Label>
              <Input
                id="info"
                placeholder="Contoh: E-Wallet Utama"
                value={formData.info}
                onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                className={cn(
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-200"
                )}
              />
            </div>
          </>
        );

      default:
        return null;
    }
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
            Metode Pembayaran
          </h2>
          <p className={cn(
            "text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Kelola metode pembayaran Anda
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Metode
            </Button>
          </DialogTrigger>
          <DialogContent className={cn(
            "max-w-2xl",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <DialogHeader>
              <DialogTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>
                {editingPaymentMethod ? 'Edit Metode Pembayaran' : 'Tambah Metode Pembayaran Baru'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="type" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Jenis Metode Pembayaran
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger className={cn(
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200"
                  )}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Kartu Kredit</SelectItem>
                    <SelectItem value="bank_transfer">Transfer Bank</SelectItem>
                    <SelectItem value="ewallet">E-Wallet</SelectItem>
                    <SelectItem value="virtual_account">Virtual Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {renderFormFields()}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isDefault" className={cn(isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Set sebagai metode pembayaran utama
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
                  {editingPaymentMethod ? 'Update' : 'Simpan'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment Methods List */}
      <div className="grid gap-4 md:grid-cols-2">
        {paymentMethods.map((paymentMethod) => {
          const PaymentMethodIcon = getPaymentMethodIcon(paymentMethod.type);

          return (
            <Card
              key={paymentMethod.id}
              className={cn(
                "transition-all duration-300",
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
                paymentMethod.isDefault && "ring-2 ring-blue-500"
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <PaymentMethodIcon className={cn(
                      "h-5 w-5",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )} />
                    <CardTitle className={cn(
                      "text-lg",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                      {paymentMethod.name}
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    {paymentMethod.isDefault && (
                      <Badge className="bg-blue-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Utama
                      </Badge>
                    )}
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(paymentMethod)}
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
                        onClick={() => handleDelete(paymentMethod.id)}
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
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={cn(
                    isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600"
                  )}>
                    {getPaymentMethodTypeLabel(paymentMethod.type)}
                  </Badge>
                </div>

                <div>
                  <p className={cn(
                    "text-sm",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    {paymentMethod.info}
                  </p>
                </div>

                {!paymentMethod.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDefaultPaymentMethod(paymentMethod.id)}
                    className="w-full"
                  >
                    <StarOff className="h-4 w-4 mr-2" />
                    Set sebagai Metode Utama
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {paymentMethods.length === 0 && (
        <Card className={cn(
          "text-center py-12",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardContent>
            <CreditCard className={cn(
              "h-12 w-12 mx-auto mb-4",
              isDarkMode ? "text-gray-400" : "text-gray-300"
            )} />
            <h3 className={cn(
              "text-lg font-medium mb-2",
              isDarkMode ? "text-gray-300" : "text-gray-900"
            )}>
              Belum ada metode pembayaran
            </h3>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}>
              Tambahkan metode pembayaran pertama Anda
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentMethodManagement; 