"use client";

import Navbar from "./Navbar";

const Landing = () => {
  return (
    <>
      {/* ===== Navbar ===== */}
      <Navbar />
      {/* ===== Hero Section ===== */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[#001746]/90 [clip-path:polygon(0_0,100%_0,100%_50%,0_100%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-yellow-400 [clip-path:polygon(100%_50%,100%_100%,0_100%)]"></div>

        {/* Content */}
        <div className="absolute top-[15%] left-[10%] text-white z-10 animate-fadeIn">
          <div className="relative w-16 h-16 mb-6 animate-float bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-[#001746]">PKM</span>
          </div>
          <div className="text-xs tracking-[0.3em] mb-3 opacity-90">
            COMPANY PROFILE
          </div>
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
            <button className="bg-yellow-400 hover:bg-yellow-500 text-[#001746] px-8 py-3 rounded-full font-bold transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/50 transform hover:scale-105">
              Explore More
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-[#001746] text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>

        {/* Tahun */}
        <div className="absolute bottom-8 right-12 text-2xl font-bold text-[#001746] z-10 animate-pulse">
          2024
        </div>
      </div>

      {/* ===== Animations ===== */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Landing;
