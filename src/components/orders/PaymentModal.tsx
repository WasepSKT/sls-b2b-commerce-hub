import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { RadioGroup, RadioGroupItem } from "@/components/ui";
import { Label } from "@/components/ui";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui";

interface Address {
  id: string;
  label: string;
  address: string;
  recipient: string;
  phone: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  isDefault: boolean;
}

interface PendingOrder {
  orderId: string;
  orderDate: string;
  orderStatus: string;
  totalAmount: number;
  dueDate: string;
}

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pendingOrder: PendingOrder;
  userAddresses: Address[];
  paymentMethods: PaymentMethod[];
  selectedAddress: string;
  setSelectedAddress: (id: string) => void;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (id: string) => void;
  loading: boolean;
  processPayment: () => void;
  isDarkMode: boolean;
}

const PaymentModal = ({
  open,
  onOpenChange,
  pendingOrder,
  userAddresses,
  paymentMethods,
  selectedAddress,
  setSelectedAddress,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  loading,
  processPayment,
  isDarkMode
}: PaymentModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "sm:max-w-[600px] max-h-[80vh] overflow-y-auto",
        isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
      )}>
        <DialogHeader>
          <DialogTitle className={cn(
            isDarkMode ? "text-gray-100" : ""
          )}>Pembayaran Pesanan</DialogTitle>
          <DialogDescription className={cn(
            isDarkMode ? "text-gray-400" : ""
          )}>
            Selesaikan pembayaran untuk pesanan {pendingOrder.orderId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className={cn(
            "rounded-lg p-4 border",
            isDarkMode ? "bg-gray-750 border-gray-700" : "bg-gray-50 border-gray-200"
          )}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className={cn(
                  "font-medium",
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Detail Pesanan</h4>
                <p className={cn(
                  "text-sm mt-1",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )}>{pendingOrder.orderId} • {new Date(pendingOrder.orderDate).toLocaleDateString('id-ID')}</p>
              </div>
              <Badge className={cn(
                "border transition-colors hover:bg-opacity-0 hover:bg-transparent",
                isDarkMode
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  : "bg-amber-50 text-amber-800 border-amber-300 font-medium"
              )}>Belum Dibayar</Badge>
            </div>
            <div>
              <p className={cn(
                "text-sm",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>Total Bayar</p>
              <p className={cn(
                "text-xl font-bold mt-1",
                isDarkMode ? "text-white" : ""
              )}>Rp {pendingOrder.totalAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className={cn(
              "font-medium",
              isDarkMode ? "text-gray-100" : "text-gray-900"
            )}>Alamat Pengiriman</h4>

            <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="space-y-3">
              {userAddresses.map(address => (
                <div key={address.id} className={cn(
                  "flex items-start space-x-3 p-3 border rounded-lg cursor-pointer",
                  selectedAddress === address.id
                    ? isDarkMode ? "border-blue-500 bg-blue-500/10" : "border-blue-500 bg-blue-50"
                    : isDarkMode ? "border-gray-700" : "border-gray-200",
                  "transition-all duration-200"
                )}>
                  <RadioGroupItem
                    value={address.id}
                    id={address.id}
                    className={cn(
                      isDarkMode ? "border-gray-600 text-blue-500" : ""
                    )}
                  />
                  <div className="grid gap-1.5 leading-none w-full">
                    <div className="flex justify-between">
                      <Label
                        htmlFor={address.id}
                        className={cn(
                          "font-medium text-base cursor-pointer",
                          isDarkMode ? "text-gray-100" : ""
                        )}
                      >
                        {address.label}
                      </Label>
                      {address.isDefault && (
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium",
                          isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                        )}>Utama</span>
                      )}
                    </div>
                    <div className="grid gap-1">
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      )}>
                        {address.recipient}
                      </p>
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      )}>
                        {address.address}
                      </p>
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      )}>
                        Telepon: {address.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator className={cn(isDarkMode ? "bg-gray-700" : "")} />

          <div className="space-y-4">
            <h4 className={cn(
              "font-medium",
              isDarkMode ? "text-gray-100" : "text-gray-900"
            )}>Metode Pembayaran</h4>

            <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-3">
              {paymentMethods.map(method => (
                <div key={method.id} className={cn(
                  "flex items-start space-x-3 p-3 border rounded-lg cursor-pointer",
                  selectedPaymentMethod === method.id
                    ? isDarkMode ? "border-blue-500 bg-blue-500/10" : "border-blue-500 bg-blue-50"
                    : isDarkMode ? "border-gray-700" : "border-gray-200",
                  "transition-all duration-200"
                )}>
                  <RadioGroupItem
                    value={method.id}
                    id={method.id}
                    className={cn(
                      isDarkMode ? "border-gray-600 text-blue-500" : ""
                    )}
                  />
                  <div className="grid gap-1.5 leading-none w-full">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          isDarkMode ? "bg-gray-700" : "bg-gray-100"
                        )}>
                          <method.icon className={cn(
                            "w-4 h-4",
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          )} />
                        </div>
                        <Label
                          htmlFor={method.id}
                          className={cn(
                            "font-medium cursor-pointer",
                            isDarkMode ? "text-gray-100" : ""
                          )}
                        >
                          {method.name}
                        </Label>
                      </div>
                      {method.isDefault && (
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium",
                          isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                        )}>Utama</span>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm ml-10",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      {method.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between">
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
            onClick={processPayment}
            disabled={loading}
            className={cn(
              "transition-colors duration-300",
              isDarkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : ""
            )}
          >
            {loading ? (
              <>
                <span className="mr-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                Memproses...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Bayar Sekarang (Rp {pendingOrder.totalAmount.toLocaleString()})
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal; 