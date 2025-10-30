'use client'


const HSEImplementation = () => {
  return (
    <div className="relative w-full bg-[#1a2744] text-white py-16 px-6 lg:px-12">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('/workers.jpg')`
        }}
      ></div>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2744]/90 via-[#1a2744]/95 to-[#0d1929]/90"></div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Company Name */}
        <div className="text-sm tracking-wider mb-12 opacity-80">
          PT PELITA KENCANA MANDIRI
        </div>

        {/* Section 1: IMPLEMENTASI HSE */}
        <div className="mb-16">
          <div className="relative mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-yellow-400">IMPLEMENTASI</span>
              <br />
              <span className="text-white">HSE</span>
            </h1>
            <div className="w-48 h-1 bg-yellow-400"></div>
          </div>

          <p className="text-white/90 leading-relaxed mb-8 max-w-4xl">
            Keselamatan, kesehatan, dan kelestarian lingkungan adalah prioritas utama kami dalam setiap aspek proyek. Sebagai perusahaan konstruksi, kami menyadari sepenuhnya bahwa setiap proyek berjalan dengan mematuhi standar HSE, demi keselamatan karyawan, mitra kerja, dan masyarakat. Kami percaya bahwa kesuksesan proyek yang sesungguhnya hanya dapat dicapai dengan upaya nyata menuju Zero Accident dalam setiap aspek pekerjaan.
          </p>

          {/* 1. HSE ANNUAL PLAN */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-yellow-400">1. HSE ANNUAL PLAN</span>
              <div className="flex-1 h-0.5 bg-yellow-400/30"></div>
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Setiap tahun, kami menyusun HSE Annual Plan yang berfungsi sebagai peta jalan untuk menetapkan kebijakan dan prosedur HSE di seluruh proyek. Rencana ini mencakup berbagai langkah preventif yang disusun untuk mendukung upaya Zero Accident. Dari pelatihan hingga inspeksi rutin, kami berusaha menciptakan budaya keselamatan yang proaktif di lingkungan kerja.
            </p>
            
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-yellow-400 font-bold">•</span>
                <div>
                  <span className="font-semibold text-yellow-400">Peningkatan Pelatihan dan Kesadaran:</span>
                  <span className="text-white/80"> Mengadakan pelatihan rutin untuk meningkatkan kesadaran karyawan dan kesadaran proaktif.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-400 font-bold">•</span>
                <div>
                  <span className="font-semibold text-yellow-400">Pemantauan Lingkungan Kerja:</span>
                  <span className="text-white/80"> Melakukan inspeksi rutin dan evaluasi risiko di lokasi kerja untuk mengidentifikasi potensi bahaya.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-400 font-bold">•</span>
                <div>
                  <span className="font-semibold text-yellow-400">Pelaksanaan Audit dan Inspeksi:</span>
                  <span className="text-white/80"> Melakukan jadwal audit HSE berkala untuk memastikan kepatuhan terhadap kebijakan keselamatan dan standar lingkungan.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-400 font-bold">•</span>
                <div>
                  <span className="font-semibold text-yellow-400">Tinjauan dan Peningkatan Sistem HSE:</span>
                  <span className="text-white/80"> Mengevaluasi dan menyempurnakan prosedur HSE kami untuk memastikan temuan dari audit.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 2: TUGAS & TANGGUNG JAWAB HSE */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="text-yellow-400">2. TUGAS & TANGGUNG JAWAB HSE</span>
            <div className="flex-1 h-0.5 bg-yellow-400/30"></div>
          </h2>
          <p className="text-white/80 leading-relaxed mb-4">
            Kesuksesan implementasi HSE tidak terlepas dari peran setiap anggota tim di semua tingkatan organisasi. Pembagian tugas yang jelas membantu memastikan bahwa setiap individu memiliki tanggung jawab dan akuntabilitas dalam menciptakan lingkungan kerja yang aman. Masing-masing pihak, mulai dari manajer hingga staf lapangan, memiliki peran penting dalam mewujudkan budaya keselamatan yang kuat.
          </p>

          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <div>
                <span className="font-semibold text-yellow-400">Manajer HSE:</span>
                <span className="text-white/80"> Mengelola kebijakan HSE, memimpin audit keselamatan, dan memastikan laporan insiden ditindak lanjuti dengan kebijakan yang sesuai dengan peraturan.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <div>
                <span className="font-semibold text-yellow-400">Pengawas Proyek:</span>
                <span className="text-white/80"> Memastikan kepatuhan tim lapangan terhadap standar keselamatan, melakukan inspeksi harian, dan melaporkan insiden.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <div>
                <span className="font-semibold text-yellow-400">Staf Lapangan:</span>
                <span className="text-white/80"> Mengikuti prosedur keselamatan, menggunakan alat pelindung diri (APD) dengan benar, dan melaporkan potensi bahaya.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <div>
                <span className="font-semibold text-yellow-400">Tim HSE:</span>
                <span className="text-white/80"> Memberikan pelatihan keselamatan, memfasilitasi pemeriksaan berkala, dan mendorong semua upaya pencegahan risiko.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Section 3: TUJUAN HSE */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="text-yellow-400">3. TUJUAN HSE</span>
            <div className="flex-1 h-0.5 bg-yellow-400/30"></div>
          </h2>
          <p className="text-white/80 leading-relaxed mb-4">
            Tujuan utama kami dalam implementasi HSE adalah menciptakan lingkungan kerja yang aman dan berkelanjutan bagi karyawan, klien, dan masyarakat sekitar. Dengan fokus pada pencegahan insiden yang terjadi, kami berkomitmen untuk memastikan program HSE kami serta menghsilkan tindakan preventif yang tepat guna mencegah risiko kembali.
          </p>

          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <div>
                <span className="font-semibold text-yellow-400">Mengurangi Risiko Cedera:</span>
                <span className="text-white/80"> Menurunkan angka kecelakaan kerja dengan pelatihan dan prosedur mitigasi risiko yang konsisten.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <div>
                <span className="font-semibold text-yellow-400">Kepatuhan terhadap Regulasi:</span>
                <span className="text-white/80"> Memastikan seluruh operasi memenuhi standar hukum dan regulasi keselamatan.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <div>
                <span className="font-semibold text-yellow-400">Melestasikan Lingkungan:</span>
                <span className="text-white/80"> Mengurangi dampak lingkungan melalui pengelolaan limbah dan penggunaan sumber daya yang efisien dan energi.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <div>
                <span className="font-semibold text-yellow-400">Menciptakan Budaya Keselamatan:</span>
                <span className="text-white/80"> Membangun kesadaran dan kepatuhan terhadap HSE sebagai bagian dari budaya kerja perusahaan.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Section 4: KEBIJAKAN HSE & STANDAR OPERASIONAL */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="text-yellow-400">4. KEBIJAKAN HSE & STANDAR OPERASIONAL</span>
            <div className="flex-1 h-0.5 bg-yellow-400/30"></div>
          </h2>
          <p className="text-white/80 leading-relaxed mb-4">
            Kami memastikan setiap proyek berjalan sesuai dengan kebijakan dan prosedur HSE yang ketat. Dengan menerapkan standar operasional yang jelas, kami dapat meminimalkan risiko di lokasi kerja dan memastikan proyek berjalan secara aman dan terhindar. Kebijakan ini menjadi panduan utama dalam setiap langkah kerja yang kami lakukan, baik di lapangan maupun dalam setiap administrasi proyek.
          </p>

          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <span className="text-white/80">Prosedur Penggunaan Alat Pelindung Diri (APD)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <span className="text-white/80">SOP Penanganan Limbah dan Material Berbahaya</span>
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <span className="text-white/80">Protokol Tanggap Darurat dan Evakuasi</span>
            </li>
            <li className="flex gap-3">
              <span className="text-yellow-400 font-bold">•</span>
              <span className="text-white/80">Kebijakan Pelaporan dan Investigasi Insiden</span>
            </li>
          </ul>
        </div>

        {/* Section 5: EVALUASI & PENINGKATAN BERKELANJUTAN */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="text-yellow-400">5. EVALUASI & PENINGKATAN BERKELANJUTAN</span>
            <div className="flex-1 h-0.5 bg-yellow-400/30"></div>
          </h2>
          <p className="text-white/80 leading-relaxed">
            Kami meyakini bahwa peningkatan berkelanjutan adalah kunci dari keberhasilan sistem HSE. Oleh karena itu, kami secara rutin melakukan evaluasi terhadap kinerja HSE melalui audit dan inspeksi yang membantu kami mengidentifikasi area yang perlu diperbaiki. Dengan komitmen ini, kami memastikan bahwa standar keselamatan dan lingkungan selalu meningkat seiring waktu.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HSEImplementation