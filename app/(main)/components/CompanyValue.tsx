import React from 'react';

// Data untuk setiap kartu nilai, agar kode JSX lebih bersih
const valuesData = [
  {
    title: 'MANAJEMEN PROYEK YANG EFISIEN',
    description: 'Perencanaan, pengelolaan, dan serah terima proyek yang terukur, memastikan kualitas dan pengendalian biaya.',
  },
  {
    title: 'KEPEMIMPINAN YANG VISIONER',
    description: 'Mengedepankan kepemimpinan yang berani dan inovatif untuk kemajuan bersama.',
  },
  {
    title: 'INOVASI & KEUNGGULAN',
    description: 'Mendorong penggunaan teknologi mutakhir dan pelatihan berkualitas untuk hasil optimal.',
  },
  {
    title: 'KEMITRAAN DAN KEPUASAN KLIEN',
    description: 'Membangun hubungan yang kuat dan kolaboratif demi kepuasan klien & keberlanjutan.',
  },
  {
    title: 'AKUNTABILITAS & INTEGRITAS',
    description: 'Mematuhi standar profesional dengan transparansi dan tanggung jawab dalam setiap proyek.',
  },
  {
    title: 'KEBERLANJUTAN DAN LINGKUNGAN',
    description: 'Berkomitmen untuk menjaga kelestarian lingkungan melalui praktik konstruksi yang ramah lingkungan dan bertanggung jawab.',
  },
];

// Komponen kecil untuk setiap kartu nilai
const ValueCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white shadow-lg rounded-md overflow-hidden flex flex-col hover:scale-105 transition cursor-pointer">
    <div className="bg-yellow-400 p-4">
      <h3 className="text-[#001746] font-bold text-base tracking-wide">{title}</h3>
    </div>
    <div className="p-4 flex-grow">
      <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const CompanyValues = () => {
  return (
    // Gunakan ID ini agar link dari Navbar berfungsi
    <section id="nilai-perusahaan" className="w-full bg-[#001746]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Container Flex untuk Header dan Grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Bagian Header - Kiri */}
          <div className="lg:w-2/5 text-white flex-shrink-0">
            <h1 className="text-5xl font-black text-yellow-400 leading-none mb-1">
              NILAI NILAI
            </h1>
            <h2 className="text-5xl font-black text-white leading-none mb-6">
              PERUSAHAAN
            </h2>
            <p className="text-white text-sm leading-relaxed font-light">
              Nilai-nilai inti PT. Pelita Kencana Mandiri mencerminkan komitmen kami terhadap kualitas, integritas, dan inovasi. Dengan fokus pada kepuasan klien dan pengelolaan proyek yang efisien, kami berupaya mencapai keunggulan dan keberlanjutan di setiap langkah untuk membangun masa depan yang lebih baik.
            </p>
          </div>

          {/* Bagian Grid Kartu - Kanan */}
          <div className="lg:w-3/5 flex-grow ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {valuesData.map((value, index) => (
                <ValueCard key={index} title={value.title} description={value.description}  />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;