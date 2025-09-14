/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

const SplitText = ({
  children,
  as: Tag = "span",
  className = "",
  duration = 0.4,
  ease = "power2.out",
  delay = 0,
  splitType = "chars",
  stagger = 0.02,
  elastic = false, // boolean | number (0-1) | { amplitude, period }
  ...props // ✅ catch extra props (like onClick)
}) => {
  const wrapperRef = useRef(null);
  const splitRefs = useRef([]);

  useEffect(() => {
    const el = wrapperRef.current;
    const first = el.querySelector(".original");
    const second = el.querySelector(".duplicate");

    const split1 = new SplitType(first, { types: splitType });
    const split2 = new SplitType(second, { types: splitType });

    splitRefs.current = [split1, split2];

    const applyInlineBlock = (targets) => {
      if (targets)
        gsap.set(targets, { display: "inline-block", willChange: "transform" });
    };
    applyInlineBlock(split1[splitType]);
    applyInlineBlock(split2[splitType]);

    gsap.set(split2[splitType], { yPercent: 100 });

    // Compute easing
    let animationEase = ease;

    if (elastic) {
      if (typeof elastic === "number") {
        const amp = elastic > 1 ? elastic / 100 : elastic;
        animationEase = `elastic.out(${Math.max(0.1, amp)}, 0.3)`;
      } else if (typeof elastic === "object") {
        const amp = elastic.amplitude ?? 1;
        const period = elastic.period ?? 0.3;
        animationEase = `elastic.out(${amp}, ${period})`;
      } else {
        animationEase = "elastic.out(1, 0.3)";
      }
    }

    const handleEnter = () => {
      gsap.to(split1[splitType], {
        yPercent: -100,
        duration,
        ease: animationEase,
        delay,
        stagger,
      });
      gsap.to(split2[splitType], {
        yPercent: 0,
        duration,
        ease: animationEase,
        delay,
        stagger,
      });
    };

    const handleLeave = () => {
      gsap.to(split1[splitType], {
        yPercent: 0,
        duration,
        ease: animationEase,
        delay,
        stagger,
      });
      gsap.to(split2[splitType], {
        yPercent: 100,
        duration,
        ease: animationEase,
        delay,
        stagger,
      });
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      split1.revert();
      split2.revert();
    };
  }, [duration, ease, delay, splitType, stagger, elastic]);

  return (
    <Tag
      ref={wrapperRef}
      className={`relative inline-block overflow-hidden cursor-pointer ${className}`}
      {...props} // ✅ now onClick works
    >
      <span className="original block">{children}</span>
      <span className="duplicate absolute left-0 top-0 block">{children}</span>
    </Tag>
  );
};

export default SplitText;
