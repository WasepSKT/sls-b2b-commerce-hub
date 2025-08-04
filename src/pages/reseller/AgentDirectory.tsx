import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Badge } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Users,
  Star,
  MapPin,
  Phone,
  Mail,
  Package,
  TrendingUp,
  CheckCircle,
  Clock,
  UserPlus,
  Building,
  Award
} from "lucide-react";

// Mock data for agents
const agents = [
  {
    id: "agent-001",
    name: "PT Maju Bersama",
    owner: "Ahmad Sulaiman",
    location: "Jakarta Selatan",
    phone: "+62 812-3456-7890",
    email: "ahmad@majubersama.com",
    rating: 4.8,
    totalProducts: 45,
    totalResellers: 12,
    commission: "15%",
    status: "active",
    description: "Agent terpercaya dengan produk berkualitas tinggi dan support 24/7",
    specialties: ["Elektronik", "Fashion", "Home & Living"],
    joinedDate: "2023-01-15",
    verified: true
  },
  {
    id: "agent-002",
    name: "CV Sukses Mandiri",
    owner: "Siti Nurhaliza",
    location: "Bandung",
    phone: "+62 813-9876-5432",
    email: "siti@suksesmandiri.com",
    rating: 4.6,
    totalProducts: 38,
    totalResellers: 8,
    commission: "12%",
    status: "active",
    description: "Fokus pada produk lokal dan handmade dengan kualitas premium",
    specialties: ["Handmade", "Local Products", "Crafts"],
    joinedDate: "2023-03-20",
    verified: true
  },
  {
    id: "agent-003",
    name: "UD Berkah Jaya",
    owner: "Budi Santoso",
    location: "Surabaya",
    phone: "+62 814-5678-9012",
    email: "budi@berkahjaya.com",
    rating: 4.4,
    totalProducts: 52,
    totalResellers: 15,
    commission: "18%",
    status: "active",
    description: "Agent dengan jaringan luas dan produk bervariasi",
    specialties: ["Fashion", "Beauty", "Sports"],
    joinedDate: "2022-11-10",
    verified: true
  },
  {
    id: "agent-004",
    name: "PT Inovasi Digital",
    owner: "Dewi Sartika",
    location: "Yogyakarta",
    phone: "+62 815-1234-5678",
    email: "dewi@inovasi.com",
    rating: 4.9,
    totalProducts: 28,
    totalResellers: 6,
    commission: "20%",
    status: "active",
    description: "Spesialis produk digital dan teknologi terbaru",
    specialties: ["Digital Products", "Technology", "Gadgets"],
    joinedDate: "2023-06-05",
    verified: true
  }
];

const AgentDirectory = () => {
  const { isDarkMode } = useTheme();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [appliedAgents, setAppliedAgents] = useState<string[]>([]);

  const handleApplyToAgent = (agentId: string) => {
    if (!appliedAgents.includes(agentId)) {
      setAppliedAgents([...appliedAgents, agentId]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Aktif</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Menunggu</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Tidak Aktif</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className={cn(
          "text-2xl font-bold tracking-tight",
          isDarkMode ? "text-white" : "text-gray-900"
        )}>
          Direktori Agent
        </h2>
        <p className={cn(
          "text-sm",
          isDarkMode ? "text-gray-400" : "text-gray-600"
        )}>
          Temukan Agent terbaik untuk menjadi mitra bisnis Anda
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={cn(
          "transition-all duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                  Total Agent
                </p>
                <p className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
                  {agents.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "transition-all duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                  Total Produk
                </p>
                <p className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
                  {agents.reduce((sum, agent) => sum + agent.totalProducts, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "transition-all duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                  Total Reseller
                </p>
                <p className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
                  {agents.reduce((sum, agent) => sum + agent.totalResellers, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "transition-all duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-500")}>
                  Rating Rata-rata
                </p>
                <p className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
                  {(agents.reduce((sum, agent) => sum + agent.rating, 0) / agents.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent List */}
      <div className="grid gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className={cn(
            "transition-all duration-300 hover:shadow-lg",
            isDarkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50"
          )}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div>
                      <h3 className={cn(
                        "text-xl font-semibold",
                        isDarkMode ? "text-white" : "text-gray-900"
                      )}>
                        {agent.name}
                      </h3>
                      <p className={cn(
                        "text-sm",
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      )}>
                        Pemilik: {agent.owner}
                      </p>
                    </div>
                    {agent.verified && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {getStatusBadge(agent.status)}
                  </div>

                  <p className={cn(
                    "text-sm mb-4",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    {agent.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                        {agent.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                        {agent.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                        {agent.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className={cn("text-sm", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                        {agent.rating}/5.0
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className={cn(
                        isDarkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600"
                      )}>
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
                        {agent.totalProducts}
                      </p>
                      <p className={cn("text-xs", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                        Total Produk
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
                        {agent.totalResellers}
                      </p>
                      <p className={cn("text-xs", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                        Total Reseller
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className={cn("text-2xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
                        {agent.commission}
                      </p>
                      <p className={cn("text-xs", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                        Komisi
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex flex-col space-y-3">
                  {appliedAgents.includes(agent.id) ? (
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className={cn("text-sm font-medium", isDarkMode ? "text-green-400" : "text-green-600")}>
                        Sudah Diajukan
                      </p>
                      <p className={cn("text-xs", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                        Menunggu approval
                      </p>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleApplyToAgent(agent.id)}
                      className="w-full"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Ajukan sebagai Reseller
                    </Button>
                  )}

                  <Button variant="outline" className="w-full">
                    <Package className="h-4 w-4 mr-2" />
                    Lihat Produk
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application Status */}
      {appliedAgents.length > 0 && (
        <Card className={cn(
          "transition-all duration-300",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}>
          <CardHeader>
            <CardTitle className={cn(isDarkMode ? "text-white" : "text-gray-900")}>
              Status Pengajuan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appliedAgents.map((agentId) => {
                const agent = agents.find(a => a.id === agentId);
                return (
                  <div key={agentId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className={cn("font-medium", isDarkMode ? "text-white" : "text-gray-900")}>
                          {agent?.name}
                        </p>
                        <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                          Pengajuan sedang diproses
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      Menunggu
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgentDirectory; 