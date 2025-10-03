import React, { useState, useRef, useCallback } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SplitText from "./SplitText";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef(null);
  const tl = useRef(null);

  // Create GSAP timeline once
  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });
    tl.current.to(overlayRef.current, {
      y: 0,
      duration: 0.8,
      ease: "power4.out",
    });
  }, []);

  // Play or reverse the timeline when menuOpen changes
  useGSAP(() => {
    if (menuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, { dependencies: [menuOpen] });

  // Toggle menu
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(
    (path) => {
      // Navigate right away
      navigate(path);

      // Then close menu with animation
      tl.current.reverse();

      // After reverse finishes, reset state
      tl.current.eventCallback("onReverseComplete", () => {
        setMenuOpen(false);
      });
    },
    [navigate]
  );

  return (
    <>
      {/* Floating Menu Button */}
      <button
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        className="
          fixed
          top-4 sm:top-6 md:top-8
          left-1/2
          -translate-x-1/2
          z-[999]
          w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
          flex justify-center items-center
          bg-black border-2 rounded-full cursor-pointer
        "
      >
        {menuOpen ? (
          <IoClose className="text-white text-3xl sm:text-4xl md:text-5xl" />
        ) : (
          <IoMenu className="text-white text-3xl sm:text-4xl md:text-5xl" />
        )}
      </button>

      {/* Overlay Menu */}

      <div
        ref={overlayRef}
        className="w-full h-screen fixed bg-zinc-950 z-40 overflow-hidden translate-y-[-100%] will-change-transform"
      >
        <div className="w-full h-[90%] flex flex-col justify-center items-center gap-10 font-lato 2xl:text-9xl lg:text-8xl md:text-7xl sm:text-7xl text-5xl text-white font-bold tracking-tight">
          <SplitText
            splitType="chars"
            stagger={0.05}
            onClick={() => handleNavigate("/")}
          >
            <span className="cursor-pointer">HOME</span>
          </SplitText>
          <SplitText
            splitType="chars"
            stagger={0.05}
            onClick={() => handleNavigate("/gallery")}
          >
            <span className="cursor-pointer">GALLERY</span>
          </SplitText>
          <SplitText
            splitType="chars"
            stagger={0.05}
            onClick={() => handleNavigate("/contact")}
          >
            <span className="cursor-pointer">LET&apos;S CONNECT</span>
          </SplitText>
        </div>
        <div className="text-white uppercase font-lato w-full flex justify-evenly flex-wrap gap-4 text-balance items-center">
          <SplitText splitType="words">
            <span>Instagram</span>
          </SplitText>
          <SplitText splitType="words">
            <span>youtube</span>
          </SplitText>
          <SplitText splitType="words">
            <span>facebook</span>
          </SplitText>
          <SplitText splitType="words">
            <span>shutterstock</span>
          </SplitText>
          <SplitText splitType="words">
            <span>reddit</span>
          </SplitText>
        </div>
      </div>
    </>
  );
};

export default Navbar;
