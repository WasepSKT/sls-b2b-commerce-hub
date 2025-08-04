import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import AdminLayout from "@/components/AdminLayout";
import {
  Users,
  ShoppingCart,
  Store,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Activity,
  DollarSign,
  TrendingUp,
  Package,
  MessageSquare,
  Bell,
  Clock,
  Shield,
  Eye,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/lib/store/auth";
import { getUserProfileByUserId } from "@/lib/data/users";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  // Get user profile data
  const userProfile = user ? getUserProfileByUserId(user.userId) : null;

  // Sample statistics data
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12.3%",
      trend: "up",
      icon: Users,
      iconClass: "text-blue-500",
    },
    {
      title: "Active Orders",
      value: "156",
      change: "+5.4%",
      trend: "up",
      icon: ShoppingCart,
      iconClass: "text-green-500",
    },
    {
      title: "Total Revenue",
      value: "Rp 2.5M",
      change: "+8.1%",
      trend: "up",
      icon: DollarSign,
      iconClass: "text-yellow-500",
    },
    {
      title: "Total Products",
      value: "450",
      change: "+3.2%",
      trend: "up",
      icon: Package,
      iconClass: "text-purple-500",
    },
  ];

  // Sample revenue data for line chart
  const revenueData = [
    { month: "Jan", revenue: 1200000 },
    { month: "Feb", revenue: 1800000 },
    { month: "Mar", revenue: 2200000 },
    { month: "Apr", revenue: 2000000 },
    { month: "May", revenue: 2600000 },
    { month: "Jun", revenue: 2400000 },
  ];

  // Sample order status data for pie chart
  const orderStatusData = [
    { name: "Completed", value: 540, color: "#10B981" },
    { name: "Processing", value: 260, color: "#3B82F6" },
    { name: "Pending", value: 180, color: "#F59E0B" },
    { name: "Cancelled", value: 20, color: "#EF4444" },
  ];

  // Sample user acquisition data for bar chart
  const userAcquisitionData = [
    { channel: "Direct", users: 450 },
    { channel: "Referral", users: 280 },
    { channel: "Social", users: 200 },
    { channel: "Email", users: 180 },
    { channel: "Other", users: 124 },
  ];

  // Sample message statistics
  const messageStats = [
    { title: "Total Messages", value: "12,345" },
    { title: "Response Rate", value: "94%" },
    { title: "Avg Response Time", value: "2.5h" },
    { title: "Customer Satisfaction", value: "4.8/5" },
  ];

  // Recent Activities Log
  const activityLog = [
    {
      id: 1,
      type: "user",
      action: "New user registration",
      user: "Sarah Principal",
      details: "Registered as Principal",
      time: "2 minutes ago",
      icon: UserCheck,
      iconClass: "text-green-500",
    },
    {
      id: 2,
      type: "order",
      action: "New order placed",
      user: "David Customer",
      details: "Order #12345 - Rp 2.5M",
      time: "15 minutes ago",
      icon: ShoppingCart,
      iconClass: "text-blue-500",
    },
    {
      id: 3,
      type: "security",
      action: "Failed login attempt",
      user: "Unknown",
      details: "IP: 192.168.1.100",
      time: "1 hour ago",
      icon: Shield,
      iconClass: "text-red-500",
    },
    {
      id: 4,
      type: "system",
      action: "System update",
      user: "System",
      details: "Version 1.2.3 deployed",
      time: "2 hours ago",
      icon: Activity,
      iconClass: "text-purple-500",
    },
    {
      id: 5,
      type: "product",
      action: "Product update",
      user: "Admin",
      details: "Updated 15 product prices",
      time: "3 hours ago",
      icon: Package,
      iconClass: "text-yellow-500",
    },
  ];

  // System Notifications
  const notifications = [
    {
      id: 1,
      title: "Critical System Update",
      message: "Security patch needs to be applied",
      type: "critical",
      time: "10 minutes ago",
    },
    {
      id: 2,
      title: "Low Stock Alert",
      message: "5 products are running low on stock",
      type: "warning",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "New Feature Available",
      message: "WhatsApp integration is now live",
      type: "info",
      time: "2 hours ago",
    },
  ];

  // System Health Status
  const systemHealth = [
    {
      name: "API Server",
      status: "operational",
      uptime: "99.9%",
      responseTime: "120ms",
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.8%",
      responseTime: "150ms",
    },
    {
      name: "Storage",
      status: "warning",
      uptime: "99.5%",
      responseTime: "200ms",
    },
    {
      name: "Cache",
      status: "operational",
      uptime: "99.9%",
      responseTime: "50ms",
    },
  ];

  // Active Users
  const activeUsers = [
    {
      id: 1,
      name: "John Admin",
      role: "admin",
      status: "online",
      lastActive: "Now",
      avatar: "/avatars/admin.jpg",
    },
    {
      id: 2,
      name: "Sarah Principal",
      role: "principal",
      status: "online",
      lastActive: "2m ago",
      avatar: "/avatars/principal.jpg",
    },
    {
      id: 3,
      name: "Mike Agent",
      role: "agent",
      status: "away",
      lastActive: "15m ago",
      avatar: "/avatars/agent.jpg",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Welcome back, {userProfile?.fullName || user?.username || "Admin"}
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Activity className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold tracking-tight">
                      {stat.value}
                    </h3>
                    <p
                      className={`text-xs ${stat.trend === "up"
                        ? "text-green-500"
                        : "text-red-500"
                        }`}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUp className="inline h-3 w-3" />
                      ) : (
                        <ArrowDown className="inline h-3 w-3" />
                      )}{" "}
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`rounded-full p-2 ${stat.iconClass} bg-opacity-10`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Revenue Trend */}
          <Card className={cn(
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-gray-900"
              )}>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: isDarkMode ? "#d1d5db" : "#374151" }}
                    />
                    <YAxis
                      tick={{ fill: isDarkMode ? "#d1d5db" : "#374151" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                        border: isDarkMode ? "1px solid #374151" : "1px solid #e5e7eb",
                        color: isDarkMode ? "#f9fafb" : "#111827"
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        color: isDarkMode ? "#f9fafb" : "#111827"
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Order Status Distribution */}
          <Card className={cn(
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-gray-900"
              )}>Order Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                        border: isDarkMode ? "1px solid #374151" : "1px solid #e5e7eb",
                        color: isDarkMode ? "#f9fafb" : "#111827"
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        color: isDarkMode ? "#f9fafb" : "#111827"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* User Acquisition */}
          <Card className={cn(
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          )}>
            <CardHeader>
              <CardTitle className={cn(
                isDarkMode ? "text-white" : "text-gray-900"
              )}>User Acquisition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userAcquisitionData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="channel"
                      tick={{ fill: isDarkMode ? "#d1d5db" : "#374151" }}
                    />
                    <YAxis
                      tick={{ fill: isDarkMode ? "#d1d5db" : "#374151" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                        border: isDarkMode ? "1px solid #374151" : "1px solid #e5e7eb",
                        color: isDarkMode ? "#f9fafb" : "#111827"
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        color: isDarkMode ? "#f9fafb" : "#111827"
                      }}
                    />
                    <Bar dataKey="users" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Message Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Message Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {messageStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-muted p-4 rounded-lg text-center"
                  >
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {activityLog.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 border-b pb-4 last:border-0"
                    >
                      <div
                        className={`rounded-full p-2 ${activity.iconClass} bg-opacity-10`}
                      >
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-500">
                          {activity.details}
                        </p>
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {activity.time}
                          <span className="mx-2">•</span>
                          <span>{activity.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* System Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  System Notifications
                </div>
                <Badge variant="secondary">3 New</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start space-x-4 border-b pb-4 last:border-0"
                    >
                      <div
                        className={`rounded-full p-2 ${notification.type === "critical"
                          ? "bg-red-100 text-red-800"
                          : notification.type === "warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification.message}
                        </p>
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-4 last:border-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{service.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <p>Uptime: {service.uptime}</p>
                        <span className="mx-2">•</span>
                        <p>Response: {service.responseTime}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status.charAt(0).toUpperCase() +
                        service.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-4 border-b pb-4 last:border-0"
                  >
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${user.status === "online"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                          }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400">{user.lastActive}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 