import GenericSidebar from "./GenericSidebar";

interface SidebarProps {
  role: "principal" | "agent" | "customer" | "distributor" | "reseller";
}

const DashboardSidebar = ({ role }: SidebarProps) => {
  return <GenericSidebar role={role} />;
};

export default DashboardSidebar;
