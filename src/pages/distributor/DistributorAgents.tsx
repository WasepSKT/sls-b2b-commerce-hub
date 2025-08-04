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
import { Search, UserPlus, Edit, Trash } from "lucide-react";
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
import { users } from "@/lib/data/users";

const DistributorAgents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false);
  const [isEditAgentOpen, setIsEditAgentOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const [agents, setAgents] = useState(users.filter(u => u.role === 'agent'));
  const [currentAgent, setCurrentAgent] = useState<User | null>(null);
  const [newAgent, setNewAgent] = useState({ name: '', email: '', phone: '' });

  const handleAddAgent = () => {
    // In a real app, this would make an API call to add the agent
    setAgents([...agents, { ...newAgent, id: `agent-${agents.length + 1}`, role: 'agent', status: 'active' }]);
    toast({
      title: "Agen ditambahkan",
      description: "Agen baru berhasil ditambahkan",
    });
    setIsAddAgentOpen(false);
    setNewAgent({ name: '', email: '', phone: '' });
  };

  const handleEditAgent = () => {
    // In a real app, this would make an API call to edit the agent
    setAgents(agents.map(a => a.id === currentAgent.id ? { ...a, ...currentAgent } : a));
    toast({
      title: "Agen diperbarui",
      description: `Data agen ${currentAgent.name} berhasil diperbarui`,
    });
    setIsEditAgentOpen(false);
    setCurrentAgent(null);
  };

  const handleDeleteAgent = () => {
    // In a real app, this would make an API call to delete the agent
    setAgents(agents.filter(a => a.id !== currentAgent.id));
    toast({
      title: "Agen dihapus",
      description: `Agen ${currentAgent.name} telah dihapus`,
    });
    setIsDeleteDialogOpen(false);
    setCurrentAgent(null);
  };

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="distributor" pageTitle="Manajemen Agen">
      <div className="space-y-6">
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
              Kelola agen Anda.
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

        <Card className={cn(
          "transition-colors duration-300",
          isDarkMode 
            ? "bg-transparent backdrop-blur-sm border-blue-900/50" 
            : "bg-white border-gray-200 hover:bg-gray-50"
        )}>
          <CardHeader>
            <CardTitle className={cn(isDarkMode ? "text-white" : "")}>Daftar Agen</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className={cn(isDarkMode ? "border-gray-700" : "")}>
                  <TableHead className={cn(isDarkMode ? "text-gray-100" : "")}>Nama</TableHead>
                  <TableHead className={cn(isDarkMode ? "text-gray-100" : "")}>Email</TableHead>
                  <TableHead className={cn(isDarkMode ? "text-gray-100" : "")}>Telepon</TableHead>
                  <TableHead className={cn(isDarkMode ? "text-gray-100" : "")}>Status</TableHead>
                  <TableHead className={cn("text-right", isDarkMode ? "text-gray-100" : "")}>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id} className={cn(isDarkMode ? "border-gray-700" : "")}>
                    <TableCell className={cn("font-medium", isDarkMode ? "text-gray-100" : "")}>{agent.name}</TableCell>
                    <TableCell className={cn(isDarkMode ? "text-gray-300" : "")}>{agent.email}</TableCell>
                    <TableCell className={cn(isDarkMode ? "text-gray-300" : "")}>{agent.phone}</TableCell>
                    <TableCell>
                      <Badge className={cn(agent.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}>
                        {agent.status === "active" ? "Aktif" : "Tidak Aktif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => { setCurrentAgent(agent); setIsEditAgentOpen(true); }}><Edit className={cn("h-4 w-4", isDarkMode ? "text-gray-100" : "")} /></Button>
                      <Button variant="ghost" size="sm" onClick={() => { setCurrentAgent(agent); setIsDeleteDialogOpen(true); }}><Trash className={cn("h-4 w-4", isDarkMode ? "text-gray-100" : "")} /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add Agent Modal */}
        <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
          <DialogContent className={cn(isDarkMode ? "bg-gray-800" : "")}>
            <DialogHeader>
              <DialogTitle>Tambah Agen Baru</DialogTitle>
              <DialogDescription>Buat akun baru untuk agen.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className={cn("text-right", isDarkMode ? "text-gray-300" : "")}>Nama</Label>
                <Input id="name" value={newAgent.name} onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })} className={cn("col-span-3", isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "")} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className={cn("text-right", isDarkMode ? "text-gray-300" : "")}>Email</Label>
                <Input id="email" value={newAgent.email} onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })} className={cn("col-span-3", isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "")} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className={cn("text-right", isDarkMode ? "text-gray-300" : "")}>Telepon</Label>
                <Input id="phone" value={newAgent.phone} onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })} className={cn("col-span-3", isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "")} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddAgent}>Tambah</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Agent Modal */}
        <Dialog open={isEditAgentOpen} onOpenChange={setIsEditAgentOpen}>
          <DialogContent className={cn(isDarkMode ? "bg-gray-800" : "")}>
            <DialogHeader>
              <DialogTitle>Edit Agen</DialogTitle>
              <DialogDescription>Perbarui data agen.</DialogDescription>
            </DialogHeader>
            {currentAgent && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name-edit" className={cn("text-right", isDarkMode ? "text-gray-300" : "")}>Nama</Label>
                  <Input id="name-edit" value={currentAgent.name} onChange={(e) => setCurrentAgent({ ...currentAgent, name: e.target.value })} className={cn("col-span-3", isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "")} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email-edit" className={cn("text-right", isDarkMode ? "text-gray-300" : "")}>Email</Label>
                  <Input id="email-edit" value={currentAgent.email} onChange={(e) => setCurrentAgent({ ...currentAgent, email: e.target.value })} className={cn("col-span-3", isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "")} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone-edit" className={cn("text-right", isDarkMode ? "text-gray-300" : "")}>Telepon</Label>
                  <Input id="phone-edit" value={currentAgent.phone} onChange={(e) => setCurrentAgent({ ...currentAgent, phone: e.target.value })} className={cn("col-span-3", isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "")} />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={handleEditAgent}>Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Agent Modal */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className={cn(isDarkMode ? "bg-gray-800" : "")}>
            <DialogHeader>
              <DialogTitle>Hapus Agen</DialogTitle>
              <DialogDescription>Apakah Anda yakin ingin menghapus agen ini?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Batal</Button>
              <Button variant="destructive" onClick={handleDeleteAgent}>Hapus</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default DistributorAgents;