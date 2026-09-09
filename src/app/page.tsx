import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import InfraStack from "@/components/InfraStack";
import ServiceCatalog from "@/components/ServiceCatalog";
import SkillsTools from "@/components/SkillsTools";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";

export default function Home() {
  return (
    <>
      <Particles />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <AboutMe />
        <ArchitectureDiagram />
        <InfraStack />
        <ServiceCatalog />
        <SkillsTools />
      </main>
      <Footer />
    </>
  );
}
