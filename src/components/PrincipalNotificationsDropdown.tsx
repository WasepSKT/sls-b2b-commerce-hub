import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { Button } from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Check, Store, ShoppingCart, CreditCard, AlertCircle, Settings, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useTheme } from "@/lib/store/theme";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  time: string;
  read: boolean;
}

export const PrincipalNotificationsDropdown = ({ className }: { className?: string }) => {
  const { isDarkMode } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Stock Alert",
      message: "Product ID #567 is running low on stock",
      type: "warning",
      time: "15 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Large Order Received",
      message: "Agent Tech Solutions Inc has placed a bulk order",
      type: "info",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "New Agent Application",
      message: "A new agent has requested to join your network",
      type: "info",
      time: "Yesterday",
      read: true,
    },
    {
      id: 4,
      title: "Sales Milestone",
      message: "Your monthly sales target has been achieved",
      type: "success",
      time: "3 days ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, read: true }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost" 
          size="icon"
          className={cn(
            "relative transition-colors duration-200",
            isDarkMode 
              ? "text-blue-300 hover:text-blue-200 hover:bg-gray-700/50" 
              : "text-blue-600 hover:text-blue-700 hover:bg-blue-50",
            className
          )}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={cn(
          "w-80 p-0",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )} 
        align="end"
      >
        <div className={cn(
          "flex items-center justify-between border-b p-3",
          isDarkMode ? "border-gray-700" : "border-gray-200"
        )}>
          <div className="flex items-center gap-2">
            <h4 className={cn(
              "font-semibold",
              isDarkMode ? "text-gray-100" : "text-gray-900"
            )}>Principal Notifications</h4>
            {unreadCount > 0 && (
              <span className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                isDarkMode ? "bg-red-900 text-red-100" : "bg-red-100 text-red-600"
              )}>
                {unreadCount} new
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "h-8 w-8",
                    isDarkMode ? "text-gray-300 hover:bg-gray-700" : "hover:bg-gray-100"
                  )}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className={cn(
                  "w-48",
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                )}
              >
                <DropdownMenuLabel className={isDarkMode ? "text-gray-100" : ""}>
                  Notification Settings
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={markAllAsRead}
                  className={isDarkMode ? "hover:bg-gray-700 text-gray-300 hover:text-white" : ""}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Mark all as read
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={clearAllNotifications}
                  className={isDarkMode ? "hover:bg-gray-700 text-gray-300 hover:text-white" : ""}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear all
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link 
                    to="/dashboard/principal/settings" 
                    className={cn(
                      "flex items-center",
                      isDarkMode ? "text-gray-300 hover:text-white" : ""
                    )}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Manage notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <ScrollArea className={cn(
          "h-64",
          isDarkMode ? "text-gray-100" : ""
        )}>
          {notifications.length === 0 ? (
            <div className="flex h-full items-center justify-center p-6 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 p-3 hover:bg-muted/50 cursor-pointer",
                    !notification.read && (isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"),
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100",
                    isDarkMode ? "divide-gray-700" : "divide-gray-200"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className={cn(
                      "text-sm font-medium leading-none",
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    )}>
                      {notification.title}
                    </p>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>
                      {notification.message}
                    </p>
                    <p className={cn(
                      "text-xs",
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    )}>
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default PrincipalNotificationsDropdown; 