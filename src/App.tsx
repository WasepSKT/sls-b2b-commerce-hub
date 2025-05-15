
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import PrincipalProducts from "./pages/PrincipalProducts";
import AgentDashboard from "./pages/AgentDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerCatalog from "./pages/CustomerCatalog";
import CustomerCart from "./pages/CustomerCart";
import CustomerOrders from "./pages/CustomerOrders";
import CustomerPayments from "./pages/CustomerPayments";
import CustomerSettings from "./pages/CustomerSettings";

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
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Principal routes */}
          <Route path="/dashboard/principal" element={<PrincipalDashboard />} />
          <Route path="/dashboard/principal/products" element={<PrincipalProducts />} />
          
          {/* Agent routes */}
          <Route path="/dashboard/agent" element={<AgentDashboard />} />
          
          {/* Customer routes */}
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
          <Route path="/dashboard/customer/catalog" element={<CustomerCatalog />} />
          <Route path="/dashboard/customer/cart" element={<CustomerCart />} />
          <Route path="/dashboard/customer/orders" element={<CustomerOrders />} />
          <Route path="/dashboard/customer/payments" element={<CustomerPayments />} />
          <Route path="/dashboard/customer/settings" element={<CustomerSettings />} />

          {/* Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
