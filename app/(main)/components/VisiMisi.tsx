import React from 'react';

export default function VisiMisi() {
  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600')`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 max-w-4xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            VISI
          </h1>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-yellow-500">&</span>
            <span className="text-white"> MISI</span>
          </h1>
          <div className="w-24 h-1 bg-yellow-500"></div>
        </div>

        {/* Introduction Text */}
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-12 max-w-2xl">
          Dalam menghadapi perkembangan dan persaingan usaha dimasa ini, PT Pelita 
          Kencana Mandiri mempunyai visi dan misi yang sangat relevan dengan hakikat 
          pendirian Perusahaan tersebut.
        </p>

        {/* Visi Section */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <h2 className="text-yellow-500 text-2xl font-bold mr-4">VISI</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-yellow-500 to-transparent"></div>
          </div>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Menjadi perusahaan konstruksi terkemuka, yang memberi kepuasan kepada 
            pelanggan baik pemerintah maupun swasta dan bersinergi untuk menjadikan 
            Indonesia terang.
          </p>
        </div>

        {/* Misi Section */}
        <div>
          <div className="flex items-center mb-4">
            <h2 className="text-yellow-500 text-2xl font-bold mr-4">MISI</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-yellow-500 to-transparent"></div>
          </div>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Menjalin hubungan dengan pelayanan yang berkualitas. Meningkatkan 
            kesejahteraan karyawan dan memberikan peluang sebesar besarnya kepada 
            karyawan untuk melakukan inovasi yang dapat menyokong kredibilitas perusahaan 
            dimata user. Menciptakan hubungan kerja yang baik dan kuat antara perusahaan 
            dan mitra kerja.
          </p>
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
    </div>
  );
}