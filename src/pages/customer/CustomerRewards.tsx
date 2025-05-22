import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Award, Gift, Search, Filter, ChevronRight, CheckCircle2, Lock } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const CustomerRewards = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock user reward data - in a real app, this would come from an API or state
  const userRewards = {
    points: 750,
    level: "Silver",
    nextLevel: "Gold",
    nextLevelPoints: 1000,
    history: [
      { id: 1, date: "2024-05-15", action: "Purchase", points: 120, description: "Order #ORD-1234" },
      { id: 2, date: "2024-05-01", action: "Purchase", points: 250, description: "Order #ORD-1231" },
      { id: 3, date: "2024-04-10", action: "Referral", points: 200, description: "New customer signup" },
      { id: 4, date: "2024-03-22", action: "Claim", points: -500, description: "Voucher Diskon 50%" },
    ]
  };

  // Sample reward categories
  const categories = ["all", "vouchers", "products", "services", "experiences"];
  
  // Sample rewards data
  const rewardsData = [
    {
      id: "reward-1",
      name: "Voucher Diskon 20%",
      category: "vouchers",
      description: "Voucher diskon 20% untuk pembelian berikutnya",
      pointsRequired: 200,
      image: "https://via.placeholder.com/300/6366F1/FFFFFF?text=20%",
      featured: true,
    },
    {
      id: "reward-2",
      name: "Voucher Diskon 50%",
      category: "vouchers",
      description: "Voucher diskon 50% untuk pembelian berikutnya",
      pointsRequired: 500,
      image: "https://via.placeholder.com/300/8B5CF6/FFFFFF?text=50%",
      featured: false,
    },
    {
      id: "reward-3",
      name: "Gratis Ongkir",
      category: "vouchers",
      description: "Voucher gratis ongkos kirim untuk pembelian berikutnya",
      pointsRequired: 300,
      image: "https://via.placeholder.com/300/EC4899/FFFFFF?text=FREE",
      featured: false,
    },
    {
      id: "reward-4",
      name: "Produk Eksklusif",
      category: "products",
      description: "Dapatkan produk eksklusif limited edition",
      pointsRequired: 1000,
      image: "https://via.placeholder.com/300/F59E0B/FFFFFF?text=EXCLUSIVE",
      featured: false,
    },
    {
      id: "reward-5",
      name: "Layanan Priority",
      category: "services",
      description: "Akses ke layanan pelanggan prioritas selama 3 bulan",
      pointsRequired: 800,
      image: "https://via.placeholder.com/300/10B981/FFFFFF?text=VIP",
      featured: true,
    },
    {
      id: "reward-6",
      name: "Workshop Eksklusif",
      category: "experiences",
      description: "Tiket untuk menghadiri workshop eksklusif",
      pointsRequired: 1500,
      image: "https://via.placeholder.com/300/3B82F6/FFFFFF?text=WORKSHOP",
      featured: false,
    },
  ];

  // Filter rewards based on search and category
  const filteredRewards = rewardsData.filter((reward) => {
    const matchesSearch = reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || reward.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle claim reward
  const handleClaimReward = (reward: typeof rewardsData[0]) => {
    if (userRewards.points >= reward.pointsRequired) {
      toast({
        title: "Reward Claimed!",
        description: `You have successfully claimed ${reward.name}`,
      });
      // In a real app, you would make an API call to update the user's rewards
    } else {
      toast({
        variant: "destructive",
        title: "Insufficient Points",
        description: `You need ${reward.pointsRequired - userRewards.points} more points to claim this reward`,
      });
    }
  };

  return (
    <DashboardLayout role="customer" pageTitle="Katalog Hadiah">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>
              Katalog Hadiah
            </h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Tukarkan poin Anda dengan berbagai hadiah menarik
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Card className={cn(
              "transition-colors duration-300",
              isDarkMode 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-200"
            )}>
              <CardContent className="p-4 flex items-center">
                <Award className={cn(
                  "h-6 w-6 mr-2",
                  isDarkMode ? "text-blue-400" : "text-primary"
                )} />
                <div>
                  <p className={cn(
                    "text-sm font-medium",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}>Poin Anda</p>
                  <p className={cn(
                    "text-lg font-bold",
                    isDarkMode ? "text-white" : "text-gray-900"
                  )}>{userRewards.points}</p>
                </div>
              </CardContent>
            </Card>
            <Badge className={cn(
              "px-3 py-1 text-sm",
              isDarkMode ? "bg-blue-900/50 text-blue-200 hover:bg-blue-900/70" : "bg-blue-100"
            )}>
              {userRewards.level}
            </Badge>
          </div>
        </div>
        
        {/* Search and Filter */}
        <Card className={cn(
          "transition-colors duration-300",
          isDarkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-200"
        )}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Cari hadiah..."
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
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={cn(
                    "rounded-md border px-3 py-2 text-sm min-w-[150px]",
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  )}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "Semua Kategori" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs: Rewards and History */}
        <Tabs defaultValue="rewards" className="w-full">
          <TabsList className={cn(
            "grid w-full grid-cols-2 mb-4",
            isDarkMode ? "bg-gray-700" : ""
          )}>
            <TabsTrigger value="rewards">Katalog Hadiah</TabsTrigger>
            <TabsTrigger value="history">Riwayat Poin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rewards" className="space-y-6">
            {/* Featured Rewards */}
            {rewardsData.filter(reward => reward.featured).length > 0 && (
              <div className="space-y-4">
                <h3 className={cn(
                  "text-lg font-semibold",
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                )}>
                  Hadiah Unggulan
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {rewardsData.filter(reward => reward.featured).map((reward) => (
                    <Card key={reward.id} className={cn(
                      "overflow-hidden transition-all duration-300",
                      isDarkMode 
                        ? "bg-gray-800 border-gray-700 hover:border-blue-500" 
                        : "bg-white border-gray-200 hover:border-primary"
                    )}>
                      <div className="grid md:grid-cols-2">
                        <div className="aspect-square md:aspect-auto">
                          <img 
                            src={reward.image} 
                            alt={reward.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-6 flex flex-col justify-between">
                          <div className="space-y-2">
                            <h4 className={cn(
                              "font-semibold",
                              isDarkMode ? "text-white" : "text-gray-900"
                            )}>{reward.name}</h4>
                            <p className={cn(
                              "text-sm line-clamp-2",
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            )}>{reward.description}</p>
                          </div>
                          <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <p className={cn(
                                "text-sm font-medium",
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              )}>Poin Dibutuhkan</p>
                              <p className={cn(
                                "font-bold",
                                isDarkMode ? "text-blue-400" : "text-primary"
                              )}>{reward.pointsRequired}</p>
                            </div>
                            <Button
                              className={cn(
                                "w-full",
                                userRewards.points >= reward.pointsRequired
                                  ? isDarkMode
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-primary text-white hover:bg-primary/90"
                                  : isDarkMode
                                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                              )}
                              disabled={userRewards.points < reward.pointsRequired}
                              onClick={() => handleClaimReward(reward)}
                            >
                              {userRewards.points >= reward.pointsRequired ? (
                                <>Tukar Hadiah</>
                              ) : (
                                <>
                                  <Lock className="h-4 w-4 mr-2" />
                                  Butuh {reward.pointsRequired - userRewards.points} poin lagi
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* All Rewards */}
            <div className="space-y-4">
              <h3 className={cn(
                "text-lg font-semibold",
                isDarkMode ? "text-gray-100" : "text-gray-900"
              )}>
                Semua Hadiah
              </h3>
              {filteredRewards.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredRewards.map((reward) => (
                    <Card key={reward.id} className={cn(
                      "overflow-hidden transition-all duration-300",
                      isDarkMode 
                        ? "bg-gray-800 border-gray-700 hover:border-blue-500" 
                        : "bg-white border-gray-200 hover:border-primary"
                    )}>
                      <div className="aspect-video">
                        <img 
                          src={reward.image} 
                          alt={reward.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <div>
                          <Badge className={cn(
                            "mb-2",
                            isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800"
                          )}>
                            {reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}
                          </Badge>
                          <h4 className={cn(
                            "font-semibold mb-1",
                            isDarkMode ? "text-white" : "text-gray-900"
                          )}>{reward.name}</h4>
                          <p className={cn(
                            "text-sm line-clamp-2",
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          )}>{reward.description}</p>
                        </div>
                        
                        <div className="pt-2 border-t flex justify-between items-center">
                          <p className={cn(
                            "font-bold",
                            isDarkMode ? "text-blue-400" : "text-primary"
                          )}>{reward.pointsRequired} points</p>
                          <Button
                            variant={userRewards.points >= reward.pointsRequired ? "default" : "outline"}
                            className={cn(
                              userRewards.points >= reward.pointsRequired
                                ? isDarkMode
                                  ? "bg-blue-600 text-white hover:bg-blue-700"
                                  : ""
                                : isDarkMode
                                  ? "border-gray-600 bg-gray-800 text-gray-400"
                                  : "text-gray-500"
                            )}
                            disabled={userRewards.points < reward.pointsRequired}
                            onClick={() => handleClaimReward(reward)}
                          >
                            {userRewards.points >= reward.pointsRequired ? "Claim" : "Insufficient"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className={cn(
                  "text-center py-12 border rounded-lg",
                  isDarkMode ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500"
                )}>
                  <Gift className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-lg font-medium mb-1">Tidak ada hadiah ditemukan</p>
                  <p className="text-sm">Coba kata kunci lain atau hapus filter</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card className={cn(
              isDarkMode 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-gray-200"
            )}>
              <CardHeader>
                <CardTitle className={cn(
                  "text-lg font-semibold",
                  isDarkMode ? "text-gray-50" : "text-slate-900"
                )}>Riwayat Poin</CardTitle>
                <CardDescription className={cn(
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )}>
                  Aktivitas poin reward Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={cn(
                        "text-left text-sm border-b",
                        isDarkMode ? "border-gray-700" : "border-gray-200"
                      )}>
                        <th className={cn(
                          "py-3 px-4 font-medium",
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        )}>Tanggal</th>
                        <th className={cn(
                          "py-3 px-4 font-medium",
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        )}>Aktivitas</th>
                        <th className={cn(
                          "py-3 px-4 font-medium",
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        )}>Deskripsi</th>
                        <th className={cn(
                          "py-3 px-4 font-medium text-right",
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        )}>Poin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userRewards.history.map((item) => (
                        <tr key={item.id} className={cn(
                          "border-b last:border-0",
                          isDarkMode 
                            ? "border-gray-700 hover:bg-gray-750" 
                            : "border-gray-200 hover:bg-gray-50"
                        )}>
                          <td className={cn(
                            "py-3 px-4",
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          )}>
                            {new Date(item.date).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "short",
                              day: "numeric"
                            })}
                          </td>
                          <td className={cn(
                            "py-3 px-4",
                            isDarkMode ? "text-gray-300" : "text-gray-900"
                          )}>{item.action}</td>
                          <td className={cn(
                            "py-3 px-4",
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          )}>{item.description}</td>
                          <td className={cn(
                            "py-3 px-4 font-medium text-right",
                            item.points > 0
                              ? isDarkMode ? "text-green-400" : "text-green-600"
                              : isDarkMode ? "text-red-400" : "text-red-600"
                          )}>
                            {item.points > 0 ? "+" : ""}{item.points}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CustomerRewards; 