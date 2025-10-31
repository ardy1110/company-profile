"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCertificates } from "@/lib/certificateActions"; 
import { Loader2, Zap } from "lucide-react"; // Menambah ikon Zap untuk penekanan

interface Certificate {
  id: string;
  title: string;
  imageUrl: string;
  altText: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CertificateApiResponse {
  success: boolean;
  data?: Certificate[];
  message?: string;
}

export default function SertifikasiLegalitas() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi pemanggilan API (gunakan kode asli Anda)
    const fetchCertificates = async () => {
      try {
        const res = await getCertificates() as CertificateApiResponse;
        if (res.success && res.data) {
          // Sortir berdasarkan 'order' jika ada, atau pastikan data terurut
          const sortedData = res.data.sort((a, b) => a.order - b.order);
          setCertificates(sortedData);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();

  }, []);



  if (loading) {
    return (
      <div id="sertifikasi-legalitas" className="scroll-mt-24 min-h-[50vh] flex flex-col items-center justify-center bg-[#001746]">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-500 mb-4" />
        <p className="text-gray-300">Memuat data sertifikasi...</p>
      </div>
    );
  }

  return (
    <div id="sertifikasi-legalitas" className="scroll-mt-24 bg-[#001746] relative overflow-hidden py-20 lg:py-28">
      
      {/* Decorative Pattern - Disesuaikan dengan warna perusahaan */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,.05) 40px, rgba(255,255,255,.05) 80px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto px-6 lg:px-8 max-w-7xl">
        
        {/* Header Section - Konsisten dengan desain sebelumnya */}
        <div className="mb-16">
          <p className="text-lg font-bold text-yellow-500 tracking-widest uppercase mb-3">
                Jaminan Kredibilitas
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight">
            <span className="text-white">SERTIFIKASI</span>
            <span className="text-yellow-500"> & </span>
            <span className="text-white">LEGALITAS</span>
          </h1>
          <p className="text-gray-300 mt-6 max-w-3xl leading-relaxed text-base">
            Kami berkomitmen untuk memenuhi standar tertinggi dalam legalitas dan kualitas. Berikut adalah bukti sertifikasi dan legalitas yang memperkuat kepercayaan Anda terhadap layanan dan produk kami.
          </p>
        </div>

        {/* Certificates Section */}
        {certificates.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex flex-col items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-10 border border-yellow-500/20">
              <Zap className="w-10 h-10 text-yellow-500" />
              <p className="text-gray-300 text-lg">Data sertifikat legalitas sedang disiapkan.</p>
            </div>
          </div>
        ) : (
          /* KUNCI DESAIN: Horizontal Scroll Container */
          <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 space-x-6 md:space-x-8 lg:space-x-10 -mx-6 md:-mx-8 lg:-mx-10 px-6 md:px-8 lg:px-10 scrollbar-hide"> 
            {certificates.map((cert) => (
              /* Lebar Kartu dibuat tetap, agar bisa digeser */
              <div key={cert.id} className="snap-start flex-shrink-0 w-72 md:w-80 lg:w-96 group relative pt-6">
                
                {/* Label - Dipindah ke atas card agar tidak tertutup */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-yellow-500 text-[#001746] font-extrabold text-sm md:text-base px-6 py-2 rounded-full shadow-xl transform hover:scale-105 transition duration-300 whitespace-nowrap">
                    {cert.title}
                  </div>
                </div>

                {/* Certificate Card */}
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-yellow-500/30 border border-white/10">
                  <div className="aspect-[3/4] relative bg-gray-100">
                    <Image
                      src={cert.imageUrl}
                      alt={cert.altText}
                      fill
                      className="object-cover transition-opacity duration-500 group-hover:opacity-90"
                      unoptimized
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Element kosong untuk memastikan item terakhir bisa digeser dengan baik */}
            <div className="flex-shrink-0 w-10"></div>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl opacity-50"></div>
    </div>
  );
}