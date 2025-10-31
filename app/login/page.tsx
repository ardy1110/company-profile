// src/app/login/page.tsx atau components/LoginPage.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/authActions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fungsi penanganan login (placeholder)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const res = await loginUser(formData);

      if (!res.success) {
        alert(res.message);
        return;
      }

      // sukses login -> redirect
      router.push("/admin"); // ganti ke page yang kamu mau
    } catch (error) {
      console.error("Login Error:", error);
      alert("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1581093557989-18306915b136?q=80&w=2070&auto=format&fit=crop" // Gambar konstruksi/proyek
          alt="Latar Belakang Proyek Konstruksi"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay Biru Tua dengan Opacity Tinggi */}
        <div className="absolute inset-0 bg-[#001746]/90 backdrop-blur-sm"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 md:p-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.05)]">
        {/* Header dan Logo */}
        <div className="text-center mb-10">
          {/* Logo Perusahaan */}
          <div className="mx-auto w-16 h-16 relative mb-4 bg-yellow-500 p-2 rounded-full shadow-lg">
            <Image
              src="/logo.png" // Pastikan path logo Anda benar
              alt="Logo PT Pelita Kencana Mandiri"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            PORTAL LOGIN
          </h1>
          <p className="text-gray-300 mt-2">
            Masuk ke dasbor PT. Pelita Kencana Mandiri
          </p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-500" />
            <input
              name="email"
              type="email"
              placeholder="Alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
            />
          </div>

          {/* Input Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-500" />
            <input
              name="password"
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
            />
          </div>

         

          {/* Tombol Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 bg-yellow-500 text-[#001746] font-bold text-lg rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <LogIn className="w-5 h-5 mr-2" />
            )}
            {loading ? "Memuat..." : "Masuk"}
          </button>
        </form>

        {/* Footer Text */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-gray-400 text-sm">
            Hubungi Administrator jika Anda mengalami masalah akses.
          </p>
        </div>
      </div>
    </div>
  );
}
