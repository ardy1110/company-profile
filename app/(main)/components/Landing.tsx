import Image from 'next/image'
import React from 'react'

const Landing = () => {
  return (
    <>
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <Image 
        src="/tower.jpg" 
        alt="Tower" 
        fill
        className="object-cover"
        priority
        quality={100}
      />
      
      {/* Overlay biru atas */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#001746]/90 [clip-path:polygon(0_0,100%_0,100%_50%,0_100%)]"></div>
      
      {/* Overlay kuning bawah */}
      <div className="absolute bottom-0 right-0 w-full h-1/3 bg-yellow-400 [clip-path:polygon(100%_50%,100%_100%,0_100%)]"></div>
      
      {/* Konten */}
      <div className="absolute top-[15%] left-[10%] text-white z-10">
        <div className="relative w-16 h-16 mb-5">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            fill
            className="object-contain"
          />
        </div>
        
        <div className="text-sm tracking-widest">COMPANY PROFILE</div>
        
        <h1 className="text-3xl font-extrabold leading-snug text-yellow-400 mt-2">
          PT. PELITA <br />
          KENCANA <br />
          MANDIRI
        </h1>
      </div>
      
      {/* Tahun */}
      <div className="absolute bottom-6 right-10 text-2xl font-bold text-black z-10">
        2024
      </div>
    </div>
    </>
  )
}

export default Landing