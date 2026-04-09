import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Overview } from "@/components/sections/overview";
import { Clients } from "@/components/sections/clients";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Team } from "@/components/sections/team";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { SpatialBackground } from "@/components/SpatialBackground";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <SpatialBackground />
      <main className="flex min-h-screen flex-col selection:bg-[#3B82F6]/30">
        <Navbar />
        <Hero />
        <Overview />
        <Clients />
        <Services />
        <Projects />
        <Team />
        <Contact />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
}
