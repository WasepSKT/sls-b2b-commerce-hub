import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, Filter, Plus, Check, X, Calendar, Building, Wallet } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  date: string;
  amount: string;
  method: string;
  status: string;
}

const CustomerPayments = () => {
  const { isDarkMode } = useTheme();
  const [filterOpen, setFilterOpen] = useState(false);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [paymentType, setPaymentType] = useState("credit_card");
  const [loading, setLoading] = useState(false);

  // Credit card form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Sample payment data
  const payments: Payment[] = [
    {
      id: "INV-001",
      date: "20 Mei 2025",
      amount: "Rp 450,000",
      method: "Transfer Bank",
      status: "Berhasil"
    },
    {
      id: "INV-002",
      date: "18 Mei 2025",
      amount: "Rp 275,000",
      method: "Kartu Kredit",
      status: "Berhasil"
    },
    {
      id: "INV-003",
      date: "15 Mei 2025",
      amount: "Rp 520,000",
      method: "E-Wallet",
      status: "Berhasil"
    },
    {
      id: "INV-004",
      date: "10 Mei 2025",
      amount: "Rp 150,000",
      method: "Transfer Bank",
      status: "Berhasil"
    },
    {
      id: "INV-005",
      date: "05 Mei 2025",
      amount: "Rp 380,000",
      method: "Kartu Debit",
      status: "Berhasil"
    }
  ];

  // Format credit card number with spaces
  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts: string[] = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  const applyFilter = (): void => {
    let filtered = [...payments];
    
    if (methodFilter !== "all") {
      filtered = filtered.filter(payment => payment.method === methodFilter);
    }
    
    if (dateFilter) {
      filtered = filtered.filter(payment => payment.date.includes(dateFilter));
    }
    
    setFilteredPayments(filtered);
    setIsFiltered(methodFilter !== "all" || dateFilter !== "");
    setFilterOpen(false);
  };

  const resetFilter = (): void => {
    setMethodFilter("all");
    setDateFilter("");
    setIsFiltered(false);
    setFilteredPayments([]);
  };

  const handleAddPaymentMethod = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAddPaymentOpen(false);
      toast({
        title: "Metode pembayaran berhasil ditambahkan",
        description: `${paymentType === "credit_card" ? "Kartu kredit" : paymentType === "bank_transfer" ? "Transfer bank" : "E-Wallet"} telah ditambahkan ke akun Anda.`,
      });
      
      // Reset form
      setCardNumber("");
      setCardName("");
      setExpiryDate("");
      setCvv("");
      setPaymentType("credit_card");
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menambahkan metode pembayaran",
        description: "Terjadi kesalahan saat menambahkan metode pembayaran.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Display filtered payments if filter is applied, otherwise show all payments
  const displayedPayments = isFiltered ? filteredPayments : payments;

  return (
    <DashboardLayout role="customer" pageTitle="Pembayaran">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Riwayat Pembayaran</h2>
            <p className={cn(
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Lihat dan kelola catatan pembayaran Anda
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className={cn(
                isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : "",
                isFiltered && "border-blue-500 bg-blue-100/10 text-blue-600"
              )}
              onClick={() => setFilterOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter {isFiltered && `(${filteredPayments.length})`}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={cn(
                isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : "hover:bg-gray-100"
              )}
            >
              <Download className="mr-2 h-4 w-4" />
              Ekspor
            </Button>
          </div>
        </div>

        <Card className={cn(
          "transition-colors duration-300",
          isDarkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-200"
        )}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className={cn(
                isDarkMode ? "text-gray-50" : "text-slate-900"
              )}>Pembayaran Terakhir</CardTitle>
              <CardDescription className={cn(
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                Daftar transaksi pembayaran Anda {isFiltered && " (difilter)"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {isFiltered && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilter}
                  className={cn(
                    isDarkMode ? "text-gray-300 hover:bg-gray-700" : ""
                  )}
                >
                  <X className="h-4 w-4 mr-1" />
                  Reset Filter
                </Button>
              )}
              <CreditCard className={cn(
                "h-5 w-5 ml-2",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )} />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className={cn(
                  isDarkMode ? "border-gray-700 hover:bg-transparent" : "hover:bg-white"
                )}>
                  <TableHead className={cn(
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>ID Pembayaran</TableHead>
                  <TableHead className={cn(
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>Tanggal</TableHead>
                  <TableHead className={cn(
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>Jumlah</TableHead>
                  <TableHead className={cn(
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>Metode</TableHead>
                  <TableHead className={cn(
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>Status</TableHead>
                  <TableHead className={cn(
                    "text-right",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedPayments.length > 0 ? (
                  displayedPayments.map((payment) => (
                    <TableRow key={payment.id} className={cn(
                      isDarkMode ? "border-gray-700 hover:bg-transparent" : "hover:bg-white"
                    )}>
                      <TableCell className={cn(
                        "font-medium",
                        isDarkMode ? "text-gray-100" : ""
                      )}>{payment.id}</TableCell>
                      <TableCell className={cn(
                        isDarkMode ? "text-gray-300" : ""
                      )}>{payment.date}</TableCell>
                      <TableCell className={cn(
                        isDarkMode ? "text-gray-300" : ""
                      )}>{payment.amount}</TableCell>
                      <TableCell className={cn(
                        isDarkMode ? "text-gray-300" : ""
                      )}>{payment.method}</TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "border transition-colors hover:bg-opacity-0 hover:bg-transparent",
                          isDarkMode 
                            ? "bg-green-500/20 text-green-400 border-green-500/30" 
                            : "bg-green-100 text-green-800 border-green-300"
                        )}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={cn(
                            isDarkMode ? "hover:bg-gray-700 text-gray-300" : ""
                          )}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className={cn(
                      "text-center py-8",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>
                      {isFiltered 
                        ? "Tidak ada pembayaran yang sesuai dengan filter" 
                        : "Tidak ada data pembayaran yang tersedia"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
            )}>Metode Pembayaran</CardTitle>
            <CardDescription className={cn(
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}>
              Kelola metode pembayaran Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={cn(
                "border rounded-md p-4 flex justify-between items-center",
                isDarkMode ? "border-gray-700" : ""
              )}>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-2 rounded-md",
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  )}>
                    <CreditCard className={cn(
                      "h-6 w-6",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )} />
                  </div>
                  <div>
                    <p className={cn(
                      "font-medium",
                      isDarkMode ? "text-gray-100" : ""
                    )}>VISA **** 1234</p>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>Kadaluwarsa: 05/26</p>
                  </div>
                </div>
                <Badge className={cn(
                  isDarkMode ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : ""
                )}>Utama</Badge>
              </div>

              <div className={cn(
                "border rounded-md p-4 flex justify-between items-center",
                isDarkMode ? "border-gray-700" : ""
              )}>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-2 rounded-md",
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  )}>
                    <CreditCard className={cn(
                      "h-6 w-6",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )} />
                  </div>
                  <div>
                    <p className={cn(
                      "font-medium",
                      isDarkMode ? "text-gray-100" : ""
                    )}>Mastercard **** 5678</p>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>Kadaluwarsa: 08/27</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(
                    isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : "hover:bg-gray-100"
                  )}
                >Jadikan Utama</Button>
              </div>

              <div className="text-center mt-6">
                <Button 
                  className={cn(
                    "transition-colors duration-300",
                    isDarkMode 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : ""
                  )}
                  onClick={() => setAddPaymentOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Metode Pembayaran
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Modal */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent className={cn(
          isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
        )}>
          <DialogHeader>
            <DialogTitle className={cn(
              isDarkMode ? "text-gray-100" : ""
            )}>Filter Pembayaran</DialogTitle>
            <DialogDescription className={cn(
              isDarkMode ? "text-gray-400" : ""
            )}>
              Pilih kriteria untuk memfilter riwayat pembayaran
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-gray-300" : ""
              )}>Metode Pembayaran</h4>
              <Select
                value={methodFilter}
                onValueChange={setMethodFilter}
              >
                <SelectTrigger className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )}>
                  <SelectValue placeholder="Pilih metode pembayaran" />
                </SelectTrigger>
                <SelectContent className={cn(
                  isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : ""
                )}>
                  <SelectItem value="all">Semua Metode</SelectItem>
                  <SelectItem value="Transfer Bank">Transfer Bank</SelectItem>
                  <SelectItem value="Kartu Kredit">Kartu Kredit</SelectItem>
                  <SelectItem value="Kartu Debit">Kartu Debit</SelectItem>
                  <SelectItem value="E-Wallet">E-Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h4 className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-gray-300" : ""
              )}>Tanggal Pembayaran</h4>
              <Input
                type="text"
                placeholder="Contoh: Mei 2025"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )}
              />
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
              type="submit" 
              onClick={applyFilter}
              className={cn(
                "transition-colors duration-300",
                isDarkMode 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : ""
              )}
            >
              <Check className="h-4 w-4 mr-2" />
              Terapkan Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Payment Method Modal */}
      <Dialog open={addPaymentOpen} onOpenChange={setAddPaymentOpen}>
        <DialogContent className={cn(
          "sm:max-w-[500px]",
          isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
        )}>
          <DialogHeader>
            <DialogTitle className={cn(
              isDarkMode ? "text-gray-100" : ""
            )}>Tambah Metode Pembayaran</DialogTitle>
            <DialogDescription className={cn(
              isDarkMode ? "text-gray-400" : ""
            )}>
              Tambahkan metode pembayaran baru ke akun Anda
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddPaymentMethod} className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className={cn(
                  "text-sm font-medium",
                  isDarkMode ? "text-gray-300" : ""
                )}>Jenis Pembayaran</h4>
                
                <RadioGroup value={paymentType} onValueChange={setPaymentType} className="grid grid-cols-3 gap-4">
                  <div className={cn(
                    "flex flex-col items-center space-y-2 rounded-md border p-3 cursor-pointer",
                    paymentType === "credit_card" 
                      ? isDarkMode ? "border-blue-500 bg-blue-500/10" : "border-blue-500 bg-blue-50" 
                      : isDarkMode ? "border-gray-700" : "border-gray-200"
                  )}>
                    <RadioGroupItem 
                      value="credit_card" 
                      id="credit_card"
                      className="sr-only"
                    />
                    <CreditCard className={cn(
                      "h-6 w-6 mb-1",
                      paymentType === "credit_card" 
                        ? "text-blue-500" 
                        : isDarkMode ? "text-gray-400" : "text-gray-500"
                    )} />
                    <Label 
                      htmlFor="credit_card"
                      className={cn(
                        "text-sm cursor-pointer text-center",
                        paymentType === "credit_card" 
                          ? "font-medium" 
                          : isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}
                    >
                      Kartu Kredit
                    </Label>
                  </div>
                  
                  <div className={cn(
                    "flex flex-col items-center space-y-2 rounded-md border p-3 cursor-pointer",
                    paymentType === "bank_transfer" 
                      ? isDarkMode ? "border-blue-500 bg-blue-500/10" : "border-blue-500 bg-blue-50" 
                      : isDarkMode ? "border-gray-700" : "border-gray-200"
                  )}>
                    <RadioGroupItem 
                      value="bank_transfer" 
                      id="bank_transfer"
                      className="sr-only"
                    />
                    <Building className={cn(
                      "h-6 w-6 mb-1",
                      paymentType === "bank_transfer" 
                        ? "text-blue-500" 
                        : isDarkMode ? "text-gray-400" : "text-gray-500"
                    )} />
                    <Label 
                      htmlFor="bank_transfer"
                      className={cn(
                        "text-sm cursor-pointer text-center",
                        paymentType === "bank_transfer" 
                          ? "font-medium" 
                          : isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}
                    >
                      Transfer Bank
                    </Label>
                  </div>
                  
                  <div className={cn(
                    "flex flex-col items-center space-y-2 rounded-md border p-3 cursor-pointer",
                    paymentType === "ewallet" 
                      ? isDarkMode ? "border-blue-500 bg-blue-500/10" : "border-blue-500 bg-blue-50" 
                      : isDarkMode ? "border-gray-700" : "border-gray-200"
                  )}>
                    <RadioGroupItem 
                      value="ewallet" 
                      id="ewallet"
                      className="sr-only"
                    />
                    <Wallet className={cn(
                      "h-6 w-6 mb-1",
                      paymentType === "ewallet" 
                        ? "text-blue-500" 
                        : isDarkMode ? "text-gray-400" : "text-gray-500"
                    )} />
                    <Label 
                      htmlFor="ewallet"
                      className={cn(
                        "text-sm cursor-pointer text-center",
                        paymentType === "ewallet" 
                          ? "font-medium" 
                          : isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}
                    >
                      E-Wallet
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {paymentType === "credit_card" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className={cn(
                      isDarkMode ? "text-gray-300" : ""
                    )}>
                      Nomor Kartu
                    </Label>
                    <div className={cn(
                      "flex items-center border rounded-md",
                      isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-300"
                    )}>
                      <Input 
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className={cn(
                          "border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                          isDarkMode ? "bg-gray-700 text-gray-200" : ""
                        )}
                      />
                      <div className="px-3">
                        <CreditCard className={cn(
                          "h-5 w-5",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className={cn(
                      isDarkMode ? "text-gray-300" : ""
                    )}>
                      Nama pada Kartu
                    </Label>
                    <Input 
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="NAMA LENGKAP"
                      className={cn(
                        isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className={cn(
                        isDarkMode ? "text-gray-300" : ""
                      )}>
                        Tanggal Kadaluarsa
                      </Label>
                      <Input 
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={cn(
                          isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                        )}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className={cn(
                        isDarkMode ? "text-gray-300" : ""
                      )}>
                        CVV
                      </Label>
                      <Input 
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        placeholder="***"
                        maxLength={3}
                        className={cn(
                          isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentType === "bank_transfer" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className={cn(
                      isDarkMode ? "text-gray-300" : ""
                    )}>
                      Bank
                    </Label>
                    <Select>
                      <SelectTrigger className={cn(
                        isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                      )}>
                        <SelectValue placeholder="Pilih bank" />
                      </SelectTrigger>
                      <SelectContent className={cn(
                        isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : ""
                      )}>
                        <SelectItem value="bca">BCA</SelectItem>
                        <SelectItem value="bni">BNI</SelectItem>
                        <SelectItem value="mandiri">Mandiri</SelectItem>
                        <SelectItem value="bri">BRI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className={cn(
                      isDarkMode ? "text-gray-300" : ""
                    )}>
                      Nomor Rekening
                    </Label>
                    <Input 
                      type="text"
                      placeholder="Masukkan nomor rekening"
                      className={cn(
                        isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className={cn(
                      isDarkMode ? "text-gray-300" : ""
                    )}>
                      Nama Pemilik Rekening
                    </Label>
                    <Input 
                      type="text"
                      placeholder="Masukkan nama pemilik rekening"
                      className={cn(
                        isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                      )}
                    />
                  </div>
                </div>
              )}

              {paymentType === "ewallet" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className={cn(
                      isDarkMode ? "text-gray-300" : ""
                    )}>
                      Provider E-Wallet
                    </Label>
                    <Select>
                      <SelectTrigger className={cn(
                        isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                      )}>
                        <SelectValue placeholder="Pilih provider" />
                      </SelectTrigger>
                      <SelectContent className={cn(
                        isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : ""
                      )}>
                        <SelectItem value="gopay">GoPay</SelectItem>
                        <SelectItem value="ovo">OVO</SelectItem>
                        <SelectItem value="dana">DANA</SelectItem>
                        <SelectItem value="linkaja">LinkAja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className={cn(
                      isDarkMode ? "text-gray-300" : ""
                    )}>
                      Nomor Telepon
                    </Label>
                    <Input 
                      type="tel"
                      placeholder="Masukkan nomor telepon yang terdaftar"
                      className={cn(
                        isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                      )}
                    />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button 
                  variant="outline" 
                  type="button"
                  className={cn(
                    isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : ""
                  )}
                >
                  Batal
                </Button>
              </DialogClose>
              <Button 
                type="submit"
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
                    <Plus className="mr-2 h-4 w-4" />
                    Simpan Metode Pembayaran
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CustomerPayments; 