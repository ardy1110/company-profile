"use client";

import Navbar from "./Navbar";

const Landing = () => {
  return (
    <>
      {/* ===== Navbar ===== */}
      <Navbar />
      {/* ===== Hero Section ===== */}
      <div id="home" className="relative w-full h-screen overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `
      linear-gradient(to bottom right, rgba(15,23,42,0.8), rgba(2,8,23,0.8)),
      url('/tower.jpg')
    `,
          }}
        ></div>

        <div className="absolute inset-0 bg-black opacity-10"></div>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[#001746]/90 [clip-path:polygon(0_0,100%_0,100%_50%,0_100%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-yellow-400 [clip-path:polygon(100%_50%,100%_100%,0_100%)]"></div>

        {/* Content */}
        
        <div  className="absolute top-[30%] left-[10%] text-white z-10 animate-fadeIn">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-yellow-400 mt-2 animate-slideInLeft">
            PT. PELITA <br /> KENCANA <br /> MANDIRI
          </h1>
          <p
            className="text-white/80 mt-6 max-w-md text-base leading-relaxed animate-slideInLeft"
            style={{ animationDelay: "0.2s" }}
          >
            Building excellence through innovation and dedication
          </p>
          <div
            className="flex gap-4 mt-8 animate-slideInLeft"
            style={{ animationDelay: "0.4s" }}
          >
            <button onClick={() => {
                const element = document.getElementById("about");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }} className="bg-yellow-400 hover:bg-yellow-500 text-[#001746] px-8 py-3 rounded-full font-bold transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/50 transform hover:scale-105">
              Explore More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
