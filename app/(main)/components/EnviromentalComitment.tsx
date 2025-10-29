// components/EnvironmentalCommitment.tsx

import React from 'react';

const EnvironmentalCommitment = () => {
  return (
    // Gunakan ID ini agar link dari Navbar berfungsi
    <section 
      id="lingkungan" 
      className="w-full bg-gradient-to-br from-[#001746] to-[#013220] text-white overflow-hidden"
    >
      {/* Catatan Desain: 
        Latar belakang di sini menggunakan gradien warna sederhana. 
        Untuk mereplikasi gambar asli dengan sempurna, Anda sebaiknya menggunakan 
        tag <Image> dari Next.js sebagai background.
      */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Kolom Kiri: Judul */}
          <div className="text-center lg:text-left">
            <h2 className="font-extrabold tracking-tighter leading-none">
              <span className="text-yellow-400 text-4xl md:text-5xl block">
                KOMITMEN
              </span>
              <span className="text-white text-5xl md:text-6xl block mt-1">
                TERHADAP
              </span>
              <span className="text-white text-5xl md:text-6xl block mt-1">
                LINGKUNGAN
              </span>
            </h2>
            <div className="mt-4 mx-auto lg:mx-0 h-1.5 w-32 bg-yellow-400 rounded"></div>
          </div>

          {/* Kolom Kanan: Deskripsi */}
          <div className="space-y-6 text-gray-200 text-base leading-relaxed text-justify">
            <p>
              PT. Pelita Kencana Mandiri berkomitmen penuh untuk melaksanakan setiap proyek dengan tanggung jawab terhadap lingkungan. Baik sebagai pelaksana maupun sebagai konsultan, kami memahami bahwa setiap desain, pemilihan bahan, peralatan, dan metode konstruksi memiliki dampak lingkungan yang perlu dikelola secara bijaksana.
            </p>
            <p>
              Sebelum memulai proyek, kami selalu melakukan survei lokasi untuk memahami kondisi lingkungan sekitar, dan kami menyediakan solusi atau rekomendasi kepada klien serta pihak terkait untuk meminimalkan dampak negatif yang mungkin terjadi.
            </p>
            <p>
              Dalam operasional dan pelaksanaan bisnis kami, PT. Pelita Kencana Mandiri berkomitmen untuk menerapkan metode kerja yang telah direncanakan dengan cermat, memastikan bahwa setiap tahapan proyek dijalankan sesuai standar yang ramah lingkungan. Kami percaya bahwa pendekatan ini tidak hanya mencerminkan tanggung jawab kami terhadap alam, tetapi juga mendukung keberlanjutan jangka panjang dalam industri konstruksi.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EnvironmentalCommitment;