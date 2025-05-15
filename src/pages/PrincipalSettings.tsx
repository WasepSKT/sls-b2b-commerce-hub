import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const PrincipalSettings = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Principal Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Company Name</Label>
              <Input placeholder="Enter company name" />
            </div>
            <div>
              <Label>Business Registration Number</Label>
              <Input placeholder="Enter registration number" />
            </div>
            <div>
              <Label>Company Description</Label>
              <Textarea placeholder="Enter company description" />
            </div>
            <div>
              <Label>Company Logo</Label>
              <Input type="file" accept="image/*" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Business Email</Label>
              <Input type="email" placeholder="Enter business email" />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input placeholder="Enter phone number" />
            </div>
            <div>
              <Label>Business Address</Label>
              <Textarea placeholder="Enter business address" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agent Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Auto-approve Agent Applications</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Allow Agent Product Customization</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Enable Agent Commission System</Label>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>New Order Notifications</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Agent Application Alerts</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Low Stock Alerts</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Payment Notifications</Label>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline">Reset</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default PrincipalSettings; 