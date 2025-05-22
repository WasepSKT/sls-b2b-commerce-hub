import { createBrowserRouter, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import About from "@/pages/About";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminSecurity from "@/pages/admin/AdminSecurity";
import AdminDatabase from "@/pages/admin/AdminDatabase";
import AdminWebsite from "@/pages/admin/AdminWebsite";
import AdminNews from "@/pages/admin/AdminNews";
import AdminNewsCreate from "@/pages/admin/AdminNewsCreate";
import AdminWhatsapp from "@/pages/admin/AdminWhatsapp";
import AdminWhatsappBlastCreate from "@/pages/admin/AdminWhatsappBlastCreate";
import AdminNotifications from "@/pages/admin/AdminNotifications";
import PrincipalDashboard from "@/pages/principal/PrincipalDashboard";
import PrincipalProducts from "@/pages/principal/PrincipalProducts";
import ProductDetail from "@/pages/principal/ProductDetail";
import PrincipalSettings from "@/pages/principal/PrincipalSettings";
import PrincipalAgents from "@/pages/principal/PrincipalAgents";
import PrincipalCustomers from "@/pages/principal/PrincipalCustomers";
import PrincipalOrders from "@/pages/principal/PrincipalOrders";
import PrincipalReports from "@/pages/principal/PrincipalReports";
import AgentDashboard from "@/pages/agent/AgentDashboard";
import CustomerDashboard from "@/pages/customer/CustomerDashboard";
import { PrivateRoute } from "@/components/PrivateRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import AdminWhatsappTemplateCreate from "@/pages/admin/AdminWhatsappTemplateCreate";
import AdminNewsCampaignCreate from "@/pages/admin/AdminNewsCampaignCreate";
import AgentCatalog from "@/pages/agent/AgentCatalog";
import AgentCustomers from "@/pages/agent/AgentCustomers";
import AgentOrders from "@/pages/agent/AgentOrders";
import AgentCommissions from "@/pages/agent/AgentCommissions";
import AgentSettings from "@/pages/agent/AgentSettings";
import AgentProductDetail from "@/pages/agent/AgentProductDetail";
import AgentProductAdd from "@/pages/agent/AgentProductAdd";
import AgentSellingProducts from "@/pages/agent/AgentSellingProducts";
import CustomerCatalog from "@/pages/customer/CustomerCatalog";
import CustomerCart from "@/pages/customer/CustomerCart";
import CustomerOrders from "@/pages/customer/CustomerOrders";
import CustomerPayments from "@/pages/customer/CustomerPayments";
import CustomerSettings from "@/pages/customer/CustomerSettings";
import Checkout from "@/pages/customer/Checkout";
import CustomerProductDetail from "@/pages/customer/CustomerProductDetail";
import CustomerRewards from "@/pages/customer/CustomerRewards";
import CustomerOrderTracking from "@/pages/customer/CustomerOrderTracking";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/features",
    element: <Features />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/faq",
    element: <FAQ />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <ErrorBoundary />,
  },
  // Admin Routes
  {
    path: "/admin",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/users",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminUsers />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/settings",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminSettings />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/database",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminDatabase />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/security",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminSecurity />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/website",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminWebsite />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/news",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminNews />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/news/create",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminNewsCreate />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/news/campaign/create",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminNewsCampaignCreate />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/whatsapp",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminWhatsapp />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/whatsapp/template/create",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminWhatsappTemplateCreate />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/whatsapp/blast/create",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminWhatsappBlastCreate />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/notifications",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminNotifications />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  // Principal Routes
  {
    path: "/dashboard/principal",
    element: (
      <PrivateRoute allowedRoles={["principal"]}>
        <PrincipalDashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/principal/products",
    element: (
      <PrivateRoute allowedRoles={["principal"]}>
        <PrincipalProducts />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/principal/products/:productId",
    element: (
      <PrivateRoute allowedRoles={["principal"]}>
        <ProductDetail />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/principal/agents",
    element: (
      <PrivateRoute allowedRoles={["principal"]}>
        <PrincipalAgents />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/principal/customers",
    element: (
      <PrivateRoute allowedRoles={["principal"]}>
        <PrincipalCustomers />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/principal/orders",
    element: (
      <PrivateRoute allowedRoles={["principal"]}>
        <PrincipalOrders />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/principal/reports",
    element: (
      <PrivateRoute allowedRoles={["principal"]}>
        <PrincipalReports />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/principal/settings",
    element: (
      <PrivateRoute allowedRoles={["principal"]}>
        <PrincipalSettings />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  // Agent Routes
  {
    path: "/dashboard/agent",
    element: (
      <PrivateRoute allowedRoles={["agent"]}>
        <AgentDashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/agent/catalog",
    element: (
      <PrivateRoute allowedRoles={["agent"]}>
        <AgentCatalog />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/agent/selling-products",
    element: (
      <PrivateRoute allowedRoles={["agent"]}>
        <AgentSellingProducts />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/agent/product/add",
    element: (
      <PrivateRoute allowedRoles={["agent"]}>
        <AgentProductAdd />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/agent/product/:productId",
    element: (
      <PrivateRoute allowedRoles={["agent"]}>
        <AgentProductDetail />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/agent/customers",
    element: (
      <PrivateRoute allowedRoles={["agent"]}>
        <AgentCustomers />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/agent/orders",
    element: (
      <PrivateRoute allowedRoles={["agent"]}>
        <AgentOrders />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/agent/commissions",
    element: (
      <PrivateRoute allowedRoles={["agent"]}>
        <AgentCommissions />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/agent/settings",
    element: (
      <PrivateRoute allowedRoles={["agent"]}>
        <AgentSettings />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  // Customer Routes
  {
    path: "/dashboard/customer",
    element: (
      <PrivateRoute allowedRoles={["customer"]}>
        <CustomerDashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/customer/catalog",
    element: (
      <PrivateRoute allowedRoles={["customer"]}>
        <CustomerCatalog />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/customer/product/:productId",
    element: (
      <PrivateRoute allowedRoles={["customer"]}>
        <CustomerProductDetail />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/customer/cart",
    element: (
      <PrivateRoute allowedRoles={["customer"]}>
        <CustomerCart />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/customer/checkout",
    element: (
      <PrivateRoute allowedRoles={["customer"]}>
        <Checkout />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/customer/orders",
    element: (
      <PrivateRoute allowedRoles={["customer"]}>
        <CustomerOrders />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/customer/payments",
    element: (
      <PrivateRoute allowedRoles={["customer"]}>
        <CustomerPayments />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/customer/settings",
    element: (
      <PrivateRoute allowedRoles={["customer"]}>
        <CustomerSettings />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/customer/rewards",
    element: (
      <PrivateRoute allowedRoles={["customer"]}>
        <CustomerRewards />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/customer/order-tracking",
    element: (
      <PrivateRoute allowedRoles={["customer"]}>
        <CustomerOrderTracking />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  // Catch all route - redirect to home
  {
    path: "*",
    element: <Navigate to="/" replace />,
    errorElement: <ErrorBoundary />,
  },
]); 