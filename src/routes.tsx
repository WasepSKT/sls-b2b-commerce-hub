import { createBrowserRouter, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import About from "@/pages/About";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminUsers from "@/pages/AdminUsers";
import AdminSettings from "@/pages/AdminSettings";
import AdminSecurity from "@/pages/AdminSecurity";
import AdminDatabase from "@/pages/AdminDatabase";
import AdminWebsite from "@/pages/AdminWebsite";
import AdminNews from "@/pages/AdminNews";
import AdminNewsCreate from "@/pages/AdminNewsCreate";
import AdminWhatsapp from "@/pages/AdminWhatsapp";
import AdminWhatsappBlastCreate from "@/pages/AdminWhatsappBlastCreate";
import AdminNotifications from "@/pages/AdminNotifications";
import PrincipalDashboard from "@/pages/PrincipalDashboard";
import AgentDashboard from "@/pages/AgentDashboard";
import CustomerDashboard from "@/pages/CustomerDashboard";
import { PrivateRoute } from "@/components/PrivateRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import AdminWhatsappTemplateCreate from "@/pages/AdminWhatsappTemplateCreate";
import AdminNewsCampaignCreate from "@/pages/AdminNewsCampaignCreate";

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
    path: "/principal",
    element: (
      <PrivateRoute allowedRoles={["principal"]}>
        <PrincipalDashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  // Agent Routes
  {
    path: "/agent",
    element: (
      <PrivateRoute allowedRoles={["agent"]}>
        <AgentDashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  // Customer Routes
  {
    path: "/customer",
    element: (
      <PrivateRoute allowedRoles={["customer"]}>
        <CustomerDashboard />
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