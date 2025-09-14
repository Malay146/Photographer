import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import MouseFollower from "./components/MouseFollower";
import Loader from "./components/Loader";
import "./index.css"

const App = () => {
  useEffect(() => {
    // Register plugin once
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // adjust smoothness (default: 1.2)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // custom easing
      smoothWheel: true,
      smoothTouch: false,
    });

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker -> drives Lenis raf
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP gives time in sec, Lenis needs ms
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full relative">
      <Loader />
      <MouseFollower size={40} color="white" hoverScale={2} zIndex={99} opacity={0.8}/>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
