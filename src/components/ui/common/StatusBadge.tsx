import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "../badge";

interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info" | "pending";
  children: React.ReactNode;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  className
}) => {
  const statusConfig = {
    success: {
      variant: "default" as const,
      className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800",
    },
    warning: {
      variant: "secondary" as const,
      className: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800",
    },
    error: {
      variant: "destructive" as const,
      className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800",
    },
    info: {
      variant: "outline" as const,
      className: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800",
    },
    pending: {
      variant: "secondary" as const,
      className: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {children}
    </Badge>
  );
};

export default StatusBadge; 