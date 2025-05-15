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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save } from "lucide-react";

const AdminWhatsappTemplateCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [templateData, setTemplateData] = useState({
    name: "",
    type: "",
    language: "en",
    category: "",
    header: "",
    body: "",
    footer: "",
    buttons: [],
  });

  const handleSave = () => {
    toast({
      title: "Template saved",
      description: "WhatsApp template has been created successfully.",
    });
    navigate("/admin/whatsapp");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Create Template</h2>
            <p className="text-gray-500 mt-1">
              Create a new WhatsApp message template
            </p>
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate("/admin/whatsapp")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Template Name</Label>
                <Input
                  placeholder="Enter template name"
                  value={templateData.name}
                  onChange={(e) =>
                    setTemplateData({ ...templateData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Template Type</Label>
                <Select
                  value={templateData.type}
                  onValueChange={(value) =>
                    setTemplateData({ ...templateData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select template type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="utility">Utility</SelectItem>
                    <SelectItem value="authentication">Authentication</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={templateData.language}
                  onValueChange={(value) =>
                    setTemplateData({ ...templateData, language: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="id">Indonesian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={templateData.category}
                  onValueChange={(value) =>
                    setTemplateData({ ...templateData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transactional">Transactional</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="notification">Notification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Header</Label>
                <Input
                  placeholder="Enter header text"
                  value={templateData.header}
                  onChange={(e) =>
                    setTemplateData({ ...templateData, header: e.target.value })
                  }
                />
                <p className="text-sm text-gray-500">
                  {"Use {{variable}} for dynamic content"}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Body</Label>
                <Textarea
                  placeholder="Enter message body"
                  className="min-h-[150px]"
                  value={templateData.body}
                  onChange={(e) =>
                    setTemplateData({ ...templateData, body: e.target.value })
                  }
                />
                <p className="text-sm text-gray-500">
                  {"Use {{variable}} for dynamic content"}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Footer</Label>
                <Input
                  placeholder="Enter footer text"
                  value={templateData.footer}
                  onChange={(e) =>
                    setTemplateData({ ...templateData, footer: e.target.value })
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

export default AdminWhatsappTemplateCreate; 