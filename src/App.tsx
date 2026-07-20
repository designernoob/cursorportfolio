import { useState } from "react";
import { useLenis } from "./lib/useLenis";
import Cursor from "./components/Cursor";
import Grain from "./components/Grain";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Work from "./components/Work";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis(loaded);

  return (
    <>
      <Grain />
      <Cursor />
      <Preloader onDone={() => setLoaded(true)} />

      <Nav ready={loaded} />

      <main>
        <Hero ready={loaded} />
        <Marquee />
        <Work />
        <About />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
