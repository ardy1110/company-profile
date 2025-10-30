import React from 'react';
// Import beberapa ikon dari react-icons/fa (Pastikan Anda telah menginstalnya)
import { FaHardHat, FaLightbulb, FaHandshake, FaShieldAlt, FaLeaf, FaChartLine } from 'react-icons/fa'; 

// Data untuk setiap kartu nilai, kini menyertakan ICON
const valuesData = [
  {
    title: 'MANAJEMEN PROYEK YANG EFISIEN',
    description: 'Perencanaan, pengelolaan, dan serah terima proyek yang terukur, memastikan kualitas dan pengendalian biaya.',
    icon: FaChartLine, // Menggunakan ikon Chart/Line untuk Efisiensi/Pengukuran
  },
  {
    title: 'KEPEMIMPINAN YANG VISIONER',
    description: 'Mengedepankan kepemimpinan yang berani dan inovatif untuk kemajuan bersama.',
    icon: FaLightbulb, // Menggunakan ikon Lightbulb untuk Visi/Inovasi
  },
  {
    title: 'INOVASI & KEUNGGULAN',
    description: 'Mendorong penggunaan teknologi mutakhir dan pelatihan berkualitas untuk hasil optimal.',
    icon: FaHardHat, // Menggunakan ikon HardHat untuk Keunggulan/Konstruksi
  },
  {
    title: 'KEMITRAAN DAN KEPUASAN KLIEN',
    description: 'Membangun hubungan yang kuat dan kolaboratif demi kepuasan klien & keberlanjutan.',
    icon: FaHandshake, // Menggunakan ikon Handshake untuk Kemitraan/Kolaborasi
  },
  {
    title: 'AKUNTABILITAS & INTEGRITAS',
    description: 'Mematuhi standar profesional dengan transparansi dan tanggung jawab dalam setiap proyek.',
    icon: FaShieldAlt, // Menggunakan ikon Shield/Perisai untuk Integritas/Perlindungan
  },
  {
    title: 'KEBERLANJUTAN DAN LINGKUNGAN',
    description: 'Berkomitmen untuk menjaga kelestarian lingkungan melalui praktik konstruksi yang ramah lingkungan dan bertanggung jawab.',
    icon: FaLeaf, // Menggunakan ikon Leaf/Daun untuk Lingkungan/Berlanjut
  },
];

// Komponen kecil untuk setiap kartu nilai
// Menerima 'icon' sebagai properti
const ValueCard = ({ title, description, Icon }: { title: string; description: string; Icon: React.ElementType }) => (
  // Perubahan pada desain kartu: border yang lebih halus, shadow yang lebih besar saat hover
  <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col transition duration-300 transform hover:scale-[1.03] cursor-pointer border border-gray-100">
    <div className="p-6 flex items-start space-x-4">
      {/* Icon di sisi kiri dengan warna aksen yang kuat */}
      <div className="text-4xl text-yellow-500 flex-shrink-0 mt-1">
        <Icon /> 
      </div>
      {/* Konten teks */}
      <div className='flex-grow'>
        {/* Warna judul menjadi warna gelap perusahaan */}
        <h3 className="text-[#001746] font-extrabold text-lg tracking-wide mb-2 leading-snug">{title}</h3>
        {/* Deskripsi dengan font yang nyaman dibaca */}
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const CompanyValues = () => {
  // Warna Primer: #001746 (Biru Tua/Navy)
  // Warna Aksen: yellow-500 (Emas/Kuning)
  
  return (
    // Gunakan ID ini agar link dari Navbar berfungsi
    <section id="nilai-perusahaan" className="w-full bg-[#001746] py-20"> 
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Judul dan Subjudul di Tengah untuk Desain yang Lebih Kuat */}
        <div className="text-center mb-16">
          <h1 className="text-lg font-bold text-yellow-500 tracking-widest uppercase mb-2">
            INTI DARI KAMI
          </h1>
          {/* Menggunakan font yang sangat tebal untuk kesan kokoh */}
          <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            NILAI-NILAI PERUSAHAAN
          </h2>
          {/* Paragraf pendukung di bawah judul */}
          <p className="max-w-3xl mx-auto mt-6 text-white text-md leading-relaxed font-light opacity-80">
            Nilai-nilai inti PT. Pelita Kencana Mandiri mencerminkan komitmen kami terhadap kualitas, integritas, dan inovasi. Dengan fokus pada kepuasan klien dan pengelolaan proyek yang efisien, kami berupaya mencapai keunggulan dan keberlanjutan di setiap langkah untuk membangun masa depan yang lebih baik.
          </p>
        </div>
        
        {/* Bagian Grid Kartu */}
        {/* Grid 3 kolom di desktop untuk tata letak yang lebih profesional jika datanya 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
          {valuesData.map((value, index) => (
            // Kirim properti Icon ke ValueCard
            <ValueCard 
              key={index} 
              title={value.title} 
              description={value.description}
              Icon={value.icon} 
            />
          ))}
        </div>
        
      </div>
       {/*  */}
    </section>
  );
};

export default CompanyValues;