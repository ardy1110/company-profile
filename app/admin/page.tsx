
"use client";


import React, { useState } from "react";
import dynamic from "next/dynamic";
import { logoutUser } from "@/lib/authActions";

// Gunakan dynamic import dengan ssr: false
const OrgChartAdmin = dynamic(
  () => import("@/app/admin/components/OrgEmployed"), // <-- Sesuaikan path ke file OrgChartAdmin Anda
  {
    ssr: false, // <-- Ini adalah kuncinya!
    loading: () => <p>Loading chart admin...</p>, // Opsional: Tampilkan sesuatu saat komponen dimuat
  }
);
import {
  Menu,
  X,
  Users,
  Award,
  Briefcase,
  LogOut,
  Bell,
} from "lucide-react";
import AdminPengalamanPekerjaan from "./components/ProjectManagement";
import AdminSertifikasiLegalitas from "./components/Certificate";

type MenuItem = "dashboard" | "organization" | "certificates" | "projects";

// Components
const Sidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  activeMenu: MenuItem;
  setActiveMenu: (menu: MenuItem) => void;
}> = ({ isOpen, onClose, activeMenu, setActiveMenu }) => {
  const menuItems: { id: MenuItem; label: string; icon: React.ReactElement }[] =
    [
      {
        id: "organization",
        label: "Struktur Organisasi",
        icon: <Users size={20} />,
      },
      {
        id: "certificates",
        label: "Kelola Sertifikat",
        icon: <Award size={20} />,
      },
      { id: "projects", label: "Kelola Proyek", icon: <Briefcase size={20} /> },
    ];

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/login"; // pakai window agar cookies terhapus lalu redirect clean
  };
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-slate-900 text-white w-64 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-yellow-400">Admin Panel</h1>
          <button onClick={onClose} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                onClose();
              }}
              className={`
                w-full flex items-center gap-3 px-6 py-3 transition-colors
                ${
                  activeMenu === item.id
                    ? "bg-yellow-400 text-slate-900 font-semibold"
                    : "text-gray-300 hover:bg-slate-800"
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-6 py-4 text-gray-300 hover:bg-slate-800 transition-colors"
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
};

const OrganizationView: React.FC = () => {
  return (
    <div className="space-y-6">
      <OrgChartAdmin />
    </div>
  );
};

const CertificatesView: React.FC = () => {
  return (
    <div className="space-y-6">
      <AdminSertifikasiLegalitas />
    </div>
  );
};

const ProjectsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <AdminPengalamanPekerjaan />
    </div>
  );
};

// Main Component
export default function AdminDashboard(): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuItem>("organization");

  const renderContent = () => {
    switch (activeMenu) {
      case "organization":
        return <OrganizationView />;
      case "certificates":
        return <CertificatesView />;
      case "projects":
        return <ProjectsView />;
      default:
        return <OrganizationView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-slate-900">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
