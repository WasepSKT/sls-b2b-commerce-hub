import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className
}) => {
  const { isDarkMode } = useTheme();

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        isDarkMode ? "text-gray-400" : "text-gray-600",
        className
      )}
    />
  );
};

export default LoadingSpinner; 