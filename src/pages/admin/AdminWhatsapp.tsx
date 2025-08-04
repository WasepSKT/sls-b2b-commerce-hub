import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";
import { Textarea } from "@/components/ui";
import { Switch } from "@/components/ui";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import {
  MessageSquare,
  Send,
  Settings,
  Users,
  Clock,
  Phone,
  CheckCircle,
  XCircle,
  RefreshCw,
  Plus,
  Trash2,
} from "lucide-react";
import { useToast } from "@/components/ui";

const AdminWhatsapp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [apiSettings, setApiSettings] = useState({
    apiKey: "",
    instanceId: "",
    phoneNumber: "",
    webhookUrl: "",
    enabled: true,
    serverUrl: "",
    messageRetentionPeriod: "30",
    notificationEmail: "",
    callbackUrl: "",
    messageTemplate: {
      header: "Welcome to {{company_name}}",
      body: "Hello {{customer_name}},\nThank you for your interest in our products.",
      footer: "Best regards,\n{{company_name}} Team"
    },
    deliveryReports: true,
    readReceipts: true,
    autoReply: false,
    businessProfile: {
      description: "",
      address: "",
      email: "",
      websites: [],
      vertical: "retail"
    }
  });

  const messageTemplates = [
    {
      id: 1,
      name: "Welcome Message",
      content: "Welcome to SLS B2B! Thank you for registering with us.",
      type: "text",
      status: "active",
      language: "en",
    },
    {
      id: 2,
      name: "Order Confirmation",
      content: "Your order #{{orderId}} has been confirmed and is being processed.",
      type: "text",
      status: "active",
      language: "en",
    },
    {
      id: 3,
      name: "Payment Reminder",
      content: "Reminder: Payment for invoice #{{invoiceId}} is due on {{dueDate}}.",
      type: "text",
      status: "inactive",
      language: "en",
    },
  ];

  const blastHistory = [
    {
      id: 1,
      campaign: "New Product Announcement",
      recipients: 150,
      delivered: 148,
      failed: 2,
      date: "2024-03-20 10:00",
      status: "completed",
    },
    {
      id: 2,
      campaign: "Payment Reminder Batch",
      recipients: 75,
      delivered: 73,
      failed: 2,
      date: "2024-03-19 15:30",
      status: "completed",
    },
    {
      id: 3,
      campaign: "Holiday Notice",
      recipients: 200,
      delivered: 0,
      failed: 0,
      date: "2024-03-21 09:00",
      status: "scheduled",
    },
  ];

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "WhatsApp API settings have been updated successfully.",
    });
  };

  const handleTestConnection = () => {
    toast({
      title: "Testing connection",
      description: "Connection test successful! WhatsApp API is properly configured.",
    });
  };

  const handleCreateTemplate = () => {
    navigate("/admin/whatsapp/template/create");
  };

  const handleCreateBlast = () => {
    navigate("/admin/whatsapp/blast/create");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">WhatsApp Blast</h2>
            <p className="text-gray-500 mt-1">
              Configure WhatsApp API settings and manage blast messages
            </p>
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={handleTestConnection}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Test Connection
            </Button>
            <Button onClick={handleSaveSettings}>Save Settings</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input
                  type="password"
                  placeholder="Enter WhatsApp API key"
                  value={apiSettings.apiKey}
                  onChange={(e) =>
                    setApiSettings({ ...apiSettings, apiKey: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Instance ID</Label>
                <Input
                  placeholder="Enter instance ID"
                  value={apiSettings.instanceId}
                  onChange={(e) =>
                    setApiSettings({ ...apiSettings, instanceId: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Server URL</Label>
                <Input
                  placeholder="Enter WhatsApp server URL"
                  value={apiSettings.serverUrl}
                  onChange={(e) =>
                    setApiSettings({ ...apiSettings, serverUrl: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  placeholder="Enter WhatsApp business phone number"
                  value={apiSettings.phoneNumber}
                  onChange={(e) =>
                    setApiSettings({ ...apiSettings, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input
                  placeholder="Enter webhook URL"
                  value={apiSettings.webhookUrl}
                  onChange={(e) =>
                    setApiSettings({ ...apiSettings, webhookUrl: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Callback URL</Label>
                <Input
                  placeholder="Enter callback URL"
                  value={apiSettings.callbackUrl}
                  onChange={(e) =>
                    setApiSettings({ ...apiSettings, callbackUrl: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Message Retention (days)</Label>
                <Input
                  type="number"
                  placeholder="Enter retention period in days"
                  value={apiSettings.messageRetentionPeriod}
                  onChange={(e) =>
                    setApiSettings({ ...apiSettings, messageRetentionPeriod: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Notification Email</Label>
                <Input
                  type="email"
                  placeholder="Enter notification email"
                  value={apiSettings.notificationEmail}
                  onChange={(e) =>
                    setApiSettings({ ...apiSettings, notificationEmail: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Message Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Template Header</Label>
                <Input
                  placeholder="Enter template header"
                  value={apiSettings.messageTemplate.header}
                  onChange={(e) =>
                    setApiSettings({
                      ...apiSettings,
                      messageTemplate: {
                        ...apiSettings.messageTemplate,
                        header: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Default Template Body</Label>
                <Textarea
                  placeholder="Enter template body"
                  value={apiSettings.messageTemplate.body}
                  onChange={(e) =>
                    setApiSettings({
                      ...apiSettings,
                      messageTemplate: {
                        ...apiSettings.messageTemplate,
                        body: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Default Template Footer</Label>
                <Input
                  placeholder="Enter template footer"
                  value={apiSettings.messageTemplate.footer}
                  onChange={(e) =>
                    setApiSettings({
                      ...apiSettings,
                      messageTemplate: {
                        ...apiSettings.messageTemplate,
                        footer: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Enable Delivery Reports</Label>
                <Switch
                  checked={apiSettings.deliveryReports}
                  onCheckedChange={(checked) =>
                    setApiSettings({ ...apiSettings, deliveryReports: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Enable Read Receipts</Label>
                <Switch
                  checked={apiSettings.readReceipts}
                  onCheckedChange={(checked) =>
                    setApiSettings({ ...apiSettings, readReceipts: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Enable Auto Reply</Label>
                <Switch
                  checked={apiSettings.autoReply}
                  onCheckedChange={(checked) =>
                    setApiSettings({ ...apiSettings, autoReply: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Message Templates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Available Templates</Label>
              <Button onClick={handleCreateTemplate}>
                <Plus className="h-4 w-4 mr-2" />
                Add Template
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messageTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">
                      {template.name}
                    </TableCell>
                    <TableCell>{template.type}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          template.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {template.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{template.language}</TableCell>
                    <TableCell className="text-right">
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
              <CardTitle>Blast History</CardTitle>
              <Button onClick={handleCreateBlast}>
                <Send className="h-4 w-4 mr-2" />
                New Blast
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Delivered</TableHead>
                  <TableHead>Failed</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blastHistory.map((blast) => (
                  <TableRow key={blast.id}>
                    <TableCell className="font-medium">{blast.campaign}</TableCell>
                    <TableCell>{blast.recipients}</TableCell>
                    <TableCell>
                      <span className="text-green-600">{blast.delivered}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-red-600">{blast.failed}</span>
                    </TableCell>
                    <TableCell>{blast.date}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          blast.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {blast.status}
                      </Badge>
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

export default AdminWhatsapp; 