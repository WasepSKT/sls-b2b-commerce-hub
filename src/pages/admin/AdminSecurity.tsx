import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";
import { Switch } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
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
  Shield,
  Key,
  Lock,
  UserCheck,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/components/ui";

const AdminSecurity = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Security settings have been updated successfully.",
    });
  };

  const securityLogs = [
    {
      id: 1,
      event: "Failed login attempt",
      ip: "192.168.1.100",
      user: "unknown",
      timestamp: "2024-03-20T10:30:00",
      severity: "high",
    },
    {
      id: 2,
      event: "Password changed",
      ip: "192.168.1.101",
      user: "admin@slsb2b.com",
      timestamp: "2024-03-20T09:15:00",
      severity: "low",
    },
    {
      id: 3,
      event: "New device login",
      ip: "192.168.1.102",
      user: "principal@company.com",
      timestamp: "2024-03-20T08:45:00",
      severity: "medium",
    },
  ];

  return (
    <AdminLayout pageTitle="Security Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Security</h2>
            <p className="text-gray-500 mt-1">
              Manage system security settings and monitor security events
            </p>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Authentication Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Two-Factor Authentication</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Password Expiry</Label>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Password Expiry Days</Label>
                <Input type="number" placeholder="90" />
              </div>
              <div className="space-y-2">
                <Label>Minimum Password Length</Label>
                <Input type="number" placeholder="12" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Access Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>IP Whitelisting</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>Session Timeout</Label>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input type="number" placeholder="30" />
              </div>
              <div className="space-y-2">
                <Label>Max Login Attempts</Label>
                <Input type="number" placeholder="5" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                API Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>API Key Authentication</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Rate Limiting</Label>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Rate Limit (requests/minute)</Label>
                <Input type="number" placeholder="100" />
              </div>
              <Button variant="outline" className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Rotate API Keys
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Security Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.event}</TableCell>
                    <TableCell>{log.ip}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          log.severity === "high"
                            ? "bg-red-100 text-red-800"
                            : log.severity === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {log.severity}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">Enable Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">
                    Enhance account security by requiring a second form of
                    verification.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">Regular Security Audits</p>
                  <p className="text-sm text-gray-500">
                    Schedule regular security audits to identify potential
                    vulnerabilities.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">Update SSL Certificates</p>
                  <p className="text-sm text-gray-500">
                    Ensure all SSL certificates are up to date and properly
                    configured.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSecurity; 