import { useState } from "react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Textarea } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Label } from "@/components/ui";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { useToast } from "@/hooks/use-toast";
import { users } from "@/lib/data/users";

const DistributorSettings = () => {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [distributor, setDistributor] = useState(users.find(u => u.role === 'distributor')); // Mock data

  const handleSave = () => {
    toast({
      title: "Profil Diperbarui",
      description: "Informasi profil Anda telah berhasil disimpan.",
    });
  };

  if (!distributor) {
    return <div>Distributor not found</div>;
  }

  return (
    <DashboardLayout role="distributor" pageTitle="Pengaturan Profil">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className={cn("text-2xl font-semibold tracking-tight", isDarkMode ? "text-gray-50" : "text-slate-900")}>Pengaturan Profil</h2>
            <p className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-500")}>Kelola informasi profil Anda.</p>
          </div>
        </div>

        <Card className={cn(isDarkMode ? "bg-transparent backdrop-blur-sm border-blue-900/50" : "bg-white")}>
          <CardHeader>
            <CardTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>Informasi Dasar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className={cn(isDarkMode ? "text-gray-100" : "")}>Nama</Label>
              <Input id="name" value={distributor.name} onChange={(e) => setDistributor({ ...distributor, name: e.target.value })} className={cn(isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white")} />
            </div>
            <div>
              <Label htmlFor="email" className={cn(isDarkMode ? "text-gray-100" : "")}>Email</Label>
              <Input id="email" type="email" value={distributor.email} onChange={(e) => setDistributor({ ...distributor, email: e.target.value })} className={cn(isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white")} />
            </div>
            <div>
              <Label htmlFor="phone" className={cn(isDarkMode ? "text-gray-100" : "")}>Telepon</Label>
              <Input id="phone" value={distributor.phone || ''} onChange={(e) => setDistributor({ ...distributor, phone: e.target.value })} className={cn(isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white")} />
            </div>
            <div>
              <Label htmlFor="address" className={cn(isDarkMode ? "text-gray-100" : "")}>Alamat</Label>
              <Textarea id="address" value={distributor.address || ''} onChange={(e) => setDistributor({ ...distributor, address: e.target.value })} className={cn(isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white")} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} className={cn(isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "")}>Simpan Perubahan</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DistributorSettings;