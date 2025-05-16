import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { Moon, Sun, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/store/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      const { user } = useAuth.getState();
      
      if (user) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        
        // Get the intended destination from location state, or use role-based default
        const from = (location.state as any)?.from?.pathname;
        const roleRoutes: { [key: string]: string } = {
          admin: "/admin",
          principal: "/dashboard/principal",
          agent: "/dashboard/agent",
          customer: "/dashboard/customer",
        };

        // Navigate to the intended destination or role-based default
        const destination = from || roleRoutes[user.role] || "/";
        navigate(destination, { replace: true });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-300",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      {/* Navigation */}
      <nav className={cn(
        "w-full border-b transition-colors duration-300",
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className={cn(
                "text-2xl font-bold font-poppins transition-colors duration-300",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>
                SLS B2B
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "w-full max-w-md space-y-8 p-8 rounded-xl shadow-lg transition-colors duration-300",
          isDarkMode ? "bg-gray-800" : "bg-white"
        )}>
          <div>
            <h2 className={cn(
              "mt-6 text-3xl font-bold tracking-tight text-center font-poppins",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Welcome back
            </h2>
            <p className={cn(
              "mt-2 text-sm text-center",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-500 hover:text-blue-400"
              >
                Sign up
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <Mail className={cn(
                  "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )} />
                <Input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "pl-10 transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>

              <div className="relative">
                <Lock className={cn(
                  "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )} />
                <Input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "pl-10 transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className={cn(
                    "h-4 w-4 rounded border-gray-300 transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-blue-500"
                      : "bg-white border-gray-200 text-blue-600"
                  )}
                />
                <label
                  htmlFor="remember-me"
                  className={cn(
                    "ml-2 block text-sm",
                    isDarkMode ? "text-gray-300" : "text-gray-900"
                  )}
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-500 hover:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full py-6 text-lg transition-colors duration-300",
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              )}
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className={cn(
        "py-8 border-t transition-colors duration-300",
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"
      )}>
        <div className="text-center">
          <p className={cn(
            "text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-500"
          )}>
            © {new Date().getFullYear()} SLS B2B Commerce Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
