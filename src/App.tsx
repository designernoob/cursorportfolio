import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useLenis } from "./lib/useLenis";
import Grain from "./components/Grain";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis(loaded);

  return (
    <BrowserRouter>
      <Grain />
      <Preloader onDone={() => setLoaded(true)} />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home ready={loaded} />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
