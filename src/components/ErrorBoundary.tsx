import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import { Button } from "@/components/ui";
import { AlertCircle } from "lucide-react";

export function ErrorBoundary() {
  const error = useRouteError();
  const { isDarkMode } = useTheme();

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-4",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      <div className={cn(
        "max-w-md w-full p-8 rounded-lg shadow-lg text-center",
        isDarkMode ? "bg-gray-800" : "bg-white"
      )}>
        <AlertCircle className={cn(
          "w-16 h-16 mx-auto mb-4",
          isDarkMode ? "text-red-400" : "text-red-500"
        )} />
        
        <h1 className={cn(
          "text-2xl font-bold mb-4",
          isDarkMode ? "text-white" : "text-gray-900"
        )}>
          {isRouteErrorResponse(error) 
            ? `${error.status} ${error.statusText}`
            : 'Oops! Something went wrong'}
        </h1>
        
        <p className={cn(
          "mb-8",
          isDarkMode ? "text-gray-300" : "text-gray-600"
        )}>
          {isRouteErrorResponse(error)
            ? error.status === 404
              ? "The page you're looking for doesn't exist or you don't have permission to access it."
              : "An unexpected error occurred. Please try again later."
            : "We encountered an unexpected error. Please try again later."}
        </p>

        <div className="space-x-4">
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className={cn(
              isDarkMode 
                ? "bg-gray-700 hover:bg-gray-600 text-white border-gray-600" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            )}
          >
            Try Again
          </Button>
          
          <Link to="/">
            <Button className={cn(
              "bg-blue-500 hover:bg-blue-600 text-white"
            )}>
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 