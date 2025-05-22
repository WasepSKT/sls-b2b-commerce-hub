import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AdminLayout from "@/components/AdminLayout";
import { useToast } from "@/components/ui/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been successfully saved.",
    });
  };

  return (
    <AdminLayout pageTitle="System Settings">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Settings</h2>
            <p className="text-gray-500 mt-1">
              Configure system-wide settings and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Website Name</Label>
                <Input
                  placeholder="Enter website name"
                  defaultValue="SLS B2B Commerce Hub"
                />
              </div>
              <div>
                <Label>Website Description</Label>
                <Textarea
                  placeholder="Enter website description"
                  defaultValue="B2B Commerce platform connecting principals, agents, and customers"
                />
              </div>
              <div>
                <Label>Contact Email</Label>
                <Input type="email" placeholder="Enter contact email" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Theme</Label>
                <Select defaultValue="light">
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Primary Color</Label>
                <Input type="color" className="h-10" defaultValue="#0066FF" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Two-Factor Authentication</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>Force Strong Passwords</Label>
                <Switch defaultChecked />
              </div>
              <div>
                <Label>Session Timeout (minutes)</Label>
                <Input type="number" defaultValue="30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>SMTP Server</Label>
                <Input placeholder="Enter SMTP server" />
              </div>
              <div>
                <Label>SMTP Port</Label>
                <Input type="number" placeholder="Enter SMTP port" />
              </div>
              <div>
                <Label>SMTP Username</Label>
                <Input placeholder="Enter SMTP username" />
              </div>
              <div>
                <Label>SMTP Password</Label>
                <Input type="password" placeholder="Enter SMTP password" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Reset</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings; 