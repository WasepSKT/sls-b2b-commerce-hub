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
import { Search, UserPlus, Edit, Trash, BarChart, Plus, RefreshCw, Check, Save, AlertTriangle, Eye, Calendar, PackageCheck, Clock, User } from "lucide-react";
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

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  status: "active" | "inactive" | "pending";
  totalSales: number;
  totalCustomers: number;
  joinDate: string;
}

const PrincipalAgents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);
  const [isEditAgentOpen, setIsEditAgentOpen] = useState(false);
  const { toast } = useToast();
  const [agentSearchQuery, setAgentSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    id: string;
    name: string;
    email: string;
    phone?: string;
    registrationDate: string;
  }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [region, setRegion] = useState("");
  const [currentEditAgent, setCurrentEditAgent] = useState<Agent | null>(null);
  const [editedAgentData, setEditedAgentData] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
    status: "",
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Function to search for registered users
  const searchRegisteredUsers = () => {
    if (!agentSearchQuery.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Masukkan nama pengguna untuk mencari",
      });
      return;
    }

    setIsSearching(true);
    
    // In a real app, this would call an API to search for users
    // For demo purposes, we'll simulate an API call with mock data
    setTimeout(() => {
      const mockResults = [
        {
          id: "user1",
          name: "Ahmad Fauzi",
          email: "ahmad.fauzi@example.com",
          phone: "081234567890",
          registrationDate: "2024-02-15"
        },
        {
          id: "user2",
          name: "Budi Santoso",
          email: "budi.santoso@example.com",
          phone: "081234567891",
          registrationDate: "2024-03-10"
        },
        {
          id: "user3",
          name: "Citra Dewi",
          email: "citra.dewi@example.com",
          phone: "081234567892",
          registrationDate: "2024-04-05"
        }
      ].filter(user => 
        user.name.toLowerCase().includes(agentSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(agentSearchQuery.toLowerCase())
      );
      
      setSearchResults(mockResults);
      setIsSearching(false);
      
      if (mockResults.length === 0) {
        toast({
          variant: "default",
          title: "Tidak ada hasil",
          description: "Tidak ditemukan pengguna dengan nama tersebut",
        });
      }
    }, 800);
  };

  const linkUserAsAgent = () => {
    if (!selectedUserId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Silakan pilih pengguna terlebih dahulu",
      });
      return;
    }

    // In a real app, this would call an API to link the selected user as an agent
    toast({
      title: "Agen berhasil ditambahkan",
      description: "Pengguna telah berhasil ditautkan sebagai agen",
    });
    
    setIsAddAgentOpen(false);
    setAgentSearchQuery("");
    setSearchResults([]);
    setSelectedUserId(null);
    setRegion("");
  };

  // Function to open edit modal with agent data
  const handleOpenEditModal = (agent: Agent) => {
    setCurrentEditAgent(agent);
    setEditedAgentData({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      region: agent.region,
      status: agent.status,
    });
    setIsEditAgentOpen(true);
  };

  // Function to handle edit form submission
  const handleEditAgent = () => {
    if (!currentEditAgent) return;

    // In a real app, this would call an API to update agent data
    toast({
      title: "Agen berhasil diperbarui",
      description: "Data agen telah berhasil diperbarui",
    });
    
    setIsEditAgentOpen(false);
    setCurrentEditAgent(null);
  };

  // Function to handle delete button click
  const handleOpenDeleteDialog = (agent: Agent) => {
    setAgentToDelete(agent);
    setIsDeleteDialogOpen(true);
  };

  // Function to handle agent deletion
  const handleDeleteAgent = () => {
    if (!agentToDelete) return;

    // In a real app, this would call an API to delete the agent
    toast({
      title: "Agen dihapus",
      description: `Agen ${agentToDelete.name} telah berhasil dihapus dari sistem.`,
    });
    
    setIsDeleteDialogOpen(false);
    setAgentToDelete(null);
    // In a real app, you'd reload the agent list or update state to remove the deleted agent
  };

  // Sample agent orders data
  const getAgentOrders = (agentId: string) => {
    // Sample orders data - in a real app, you would fetch this from an API
    return [
      {
        id: "ORD-001",
        customer: "PT Maju Bersama",
        date: "2024-05-15",
        total: 3500000,
        status: "completed",
        items: 5
      },
      {
        id: "ORD-002",
        customer: "CV Sukses Mandiri",
        date: "2024-05-10",
        total: 2700000,
        status: "completed",
        items: 3
      },
      {
        id: "ORD-003",
        customer: "Toko Makmur",
        date: "2024-05-05",
        total: 1850000,
        status: "processing",
        items: 2
      },
      {
        id: "ORD-004",
        customer: "UD Sejahtera",
        date: "2024-04-28",
        total: 4200000,
        status: "completed",
        items: 6
      },
      {
        id: "ORD-005",
        customer: "PT Berkah Jaya",
        date: "2024-04-20",
        total: 1200000,
        status: "cancelled",
        items: 2
      }
    ];
  };

  // Handle opening order details dialog
  const handleOpenOrderDetails = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsOrderDetailsOpen(true);
  };

  // Get order status badge color
  const getOrderStatusColor = (status: string) => {
    if (isDarkMode) {
      switch (status) {
        case "completed":
          return "bg-emerald-500/20 text-emerald-400";
        case "processing":
          return "bg-blue-500/20 text-blue-400";
        case "cancelled":
          return "bg-red-500/20 text-red-400";
        default:
          return "bg-gray-500/20 text-gray-400";
      }
    } else {
      switch (status) {
        case "completed":
          return "bg-emerald-100 text-emerald-800";
        case "processing":
          return "bg-blue-100 text-blue-800";
        case "cancelled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }
  };

  // Get order status text in Indonesian
  const getOrderStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "processing":
        return "Diproses";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  // Dummy data - replace with actual API call
  const agents: Agent[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+62812-3456-7890",
      region: "Jakarta Selatan",
      status: "active",
      totalSales: 150000000,
      totalCustomers: 25,
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+62812-3456-7891",
      region: "Bandung",
      status: "active",
      totalSales: 120000000,
      totalCustomers: 18,
      joinDate: "2024-02-01",
    },
    {
      id: "3",
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+62812-3456-7892",
      region: "Surabaya",
      status: "pending",
      totalSales: 0,
      totalCustomers: 0,
      joinDate: "2024-03-01",
    },
  ];

  // Dummy data untuk statistik agen
  const agentStats = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === "active").length,
    totalSales: agents.reduce((sum, a) => sum + a.totalSales, 0),
    totalCustomers: agents.reduce((sum, a) => sum + a.totalCustomers, 0),
  };

  const getStatusColor = (status: Agent["status"]) => {
    if (isDarkMode) {
      switch (status) {
        case "active":
          return "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30";
        case "inactive":
          return "bg-red-500/20 text-red-400 hover:bg-red-500/30";
        case "pending":
          return "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30";
        default:
          return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
      }
    } else {
      switch (status) {
        case "active":
          return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
        case "inactive":
          return "bg-red-100 text-red-800 hover:bg-red-200";
        case "pending":
          return "bg-amber-100 text-amber-800 hover:bg-amber-200";
        default:
          return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      }
    }
  };

  const getStatusText = (status: Agent["status"]) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "inactive":
        return "Tidak Aktif";
      case "pending":
        return "Menunggu";
      default:
        return status;
    }
  };

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="principal" pageTitle="Manajemen Agen">
      <div className="space-y-6">
        {/* Add Agent Modal - Updated version */}
        <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
          <DialogContent className={cn(
            "sm:max-w-[500px]",
            isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
          )}>
            <DialogHeader>
              <DialogTitle className={cn(
                isDarkMode ? "text-gray-100" : ""
              )}>Tambah Agen Baru</DialogTitle>
              <DialogDescription className={cn(
                isDarkMode ? "text-gray-400" : ""
              )}>
                Cari pengguna yang sudah terdaftar dan jadikan sebagai agen
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="search" className={cn(isDarkMode ? "text-gray-300" : "")}>
                  Cari Pengguna
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="search"
                    placeholder="Masukkan nama atau email pengguna"
                    value={agentSearchQuery}
                    onChange={(e) => setAgentSearchQuery(e.target.value)}
                    className={cn(
                      "flex-1",
                      isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                    )}
                  />
                  <Button 
                    onClick={searchRegisteredUsers}
                    disabled={isSearching}
                    className={cn(
                      "transition-colors duration-300",
                      isDarkMode 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : ""
                    )}
                  >
                    {isSearching ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {searchResults.length > 0 && (
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className={cn(
                      "text-xs text-left",
                      isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"
                    )}>
                      <tr>
                        <th className="px-4 py-2">Pilih</th>
                        <th className="px-4 py-2">Nama</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Terdaftar</th>
                      </tr>
                    </thead>
                    <tbody className={cn(
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    )}>
                      {searchResults.map((user) => (
                        <tr key={user.id} className={cn(
                          "border-t cursor-pointer",
                          isDarkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-50",
                          selectedUserId === user.id && (isDarkMode ? "bg-gray-700" : "bg-blue-50")
                        )}
                        onClick={() => setSelectedUserId(user.id)}
                        >
                          <td className="px-4 py-2 text-center">
                            <div className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center border mx-auto",
                              selectedUserId === user.id
                                ? isDarkMode ? "border-blue-500 bg-blue-500 text-white" : "border-blue-500 bg-blue-500 text-white"
                                : isDarkMode ? "border-gray-500" : "border-gray-300"
                            )}>
                              {selectedUserId === user.id && <Check className="w-3 h-3" />}
                            </div>
                          </td>
                          <td className="px-4 py-2">{user.name}</td>
                          <td className="px-4 py-2">{user.email}</td>
                          <td className="px-4 py-2 text-xs">
                            {user.registrationDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedUserId && (
                <div className="space-y-2 mt-4">
                  <Label htmlFor="region" className={cn(isDarkMode ? "text-gray-300" : "")}>
                    Wilayah Operasi Agen
                  </Label>
                  <Input
                    id="region"
                    placeholder="Masukkan wilayah operasi agen"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className={cn(
                      isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                    )}
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button 
                variant="outline"
                onClick={() => {
                  setIsAddAgentOpen(false);
                  setAgentSearchQuery("");
                  setSearchResults([]);
                  setSelectedUserId(null);
                  setRegion("");
                }}
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : ""
                )}
              >
                Batal
              </Button>
              <Button 
                onClick={linkUserAsAgent}
                disabled={!selectedUserId}
                className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : ""
                )}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Jadikan Agen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Agent Modal */}
        <Dialog open={isEditAgentOpen} onOpenChange={setIsEditAgentOpen}>
          <DialogContent className={cn(
            "sm:max-w-[500px]",
            isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
          )}>
            <DialogHeader>
              <DialogTitle className={cn(
                isDarkMode ? "text-gray-100" : ""
              )}>Edit Agen</DialogTitle>
              <DialogDescription className={cn(
                isDarkMode ? "text-gray-400" : ""
              )}>
                Perbarui informasi agen ini
              </DialogDescription>
            </DialogHeader>

            {currentEditAgent && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name" className={cn(isDarkMode ? "text-gray-300" : "")}>
                    Nama Agen
                  </Label>
                  <Input
                    id="edit-name"
                    value={editedAgentData.name}
                    onChange={(e) => setEditedAgentData({ ...editedAgentData, name: e.target.value })}
                    className={cn(
                      isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-email" className={cn(isDarkMode ? "text-gray-300" : "")}>
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editedAgentData.email}
                    onChange={(e) => setEditedAgentData({ ...editedAgentData, email: e.target.value })}
                    className={cn(
                      isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-phone" className={cn(isDarkMode ? "text-gray-300" : "")}>
                    Nomor Telepon
                  </Label>
                  <Input
                    id="edit-phone"
                    value={editedAgentData.phone}
                    onChange={(e) => setEditedAgentData({ ...editedAgentData, phone: e.target.value })}
                    className={cn(
                      isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-region" className={cn(isDarkMode ? "text-gray-300" : "")}>
                    Wilayah
                  </Label>
                  <Input
                    id="edit-region"
                    value={editedAgentData.region}
                    onChange={(e) => setEditedAgentData({ ...editedAgentData, region: e.target.value })}
                    className={cn(
                      isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-status" className={cn(isDarkMode ? "text-gray-300" : "")}>
                    Status
                  </Label>
                  <Select 
                    value={editedAgentData.status} 
                    onValueChange={(value) => setEditedAgentData({ ...editedAgentData, status: value })}
                  >
                    <SelectTrigger id="edit-status" className={cn(
                      isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                    )}>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent className={cn(
                      isDarkMode ? "bg-gray-800 border-gray-700" : ""
                    )}>
                      <SelectItem value="active" className={cn(
                        isDarkMode ? "text-gray-200 focus:bg-gray-700" : ""
                      )}>Aktif</SelectItem>
                      <SelectItem value="inactive" className={cn(
                        isDarkMode ? "text-gray-200 focus:bg-gray-700" : ""
                      )}>Tidak Aktif</SelectItem>
                      <SelectItem value="pending" className={cn(
                        isDarkMode ? "text-gray-200 focus:bg-gray-700" : ""
                      )}>Menunggu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button 
                variant="outline"
                onClick={() => setIsEditAgentOpen(false)}
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : ""
                )}
              >
                Batal
              </Button>
              <Button 
                onClick={handleEditAgent}
                className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : ""
                )}
              >
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className={cn(
            "sm:max-w-[425px]",
            isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
          )}>
            <DialogHeader>
              <DialogTitle className={cn(
                "flex items-center gap-2",
                isDarkMode ? "text-gray-100" : ""
              )}>
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Konfirmasi Hapus Agen
              </DialogTitle>
              <DialogDescription className={cn(
                isDarkMode ? "text-gray-400" : ""
              )}>
                Apakah Anda yakin ingin menghapus agen ini? Tindakan ini tidak dapat dibatalkan.
              </DialogDescription>
            </DialogHeader>

            {agentToDelete && (
              <div className={cn(
                "border rounded-md p-4 my-2",
                isDarkMode ? "bg-gray-750 border-gray-700" : "bg-gray-50 border-gray-200"
              )}>
                <p className={cn(
                  "font-medium mb-1",
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>{agentToDelete.name}</p>
                <p className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>{agentToDelete.email}</p>
                <p className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>{agentToDelete.phone}</p>
                <p className={cn(
                  "text-sm mt-1",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )}>Wilayah: {agentToDelete.region}</p>
              </div>
            )}

            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : ""
                )}
              >
                Batal
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeleteAgent}
                className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "bg-red-600 text-white hover:bg-red-700" 
                    : "bg-red-600 text-white hover:bg-red-700"
                )}
              >
                <Trash className="mr-2 h-4 w-4" />
                Hapus Agen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Order Details Dialog */}
        <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
          <DialogContent className={cn(
            "sm:max-w-[700px]",
            isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
          )}>
            <DialogHeader>
              <DialogTitle className={cn(
                isDarkMode ? "text-gray-100" : ""
              )}>Riwayat Pesanan Agen</DialogTitle>
              <DialogDescription className={cn(
                isDarkMode ? "text-gray-400" : ""
              )}>
                {selectedAgent ? `Menampilkan pesanan dari ${selectedAgent.name}` : "Pesanan agen"}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              {selectedAgent && (
                <>
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-dashed border-gray-200 dark:border-gray-700">
                    <User className={cn(
                      "h-10 w-10 p-2 rounded-full",
                      isDarkMode ? "bg-gray-700 text-blue-400" : "bg-blue-100 text-blue-600"
                    )} />
                    <div>
                      <h3 className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{selectedAgent.name}</h3>
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>{selectedAgent.email} • {selectedAgent.phone}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    <div className={cn(
                      "p-3 rounded-lg border",
                      isDarkMode ? "bg-gray-750 border-gray-700" : "bg-gray-50 border-gray-200"
                    )}>
                      <div className="flex items-center gap-2">
                        <PackageCheck className={cn(
                          "h-4 w-4",
                          isDarkMode ? "text-emerald-400" : "text-emerald-600"
                        )} />
                        <span className={cn(
                          "text-xs",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>Total Pesanan</span>
                      </div>
                      <p className={cn(
                        "text-xl font-semibold mt-1",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>{getAgentOrders(selectedAgent.id).length}</p>
                    </div>
                    
                    <div className={cn(
                      "p-3 rounded-lg border",
                      isDarkMode ? "bg-gray-750 border-gray-700" : "bg-gray-50 border-gray-200"
                    )}>
                      <div className="flex items-center gap-2">
                        <Calendar className={cn(
                          "h-4 w-4",
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        )} />
                        <span className={cn(
                          "text-xs",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>Pesanan Bulan Ini</span>
                      </div>
                      <p className={cn(
                        "text-xl font-semibold mt-1",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>3</p>
                    </div>
                    
                    <div className={cn(
                      "p-3 rounded-lg border",
                      isDarkMode ? "bg-gray-750 border-gray-700" : "bg-gray-50 border-gray-200"
                    )}>
                      <div className="flex items-center gap-2">
                        <BarChart className={cn(
                          "h-4 w-4",
                          isDarkMode ? "text-emerald-400" : "text-emerald-600"
                        )} />
                        <span className={cn(
                          "text-xs",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>Total Penjualan</span>
                      </div>
                      <p className={cn(
                        "text-xl font-semibold mt-1",
                        isDarkMode 
                          ? "text-emerald-400" 
                          : "text-emerald-600"
                      )}>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(selectedAgent.totalSales)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className={cn(
                          isDarkMode ? "border-gray-700" : ""
                        )}>
                          <TableHead className={cn(
                            isDarkMode ? "text-gray-300" : ""
                          )}>ID Pesanan</TableHead>
                          <TableHead className={cn(
                            isDarkMode ? "text-gray-300" : ""
                          )}>Pelanggan</TableHead>
                          <TableHead className={cn(
                            isDarkMode ? "text-gray-300" : ""
                          )}>Tanggal</TableHead>
                          <TableHead className={cn(
                            isDarkMode ? "text-gray-300" : ""
                          )}>Jumlah</TableHead>
                          <TableHead className={cn(
                            isDarkMode ? "text-gray-300" : ""
                          )}>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getAgentOrders(selectedAgent.id).map((order) => (
                          <TableRow key={order.id} className={cn(
                            "transition-colors duration-300",
                            isDarkMode 
                              ? "hover:bg-blue-900/20 border-gray-700" 
                              : "hover:bg-blue-50/70 border-gray-200"
                          )}>
                            <TableCell className={cn(
                              "font-medium",
                              isDarkMode ? "text-gray-100" : "text-gray-900"
                            )}>
                              {order.id}
                            </TableCell>
                            <TableCell className={cn(
                              isDarkMode ? "text-gray-300" : ""
                            )}>
                              {order.customer}
                            </TableCell>
                            <TableCell className={cn(
                              isDarkMode ? "text-gray-300" : ""
                            )}>
                              {order.date}
                            </TableCell>
                            <TableCell className={cn(
                              "font-medium",
                              isDarkMode ? "text-emerald-400" : "text-emerald-600"
                            )}>
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(order.total)}
                            </TableCell>
                            <TableCell>
                              <Badge className={getOrderStatusColor(order.status)}>
                                {getOrderStatusText(order.status)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button
                onClick={() => setIsOrderDetailsOpen(false)}
                className={cn(
                  isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                )}
              >
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Agen</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Kelola agen dan mitra bisnis Anda
            </p>
          </div>
          <Button 
            className={cn(
              "transition-colors duration-300",
              isDarkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}
            onClick={() => setIsAddAgentOpen(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Tambah Agen
          </Button>
        </div>

        {/* Statistik Agen */}
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
              )}>Total Agen</CardTitle>
              <UserPlus className={cn(
                "h-4 w-4",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )} />
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>{agentStats.totalAgents}</div>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                +2 agen bulan ini
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
              )}>Agen Aktif</CardTitle>
              <UserPlus className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>{agentStats.activeAgents}</div>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                {((agentStats.activeAgents / agentStats.totalAgents) * 100).toFixed(1)}% dari total agen
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
              )}>Total Penjualan</CardTitle>
              <BarChart className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(agentStats.totalSales)}
              </div>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                +12.5% dari bulan lalu
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
              )}>Total Pelanggan</CardTitle>
              <UserPlus className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>{agentStats.totalCustomers}</div>
              <p className={cn(
                "text-xs",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                +5 pelanggan bulan ini
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari agen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-10 transition-colors duration-300",
                isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
              )}
            />
          </div>
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
                )}>Wilayah</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Status</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Total Penjualan</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Pelanggan</TableHead>
                <TableHead className={cn(
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Bergabung</TableHead>
                <TableHead className={cn(
                  "text-right",
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id} className={cn(
                  "transition-colors duration-300",
                  isDarkMode 
                    ? "hover:bg-blue-900/20 border-gray-700" 
                    : "hover:bg-blue-50/70 border-gray-200"
                )}>
                  <TableCell className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{agent.name}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-700"
                  )}>{agent.email}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-700"
                  )}>{agent.phone}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-100" : "text-gray-700"
                  )}>{agent.region}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(agent.status)}>
                      {getStatusText(agent.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className={cn(
                    "font-medium",
                    isDarkMode ? "text-emerald-400" : "text-emerald-600"
                  )}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(agent.totalSales)}
                  </TableCell>
                  <TableCell className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  )}>{agent.totalCustomers}</TableCell>
                  <TableCell className={cn(
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>{agent.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                          "transition-colors duration-300",
                          isDarkMode 
                            ? "text-blue-400 hover:text-blue-300 hover:bg-blue-900/30" 
                            : "text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                        )}
                        onClick={() => handleOpenOrderDetails(agent)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                          "transition-colors duration-300",
                          isDarkMode 
                            ? "text-gray-400 hover:text-white hover:bg-gray-700" 
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        )}
                        onClick={() => handleOpenEditModal(agent)}
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
                        onClick={() => handleOpenDeleteDialog(agent)}
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

export default PrincipalAgents; 