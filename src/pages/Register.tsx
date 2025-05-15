import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { Mail, Lock, User, Building } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/store/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import MainNav from "@/components/MainNav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    role: "customer",
  });
  const { signUp: register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    try {
      await register(formData);
      toast({
        title: "Registration successful",
        description: "Welcome to SLS B2B Commerce Hub!",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col transition-colors duration-300",
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    )}>
      <MainNav />

      {/* Register Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 pt-16">
        <div className={cn(
          "w-full max-w-md space-y-8 p-8 rounded-xl shadow-lg transition-colors duration-300",
          isDarkMode ? "bg-gray-800" : "bg-white"
        )}>
          <div>
            <h2 className={cn(
              "text-3xl font-bold tracking-tight text-center font-poppins",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Create your account
            </h2>
            <p className={cn(
              "mt-2 text-sm text-center",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-500 hover:text-blue-400"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <User className={cn(
                  "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )} />
                <Input
                  type="text"
                  name="name"
                  required
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={cn(
                    "pl-10 transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>

              <div className="relative">
                <Mail className={cn(
                  "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )} />
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    "pl-10 transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>

              <div className="relative">
                <Building className={cn(
                  "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-300",
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                )} />
                <Input
                  type="text"
                  name="companyName"
                  required
                  placeholder="Company name"
                  value={formData.companyName}
                  onChange={handleChange}
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
                  name="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
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
                  name="confirmPassword"
                  required
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={cn(
                    "pl-10 transition-colors duration-300",
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                  )}
                />
              </div>

              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className={cn(
                  "w-full transition-colors duration-300",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                )}>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="principal">Principal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className={cn(
                  "h-4 w-4 rounded border-gray-300 transition-colors duration-300",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-blue-500"
                    : "bg-white border-gray-200 text-blue-600"
                )}
              />
              <label
                htmlFor="terms"
                className={cn(
                  "ml-2 block text-sm",
                  isDarkMode ? "text-gray-300" : "text-gray-900"
                )}
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="font-medium text-blue-500 hover:text-blue-400"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="font-medium text-blue-500 hover:text-blue-400"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full py-6 text-lg transition-colors duration-300",
                "bg-blue-500 hover:bg-blue-600 text-white"
              )}
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className={cn(
        "py-8 border-t transition-colors duration-300",
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

export default Register;
