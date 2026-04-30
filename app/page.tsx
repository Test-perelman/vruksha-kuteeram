import AboutSection from '@/components/AboutSection';
import ClientsMarquee from '@/components/ClientsMarquee';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectsSection />
        <ClientsMarquee />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
