import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Gallery from '@/components/sections/Gallery';
import Benefits from '@/components/sections/Benefits';
import Reviews from '@/components/sections/Reviews';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Benefits />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
