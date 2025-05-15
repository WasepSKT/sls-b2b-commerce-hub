import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Trash2, Settings, Check, AlertCircle, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
}

const AdminNotifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New User Registration",
      message: "A new principal has registered and needs approval",
      type: "info",
      timestamp: "2024-03-20T10:30:00",
      read: false,
    },
    {
      id: 2,
      title: "System Update",
      message: "System maintenance scheduled for tonight",
      type: "warning",
      timestamp: "2024-03-20T09:15:00",
      read: false,
    },
    {
      id: 3,
      title: "Order Alert",
      message: "Large order pending approval",
      type: "error",
      timestamp: "2024-03-20T08:45:00",
      read: false,
    },
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: {
      userRegistration: true,
      orderUpdates: true,
      systemAlerts: true,
    },
    pushNotifications: {
      browser: true,
      mobile: true,
      desktop: true,
    },
    smsNotifications: {
      orderStatus: false,
      paymentUpdates: false,
      criticalAlerts: true,
    },
  });

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "Your notification list has been updated.",
    });
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
      description: "Your notification list has been cleared.",
    });
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const handleSettingChange = (category: string, setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }));
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Notifications</h2>
            <p className="text-gray-500 mt-1">
              Manage your notifications and preferences
            </p>
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
            <Button variant="outline" onClick={handleClearAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  {notifications.length === 0 ? (
                    <div className="flex h-40 items-center justify-center text-center text-muted-foreground">
                      No notifications to display
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex items-start gap-4 p-4 rounded-lg border ${
                            !notification.read ? "bg-muted/20" : ""
                          }`}
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium">{notification.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {notification.message}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteNotification(notification.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Email Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>User Registration</Label>
                    <Switch
                      checked={settings.emailNotifications.userRegistration}
                      onCheckedChange={(checked) =>
                        handleSettingChange("emailNotifications", "userRegistration", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Order Updates</Label>
                    <Switch
                      checked={settings.emailNotifications.orderUpdates}
                      onCheckedChange={(checked) =>
                        handleSettingChange("emailNotifications", "orderUpdates", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>System Alerts</Label>
                    <Switch
                      checked={settings.emailNotifications.systemAlerts}
                      onCheckedChange={(checked) =>
                        handleSettingChange("emailNotifications", "systemAlerts", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Push Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Browser Notifications</Label>
                    <Switch
                      checked={settings.pushNotifications.browser}
                      onCheckedChange={(checked) =>
                        handleSettingChange("pushNotifications", "browser", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Mobile Push</Label>
                    <Switch
                      checked={settings.pushNotifications.mobile}
                      onCheckedChange={(checked) =>
                        handleSettingChange("pushNotifications", "mobile", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Desktop Alerts</Label>
                    <Switch
                      checked={settings.pushNotifications.desktop}
                      onCheckedChange={(checked) =>
                        handleSettingChange("pushNotifications", "desktop", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    SMS Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Order Status</Label>
                    <Switch
                      checked={settings.smsNotifications.orderStatus}
                      onCheckedChange={(checked) =>
                        handleSettingChange("smsNotifications", "orderStatus", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Payment Updates</Label>
                    <Switch
                      checked={settings.smsNotifications.paymentUpdates}
                      onCheckedChange={(checked) =>
                        handleSettingChange("smsNotifications", "paymentUpdates", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Critical Alerts</Label>
                    <Switch
                      checked={settings.smsNotifications.criticalAlerts}
                      onCheckedChange={(checked) =>
                        handleSettingChange("smsNotifications", "criticalAlerts", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications; 