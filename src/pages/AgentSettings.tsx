import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const AgentSettings = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Agent Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input placeholder="Enter your full name" />
            </div>
            <div>
              <Label>Agent ID</Label>
              <Input placeholder="Enter agent ID" readOnly />
            </div>
            <div>
              <Label>Profile Picture</Label>
              <Input type="file" accept="image/*" />
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea placeholder="Enter your bio" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Email Address</Label>
              <Input type="email" placeholder="Enter email address" />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input placeholder="Enter phone number" />
            </div>
            <div>
              <Label>WhatsApp Number</Label>
              <Input placeholder="Enter WhatsApp number" />
            </div>
            <div>
              <Label>Address</Label>
              <Textarea placeholder="Enter your address" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Bank Name</Label>
              <Input placeholder="Enter bank name" />
            </div>
            <div>
              <Label>Account Number</Label>
              <Input placeholder="Enter account number" />
            </div>
            <div>
              <Label>Account Holder Name</Label>
              <Input placeholder="Enter account holder name" />
            </div>
            <div className="flex items-center justify-between">
              <Label>Receive Commission Updates</Label>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>New Order Notifications</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Commission Payment Alerts</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Product Updates</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Customer Inquiries</Label>
              <Switch defaultChecked />
            </div>
            <div>
              <Label>Preferred Contact Method</Label>
              <select className="w-full mt-1 rounded-md border border-gray-300 p-2">
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
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

export default AgentSettings; 