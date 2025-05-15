import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowLeft, Save } from "lucide-react";

const AdminNewsCampaignCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    type: "",
    channels: [],
    budget: "",
    targetAudience: "",
    goals: "",
    metrics: "",
  });

  const handleSave = () => {
    toast({
      title: "Campaign created",
      description: "News campaign has been created successfully.",
    });
    navigate("/admin/news");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Create Campaign</h2>
            <p className="text-gray-500 mt-1">
              Create a new news and promotional campaign
            </p>
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate("/admin/news")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Campaign
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Campaign Name</Label>
                <Input
                  placeholder="Enter campaign name"
                  value={campaignData.name}
                  onChange={(e) =>
                    setCampaignData({ ...campaignData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter campaign description"
                  value={campaignData.description}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <Select
                  value={campaignData.type}
                  onValueChange={(value) =>
                    setCampaignData({ ...campaignData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="awareness">Awareness</SelectItem>
                    <SelectItem value="product-launch">Product Launch</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Target Audience</Label>
                <Select
                  value={campaignData.targetAudience}
                  onValueChange={(value) =>
                    setCampaignData({ ...campaignData, targetAudience: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="new">New Customers</SelectItem>
                    <SelectItem value="existing">Existing Customers</SelectItem>
                    <SelectItem value="inactive">Inactive Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Budget</Label>
                <Input
                  type="text"
                  placeholder="Enter campaign budget"
                  value={campaignData.budget}
                  onChange={(e) =>
                    setCampaignData({ ...campaignData, budget: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Goals & Objectives</Label>
                <Textarea
                  placeholder="Enter campaign goals"
                  value={campaignData.goals}
                  onChange={(e) =>
                    setCampaignData({ ...campaignData, goals: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Success Metrics</Label>
                <Textarea
                  placeholder="Enter success metrics"
                  value={campaignData.metrics}
                  onChange={(e) =>
                    setCampaignData({ ...campaignData, metrics: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNewsCampaignCreate; 