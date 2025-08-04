import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Badge } from "@/components/ui";
import { Progress } from "@/components/ui";
import {
  Database,
  Download,
  Upload,
  RefreshCw,
  HardDrive,
  Activity,
} from "lucide-react";
import { useToast } from "@/components/ui";

const AdminDatabase = () => {
  const { toast } = useToast();

  const handleBackup = () => {
    toast({
      title: "Backup initiated",
      description: "Database backup process has started.",
    });
  };

  const handleOptimize = () => {
    toast({
      title: "Optimization started",
      description: "Database optimization process has been initiated.",
    });
  };

  return (
    <AdminLayout pageTitle="Database Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Database</h2>
            <p className="text-gray-500 mt-1">
              Monitor and manage database operations
            </p>
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={handleBackup}>
              <Download className="h-4 w-4 mr-2" />
              Backup Now
            </Button>
            <Button variant="outline" onClick={handleOptimize}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Optimize
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardDrive className="h-5 w-5 mr-2" />
                Storage Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={75} className="h-2" />
                <p className="text-sm text-gray-500">
                  75% of 100GB used (75GB)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Query Response Time</span>
                  <span className="font-medium">45ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Active Connections</span>
                  <span className="font-medium">28</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cache Hit Ratio</span>
                  <span className="font-medium">92%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Main Database</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Replica 1</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Replica 2</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Backups</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-03-20 10:00</TableCell>
                    <TableCell>2.5 GB</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-03-19 10:00</TableCell>
                    <TableCell>2.4 GB</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Total Tables</p>
                  <p className="text-2xl font-bold">48</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Records</p>
                  <p className="text-2xl font-bold">1.2M</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Indexes</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Optimization</p>
                  <p className="text-2xl font-bold">2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDatabase; 