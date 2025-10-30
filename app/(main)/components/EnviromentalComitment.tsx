// components/EnvironmentalCommitment.tsx

import React from 'react';
// Import ikon untuk pemanis visual
import { FaLeaf, FaSeedling, FaRecycle } from 'react-icons/fa';

// Komponen ikon kecil untuk menekankan poin
const CommitmentIcon = ({ Icon, text }: { Icon: React.ElementType, text: string }) => (
    <div className="flex items-center space-x-3 text-yellow-500">
        <Icon className="text-xl flex-shrink-0" />
        <span className="text-white font-semibold text-sm uppercase tracking-wider">{text}</span>
    </div>
);


const EnvironmentalCommitment = () => {
  // Warna Primer: #001746 (Biru Tua/Navy)
  // Warna Aksen: yellow-500 (Emas/Kuning)

  return (
    // Menggunakan warna solid #001746 (seperti bagian Nilai) untuk kesan yang lebih konsisten 
    // dan menambahkan padding vertikal yang proporsional.
    <section 
      id="lingkungan" 
      className="scroll-mt-24 w-full bg-[#001746] text-white py-20 lg:py-28" 
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Kolom Kiri: Judul dan Detail - Dibuat Lebih Berdampak */}
          <div className="lg:pr-10">
            {/* Tagline atau label di atas judul */}
            <p className="text-lg font-bold text-yellow-500 tracking-widest uppercase mb-3">
                Keberlanjutan adalah Fondasi Kami
            </p>
            
            {/* Judul Utama dengan Font Tebal dan Besar */}
            <h2 className="font-extrabold tracking-tight leading-tight">
              <span className="text-white text-5xl md:text-6xl lg:text-7xl block">
                KOMITMEN
              </span>
              <span className="text-yellow-500 text-5xl md:text-6xl lg:text-7xl block mt-1">
                LINGKUNGAN
              </span>
            </h2>
            
            {/* Garis Aksen Vertikal (Dapat Opsional) */}
            <div className="mt-6 h-0.5 w-20 bg-yellow-500 rounded hidden lg:block"></div>
            
            {/* Ikon Penekanan di Bagian Bawah Header */}
            <div className="mt-8 space-y-3">
                <CommitmentIcon Icon={FaLeaf} text="Praktik Ramah Lingkungan" />
                <CommitmentIcon Icon={FaRecycle} text="Pengelolaan Limbah Bijak" />
                <CommitmentIcon Icon={FaSeedling} text="Kontribusi Jangka Panjang" />
            </div>
          </div>

          {/* Kolom Kanan: Deskripsi - Dibuat Lebih Ringkas dan Mudah Dibaca */}
          <div className="space-y-6 text-gray-300 text-base leading-relaxed">
            
            {/* Paragraf 1: Pendahuluan Komitmen */}
            <p className="border-l-4 border-yellow-500 pl-4 py-1 italic text-lg font-medium text-white">
                Setiap desain, pemilihan bahan, dan metode konstruksi kami direncanakan untuk meminimalkan dampak negatif dan memaksimalkan keberlanjutan.
            </p>
            
            {/* Paragraf 2: Survei & Mitigasi */}
            <p className="text-justify">
              PT. Pelita Kencana Mandiri berkomitmen penuh untuk melaksanakan setiap proyek dengan tanggung jawab terhadap lingkungan. Sebelum memulai, kami **selalu melakukan survei lokasi yang komprehensif** untuk memahami kondisi sekitar, dan menyediakan solusi mitigasi kepada klien agar dampak negatif dapat dikelola secara bijaksana.
            </p>
            
            {/* Paragraf 3: Pelaksanaan & Keberlanjutan */}
            <p className="text-justify">
              Dalam operasional dan pelaksanaan bisnis, kami menerapkan **metode kerja yang direncanakan dengan cermat** dan sesuai standar ramah lingkungan. Pendekatan ini memastikan bahwa setiap tahapan proyek mendukung keberlanjutan jangka panjang, mencerminkan tanggung jawab kami terhadap alam, dan membangun masa depan yang lebih baik.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EnvironmentalCommitment;