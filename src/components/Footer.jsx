import React from "react";
import "../index.css";

const Footer = () => {
  return (
    <div
      className="w-full h-auto md:h-[84vh] relative"
      style={{ clipPath: "polygon(0 0, 100% 0 ,100% 100%, 0 100%)" }}
    >
      <div className="w-full md:h-[84vh] md:fixed bottom-0 overflow-hidden">
        <div className="w-full flex flex-col md:flex-row bg-white border-t-8 border-black">
          <div className="w-full md:w-1/2 flex items-center p-6 md:p-20">
            <h1 className="text-black text-center font-noto text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight underline">
              Every Story Begins With a Hello.
            </h1>
          </div>
          <div className="w-full md:w-1/2 p-6 md:p-16 ">
            <div className="w-full bg-zinc-950 rounded-[20px] font-loto p-4 md:p-6 pt-6 md:pt-8">
              <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold font-lato text-center underline">
                Let's Connect
              </h1>
              <div className="mt-8 md:mt-14 font-lato flex flex-col justify-center items-center text-white text-base sm:text-lg md:text-2xl">
                <label className="w-[90%] md:w-[80%] text-left mt-4">
                  Name
                </label>
                <input
                  className="bg-white text-black text-base sm:text-lg rounded-lg mt-1 p-2 outline-none w-[90%] md:w-[80%]"
                  type="text"
                  aria-label="Name"
                />
                <label className="w-[90%] md:w-[80%] text-left mt-4">
                  Email
                </label>
                <input
                  className="bg-white text-black text-base sm:text-lg rounded-lg mt-1 p-2 outline-none w-[90%] md:w-[80%]"
                  type="email"
                  aria-label="Email"
                />
                <label className="w-[90%] md:w-[80%] text-left mt-4">
                  Message
                </label>
                <textarea
                  className="bg-white text-black text-base sm:text-lg h-40 md:h-[10rem] rounded-lg mt-1 p-2 outline-none w-[90%] md:w-[80%]"
                  aria-label="Message"
                />
                <input
                  className="mt-6 md:mt-7 bg-white hover:bg-zinc-300 text-black font-extrabold uppercase px-6 py-2 md:px-7 md:py-3 rounded-lg cursor-pointer"
                  type="submit"
                  value="Submit"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-12 md:h-16 bg-black flex justify-center items-center">
          <h5 className="text-white text-sm md:text-base">
            2025 © All Rights Reserved.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Footer;
