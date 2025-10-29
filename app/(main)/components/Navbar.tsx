"use client";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";

// Komponen ListItem (Tidak ada perubahan di sini)
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-yellow-400/10 hover:text-yellow-400 text-white focus:bg-yellow-400/10 focus:text-yellow-400",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-white/70">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#001746]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-[#001746]">PKM</span>
            </div>
            <div className="hidden md:block">
              <div className="text-white font-bold text-lg leading-tight">
                PT. Pelita Kencana Mandiri
              </div>
              <div className="text-yellow-400 text-xs tracking-wider">
                COMPANY PROFILE
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-2">
              {/* --- PERUBAHAN DI SINI --- */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#home"
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:text-yellow-400 hover:bg-white/10 text-white")}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Menu dropdown tidak perlu diubah karena ListItem sudah menggunakan <a>, bukan <Link> */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:text-yellow-400 hover:bg-white/10">
                  Tentang Kami
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[450px] gap-3 p-4 bg-[#001746] border border-yellow-400/20">
                    <ListItem href="#tentang-kami" title="Tentang Kami">
                      Profil singkat dan sejarah perusahaan kami.
                    </ListItem>
                    <ListItem href="#visi-misi" title="Visi dan Misi">
                      Tujuan jangka panjang dan komitmen kami.
                    </ListItem>
                    <ListItem href="#struktur-organisasi" title="Struktur Organisasi">
                      Mengenal tim dan struktur di balik kesuksesan kami.
                    </ListItem>
                    <ListItem href="#nilai-perusahaan" title="Nilai - Nilai Perusahaan">
                      Prinsip yang menjadi landasan kerja kami.
                    </ListItem>
                    <ListItem href="#sertifikasi-legalitas" title="Sertifikasi & Legalitas">
                      Pengakuan resmi dan ketaatan hukum perusahaan.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:text-yellow-400 hover:bg-white/10">
                  Layanan
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                   <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2 bg-[#001746] border border-yellow-400/20">
                    <ListItem href="#layanan-kami" title="Layanan Kami">
                      Jelajahi berbagai layanan yang kami tawarkan.
                    </ListItem>
                    <ListItem href="#lingkungan" title="Komitmen Terhadap Lingkungan">
                      Upaya kami dalam menjaga kelestarian lingkungan.
                    </ListItem>
                    <ListItem href="/project-experience" title="Pengalaman Pekerjaan">
                      Portofolio proyek yang telah berhasil kami selesaikan.
                    </ListItem>
                    <ListItem href="#hse" title="Implementasi HSE">
                      Prioritas kami pada Kesehatan, Keselamatan, dan Lingkungan Kerja.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* --- PERUBAHAN DI SINI --- */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#portfolio"
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:text-yellow-400 hover:bg-white/10 text-white")}
                  >
                    Portfolio
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* --- PERUBAHAN DI SINI --- */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#contact"
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:text-yellow-400 hover:bg-white/10 text-white")}
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA & Mobile Menu Button (Tidak ada perubahan) */}
          <div className="hidden lg:block">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-[#001746] px-6 py-2 rounded-full font-bold transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/50 transform hover:scale-105">
              Get Quote
            </button>
          </div>
          <button className="lg:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;