import React, { useRef } from "react";
import "../index.css";
import Footer from "../components/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {
  const tiltRef = useRef(null);

  const handleMouseMove = (e) => {
    const tilt = tiltRef.current;
    const rect = tilt.getBoundingClientRect();
    const x = e.clientX - rect.left; // cursor X inside tilt
    const y = e.clientY - rect.top; // cursor Y inside tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10; // max 10°
    const rotateY = ((x - centerX) / centerX) * 10;

    tilt.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    tiltRef.current.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  const plane4 = useRef(null);
  const plane5 = useRef(null);
  const plane6 = useRef(null);
  const plane7 = useRef(null);

  const speed = 0.07;
  let rafId = null;
  let pendingX = 0;
  let pendingY = 0;
  const updatePlanes = () => {
    gsap.set(plane1.current, { x: `+=${pendingX * speed}`, y: `+=${pendingY * speed}` });
    gsap.set(plane2.current, { x: `+=${pendingX * speed * 0.25}`, y: `+=${pendingY * speed * 0.25}` });
    gsap.set(plane3.current, { x: `+=${pendingX * speed}`, y: `+=${pendingY * speed}` });
    gsap.set(plane4.current, { x: `+=${pendingX * speed * 0.5}`, y: `+=${pendingY * speed * 0.5}` });
    gsap.set(plane5.current, { x: `+=${pendingX * speed * 0.25}`, y: `+=${pendingY * speed * 0.25}` });
    gsap.set(plane6.current, { x: `+=${pendingX * speed}`, y: `+=${pendingY * speed}` });
    gsap.set(plane7.current, { x: `+=${pendingX * speed * 0.5}`, y: `+=${pendingY * speed * 0.5}` });
    rafId = null;
  };
  const manageMouseMove = (e) => {
    pendingX = e.movementX;
    pendingY = e.movementY;
    if (rafId == null) rafId = requestAnimationFrame(updatePlanes);
  };

  useGSAP(() => {
    // nothing to initialize on mount yet, but hook ensures GSAP context cleanup if added later
  }, []);

  const cards = [
    {
      image:
        "./s-1.webp",
      date: "August 17, 2023 – 5:42 AM",
      title: "Whispers of the Peaks",
      paragraphs: [
        "The first light of dawn crept across the horizon, painting the mountains in shades of fire and gold. Mist curled around their jagged edges like ancient secrets refusing to be told. Each peak stood like a silent guardian, weathered by storms yet unbroken, whispering of resilience etched into stone.",
        "The valley below stirred awake, rivers glistening like molten silver as they carved their way through the earth’s embrace. Birds broke the silence with songs that echoed across the cliffs, as though celebrating the return of light. The air was crisp, carrying the scent of pine and damp soil, grounding the soul in nature’s quiet majesty.",
      ],
      reverse: false,
      datePosition: "right",
    },
    {
      image:
        "./s-2.webp",
      date: "September 4, 2023 – 7:15 PM",
      title: "Echoes in the Rain",
      paragraphs: [
        "The city drowned in silver droplets, each raindrop carrying fragments of forgotten conversations. Neon lights blurred into rivers on the pavement, and footsteps hurried yet lingered, as if every passerby carried a secret only the storm could hear.",
        "Umbrellas bloomed like fragile shields against the night, their colors reflecting in the glowing puddles that stretched across every street corner. The air tasted of electricity and longing, heavy with the promise of something unfinished. Somewhere in the distance, a saxophone’s mournful cry bled through the rain, weaving with the rhythm of water cascading from rooftops.",
      ],
      reverse: true,
      datePosition: "left",
    },
    {
      image: "./s-3.webp",
      date: "January 9, 2024 – 6:28 AM",
      title: "Silent Horizon",
      paragraphs: [
        "The sea stretched endlessly, a mirror of molten silver under the morning sky. A lone gull carved through the air, its cry swallowed by the horizon’s silence. For a fleeting moment, time felt paused, as if the world held its breath.",
        "Waves rolled in slow, deliberate motions, their edges kissed with foam that shimmered like fragments of glass. The salt-laden breeze carried whispers of ancient tides, secrets of sailors and forgotten journeys that once traced these very waters.",
        "On the shoreline, the sand gleamed with dew, tiny pearls scattered by the night, now surrendering to the warmth of the rising sun. Each ripple across the surface of the sea felt like a heartbeat, steady and eternal, echoing the rhythm of something greater than memory or name.",
      ],
      reverse: false,
      datePosition: "right",
    },
  ];

  return (
    <>
      {/* Main Section */}
      <div
        onMouseMove={(e) => {
          manageMouseMove(e);
        }}
        className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden relative px-4 sm:px-6 lg:px-8"
      >
        <div className="font-noto font-semibold text-black text-3xl sm:text-5xl md:text-[48px] lg:text-5xl xl:text-6xl 2xl:text-7xl text-center mb-8">
          <h1>Capturing Moments,</h1>
          <h1>Creating Memories</h1>
        </div>

        {/* Hidden on mobile, visible from medium screens up */}
          <img
            ref={plane1}
            className="hidden md:block absolute bg-zinc-500 h-[150px] w-[225px] top-[10%] left-[20%] object-cover will-change-transform plane1"
            src="./gardner.webp"
            alt="Portrait photography showcasing dramatic lighting and composition"
            loading="eager"
            fetchPriority="high"
          />
          <img
            ref={plane2}
            className="hidden md:block absolute bg-zinc-500 h-[100px] w-[175px] top-[16%] left-[50%] object-cover will-change-transform plane2"
            src="./empire.webp"
            alt="Creative photography example demonstrating artistic vision"
            loading="lazy"
            fetchPriority="low"
          />
          <img
            ref={plane3}
            className="hidden md:block absolute bg-zinc-500 h-[200px] w-[165px] top-[15%] left-[72%] object-cover will-change-transform plane3"
            src="./waves.webp"
            alt="Professional headshot photography sample"
            loading="lazy"
            fetchPriority="low"
          />
          <img
            ref={plane4}
            className="hidden md:block absolute bg-zinc-500 h-[140px] w-[225px] top-[60%] left-[61%] object-cover will-change-transform plane4"
            src="./girl.webp"
            alt="Event photography capturing candid moments"
            loading="lazy"
            fetchPriority="low"
          />
          <img
            ref={plane5}
            className="hidden md:block absolute bg-zinc-500 h-[175px] w-[140px] top-[63%] left-[42%] object-cover will-change-transform plane5"
            src="./building.webp"
            alt="Nature photography showcasing outdoor scenes"
            loading="lazy"
            fetchPriority="low"
          />
          <img
            ref={plane6}
            className="hidden md:block absolute bg-zinc-500 h-[100px] w-[100px] top-[61%] left-[28%] object-cover will-change-transform plane6"
            src="./3-building.webp"
            alt="Commercial photography for business needs"
            loading="lazy"
            fetchPriority="low"
          />
          <img
            ref={plane7}
            className="hidden md:block absolute bg-zinc-500 h-[125px] w-[200px] top-[43%] left-[5%] object-cover will-change-transform plane7"
            src="./boat-girl.webp"
            alt="Wedding photography capturing special moments"
            loading="lazy"
            fetchPriority="low"
          />

          {/* Mobile-only single image */}
        <div className="md:hidden w-full max-w-sm h-[300px] rounded-lg overflow-hidden mt-4">
          <img
            src="./gardner.webp"
            className="w-full h-full object-cover"
            alt="Featured photography"
            loading="lazy"
            fetchPriority="low"
          />
        </div>
      </div>

      {/* the image */}
      {/* <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full h-[70vh] flex flex-col justify-center items-center mt-20 relative">
          <div className="w-[30vw] h-[70vh] bg-zinc-500 rounded-[50px] overflow-hidden">
            <img
              className="bg-top"
              src="https://images.pexels.com/photos/7523256/pexels-photo-7523256.jpeg"
              alt=""
            />
          </div>
          <div className="Blur w-[40vw] h-[15rem] bg-white absolute top-[80%]"></div>
        </div>
      </div> */}

      <div className="w-full hidden lg:flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-[1400px] h-[70vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] flex flex-col justify-center items-center mt-12 relative">
          <div className="w-full sm:w-[92%] md:w-[80%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] h-[40vh] sm:h-[48vh] md:h-[56vh] lg:h-[66vh] bg-zinc-500 rounded-[14px] md:rounded-[36px] overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src="./hero.webp"
              alt="Featured large photography"
              loading="lazy"
              fetchPriority="low"
            />
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="w-full flex flex-col justify-center mt-14">
        <h1 className="w-full font-noto text-4xl md:text-8xl font-extrabold text-center relative z-9">
          Visual Poetry
        </h1>

        <div className="Cards w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 mt-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`w-full flex flex-col md:flex-row ${
                card.reverse ? "md:flex-row-reverse" : ""
              } gap-6 md:gap-[5rem] mt-10 items-center`}
            >
              <div
                className={`Image w-full md:w-1/2 h-64 sm:h-80 md:h-[27rem] bg-zinc-700 overflow-hidden relative ${
                  card.reverse
                    ? "md:rounded-[40px] rounded-[12px]"
                    : "md:rounded-[40px] rounded-[12px]"
                }`}
              >
                <img
                  src={card.image}
                  alt={`Photography portfolio: ${card.title} - ${card.paragraphs[0].substring(0, 100)}...`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  fetchPriority="low"
                />
                <span
                  className={`text-zinc-100 absolute bottom-3 ${
                    card.datePosition === "right" ? "right-4" : "left-4"
                  } font-play`}
                >
                  {card.date}
                </span>
              </div>
              <div className="content w-full md:w-1/2 flex flex-col justify-center px-2 md:px-0">
                <h2 className="font-lato text-3xl md:text-5xl font-bold">
                  {card.title}
                </h2>
                {card.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`font-lato leading-snug ${
                      i === 0 ? "mt-6 md:mt-10" : "mt-3"
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About me */}
      <div className="w-full mt-16 mb-20 flex justify-center items-center px-4 sm:px-6">
        <div className="w-full max-w-6xl text-center flex flex-col justify-center items-center">
          <h1 className="font-noto text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black font-bold tracking-tighter">
            The Story Behind the Camera
          </h1>

          <div
            ref={tiltRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="Tilt w-full max-w-[900px] sm:w-[80%] md:w-[70%] lg:w-[60%] h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[85vh] rounded-[20px] sm:rounded-[30px] overflow-hidden bg-zinc-400 mt-8 transition-transform duration-200 ease-out shadow-[0px_4px_16px_rgba(17,17,26,0.08),_0px_8px_24px_rgba(17,17,26,0.06)]  "
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            <img
              className="w-full h-full object-cover object-top"
              src="./about.webp"
              alt="Portrait of Orion Hale, professional photographer, in thoughtful pose representing the story behind the camera"
              loading="lazy"
              fetchPriority="high"
            />
          </div>

          <div className="font-lato mt-6 sm:mt-8 leading-tight tracking-tighter">
            <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">
              Orion Hale, 29{" "}
            </h2>
            <h3 className="font-bold text-xl sm:text-2xl md:text-3xl">
              “Where silence, light, and emotion converge.”
            </h3>
          </div>

          <p className="font-lato text-center text-sm sm:text-base md:text-lg mt-4 mb-6 max-w-4xl leading-relaxed tracking-tight">
            “Every photograph I take is more than just an image — it’s a story
            frozen in time. Through my lens, I chase fleeting moments, raw
            emotions, and the beauty hidden in details most eyes overlook. For
            me, photography isn’t just about capturing how something looks, but
            how it feels — the silence of a sunrise, the chaos of a city street,
            the tenderness of a fleeting glance. This journey isn’t just about
            pictures; it’s about preserving memories, framing emotions, and
            telling stories that words often fail to express.”
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
