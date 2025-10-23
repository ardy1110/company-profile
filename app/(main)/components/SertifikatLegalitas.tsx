import React from 'react';
import Image from 'next/image';

export default function SertifikasiLegalitas() {
  const certificates = [
    {
      id: 1,
      title: "SERTIFIKAT SMK3",
      image: "https://images.unsplash.com/photo-1554224311-beee2d0c9955?w=600",
      alt: "Sertifikat Penghargaan SMK3"
    },
    {
      id: 2,
      title: "CERTIFICATE ISO 9001:2015",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600",
      alt: "Certificate ISO 9001:2015"
    },
    {
      id: 3,
      title: "SERTIFIKAT ISO 14001:2015",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600",
      alt: "Sertifikat ISO 14001:2015"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.03) 35px, rgba(255,255,255,.03) 70px)`
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
            SERTIFIKASI
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-yellow-500">&</span>
            <span className="text-white"> LEGALITAS</span>
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mb-8"></div>
          
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl">
            Kami berkomitmen untuk memenuhi standar tertinggi dalam legalitas dan kualitas. 
            Berikut adalah bukti sertifikasi dan legalitas yang memperkuat kepercayaan Anda 
            terhadap layanan dan produk kami.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certificates.map((cert, index) => (
            <div key={cert.id} className="group relative">
              {/* Certificate Card */}
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/20">
                <div className="aspect-[3/4] relative bg-gray-100">
                  <Image
                    src={cert.image}
                    alt={cert.alt}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">Lihat Detail</span>
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="absolute -top-4 -right-4 z-20">
                <div className="bg-yellow-500 text-slate-900 font-bold text-xs md:text-sm px-4 py-2 rounded shadow-lg transform rotate-3">
                  {cert.title}
                </div>
              </div>

              {/* Border decoration */}
              <div className="absolute -inset-1 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </div>
  );
}