import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Process from "@/components/Process";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col w-full">
      {/* Introduction Space */}
      <section id="home" className="flex flex-col items-center justify-center min-h-[90vh]">
        <Hero />
      </section>



      {/* Projects Section */}
      <section id="projects" className="flex items-center justify-center border-t border-white/5 py-12 md:py-16">
        <Projects />
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center border-t border-white/5 py-16 md:py-28">
        <Skills />
      </section>

      {/* Process Section */}
      <section id="process" className="min-h-screen flex items-center justify-center border-t border-white/5 py-16 md:py-28">
        <Process />
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center border-t border-white/5 py-16 md:py-28">
        <Experience />
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-16 md:py-32">
        <Contact />
      </section>
    </main>
  );
}
