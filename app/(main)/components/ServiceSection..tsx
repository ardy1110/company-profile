// components/ServicesSection.tsx
'use client'
import React from 'react';
// Import ikon untuk penanda daftar yang lebih baik
import { FaChevronRight, FaHammer, FaHardHat, FaBuilding, FaWrench } from 'react-icons/fa';

// Data untuk layanan, dipisahkan agar kode JSX bersih dan mudah dikelola
const servicesData = [
  {
    category: "1. GENERAL CONSTRUCTION",
    icon: FaHardHat,
    items: [
      "General Electrical Contractor",
      "Nonresidential Building Construction",
      "Residential Building Construction",
    ],
  },
  {
    category: "2. INFRASTRUCTURE AND CIVIL CONSTRUCTION",
    icon: FaWrench,
    items: [
      "Highway, Street, and Bridge Construction",
      "Foundation, Structure, and Building Exterior Contractors",
      "Other Heavy and Civil Engineering Construction",
    ],
  },
  {
    category: "3. SPECIALTY AND TRADE CONTRACTORS",
    icon: FaHammer,
    items: [
      "Building Equipment Contractors",
      "Specialty Trade Contractors",
      "Other Specialty Trade Contractors",
      "Building Finishing Contractors",
    ],
  },
  {
    category: "4. LAND DEVELOPMENT AND UTILITY SYSTEMS",
    icon: FaBuilding,
    items: [
      "Utility System Construction",
      "Land Subdivision",
    ],
  },
];

// Komponen Card Kategori Layanan
const ServiceCard = ({ category, icon: Icon, items }: typeof servicesData[0]) => (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 transition duration-300 transform group hover:shadow-2xl hover:scale-[1.02] hover:border-yellow-500/50">
        
        {/* Header Card */}
        <div className="flex items-center mb-4 border-b border-gray-200 pb-2">
            <Icon className="text-3xl text-yellow-500 mr-3 flex-shrink-0 group-hover:text-[#001746] transition duration-300" />
            <h3 className="font-extrabold text-lg text-[#001746] tracking-wide">
                {category}
            </h3>
        </div>
        
        {/* Daftar Items */}
        <ul className="space-y-2">
            {items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start text-gray-700 text-sm leading-snug">
                    <FaChevronRight className="w-3 h-3 mt-1 mr-2 flex-shrink-0 text-yellow-500 group-hover:text-yellow-700 transition" />
                    <span className='group-hover:text-gray-800 transition duration-300'>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);


const ServicesSection = () => {
    // Warna Primer: #001746 (Biru Tua/Navy)
    // Warna Aksen: yellow-500 (Emas/Kuning)
    
  return (
    // Menggunakan padding vertikal yang lebih besar
    <section id="layanan-kami" className="w-full scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Kolom Kiri: Deskripsi (Biru Tua) - Lebih Berdampak */}
        <div className="bg-[#001746] text-white py-20 px-6 md:px-16 flex flex-col justify-center order-2 lg:order-1">
          <div className="max-w-xl mx-auto lg:mx-0">
            {/* Tagline di atas Judul */}
            <p className="text-lg font-bold text-yellow-500 tracking-widest uppercase mb-3">
                Keunggulan Solusi Konstruksi
            </p>
            
            {/* Judul Utama dengan Font Tebal dan Besar */}
            <h2 className="font-extrabold tracking-tight leading-tight mb-6">
              <span className="text-white text-5xl md:text-6xl lg:text-7xl block">
                LAYANAN
              </span>
              <span className="text-yellow-500 text-5xl md:text-6xl lg:text-7xl block mt-1">
                KAMI
              </span>
            </h2>
            
            {/* Deskripsi */}
            <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
              PT. Pelita Kencana Mandiri berkomitmen menyediakan **solusi konstruksi yang menyeluruh** dan memenuhi beragam kebutuhan pelanggan. Layanan kami meliputi konstruksi umum, infrastruktur, hingga jasa spesialis dan pengembangan lahan. Dengan fokus pada **kualitas dan inovasi**, kami memastikan setiap proyek berjalan efisien, andal, dan berkelanjutan.
            </p>
            
            {/* Call to Action atau Penekanan */}
            <div className="mt-8">
                <button onClick={() => {
                const element = document.getElementById("footer");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }} className="inline-block px-8 py-3 bg-yellow-500 text-[#001746] font-bold text-lg rounded-full shadow-lg hover:bg-yellow-400 transition duration-300">
                    Mulai Proyek Anda
                </button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Daftar Layanan (Putih) - Dibuat dalam Grid Card */}
        <div className="bg-gray-50 p-10 md:p-16 lg:py-20 order-1 lg:order-2">
            {/* Grid 2x2 untuk Kategori Layanan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                {servicesData.map((service, index) => (
                    <ServiceCard 
                        key={index} 
                        category={service.category} 
                        icon={service.icon}
                        items={service.items}
                    />
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;