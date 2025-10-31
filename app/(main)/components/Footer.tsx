import Image from "next/image";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

// Data Kontak dan Alamat
const addresses = [
  {
    title: "Kantor Pusat",
    address:
      "Jl. Sultan Syarif Qhasym No 107 Perawang Barat, Kec. Tualang Kab. Siak, Riau",
    phone: "0761 - 8524360",
    fax: "0761 - 8524360",
    email: null,
  },
  {
    title: "Kantor Pekanbaru",
    address: "Jl. Bintara No. 3 Purwodadi Ujung, Pekanbaru, Riau",
    phone: "0761 - 8524360",
    fax: "0761 - 8524360",
    email: null,
  },
  {
    title: "Kantor Medan",
    address: "Jl. Karya Setuju No. 10 Medan, Sumatera Utara",
    phone: "0853 7272 4026",
    fax: null,
    email: null,
  },
];

// Komponen Pembantu untuk Baris Info Kontak
const ContactItem = ({
  Icon,
  text,
  link,
}: {
  Icon: React.ElementType;
  text: string;
  link?: string;
}) => {
  const content = (
    <span className="flex items-start space-x-3 text-sm group cursor-pointer">
      <Icon className="mt-1 flex-shrink-0 text-yellow-500 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
      <span className="text-gray-300 group-hover:text-yellow-400 transition duration-200">
        {text}
      </span>
    </span>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#001746] relative overflow-hidden">
      {/* Decorative Background Patterns */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255,255,255,.03) 60px, rgba(255,255,255,.03) 120px)",
          }}
        />
      </div>

      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>

      {/* Accent Line Top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        {/* Header Section - Logo & Tagline */}
        <div className="text-center mb-16">
          <div className="flex flex-col items-center justify-center mb-6 space-y-4">
            <div className="relative w-16 h-16 overflow-hidden rounded-lg bg-yellow-500 flex items-center justify-center shadow-2xl shadow-yellow-500/20">
              <Image
                src="/logo.png"
                alt="PT Pelita Kencana Mandiri"
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                PT. PELITA KENCANA MANDIRI
              </h2>
              <p className="text-yellow-500 text-sm font-semibold tracking-widest uppercase mt-1">
                Building Excellence Together
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
            Solusi konstruksi terpercaya dan inovatif di Indonesia, berkomitmen
            pada kualitas, integritas, dan keberlanjutan lingkungan.
          </p>
        </div>

        {/* Office Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {addresses.map((office, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 hover:transform hover:scale-[1.02] space-y-5"
            >
              <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-yellow-500/20">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <h3 className="text-yellow-500 font-bold text-lg uppercase tracking-wider">
                  {office.title}
                </h3>
              </div>

              <ContactItem Icon={FaMapMarkerAlt} text={office.address} />

              {office.phone && (
                <ContactItem
                  Icon={FaPhone}
                  text={office.phone}
                  link={`tel:${office.phone.replace(/[^0-9+]/g, "")}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-gray-700/50 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Email Kantor Pusat */}
            <div className=" flex justify-center mb-8">
              <a
                href="mailto:pelitakencanamandiri@gmail.com"
                className="flex items-center space-x-3 text-sm group"
              >
                <FaEnvelope className="mt-[2px] flex-shrink-0 text-yellow-500 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-300 group-hover:text-yellow-400 transition duration-200">
                  pelitakencanamandiri@gmail.com
                </span>
              </a>
            </div>
            <div className=" flex justify-center mb-8">
              <a
                href="mailto:pelitakencanamandiri@gmail.com"
                className="flex items-center space-x-3 text-sm group"
              >
                <FaEnvelope className="mt-[2px] flex-shrink-0 text-yellow-500 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-300 group-hover:text-yellow-400 transition duration-200">
                  pelitakencanamandiri@gmail.com
                </span>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} PT. Pelita Kencana Mandiri. All
                rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                <a href="#" className="hover:text-yellow-500 transition">
                  Kebijakan Privasi
                </a>
                {" · "}
                <a href="#" className="hover:text-yellow-500 transition">
                  Syarat & Ketentuan
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
    </footer>
  );
}
