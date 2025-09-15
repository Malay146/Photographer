import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "../index.css"

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const overlayRef = useRef(null);

  useGSAP(() => {
    const images = Array.from(document.images);
    const totalImages = images.length;

    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const percent = Math.round((loadedCount / (totalImages + 1)) * 100);
      setProgress(percent);

      if (percent === 100) {
        gsap.to(overlayRef.current, {
          y: "-100%",
          duration: 1,
          ease: "power4.inOut",
          delay: 0.5,
        });
      }
    };

    // Load fonts too
    document.fonts.ready.then(() => {
      updateProgress();
    });

    // Track images
    if (totalImages === 0) {
      updateProgress();
    } else {
      images.forEach((img) => {
        if (img.complete) {
          updateProgress();
        } else {
          img.addEventListener("load", updateProgress);
          img.addEventListener("error", updateProgress);
        }
      });
    }
  }, []);

return (
    <div ref={overlayRef} className="loader-overlay fixed inset-0 bg-black flex items-center justify-center z-[9999] px-4">
        <h1
            className="text-white font-play font-bold leading-tight text-4xl text-center
                                 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[7rem]"
            aria-live="polite"
        >
            {progress}%
        </h1>
    </div>
);
};

export default Loader;
