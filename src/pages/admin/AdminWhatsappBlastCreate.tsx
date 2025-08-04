import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Textarea } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Label } from "@/components/ui";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useToast } from "@/components/ui";
import { Calendar } from "@/components/ui";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Save, ArrowLeft, Upload } from "lucide-react";
import { Switch } from "@/components/ui";

const VARIABLE_PLACEHOLDER = "{{variable}}";

const AdminWhatsappBlastCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [blastData, setBlastData] = useState({
    name: "",
    template: "",
    message: "",
    targetAudience: "all",
    scheduledTime: "",
    attachments: [] as string[],
    testMode: false,
  });

  const handleSave = () => {
    toast({
      title: "Blast created",
      description: "WhatsApp blast has been created successfully.",
    });
    navigate("/admin/whatsapp");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Create WhatsApp Blast</h2>
            <p className="text-gray-500 mt-1">
              Create and schedule a new WhatsApp blast message
            </p>
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate("/admin/whatsapp")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Blast
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Blast Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Campaign Name</Label>
                <Input
                  placeholder="Enter campaign name"
                  value={blastData.name}
                  onChange={(e) =>
                    setBlastData({ ...blastData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Select Template</Label>
                <Select
                  value={blastData.template}
                  onValueChange={(value) =>
                    setBlastData({ ...blastData, template: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Welcome Message</SelectItem>
                    <SelectItem value="promotion">Promotional Message</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Message Content</Label>
                <Textarea
                  placeholder="Enter your message content"
                  className="min-h-[150px]"
                  value={blastData.message}
                  onChange={(e) =>
                    setBlastData({ ...blastData, message: e.target.value })
                  }
                />
                <p className="text-sm text-gray-500">
                  {"Use {{variable}} for dynamic content"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blast Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Target Audience</Label>
                <Select
                  value={blastData.targetAudience}
                  onValueChange={(value) =>
                    setBlastData({ ...blastData, targetAudience: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="active">Active Customers</SelectItem>
                    <SelectItem value="inactive">Inactive Customers</SelectItem>
                    <SelectItem value="new">New Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Schedule Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduledDate ? (
                        format(scheduledDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Schedule Time</Label>
                <Input
                  type="time"
                  value={blastData.scheduledTime}
                  onChange={(e) =>
                    setBlastData({ ...blastData, scheduledTime: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Attachments</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Support: images, documents, videos
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable Test Mode</Label>
                <Switch
                  checked={blastData.testMode}
                  onCheckedChange={(checked) =>
                    setBlastData({ ...blastData, testMode: checked })
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

export default AdminWhatsappBlastCreate; 