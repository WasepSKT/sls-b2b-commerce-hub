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
  Globe,
  PenTool,
  Image as ImageIcon,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { useToast } from "@/components/ui";

const AdminWebsite = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("blog");

  const blogPosts = [
    {
      id: 1,
      title: "Introduction to B2B E-commerce",
      author: "John Doe",
      status: "published",
      date: "2024-03-20",
      views: 1234,
    },
    {
      id: 2,
      title: "Supply Chain Management Tips",
      author: "Jane Smith",
      status: "draft",
      date: "2024-03-19",
      views: 0,
    },
    {
      id: 3,
      title: "Digital Transformation in B2B",
      author: "Mike Johnson",
      status: "published",
      date: "2024-03-18",
      views: 567,
    },
  ];

  const marketingCampaigns = [
    {
      id: 1,
      name: "Spring Sale 2024",
      type: "Seasonal",
      status: "active",
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      budget: "$5,000",
    },
    {
      id: 2,
      name: "New Customer Promo",
      type: "Acquisition",
      status: "scheduled",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      budget: "$3,000",
    },
    {
      id: 3,
      name: "Loyalty Program",
      type: "Retention",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      budget: "$10,000",
    },
  ];

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Website content has been updated successfully.",
    });
  };

  const handleNewPost = () => {
    navigate("/admin/news/create");
  };

  const handleNewCampaign = () => {
    navigate("/admin/news/campaign/create");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Website</h2>
            <p className="text-gray-500 mt-1">
              Manage website content, blog posts, and marketing campaigns
            </p>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                SEO Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input placeholder="Enter meta title" />
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea placeholder="Enter meta description" />
              </div>
              <div className="space-y-2">
                <Label>Keywords</Label>
                <Input placeholder="Enter keywords (comma separated)" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Media Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <Plus className="h-6 w-6 text-gray-400" />
                </div>
                {/* Add more image placeholders here */}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Upload Media
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Blog Management</CardTitle>
              <Button onClick={handleNewPost}>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
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

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Marketing Campaigns</CardTitle>
              <Button onClick={handleNewCampaign}>
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </div>
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
                  <TableHead>Budget</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketingCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>{campaign.type}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          campaign.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.startDate}</TableCell>
                    <TableCell>{campaign.endDate}</TableCell>
                    <TableCell>{campaign.budget}</TableCell>
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
      </div>
    </AdminLayout>
  );
};

export default AdminWebsite; 