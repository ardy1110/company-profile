import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Logo and Company Name */}
        <div className="flex flex-col items-center mb-12">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-lg mb-4 shadow-lg">
            <div className="w-16 h-16 relative">
              <Image
                src="/logo.png"
                alt="PT Pelita Kencana Mandiri"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
            PT. PELITA KENCANA MANDIRI
          </h2>
        </div>

        {/* Office Locations */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Kantor Pusat */}
          <div className="space-y-3">
            <h3 className="text-yellow-400 font-semibold text-lg mb-4 uppercase tracking-wider">
              Kantor Pusat :
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="leading-relaxed">
                Jl. Sultan Syarif Qhasym No 107 Perawang Barat<br />
                Kec. Tualang Kab. Siak, Riau
              </p>
              <p>Telp : 0761 - 8524360</p>
              <p>Fax : 0761 - 8524360</p>
              <p className="break-all">Email : pelitakencanamandiri@gmail.com</p>
            </div>
          </div>

          {/* Kantor Pekanbaru */}
          <div className="space-y-3">
            <h3 className="text-yellow-400 font-semibold text-lg mb-4 uppercase tracking-wider">
              Kantor Pekanbaru :
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="leading-relaxed">
                Jl. Ratu No. 3 D Tangkerang Utara, Pekanbaru, Riau
              </p>
              <p>Telp : 0761 - 8524360</p>
              <p>Fax : 0761 - 8524360</p>
            </div>
          </div>

          {/* Kantor Medan */}
          <div className="space-y-3">
            <h3 className="text-yellow-400 font-semibold text-lg mb-4 uppercase tracking-wider">
              Kantor Medan :
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="leading-relaxed">
                Jl. Karya Setuju No. 10 Medan, Sumatera Utara
              </p>
              <p>Telp : 0853 7272 4026</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-700 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} PT. Pelita Kencana Mandiri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}