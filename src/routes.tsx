
import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicEcommerce from "@/pages/PublicEcommerce";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import About from "@/pages/Index"; // Landing page moved to /about
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
import ResellerProductDetail from "@/pages/reseller/ResellerProductDetail";

// Route config
const routes = createBrowserRouter([
  {
    path: "/",
    element: <About />,
  },
  {
    path: "/dashboard/reseller/product/:productId",
    element: <ResellerProductDetail />,
  }
]);
import PrincipalDashboard from "@/pages/principal/PrincipalDashboard";
import PrincipalProducts from "@/pages/principal/PrincipalProducts";
import PublicProductDetail from "@/pages/PublicProductDetail";
import PrincipalSettings from "@/pages/principal/PrincipalSettings";
import PrincipalAgents from "@/pages/principal/PrincipalAgents";
import PrincipalCustomers from "@/pages/principal/PrincipalCustomers";
import PrincipalOrders from "@/pages/principal/PrincipalOrders";
import PrincipalReports from "@/pages/principal/PrincipalReports";
import AgentDashboard from "@/pages/agent/AgentDashboard";
import CustomerDashboard from "@/pages/customer/CustomerDashboard";
import { PrivateRoute } from "@/components/PrivateRoute";
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
import DistributorDashboard from "@/pages/distributor/DistributorDashboard";
import DistributorProducts from "@/pages/distributor/DistributorProducts";
import DistributorInventory from "@/pages/distributor/DistributorInventory";
import DistributorAgents from "@/pages/distributor/DistributorAgents";
import DistributorOrders from "@/pages/distributor/DistributorOrders";
import DistributorReports from "@/pages/distributor/DistributorReports";
import DistributorSettings from "@/pages/distributor/DistributorSettings";
import SharedLayout from "@/components/SharedLayout";
import ResellerDashboard from "@/pages/reseller/ResellerDashboard";
import ResellerProfile from "@/pages/reseller/ResellerProfile";
import ResellerCatalog from "@/pages/reseller/ResellerCatalog";
import ResellerCart from "@/pages/reseller/ResellerCart";
import ResellerCheckout from "@/pages/reseller/ResellerCheckout";
import ResellerOrderTracking from "@/pages/reseller/ResellerOrderTracking";
import ResellerOrderHistory from "@/pages/reseller/ResellerOrderHistory";
import ResellerSalesDashboard from "@/pages/reseller/ResellerSalesDashboard";
import ResellerCommissionReport from "@/pages/reseller/ResellerCommissionReport";
import ResellerSettings from "@/pages/reseller/ResellerSettings";
import AgentDirectory from "@/pages/reseller/AgentDirectory";
import ResellerShopping from "@/pages/reseller/ResellerShopping";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicEcommerce />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/product/:productId",
    element: <PublicProductDetail />,
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
        <SharedLayout role="principal" />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <PrincipalDashboard /> },
      { path: "products", element: <PrincipalProducts /> },
      { path: "agents", element: <PrincipalAgents /> },
      { path: "customers", element: <PrincipalCustomers /> },
      { path: "orders", element: <PrincipalOrders /> },
      { path: "reports", element: <PrincipalReports /> },
      { path: "settings", element: <PrincipalSettings /> },
    ],
  },
  // Distributor Routes
  {
    path: "/dashboard/distributor",
    element: (
      <PrivateRoute allowedRoles={["distributor"]}>
        <SharedLayout role="distributor" />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <DistributorDashboard /> },
      { path: "products", element: <DistributorProducts /> },
      { path: "inventory", element: <DistributorInventory /> },
      { path: "agents", element: <DistributorAgents /> },
      { path: "orders", element: <DistributorOrders /> },
      { path: "reports", element: <DistributorReports /> },
      { path: "settings", element: <DistributorSettings /> },
    ],
  },
  // Agent Routes
  {
    path: "/dashboard/agent",
    element: (
      <PrivateRoute allowedRoles={["agent"]}>
        <SharedLayout role="agent" />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <AgentDashboard /> },
      { path: "catalog", element: <AgentCatalog /> },
      { path: "selling-products", element: <AgentSellingProducts /> },
      { path: "product/add", element: <AgentProductAdd /> },
      { path: "product/:productId", element: <AgentProductDetail /> },
      { path: "customers", element: <AgentCustomers /> },
      { path: "orders", element: <AgentOrders /> },
      { path: "commissions", element: <AgentCommissions /> },
      { path: "settings", element: <AgentSettings /> },
    ],
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
  // Reseller Routes
  {
    path: "/dashboard/reseller",
    element: (
      <PrivateRoute allowedRoles={["reseller"]}>
        <SharedLayout role="reseller" />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <ResellerDashboard /> },
      { path: "catalog", element: <ResellerCatalog /> },
      { path: "cart", element: <ResellerCart /> },
      { path: "checkout", element: <ResellerCheckout /> },
      { path: "order-tracking", element: <ResellerOrderTracking /> },
      { path: "order-history", element: <ResellerOrderHistory /> },
      { path: "sales-dashboard", element: <ResellerSalesDashboard /> },
      { path: "commission-report", element: <ResellerCommissionReport /> },
      { path: "settings", element: <ResellerSettings /> },
      { path: "agent-directory", element: <AgentDirectory /> },
      { path: "shopping", element: <ResellerShopping /> },
    ],
  },
  // Catch all route - redirect to home
  {
    path: "*",
    element: <Navigate to="/" replace />,
    errorElement: <ErrorBoundary />,
  },
]);