// components/ServicesSection.tsx

import React from 'react';

// Data untuk layanan, dipisahkan agar kode JSX bersih dan mudah dikelola
const servicesData = [
  {
    category: "1. GENERAL CONSTRUCTION",
    items: [
      "General Electrical Contractor",
      "Nonresidential Building Construction",
      "Residential Building Construction",
    ],
  },
  {
    category: "2. INFRASTRUCTURE AND CIVIL CONSTRUCTION",
    items: [
      "Highway, Street, and Bridge Construction",
      "Foundation, Structure, and Building Exterior Contractors",
      "Other Heavy and Civil Engineering Construction",
    ],
  },
  {
    category: "3. SPECIALTY AND TRADE CONTRACTORS",
    items: [
      "Building Equipment Contractors",
      "Specialty Trade Contractors",
      "Other Specialty Trade Contractors",
      "Building Finishing Contractors",
    ],
  },
  {
    category: "4. LAND DEVELOPMENT AND UTILITY SYSTEMS",
    items: [
      "Utility System Construction",
      "Land Subdivision",
    ],
  },
];

const ServicesSection = () => {
  return (
    // Gunakan ID ini agar link dari Navbar berfungsi
    <section id="layanan-kami" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Kolom Kiri: Deskripsi (Biru Tua) */}
        <div className="bg-[#001746] text-white p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-md">
            <h2 className="font-extrabold tracking-tighter leading-none">
              <span className="text-5xl md:text-6xl block">LAYANAN</span>
              <span className="text-5xl md:text-6xl block mt-1">KAMI</span>
            </h2>
            <div className="mt-4 mb-6 h-1 w-24 bg-yellow-400"></div>
            <p className="text-gray-200 leading-relaxed">
              PT. Pelita Kencana Mandiri berkomitmen menyediakan solusi konstruksi yang menyeluruh dan memenuhi beragam kebutuhan pelanggan. Layanan kami meliputi konstruksi umum, infrastruktur, hingga jasa spesialis dan pengembangan lahan. Dengan fokus pada kualitas dan inovasi, kami memastikan setiap proyek berjalan efisien, andal, dan berkelanjutan. Berikut adalah kategori utama layanan kami yang mencerminkan keahlian kami di bidang konstruksi.
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Daftar Layanan (Putih) */}
        <div className="bg-white text-gray-800 p-12 md:p-16">
          <div className="space-y-8">
            {servicesData.map((service, index) => (
              <div key={index}>
                <h3 className="font-bold text-lg text-[#001746] tracking-wide mb-3">
                  {service.category}
                </h3>
                <ul className="space-y-2 pl-4">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="relative pl-4 text-gray-600">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-gray-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;