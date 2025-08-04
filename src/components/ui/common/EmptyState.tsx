import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { Button } from "../button";
import { Card, CardContent } from "../card";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <Card className={cn(
      "w-full",
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
      className
    )}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6">
        {icon && (
          <div className={cn(
            "mb-4 p-3 rounded-full",
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          )}>
            <div className={cn(
              "h-8 w-8",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              {icon}
            </div>
          </div>
        )}

        <h3 className={cn(
          "text-lg font-semibold mb-2 text-center",
          isDarkMode ? "text-gray-200" : "text-gray-900"
        )}>
          {title}
        </h3>

        {description && (
          <p className={cn(
            "text-sm text-center mb-6 max-w-sm",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            {description}
          </p>
        )}

        {action && (
          <Button
            onClick={action.onClick}
            variant={action.variant || "default"}
          >
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState; 