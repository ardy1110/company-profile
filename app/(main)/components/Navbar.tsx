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
import Image from "next/image";
// Menggunakan ikon dari lucide-react (asumsi sudah terinstal)
import { Menu, X, ChevronRight } from "lucide-react";

// --- Data Menu Mobile (Disederhanakan untuk Sidebar) ---
const mobileMenuItems = [
  { title: "Home", href: "#home", description: "" },
  { title: "Tentang Kami", href: "#about", description: "" },
  { title: "Visi dan Misi", href: "#visi-misi", description: "" },
  { title: "Layanan Kami", href: "#layanan-kami", description: "" },
  { title: "Komitmen Lingkungan", href: "#lingkungan", description: "" },
  {
    title: "Sertifikasi & Legalitas",
    href: "#sertifikasi-legalitas",
    description: "",
  },
  {
    title: "Pengalaman Pekerjaan",
    href: "/project-experience",
    description: "",
  },
];

// Komponen ListItem (Disesuaikan untuk Mobile Sidebar)
const MobileListItem = ({
  title,
  href,
  onClick,
}: {
  title: string;
  href: string;
  onClick: () => void;
}) => (
  <Link
    href={href}
    className="flex items-center justify-between p-4 border-b border-white/10 text-white hover:bg-yellow-500/10 transition duration-200"
    onClick={onClick}
  >
    <span className="text-lg font-semibold">{title}</span>
    <ChevronRight className="w-5 h-5 text-yellow-500" />
  </Link>
);

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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-yellow-500/10 hover:text-yellow-500 text-white focus:bg-yellow-500/10 focus:text-yellow-500",
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State baru untuk mobile menu

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mengunci scroll body saat sidebar terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* --- NAVBAR UTAMA --- */}
      <nav
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
          isScrolled
            ? "bg-[#001746]/95 backdrop-blur-md shadow-2xl" // Shadow lebih tegas
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="#home"
              className="flex items-center gap-3 flex-shrink-0"
            >
              <div className="relative w-10 h-10 overflow-hidden rounded-md bg-yellow-500 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="hidden sm:block">
                {" "}
                {/* Tampilkan di sm:block ke atas */}
                <div className="text-white font-extrabold text-xl leading-tight tracking-wide">
                  PT. Pelita Kencana Mandiri
                </div>
              </div>
            </Link>

            {/* Navigation Menu (Desktop) */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="#home"
                      // Mengubah warna aksen menjadi yellow-500
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-lg bg-transparent border-2 hover:text-yellow-500 hover:bg-white/10 text-white"
                      )}
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base bg-transparent text-white hover:text-yellow-500 hover:bg-white/10">
                    Tentang Kami
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[450px] gap-3 p-4 bg-[#001746] border border-yellow-500/20 shadow-xl">
                      <ListItem href="/about" title="Profil Perusahaan">
                        Profil singkat dan sejarah perusahaan kami.
                      </ListItem>
                      <ListItem href="#visi-misi" title="Visi dan Misi">
                        Tujuan jangka panjang dan komitmen kami.
                      </ListItem>
                      <ListItem
                        href="/struktur-organisasi"
                        title="Struktur Organisasi"
                      >
                        Mengenal tim dan struktur di balik kesuksesan kami.
                      </ListItem>
                      <ListItem
                        href="#nilai-perusahaan"
                        title="Nilai - Nilai Perusahaan"
                      >
                        Prinsip yang menjadi landasan kerja kami.
                      </ListItem>
                      <ListItem
                        href="#sertifikasi-legalitas"
                        title="Sertifikasi & Legalitas"
                      >
                        Pengakuan resmi dan ketaatan hukum perusahaan.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base bg-transparent text-white hover:text-yellow-500 hover:bg-white/10">
                    Layanan & Proyek
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2 bg-[#001746] border border-yellow-500/20 shadow-xl">
                      <ListItem href="#layanan-kami" title="Layanan Kami">
                        Jelajahi berbagai layanan yang kami tawarkan.
                      </ListItem>
                      <ListItem href="#lingkungan" title="Komitmen Lingkungan">
                        Upaya kami dalam menjaga kelestarian lingkungan.
                      </ListItem>
                      <ListItem
                        href="/project-experience"
                        title="Pengalaman Proyek"
                      >
                        Portofolio proyek yang telah berhasil kami selesaikan.
                      </ListItem>
                      <ListItem
                        href="/implementasi-hse"
                        title="Implementasi HSE"
                      >
                        Prioritas kami pada Keselamatan & Kesehatan Kerja.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => {
                      const element = document.getElementById("footer");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-base bg-yellow-500 text-[#001746] font-semibold hover:bg-yellow-400 cursor-pointer"
                    )}
                  >
                    Hubungi Kami
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Hamburger Icon (Mobile) */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR / DRAWER --- */}

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobileMenu}
      />

      {/* Sidebar Content */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-64 bg-[#001746] z-[60] shadow-2xl transform transition-transform duration-300 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Header Sidebar (Close Button) */}
          <div className="flex justify-end pt-2 pb-6 border-b border-white/10">
            <button
              onClick={closeMobileMenu}
              className="text-white p-2 rounded-md hover:bg-white/10 transition"
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-grow overflow-y-auto">
            {mobileMenuItems.map((item, index) => (
              <MobileListItem
                key={index}
                title={item.title}
                href={item.href}
                onClick={closeMobileMenu} // Tutup menu saat link diklik
              />
            ))}

            {/* Tombol Hubungi Kami (Aksen) */}
            <Link
              href="#footer"
              className="block mt-6 mx-4 w-auto text-center p-3 rounded-md bg-yellow-500 text-[#001746] font-bold hover:bg-yellow-400 transition"
              onClick={closeMobileMenu}
            >
              Hubungi Kami
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
