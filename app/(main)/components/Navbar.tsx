"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Building2, Users, Briefcase } from "lucide-react";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      title: "Construction",
      icon: Building2,
      description: "Building and infrastructure",
    },
    {
      title: "Consultation",
      icon: Users,
      description: "Expert advisory services",
    },
    { title: "Management", icon: Briefcase, description: "Project management" },
  ];

  const about = [
    {
      title: "Construction",
      icon: Building2,
      description: "Building and infrastructure",
    },
    {
      title: "Consultation",
      icon: Users,
      description: "Expert advisory services",
    },
    { title: "Management", icon: Briefcase, description: "Project management" },
  ];
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#001746]/95 backdrop-blur-lg shadow-lg py-3"
            : "bg-transparent py-6"
        } border-b border-white/10`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center font-bold text-[#001746] text-xl shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-yellow-400/50">
              PKM
            </div>
            <div className="text-white">
              <div className="text-xs tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                PT. PELITA
              </div>
              <div className="font-bold text-sm text-yellow-400 group-hover:text-yellow-300 transition-colors">
                KENCANA MANDIRI
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="#home"
                      className="text-white hover:text-yellow-400 transition-all text-sm font-medium"
                    >
                      Home
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-yellow-400 transition-all text-sm font-medium">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-[#001746]/95 backdrop-blur-lg p-4 border border-white/10 rounded-lg shadow-xl min-w-[300px]">
                    <ul className="grid gap-2">
                      {about.map((service, index) => {
                        const Icon = service.icon;
                        return (
                          <li key={index}>
                            <a
                              href="#services"
                              className="flex items-center gap-3 text-white hover:text-yellow-400"
                            >
                              <Icon className="w-5 h-5 text-yellow-400" />
                              <div>
                                <div className="font-medium text-sm">
                                  {service.title}
                                </div>
                                <p className="text-xs text-white/60 mt-0.5">
                                  {service.description}
                                </p>
                              </div>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white hover:text-yellow-400 text-sm font-medium">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-[#001746]/95 backdrop-blur-lg p-4 border border-white/10 rounded-lg shadow-xl min-w-[300px]">
                    <ul className="grid gap-2">
                      {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                          <li key={index}>
                            <a
                              href="#services"
                              className="flex items-center gap-3 text-white hover:text-yellow-400"
                            >
                              <Icon className="w-5 h-5 text-yellow-400" />
                              <div>
                                <div className="font-medium text-sm">
                                  {service.title}
                                </div>
                                <p className="text-xs text-white/60 mt-0.5">
                                  {service.description}
                                </p>
                              </div>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="#projects"
                      className="text-white hover:text-yellow-400 text-sm font-medium"
                    >
                      Projects
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="#contact"
                      className="text-white hover:text-yellow-400 text-sm font-medium"
                    >
                      Contact
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Tombol CTA */}
          <button className="hidden lg:block bg-yellow-400 hover:bg-yellow-500 text-[#001746] px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/50 transform hover:scale-105">
            Get Started
          </button>

          {/* Tombol Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            mobileMenuOpen ? "max-h-[600px] mt-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-3 pb-4 px-6">
            <a
              href="#home"
              className="text-white hover:text-yellow-400 text-sm font-medium py-2 border-b border-white/10"
            >
              Home
            </a>
            <div className="border-b border-white/10 pb-3">
              <div className="text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                About
              </div>
              <div className="pl-3 space-y-2">
                {about.map((service, index) => (
                  <a
                    key={index}
                    href="#services"
                    className="block text-white hover:text-yellow-400 text-sm py-1"
                  >
                    {service.title}
                  </a>
                ))}
              </div>
            </div>
            <div className="border-b border-white/10 pb-3">
              <div className="text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                Services
              </div>
              <div className="pl-3 space-y-2">
                {services.map((service, index) => (
                  <a
                    key={index}
                    href="#services"
                    className="block text-white hover:text-yellow-400 text-sm py-1"
                  >
                    {service.title}
                  </a>
                ))}
              </div>
            </div>
            <a
              href="#projects"
              className="text-white hover:text-yellow-400 text-sm font-medium py-2 border-b border-white/10"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-white hover:text-yellow-400 text-sm font-medium py-2 border-b border-white/10"
            >
              Contact
            </a>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-[#001746] px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 mt-2">
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
