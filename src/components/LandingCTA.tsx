
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingCTA = () => {
  return (
    <div className="bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tingkatkan Bisnis UMKM Anda
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
            Otomatisasi proses distribusi, tingkatkan efisiensi, dan kembangkan jaringan B2B Anda dengan platform kami.
          </p>
        </div>
        <div className="mt-10 flex justify-center gap-x-6">
          <Link to="/register">
            <Button size="lg" className="bg-white text-primary hover:bg-primary-50">
              Daftar Sekarang
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-primary-700">
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingCTA;
