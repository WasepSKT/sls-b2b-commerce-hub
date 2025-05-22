import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings, CreditCard, ShoppingCart, Package, Store, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/store/auth";
import { useTheme } from "@/lib/store/theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

export const UserProfileDropdown = ({ className }: { className?: string }) => {
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!user) return null;
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };

  // Define route links based on user role
  const getLinks = () => {
    switch (user.role) {
      case "customer":
        return [
          { name: "My Profile", href: "/dashboard/customer/settings", icon: User },
          { name: "My Orders", href: "/dashboard/customer/orders", icon: Package },
          { name: "My Cart", href: "/dashboard/customer/cart", icon: ShoppingCart },
          { name: "Payment History", href: "/dashboard/customer/payments", icon: CreditCard },
          { name: "Rewards", href: "/dashboard/customer/rewards", icon: Heart },
        ];
      case "agent":
        return [
          { name: "My Profile", href: "/dashboard/agent/settings", icon: User },
          { name: "Catalog", href: "/dashboard/agent/catalog", icon: Package },
          { name: "Customers", href: "/dashboard/agent/customers", icon: User },
          { name: "Commissions", href: "/dashboard/agent/commissions", icon: CreditCard },
        ];
      case "principal":
        return [
          { name: "My Profile", href: "/dashboard/principal/settings", icon: User },
          { name: "Products", href: "/dashboard/principal/products", icon: Package },
          { name: "Agents", href: "/dashboard/principal/agents", icon: Store },
          { name: "Customers", href: "/dashboard/principal/customers", icon: User },
        ];
      default:
        return [
          { name: "My Profile", href: "/settings", icon: User },
          { name: "Settings", href: "/settings", icon: Settings },
        ];
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative rounded-full transition-all duration-200",
            isHovered || isOpen
              ? isDarkMode 
                ? "bg-gray-700 text-white shadow-md scale-105" 
                : "bg-gray-100 text-gray-900 shadow-md scale-105"
              : "bg-transparent hover:bg-transparent",
            isDarkMode ? "text-gray-300" : "text-gray-600",
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Avatar className={cn(
            "h-8 w-8 transition-all duration-200",
            isHovered || isOpen ? "ring-2 ring-opacity-50" : "",
            isDarkMode 
              ? "ring-blue-400" 
              : "ring-blue-500"
          )}>
            <AvatarImage 
              src={user.avatar || ""} 
              alt={user.name} 
              className="object-cover"
            />
            <AvatarFallback className={cn(
              "transition-colors duration-200",
              isDarkMode ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-700"
            )}>
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "w-56 mt-1",
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className={cn(
          "font-normal",
          isDarkMode ? "text-gray-300" : ""
        )}>
          <div className="flex flex-col space-y-1">
            <p className={cn(
              "text-sm font-medium leading-none",
              isDarkMode ? "text-gray-100" : "text-gray-900"
            )}>
              {user.name}
            </p>
            <p className={cn(
              "text-xs leading-none",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}>
              {user.email}
            </p>
            {user.companyName && (
              <p className={cn(
                "text-xs leading-none",
                isDarkMode ? "text-gray-400" : "text-gray-500" 
              )}>
                {user.companyName}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className={isDarkMode ? "bg-gray-700" : ""} />
        <DropdownMenuGroup>
          {getLinks().map((link, index) => (
            <DropdownMenuItem
              key={index}
              asChild
              className={cn(
                "transition-colors duration-150 cursor-pointer",
                isDarkMode ? "hover:bg-gray-700 text-gray-300 hover:text-white" : "hover:bg-gray-100"
              )}
            >
              <Link to={link.href} className="flex items-center" onClick={() => setIsOpen(false)}>
                <link.icon className="mr-2 h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className={isDarkMode ? "bg-gray-700" : ""} />
        <DropdownMenuItem 
          onClick={handleLogout}
          className={cn(
            "cursor-pointer transition-colors duration-150",
            isDarkMode 
              ? "hover:bg-red-900/20 text-gray-300 hover:text-red-300" 
              : "hover:bg-red-50 hover:text-red-600"
          )}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown; 