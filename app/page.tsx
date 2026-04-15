import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Process from "@/components/Process";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col w-full relative">
      {/* Introduction Space */}
      <section id="home" className="flex flex-col items-center justify-center min-h-[95vh]">
        <Hero />
      </section>

      {/* Spacing and Section Continuity is handled by the high-fidelity headers within components */}
      
      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-24 md:py-40">
        <About />
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-24 md:py-40">
        <Projects />
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center py-24 md:py-40">
        <Skills />
      </section>

      {/* Process Section */}
      <section id="process" className="min-h-screen flex items-center justify-center py-24 md:py-40">
        <Process />
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center py-24 md:py-40">
        <Experience />
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center pt-24 md:pt-40">
        <Contact />
      </section>
    </main>
  );
}
