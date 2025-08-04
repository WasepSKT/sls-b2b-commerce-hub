import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";
import { Textarea } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Badge } from "@/components/ui";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import {
  Newspaper,
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Eye,
  Image as ImageIcon,
  Calendar,
} from "lucide-react";
import { useToast } from "@/components/ui";

const AdminNews = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");
  const [activePostFilter, setActivePostFilter] = useState("all");
  const [activeCampaignFilter, setActiveCampaignFilter] = useState("all");

  const newsPosts = [
    {
      id: 1,
      title: "New Product Line Launch",
      category: "Product News",
      author: "John Smith",
      status: "published",
      date: "2024-03-20",
      views: 2345,
      featured: true,
    },
    {
      id: 2,
      title: "Industry Insights: B2B Trends 2024",
      category: "Industry News",
      author: "Sarah Johnson",
      status: "draft",
      date: "2024-03-19",
      views: 0,
      featured: false,
    },
    {
      id: 3,
      title: "Company Achievement Award",
      category: "Company News",
      author: "Mike Wilson",
      status: "published",
      date: "2024-03-18",
      views: 1567,
      featured: true,
    },
  ];

  const newsCampaigns = [
    {
      id: 1,
      name: "Product Launch Campaign",
      type: "Press Release",
      status: "active",
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      channels: ["Email", "Social Media", "Website"],
      reach: "15,000",
    },
    {
      id: 2,
      name: "Industry Report 2024",
      type: "Content Marketing",
      status: "scheduled",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      channels: ["Website", "LinkedIn", "Email"],
      reach: "10,000",
    },
    {
      id: 3,
      name: "Company Anniversary",
      type: "Event Coverage",
      status: "draft",
      startDate: "2024-05-01",
      endDate: "2024-05-15",
      channels: ["All Channels"],
      reach: "25,000",
    },
  ];

  const filteredPosts = newsPosts.filter((post) => {
    if (activePostFilter === "all") return true;
    if (activePostFilter === "published") return post.status === "published";
    if (activePostFilter === "draft") return post.status === "draft";
    return true;
  });

  const filteredCampaigns = newsCampaigns.filter((campaign) => {
    if (activeCampaignFilter === "all") return true;
    if (activeCampaignFilter === "active") return campaign.status === "active";
    if (activeCampaignFilter === "scheduled") return campaign.status === "scheduled";
    if (activeCampaignFilter === "draft") return campaign.status === "draft";
    return true;
  });

  const handleCreatePost = () => {
    navigate("/admin/news/create");
  };

  const handleCreateCampaign = () => {
    navigate("/admin/news/campaign/create");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">News Management</h2>
            <p className="text-gray-500 mt-1">
              Manage news posts and promotional campaigns
            </p>
          </div>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="posts" className="flex items-center">
              <Newspaper className="h-4 w-4 mr-2" />
              News Posts
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center">
              <Megaphone className="h-4 w-4 mr-2" />
              News Campaigns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-x-2">
                <Button 
                  variant={activePostFilter === "all" ? "default" : "outline"}
                  onClick={() => setActivePostFilter("all")}
                >
                  All Posts
                </Button>
                <Button 
                  variant={activePostFilter === "published" ? "default" : "outline"}
                  onClick={() => setActivePostFilter("published")}
                >
                  Published
                </Button>
                <Button 
                  variant={activePostFilter === "draft" ? "default" : "outline"}
                  onClick={() => setActivePostFilter("draft")}
                >
                  Drafts
                </Button>
              </div>
              <Button onClick={handleCreatePost}>
                <Plus className="h-4 w-4 mr-2" />
                Create News Post
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>News Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              post.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {post.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>{post.views}</TableCell>
                        <TableCell>
                          {post.featured && (
                            <Badge className="bg-blue-100 text-blue-800">
                              Featured
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-x-2">
                <Button 
                  variant={activeCampaignFilter === "all" ? "default" : "outline"}
                  onClick={() => setActiveCampaignFilter("all")}
                >
                  All Campaigns
                </Button>
                <Button 
                  variant={activeCampaignFilter === "active" ? "default" : "outline"}
                  onClick={() => setActiveCampaignFilter("active")}
                >
                  Active
                </Button>
                <Button 
                  variant={activeCampaignFilter === "scheduled" ? "default" : "outline"}
                  onClick={() => setActiveCampaignFilter("scheduled")}
                >
                  Scheduled
                </Button>
                <Button 
                  variant={activeCampaignFilter === "draft" ? "default" : "outline"}
                  onClick={() => setActiveCampaignFilter("draft")}
                >
                  Drafts
                </Button>
              </div>
              <Button onClick={handleCreateCampaign}>
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>News Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Channels</TableHead>
                      <TableHead>Expected Reach</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{campaign.type}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              campaign.status === "active"
                                ? "bg-green-100 text-green-800"
                                : campaign.status === "scheduled"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {campaign.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{campaign.startDate}</TableCell>
                        <TableCell>{campaign.endDate}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {campaign.channels.map((channel, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {channel}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{campaign.reach}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminNews; 