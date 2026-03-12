import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Footer } from "@/components/sections/footer";
import { SpatialBackground } from "@/components/SpatialBackground";

export default function Home() {
  return (
    <>
      <SpatialBackground />
      <main className="flex min-h-screen flex-col selection:bg-[#3B82F6]/30">
        <Navbar />
        <Hero />
        <Services />
        <Footer />
      </main>
    </>
  );
}
