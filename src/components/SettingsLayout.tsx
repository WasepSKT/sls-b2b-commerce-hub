import { Link } from "react-router-dom";

interface SettingsLayoutProps {
  children: React.ReactNode;
  role: "admin" | "principal" | "agent" | "customer";
  pageTitle: string;
}

const SettingsLayout = ({ children, role, pageTitle }: SettingsLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to={`/dashboard/${role}`} className="text-xl font-bold">
                SLS B2B
              </Link>
              <nav className="hidden md:flex items-center gap-4">
                <Link
                  to={`/dashboard/${role}`}
                  className="text-gray-600 hover:text-primary"
                >
                  Dashboard
                </Link>
                <Link
                  to={`/dashboard/${role}/settings`}
                  className="text-gray-600 hover:text-primary"
                >
                  Settings
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, User</span>
              <button className="text-sm text-gray-600 hover:text-primary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{pageTitle}</h1>
          </div>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © 2024 SLS B2B Commerce Hub. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link to="/terms" className="text-sm text-gray-600 hover:text-primary">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SettingsLayout; 