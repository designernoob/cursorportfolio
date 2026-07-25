import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Work from "../components/Work";
import About from "../components/About";
import Beyond from "../components/Beyond";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { scrollToId } from "../lib/scroll";

export default function Home({ ready }: { ready: boolean }) {
  const location = useLocation();

  // When arriving from another page with a target section, scroll to it.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      const t = setTimeout(() => scrollToId(target), 250);
      return () => clearTimeout(t);
    }
  }, [location.state]);

  return (
    <>
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Work />
        <About />
        <Beyond />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
