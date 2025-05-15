
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingHero = () => {
  return (
    <div 
      className="relative py-20 sm:py-28 lg:py-36 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(15, 76, 129, 0.9), rgba(20, 184, 166, 0.7)), url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')`
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">Sistem Distribusi UMKM</span>
            <span className="block text-primary-100 mt-2">SLS to B2B Model</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-white/90">
            Platform digital lengkap untuk UMKM dengan model distribusi Single Level Selling (SLS) 
            untuk melakukan penjualan produk ke pelanggan B2B secara otomatis dan efisien.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link to="/register">
              <Button size="lg" variant="default" className="px-8 py-6 text-lg bg-white text-primary hover:bg-primary-50">
                Mulai Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg text-white border-white hover:bg-white/20">
                Pelajari Fitur
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Abstract shapes overlay */}
      <div className="absolute top-1/2 right-5 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-r from-secondary/30 to-primary/30 blur-3xl"></div>
      <div className="absolute top-1/4 left-10 -translate-y-1/2 h-40 w-40 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-3xl"></div>
    </div>
  );
};

export default LandingHero;
