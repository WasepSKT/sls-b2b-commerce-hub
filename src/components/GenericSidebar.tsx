import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui";
import { useTheme } from "@/lib/store/theme";
import { menuConfig, getRoleName, MenuItem } from "@/lib/config/menu";

interface GenericSidebarProps {
  role: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

const GenericSidebar = ({ role, collapsed = false, onCollapse }: GenericSidebarProps) => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const handleCollapse = () => {
    const newCollapsed = !collapsed;
    onCollapse?.(newCollapsed);
  };

  // Group menu items by section (divider)
  const navLinks: MenuItem[] = menuConfig[role] || [];
  let sections: { name: string; items: MenuItem[]; icon: any }[] = [];
  let currentSection: { name: string; items: MenuItem[]; icon: any } | null = null;
  let preSectionItems: MenuItem[] = [];
  navLinks.forEach((item) => {
    if (item.divider) {
      if (currentSection) sections.push(currentSection);
      currentSection = { name: item.name, items: [], icon: item.icon };
    } else if (currentSection) {
      currentSection.items.push(item);
    } else {
      preSectionItems.push(item);
    }
  });
  if (currentSection) sections.push(currentSection);

  const handleToggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  // Auto-expand section with active item
  React.useEffect(() => {
    sections.forEach((section) => {
      if (section.items.some((item) => location.pathname === item.href)) {
        if (!expandedSections.includes(section.name)) {
          setExpandedSections((prev) => [...prev, section.name]);
        }
      }
    });
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r transition-all duration-300 ease-in-out",
        isDarkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200",
        collapsed ? "w-20 items-center" : "w-64"
      )}
    >
      <div className="h-full flex flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <div className={cn(
          "flex h-16 items-center justify-between py-3 border-b sticky top-0 z-10 backdrop-blur-sm",
          collapsed ? "px-2" : "px-4 md:px-6",
          isDarkMode ? "border-gray-700 bg-gray-800/95" : "border-gray-200 bg-white/95"
        )}>
          {!collapsed && (
            <Link to={`/dashboard/${role}`} className="flex items-center h-full">
              <span className={cn(
                "text-2xl font-semibold tracking-tight leading-none",
                isDarkMode ? "text-white" : "text-primary"
              )}>SLS-B2B</span>
            </Link>
          )}
          <button
            onClick={handleCollapse}
            className={cn(
              collapsed ? "p-2.5" : "p-2",
              "rounded-md transition-colors",
              isDarkMode
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-100 text-gray-600",
              collapsed ? "mx-auto" : ""
            )}
          >
            {collapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            )}
          </button>
        </div>

        {/* Role info */}
        {!collapsed && (
          <div className={cn(
            "px-4 py-3 border-b",
            isDarkMode ? "border-gray-700" : "border-gray-200"
          )}>
            <p className={cn(
              "text-sm font-medium",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}>Login sebagai</p>
            <p className={cn(
              "text-sm font-semibold",
              isDarkMode ? "text-gray-200" : "text-gray-900"
            )}>{getRoleName(role)}</p>
          </div>
        )}
        {collapsed && (
          <div className={cn(
            "px-2 py-4 border-b flex justify-center",
            isDarkMode ? "border-gray-700" : "border-gray-200"
          )}>
            <div className={cn(
              "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-sm font-bold",
              isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"
            )}>
              {getRoleName(role).charAt(0)}
            </div>
          </div>
        )}

        {/* Menu */}
        <nav className={cn(
          "flex-1 py-4 min-w-0",
          collapsed ? "px-1 items-center flex flex-col w-full" : "px-2"
        )}>
          <ul className={cn(
            "space-y-1",
            collapsed && "w-full flex flex-col items-center"
          )}>
            {/* Pre-section items (e.g. Dashboard) */}
            {preSectionItems.map((item) => (
              <li key={item.name} className={cn("mb-2", collapsed && "w-full flex justify-center")}>
                <Link
                  to={item.href}
                  className={cn(
                    "rounded-md text-sm font-medium transition-all duration-200",
                    collapsed ? "w-full flex justify-center items-center p-2" : "flex items-center px-3 py-2",
                    location.pathname === item.href
                      ? isDarkMode
                        ? "bg-gray-700 text-white shadow-sm"
                        : "bg-primary text-white shadow-sm"
                      : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-sm"
                        : "text-gray-700 hover:bg-gray-100 hover:text-primary hover:shadow-sm"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className={cn(
                    "transition-transform duration-200 hover:scale-110",
                    collapsed ? "h-6 w-6 mx-auto block" : "h-5 w-5 mr-2"
                  )} />
                  {!collapsed && <span className="transition-all duration-200">{item.name}</span>}
                </Link>
              </li>
            ))}
            {/* Sectioned items */}
            {sections.map((section) => (
              <div key={section.name}>
                <li className={cn("mt-6 mb-2", collapsed && "w-full flex justify-center")}>
                  {!collapsed ? (
                    <button
                      onClick={() => handleToggleSection(section.name)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 text-sm font-medium tracking-wider rounded-lg transition-all duration-200 hover:shadow-sm",
                        isDarkMode
                          ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/80"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <section.icon className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                        {section.name}
                      </span>
                      <span className={cn(
                        "transition-transform duration-200",
                        expandedSections.includes(section.name) ? "rotate-0" : "-rotate-90"
                      )}>
                        <ChevronDown className="h-3 w-3" />
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggleSection(section.name)}
                      className={cn(
                        "rounded-md text-sm font-medium transition-all duration-200",
                        "w-full flex justify-center items-center p-2",
                        isDarkMode
                          ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/80"
                      )}
                      title={section.name}
                    >
                      <section.icon className="h-6 w-6 transition-transform duration-200 hover:scale-110 mx-auto block" />
                    </button>
                  )}
                </li>
                {/* Section items */}
                {!collapsed && expandedSections.includes(section.name) && (
                  section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center px-3 py-2 ml-4 rounded-md text-sm font-medium transition-all duration-200",
                          location.pathname === item.href
                            ? isDarkMode
                              ? "bg-gray-700 text-white shadow-sm"
                              : "bg-primary text-white shadow-sm"
                            : isDarkMode
                              ? "text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-sm"
                              : "text-gray-700 hover:bg-gray-100 hover:text-primary hover:shadow-sm"
                        )}
                      >
                        <item.icon className="h-5 w-5 mr-3 transition-transform duration-200 hover:scale-110" />
                        <span className="transition-all duration-200">{item.name}</span>
                      </Link>
                    </li>
                  ))
                )}
                {/* Collapsed section items */}
                {collapsed && expandedSections.includes(section.name) && (
                  <div className="space-y-1 w-full flex flex-col items-center">
                    {section.items.map((item) => (
                      <li key={item.name} className="w-full flex justify-center">
                        <Link
                          to={item.href}
                          className={cn(
                            "rounded-md text-sm font-medium transition-all duration-200 w-full flex justify-center items-center p-2",
                            location.pathname === item.href
                              ? isDarkMode
                                ? "bg-gray-700 text-white shadow-sm"
                                : "bg-primary text-white shadow-sm"
                              : isDarkMode
                                ? "text-gray-300 hover:bg-gray-700 hover:text-white hover:shadow-sm"
                                : "text-gray-700 hover:bg-gray-100 hover:text-primary hover:shadow-sm"
                          )}
                          title={item.name}
                        >
                          <item.icon className="h-6 w-6 transition-transform duration-200 hover:scale-110 mx-auto block" />
                        </Link>
                      </li>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </ul>
        </nav>

        {/* Logout button */}
        <div className={cn(
          "py-4 border-t",
          collapsed ? "px-1" : "px-2",
          isDarkMode ? "border-gray-700" : "border-gray-200"
        )}>
          <Link to="/">
            <Button
              variant="destructive"
              className={cn(
                "w-full transition-colors duration-300",
                collapsed ? "justify-center p-2" : "justify-start",
                isDarkMode
                  ? "bg-red-900 hover:bg-red-800 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              )}
            >
              <LogOut className={cn(
                collapsed ? "h-6 w-6" : "h-5 w-5",
                !collapsed && "mr-2",
                "hover:scale-110 transition-transform duration-200"
              )} />
              {!collapsed && "Keluar"}
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default GenericSidebar; 