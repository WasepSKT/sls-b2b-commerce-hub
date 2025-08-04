import { useState } from "react";
import { Button } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Input } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Search, UserPlus, Edit, Trash, ShoppingBag, Users, Building2, CreditCard, RefreshCw, Check, Save, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { Label } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "corporate" | "retail";
  status: "active" | "inactive";
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

const PrincipalCustomers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  
  // New state variables for customer management
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isEditCustomerOpen, setIsEditCustomerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    id: string;
    name: string;
    email: string;
    phone?: string;
    registrationDate: string;
  }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [currentEditCustomer, setCurrentEditCustomer] = useState<Customer | null>(null);
  const [editedCustomerData, setEditedCustomerData] = useState({
    status: "",
    type: ""
  });

  // Dummy data untuk statistik pelanggan
  const customerStats = {
    totalCustomers: 152,
    activeCustomers: 134,
    totalOrders: 450,
    totalRevenue: 750000000,
  };

  // Dummy data untuk daftar pelanggan
  const customers: Customer[] = [
    {
      id: "1",
      name: "PT Maju Bersama",
      email: "contact@majubersama.com",
      phone: "+62812-3456-7890",
      type: "corporate",
      status: "active",
      totalOrders: 25,
      totalSpent: 150000000,
      lastOrder: "2024-03-01",
    },
    {
      id: "2",
      name: "CV Sukses Mandiri",
      email: "info@suksesmandiri.com",
      phone: "+62812-3456-7891",
      type: "corporate",
      status: "active",
      totalOrders: 18,
      totalSpent: 120000000,
      lastOrder: "2024-02-28",
    },
    {
      id: "3",
      name: "Toko Makmur",
      email: "toko.makmur@email.com",
      phone: "+62812-3456-7892",
      type: "retail",
      status: "inactive",
      totalOrders: 12,
      totalSpent: 45000000,
      lastOrder: "2024-02-15",
    },
  ];

  const getStatusColor = (status: Customer["status"]) => {
    if (isDarkMode) {
      switch (status) {
        case "active":
          return "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30";
        case "inactive":
          return "bg-red-500/20 text-red-400 hover:bg-red-500/30";
        default:
          return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
      }
    } else {
      switch (status) {
        case "active":
          return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
        case "inactive":
          return "bg-red-100 text-red-800 hover:bg-red-200";
        default:
          return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      }
    }
  };

  const getTypeColor = (type: Customer["type"]) => {
    if (isDarkMode) {
      switch (type) {
        case "corporate":
          return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
        case "retail":
          return "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30";
        default:
          return "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30";
      }
    } else {
      switch (type) {
        case "corporate":
          return "bg-blue-100 text-blue-800 hover:bg-blue-200";
        case "retail":
          return "bg-purple-100 text-purple-800 hover:bg-purple-200";
        default:
          return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200";
      }
    }
  };

  const getStatusText = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "inactive":
        return "Tidak Aktif";
      default:
        return status;
    }
  };

  const getTypeText = (type: Customer["type"]) => {
    switch (type) {
      case "corporate":
        return "Korporat";
      case "retail":
        return "Retail";
      default:
        return type;
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Search account functionality
  const handleSearchUser = () => {
    if (!customerSearchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock search results
      const mockResults = [
        {
          id: "u123",
          name: "Budi Santoso",
          email: "budi@example.com",
          phone: "+62811-2233-4455",
          registrationDate: "2023-10-15"
        },
        {
          id: "u124",
          name: "Dewi Wijaya",
          email: "dewi@example.com",
          phone: "+62822-3344-5566",
          registrationDate: "2023-11-20"
        },
        {
          id: "u125",
          name: "Eko Prasetyo",
          email: "eko@example.com",
          phone: "+62833-4455-6677",
          registrationDate: "2023-12-05"
        }
      ].filter(user => 
        user.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(customerSearchQuery.toLowerCase())
      );

      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  // Handle user selection
  const handleMakeCustomer = () => {
    if (!selectedUserId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Silahkan pilih user terlebih dahulu",
      });
      return;
    }

    // In real app, make API call to add the user as customer
    toast({
      title: "Sukses",
      description: "Pengguna berhasil ditambahkan sebagai pelanggan",
    });

    // Close modal and reset state
    setIsAddCustomerOpen(false);
    setCustomerSearchQuery("");
    setSearchResults([]);
    setSelectedUserId(null);
  };

  // Handle edit customer
  const handleEditCustomer = (customer: Customer) => {
    setCurrentEditCustomer(customer);
    setEditedCustomerData({
      status: customer.status,
      type: customer.type
    });
    setIsEditCustomerOpen(true);
  };

  // Save edited customer
  const saveEditedCustomer = () => {
    if (!currentEditCustomer) return;

    // In real app, make API call to update the customer
    toast({
      title: "Sukses",
      description: "Data pelanggan berhasil diperbarui",
    });

    setIsEditCustomerOpen(false);
    setCurrentEditCustomer(null);
  };

  // Handle delete customer
  const handleDeleteCustomer = (customer: Customer) => {
    setCurrentEditCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete customer
  const confirmDeleteCustomer = () => {
    if (!currentEditCustomer) return;

    // In real app, make API call to delete the customer
    toast({
      title: "Sukses",
      description: "Pelanggan berhasil dihapus",
    });

    setIsDeleteDialogOpen(false);
    setCurrentEditCustomer(null);
  };

  return (
    <DashboardLayout role="principal" pageTitle="Manajemen Pelanggan">
      <div className="space-y-6">
        {/* Add Customer Dialog */}
        <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
          <DialogContent className={cn(
            "sm:max-w-[500px]",
            isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
          )}>
            <DialogHeader>
              <DialogTitle className={cn(
                isDarkMode ? "text-gray-100" : ""
              )}>Tambah Pelanggan Baru</DialogTitle>
              <DialogDescription className={cn(
                isDarkMode ? "text-gray-400" : ""
              )}>
                Cari user berdasarkan nama atau email untuk dijadikan pelanggan
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="user-search" className={cn(
                    isDarkMode ? "text-gray-300" : ""
                  )}>Pencarian Akun</Label>
                  <Input
                    id="user-search"
                    placeholder="Cari dengan nama atau email..."
                    className={cn(
                      isDarkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""
                    )}
                    value={customerSearchQuery}
                    onChange={(e) => setCustomerSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleSearchUser}
                  className={cn(
                    isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                  )}
                >
                  {isSearching ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Cari
                </Button>
              </div>

              <div className="space-y-2">
                {searchResults.length > 0 && (
                  <div className={cn(
                    "rounded-md border p-2 max-h-[200px] overflow-y-auto",
                    isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-200"
                  )}>
                    <p className={cn(
                      "text-xs mb-2",
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    )}>Hasil Pencarian ({searchResults.length})</p>
                    
                    {searchResults.map((user) => (
                      <div 
                        key={user.id}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-md cursor-pointer mb-1",
                          selectedUserId === user.id 
                            ? isDarkMode ? "bg-blue-900/30 border-blue-700" : "bg-blue-50 border-blue-200"
                            : isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-50",
                          isDarkMode ? "border border-gray-600" : "border"
                        )}
                        onClick={() => setSelectedUserId(user.id)}
                      >
                        <div>
                          <p className={cn(
                            "font-medium",
                            isDarkMode ? "text-gray-100" : ""
                          )}>{user.name}</p>
                          <p className={cn(
                            "text-xs",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>{user.email}</p>
                          {user.phone && (
                            <p className={cn(
                              "text-xs",
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            )}>{user.phone}</p>
                          )}
                        </div>
                        {selectedUserId === user.id && (
                          <Check className={cn(
                            "w-4 h-4",
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          )} />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {customerSearchQuery && searchResults.length === 0 && !isSearching && (
                  <div className={cn(
                    "flex items-center gap-2 p-2 rounded-md border",
                    isDarkMode ? "border-gray-600 bg-gray-700 text-gray-300" : "border-gray-200 bg-gray-50 text-gray-500"
                  )}>
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <p className="text-sm">Tidak ada user yang ditemukan</p>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddCustomerOpen(false);
                  setCustomerSearchQuery("");
                  setSearchResults([]);
                  setSelectedUserId(null);
                }}
                className={cn(
                  isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-gray-100" : ""
                )}
              >
                Batal
              </Button>
              <Button
                onClick={handleMakeCustomer}
                disabled={!selectedUserId}
                className={cn(
                  isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                )}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Jadikan Pelanggan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Customer Dialog */}
        <Dialog open={isEditCustomerOpen} onOpenChange={setIsEditCustomerOpen}>
          <DialogContent className={cn(
            "sm:max-w-[500px]",
            isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
          )}>
            <DialogHeader>
              <DialogTitle className={cn(
                isDarkMode ? "text-gray-100" : ""
              )}>Edit Pelanggan</DialogTitle>
              <DialogDescription className={cn(
                isDarkMode ? "text-gray-400" : ""
              )}>
                Perbarui status dan tipe pelanggan
              </DialogDescription>
            </DialogHeader>

            {currentEditCustomer && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="status" className={cn(
                    isDarkMode ? "text-gray-300" : ""
                  )}>Status</Label>
                  <Select
                    value={editedCustomerData.status}
                    onValueChange={(value) => setEditedCustomerData({
                      ...editedCustomerData,
                      status: value
                    })}
                  >
                    <SelectTrigger id="status" className={cn(
                      isDarkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""
                    )}>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent className={cn(
                      isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
                    )}>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Tidak Aktif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className={cn(
                    isDarkMode ? "text-gray-300" : ""
                  )}>Tipe</Label>
                  <Select
                    value={editedCustomerData.type}
                    onValueChange={(value) => setEditedCustomerData({
                      ...editedCustomerData,
                      type: value
                    })}
                  >
                    <SelectTrigger id="type" className={cn(
                      isDarkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""
                    )}>
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent className={cn(
                      isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
                    )}>
                      <SelectItem value="corporate">Korporat</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditCustomerOpen(false)}
                className={cn(
                  isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-gray-100" : ""
                )}
              >
                Batal
              </Button>
              <Button
                onClick={saveEditedCustomer}
                className={cn(
                  isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                )}
              >
                <Save className="mr-2 h-4 w-4" />
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Customer Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className={cn(
            "sm:max-w-[400px]",
            isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
          )}>
            <DialogHeader>
              <DialogTitle className={cn(
                isDarkMode ? "text-gray-100" : ""
              )}>Hapus Pelanggan</DialogTitle>
              <DialogDescription className={cn(
                isDarkMode ? "text-gray-400" : ""
              )}>
                Apakah Anda yakin ingin menghapus pelanggan ini?
              </DialogDescription>
            </DialogHeader>

            {currentEditCustomer && (
              <div className="py-4">
                <p className={cn(
                  "font-medium mb-2",
                  isDarkMode ? "text-gray-100" : ""
                )}>{currentEditCustomer.name}</p>
                <p className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait pelanggan ini.
                </p>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className={cn(
                  isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-gray-100" : ""
                )}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDeleteCustomer}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash className="mr-2 h-4 w-4" />
                Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Pelanggan</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Kelola daftar pelanggan dan agen Anda
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari pelanggan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "pl-10 pr-4 transition-colors duration-300",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                )}
              />
            </div>
            <Button 
              className={cn(
                "transition-colors duration-300",
                isDarkMode 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
              onClick={() => setIsAddCustomerOpen(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Tambah Pelanggan
            </Button>
          </div>
        </div>

        {/* Statistik Pelanggan */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Total Pelanggan</CardTitle>
              <Users className={cn(
                "h-4 w-4",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )} />
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>{customerStats.totalCustomers}</div>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                +12 pelanggan bulan ini
              </p>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Pelanggan Aktif</CardTitle>
              <Building2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>{customerStats.activeCustomers}</div>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                {((customerStats.activeCustomers / customerStats.totalCustomers) * 100).toFixed(1)}% dari total pelanggan
              </p>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Total Pesanan</CardTitle>
              <ShoppingBag className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>{customerStats.totalOrders}</div>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                +45 pesanan bulan ini
              </p>
            </CardContent>
          </Card>

          <Card className={cn(
            "transition-colors duration-300",
            isDarkMode 
              ? "bg-gray-800 border-gray-700 hover:bg-gray-750" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Total Pendapatan</CardTitle>
              <CreditCard className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-emerald-400" : "text-emerald-600"
              )}>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(customerStats.totalRevenue)}
              </div>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                +15.2% dari bulan lalu
              </p>
            </CardContent>
          </Card>
        </div>

        <div className={cn(
          "border rounded-lg transition-colors duration-300",
          isDarkMode ? "border-gray-700" : "border-gray-200"
        )}>
          <Table>
            <TableHeader>
              <TableRow className={cn(
                "transition-colors duration-300",
                isDarkMode ? "border-gray-700" : "border-gray-200"
              )}>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Nama</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Email</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Telepon</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Tipe</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Status</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Total Pesanan</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Total Pembelian</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Pesanan Terakhir</TableHead>
                <TableHead className={cn(
                  "text-right",
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "hover:bg-blue-900/20 border-gray-700" 
                    : "hover:bg-blue-50/70 border-gray-200"
                )}>
                  <TableCell className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{customer.name}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-700"
                  )}>{customer.email}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-700"
                  )}>{customer.phone}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(customer.type)}>
                      {getTypeText(customer.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>
                      {getStatusText(customer.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{customer.totalOrders}</TableCell>
                  <TableCell className={cn(
                    "font-medium",
                    isDarkMode ? "text-emerald-400" : "text-emerald-600"
                  )}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(customer.totalSpent)}
                  </TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>{customer.lastOrder}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                          "transition-colors duration-300",
                          isDarkMode 
                            ? "text-gray-400 hover:text-white hover:bg-gray-700" 
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        )}
                        onClick={() => handleEditCustomer(customer)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                          "transition-colors duration-300",
                          isDarkMode 
                            ? "text-red-400 hover:text-red-300 hover:bg-red-900/30" 
                            : "text-red-600 hover:text-red-700 hover:bg-red-100"
                        )}
                        onClick={() => handleDeleteCustomer(customer)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PrincipalCustomers; 