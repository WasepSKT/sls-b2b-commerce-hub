
import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/LandingHero";
import LandingFeatures from "@/components/LandingFeatures";
import LandingUserRoles from "@/components/LandingUserRoles";
import LandingCTA from "@/components/LandingCTA";
import LandingFooter from "@/components/LandingFooter";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-grow">
        <LandingHero />
        <LandingFeatures />
        <LandingUserRoles />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Index;
