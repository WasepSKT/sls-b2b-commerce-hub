
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Principal routes */}
          <Route path="/dashboard/principal" element={<PrincipalDashboard />} />
          
          {/* Agent routes */}
          <Route path="/dashboard/agent" element={<AgentDashboard />} />
          
          {/* Customer routes */}
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />

          {/* Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
