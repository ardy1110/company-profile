// src/app/about/page.tsx
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="container mx-auto px-6 lg:px-20 py-16">
        <div className="max-w-4xl">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-5xl font-black text-[#001746] leading-tight">
              TENTANG<br />KAMI
            </h1>
            <div className="w-32 h-1 bg-yellow-400 mt-4"></div>
          </div>

          {/* Paragraf 1 */}
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            PT. Pelita Kencana Mandiri didirikan pada 26 Februari 2007 dengan tujuan 
            memberikan solusi konstruksi yang inovatif dan berdaya saing tinggi. Sejak awal 
            pendiriannya, perusahaan ini telah berkembang pesat, memperkuat kehadirannya di 
            industri konstruksi nasional, terutama dalam kerjasama strategis dengan PT PLN 
            (Persero).
          </p>

          {/* Paragraf 2 */}
          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            Pada 7 Februari 2020, terjadi perubahan manajemen yang membawa angin segar 
            dalam operasional perusahaan, dengan Bapak Sudarto menjabat sebagai Direktur, 
            Bapak Okto Robi Hidayat sebagai Direktur Utama dan Bapak Nurnaidi Wahid 
            sebagai Komisaris.
          </p>

          {/* Paragraf 3 */}
          <p className="text-gray-700 text-sm leading-relaxed">
            Melalui komitmen terhadap kualitas, PT. Pelita Kencana Mandiri terus berinovasi dan 
            meningkatkan kredibilitas dalam memenuhi kebutuhan proyek-proyek kelistrikan 
            nasional serta memperkokoh hubungan dengan mitra kerja dan karyawan.
          </p>
        </div>
      </section>

      {/* Banner Section with Background Image */}
      <section className="relative w-full h-[400px] overflow-hidden">
        {/* Background Image */}
        <Image 
          src="/about-banner.jpg" 
          alt="Construction Site" 
          fill
          className="object-cover"
          quality={100}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#001746]/80"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold max-w-4xl leading-snug mb-4">
            SINCE 2017, PT PELITA KENCANA MANDIRI HAS 
            EVOLVED INTO A LEADING CONSTRUCTION 
            PARTNER, RECOGNIZED FOR EXCELLENCE IN 
            POWER PROJECTS ACROSS INDONESIA
          </h2>
          <div className="w-32 h-1 bg-yellow-400"></div>
        </div>

        {/* Page Number */}
        <div className="absolute bottom-6 left-6 text-white text-4xl font-bold z-10">
          3
        </div>

        {/* Company Name Bottom Right */}
        <div className="absolute bottom-6 right-6 text-white text-xs z-10">
          PT PELITA KENCANA MANDIRI
        </div>
      </section>
    </div>
  );
}