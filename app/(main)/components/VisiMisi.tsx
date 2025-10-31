import React from "react";
import { FaEye, FaRocket, FaHandsHelping, FaLightbulb } from "react-icons/fa"; // Import ikon

export default function VisiMisi() {
  return (
    <div
      id="visi-misi"
      className="scroll-mt-24 relative min-h-screen bg-[#001746] overflow-hidden flex items-center"
    >
      {/* Background Image with Darker Overlay for Contrast */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `
      linear-gradient(to bottom, rgba(0, 23, 70, 0.6), rgba(0, 23, 70, 0.8)),
      url('/gedung.jpeg')
    `,
          backgroundAttachment: "fixed",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 mx-auto px-6 lg:px-8 py-20 w-full max-w-7xl">
        {/* Header - Berpusat dan Berdampak */}
        <div className="text-center mb-16">
          <p className="text-lg font-bold text-yellow-500 tracking-widest uppercase mb-3">
            Landasan Perusahaan
          </p>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-tight">
            <span className="text-white">VISI</span>
            <span className="text-yellow-500"> & </span>
            <span className="text-white">MISI</span>
          </h1>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto leading-relaxed">
            Dalam menghadapi perkembangan dan persaingan usaha di masa ini, PT
            Pelita Kencana Mandiri mempunyai visi dan misi yang sangat relevan
            dengan hakikat pendirian Perusahaan, berfokus pada kualitas dan
            keberlanjutan.
          </p>
        </div>

        {/* VISI & MISI CONTAINER - Dua Kolom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* VISI CARD */}
          <div className="bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-2xl border-t-4 border-yellow-500 hover:shadow-yellow-500/30 transition duration-500">
            <div className="flex items-center mb-6">
              <FaEye className="text-4xl text-yellow-500 mr-4 flex-shrink-0" />
              <h2 className="text-4xl font-extrabold text-yellow-500 tracking-wide">
                VISI
              </h2>
            </div>

            <p className="text-gray-200 text-lg leading-relaxed border-l-4 border-gray-400 pl-4 py-2 italic font-light">
              Menjadi perusahaan konstruksi terkemuka, yang memberi kepuasan
              kepada pelanggan baik pemerintah maupun swasta dan bersinergi
              untuk menjadikan Indonesia terang.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center text-yellow-500 space-x-2">
                <FaRocket className="text-xl" />
                <span className="text-white text-sm font-semibold">
                  Terkemuka & Bersinergi
                </span>
              </div>
            </div>
          </div>

          {/* MISI CARD */}
          <div className="bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-2xl border-t-4 border-yellow-500 hover:shadow-yellow-500/30 transition duration-500">
            <div className="flex items-center mb-6">
              <FaHandsHelping className="text-4xl text-yellow-500 mr-4 flex-shrink-0" />
              <h2 className="text-4xl font-extrabold text-yellow-500 tracking-wide">
                MISI
              </h2>
            </div>

            <ul className="space-y-4 text-gray-200 text-lg leading-relaxed">
              <li className="flex items-start">
                <span className="text-yellow-500 text-xl mr-3 mt-1 flex-shrink-0">
                  •
                </span>
                <span>
                  Menjalin hubungan dengan pelayanan yang berkualitas.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 text-xl mr-3 mt-1 flex-shrink-0">
                  •
                </span>
                <span>
                  Meningkatkan kesejahteraan karyawan dan memberikan peluang
                  inovasi.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 text-xl mr-3 mt-1 flex-shrink-0">
                  •
                </span>
                <span>
                  Menciptakan hubungan kerja yang baik dan kuat antara
                  perusahaan dan mitra kerja.
                </span>
              </li>
            </ul>

            <div className="mt-8 space-y-3">
              <div className="flex items-center text-yellow-500 space-x-2">
                <FaLightbulb className="text-xl" />
                <span className="text-white text-sm font-semibold">
                  Fokus pada Kualitas & Inovasi Karyawan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
