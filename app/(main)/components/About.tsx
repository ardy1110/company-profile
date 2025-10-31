// src/app/about/page.tsx
import React from 'react'; // Tambahkan import React

// Komponen Card Pimpinan (Opsional, untuk visual yang lebih baik)
const LeadershipCard = ({ title, name, role }: { title: string; name: string; role: string }) => (
    <div className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-yellow-500">
        <p className="text-xs font-semibold uppercase text-gray-500 mb-1">{title}</p>
        <h4 className="text-lg font-bold text-[#001746]">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
    </div>
);

export default function About() {
  // Warna Primer: #001746 (Biru Tua/Navy)
  // Warna Aksen: yellow-500 (Emas/Kuning)

  return (
    <div id="about" className="scroll-mt-24 min-h-screen bg-white">
      
      {/* Header Section - Menggunakan Layout 2 Kolom untuk Konten Utama */}
      <section className="mx-auto px-6 lg:px-8 py-20 lg:py-28 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Kolom Kiri (lg:col-span-5): Judul dan Pengantar Singkat */}
          <div className="lg:col-span-5 sticky top-24">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#001746] leading-tight tracking-tight">
              TENTANG
              <br />
              <span className="text-yellow-500">KAMI</span>
            </h1>
            <div className="w-24 h-1 bg-yellow-500 mt-4 mb-8"></div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-semibold border-l-4 border-gray-300 pl-4 py-1">
              PT. Pelita Kencana Mandiri didirikan pada 26 Februari 2007 
              untuk memberikan solusi konstruksi yang inovatif dan berdaya saing tinggi.
            </p>
            
            {/* Visual Tambahan - Informasi Kunci */}
            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
                <span className="text-yellow-500 text-3xl font-bold">07</span>
                <p className="text-sm text-[#001746] font-semibold">Februari 2020: Perubahan manajemen kunci perusahaan.</p>
            </div>
          </div>

          {/* Kolom Kanan (lg:col-span-7): Detail Naratif dan Struktur Manajemen */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Paragraf 1: Sejarah dan Perkembangan */}
            <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-yellow-500/50">
                <h3 className="text-xl font-bold text-[#001746] mb-3">Sejarah Singkat</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                    Sejak awal pendiriannya, perusahaan ini telah berkembang pesat, 
                    memperkuat kehadirannya di industri konstruksi nasional, terutama 
                    dalam kerjasama strategis dengan PT PLN (Persero). Komitmen kami 
                    terhadap kualitas menjadi landasan utama dalam setiap proyek yang kami tangani.
                </p>
            </div>

            {/* Paragraf 2: Perubahan Manajemen (Dibuat Lebih Visual) */}
            <div>
                <h3 className="text-xl font-bold text-[#001746] mb-4">Struktur Kepemimpinan (7 Februari 2020)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <LeadershipCard title="Direktur Utama" name="Okto Robi Hidayat" role="Membawahi operasional dan strategi." />
                    <LeadershipCard title="Direktur" name="Sudarto" role="Fokus pada pelaksanaan teknis proyek." />
                    <LeadershipCard title="Komisaris" name="Nurnaidi Wahid" role="Mengawasi kebijakan dan integritas." />
                </div>
            </div>

            {/* Paragraf 3: Komitmen dan Inovasi */}
            <div className="p-6 bg-[#001746]/5 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#001746] mb-3">Komitmen Masa Depan</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                    Melalui komitmen terhadap kualitas yang tak tergoyahkan, PT. Pelita Kencana Mandiri 
                    terus berinovasi dan meningkatkan kredibilitas dalam memenuhi kebutuhan 
                    proyek-proyek kelistrikan nasional, serta memperkokoh hubungan yang 
                    saling menguntungkan dengan mitra kerja dan seluruh karyawan.
                </p>
            </div>

          </div>
        </div>
      </section>

      {/* Banner Section - Dibuat Lebih Berdampak dan Kontras */}
      <section className="relative w-full h-[450px] overflow-hidden">

        {/* Overlay Biru Tua yang Kontras */}
        <div className="absolute inset-0 bg-[#001746]/90"></div>

        {/* Content - Kutipan Besar */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <p className="text-yellow-500 text-sm md:text-base font-semibold uppercase tracking-widest mb-4">
            Transformasi & Keunggulan
          </p>
          <h2 className="text-white text-3xl md:text-5xl font-extrabold max-w-4xl leading-snug">
            EVOLVED INTO A LEADING CONSTRUCTION PARTNER, RECOGNIZED FOR EXCELLENCE IN POWER PROJECTS ACROSS INDONESIA
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mt-6"></div>
        </div>
      </section>
    </div>
  );
}