import { BarChart3, DollarSign, Users, ShoppingCart } from "lucide-react";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { isDarkMode } = useTheme();

  const stats = [
    {
      title: "Total Revenue",
      value: "Rp 15.2M",
      icon: DollarSign,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Active Users",
      value: "1,234",
      icon: Users,
      change: "+3%",
      changeType: "positive"
    },
    {
      title: "Total Orders",
      value: "4,521",
      icon: ShoppingCart,
      change: "+8%",
      changeType: "positive"
    },
    {
      title: "Conversion Rate",
      value: "2.4%",
      icon: BarChart3,
      change: "-0.1%",
      changeType: "negative"
    }
  ];

  return (
    <div className="p-6">
      <h1 className={cn(
        "text-3xl font-bold mb-8",
        isDarkMode ? "text-white" : "text-gray-900"
      )}>
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              "p-6 rounded-lg",
              isDarkMode ? "bg-gray-800" : "bg-white"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                "p-2 rounded-lg",
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              )}>
                <stat.icon className={cn(
                  "w-6 h-6",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )} />
              </div>
              <span className={cn(
                "text-sm font-medium",
                stat.changeType === "positive" 
                  ? "text-green-500" 
                  : "text-red-500"
              )}>
                {stat.change}
              </span>
            </div>
            <h3 className={cn(
              "text-2xl font-bold mb-1",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              {stat.value}
            </h3>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      {/* Add more dashboard content here */}
    </div>
  );
};

export default Dashboard; 