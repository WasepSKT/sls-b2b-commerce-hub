
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            <span className="block">Sistem Distribusi UMKM</span>
            <span className="block text-secondary mt-2">SLS to B2B Model</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-600">
            Platform digital lengkap untuk UMKM dengan model distribusi Single Level Selling (SLS) 
            untuk melakukan penjualan produk ke pelanggan B2B secara otomatis dan efisien.
          </p>
          <div className="mt-8 flex justify-center gap-x-4">
            <Link to="/register">
              <Button size="lg" className="px-8 py-6 text-lg">
                Mulai Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                Pelajari Fitur
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative blob shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 transform text-primary-50/20">
        <svg
          width="404"
          height="404"
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" className="text-primary-500" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 transform text-secondary-500/20">
        <svg
          width="404"
          height="404"
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa28"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" className="text-secondary-500" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa28)" />
        </svg>
      </div>
    </div>
  );
};

export default LandingHero;
