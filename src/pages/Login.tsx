import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { Moon, Sun, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/store/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui";
import ScrollToTop from "@/components/ScrollToTop";

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
          distributor: "/dashboard/distributor",
          agent: "/dashboard/agent",
          customer: "/dashboard/customer",
          reseller: "/dashboard/reseller", // Fixed reseller route
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
      <ScrollToTop />
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

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className={cn(
                "bg-white px-2",
                isDarkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"
              )}>
                Or continue with
              </span>
            </div>
          </div>

          {/* Google OAuth Button */}
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full py-6 text-lg transition-colors duration-300",
              isDarkMode
                ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700"
                : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
            )}
            onClick={() => {
              // TODO: Implement Google OAuth
              toast({
                title: "Google OAuth",
                description: "Google OAuth integration will be implemented soon!",
              });
            }}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
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
