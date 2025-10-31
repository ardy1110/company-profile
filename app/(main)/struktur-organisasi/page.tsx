"use client";

import dynamic from "next/dynamic";

const OrganizationChart = dynamic(
  () => import("./components/OrgChart"),
  { ssr: false }
);

const StrukturOrganisasi = () => {

  return (
    <div className="relative w-full min-h-screen bg-[#0a0e27] text-white py-16 px-6 lg:px-12 overflow-hidden">
      {/* Animated Background Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(59, 130, 246, 0.1) 2px,
              rgba(59, 130, 246, 0.1) 4px
            )`,
            animation: 'slide 20s linear infinite'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">STRUKTUR</span>
            <br />
            <span className="text-yellow-400">ORGANISASI</span>
          </h1>
          <div className="w-48 h-1 bg-yellow-400"></div>
        </div>

        {/* Organization Chart */}
        <OrganizationChart/>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(50px); }
        }
      `}</style>
    </div>
  )
}

export default StrukturOrganisasi