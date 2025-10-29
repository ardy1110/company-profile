'use client'

import React, { useState } from 'react';
import dynamic from 'next/dynamic'
 
// Gunakan dynamic import dengan ssr: false
const OrgChartAdmin = dynamic(
  () => import('@/app/admin/components/OrgEmployed'), // <-- Sesuaikan path ke file OrgChartAdmin Anda
  { 
    ssr: false, // <-- Ini adalah kuncinya!
    loading: () => <p>Loading chart admin...</p> // Opsional: Tampilkan sesuatu saat komponen dimuat
  }
)
import {
  Menu,
  X,
  Users,
  Award,
  Briefcase,
  LayoutDashboard,
  Plus,
  Edit,
  Trash2,
  Upload,
  ChevronRight,
  LogOut,
  Settings,
  Bell
} from 'lucide-react';

// TypeScript Interfaces

interface Certificate {
  id: string;
  title: string;
  holder: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'expiring';
}

interface Project {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'ongoing' | 'completed' | 'on-hold';
  progress: number;
  budget: number;
  manager: string;
}

type MenuItem = 'dashboard' | 'organization' | 'certificates' | 'projects';



const sampleCertificates: Certificate[] = [
  { id: '1', title: 'ISO 9001:2015', holder: 'Company', issuer: 'BSI Group', issueDate: '2023-01-15', expiryDate: '2026-01-15', status: 'active' },
  { id: '2', title: 'K3 Umum', holder: 'Sudarto', issuer: 'Kemnaker', issueDate: '2024-03-20', expiryDate: '2025-03-20', status: 'expiring' },
  { id: '3', title: 'ISO 14001', holder: 'Company', issuer: 'TUV', issueDate: '2022-06-10', expiryDate: '2024-06-10', status: 'expired' },
];

const sampleProjects: Project[] = [
  { id: '1', name: 'Proyek Infrastruktur Jalan', client: 'Pemda Aceh', startDate: '2024-01-01', endDate: '2024-12-31', status: 'ongoing', progress: 65, budget: 5000000000, manager: 'Indra Lasmana' },
  { id: '2', name: 'Pembangunan Gedung Kantor', client: 'PT Sejahtera', startDate: '2024-06-01', endDate: '2025-05-31', status: 'ongoing', progress: 30, budget: 3000000000, manager: 'Regita Cahyani' },
  { id: '3', name: 'Renovasi Sekolah', client: 'Dinas Pendidikan', startDate: '2023-09-01', endDate: '2024-02-28', status: 'completed', progress: 100, budget: 1500000000, manager: 'Abdul Azis' },
];

// Components
const Sidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  activeMenu: MenuItem;
  setActiveMenu: (menu: MenuItem) => void;
}> = ({ isOpen, onClose, activeMenu, setActiveMenu }) => {
  const menuItems: { id: MenuItem; label: string; icon: React.ReactElement }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'organization', label: 'Struktur Organisasi', icon: <Users size={20} /> },
    { id: 'certificates', label: 'Kelola Sertifikat', icon: <Award size={20} /> },
    { id: 'projects', label: 'Kelola Proyek', icon: <Briefcase size={20} /> },
  ];

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
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
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
                ${activeMenu === item.id
                  ? 'bg-yellow-400 text-slate-900 font-semibold'
                  : 'text-gray-300 hover:bg-slate-800'
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
          <button className="w-full flex items-center gap-3 px-6 py-4 text-gray-300 hover:bg-slate-800 transition-colors">
            <Settings size={20} />
            <span>Pengaturan</span>
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-4 text-gray-300 hover:bg-slate-800 transition-colors">
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
};

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Karyawan</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">42</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Sertifikat Aktif</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">18</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Proyek Berjalan</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">7</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Briefcase className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Sertifikat Kadaluarsa</p>
              <h3 className="text-3xl font-bold text-red-600 mt-2">3</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Bell className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Proyek Terbaru</h3>
          <div className="space-y-3">
            {sampleProjects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-800">{project.name}</p>
                  <p className="text-sm text-gray-500">{project.client}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'completed' ? 'bg-green-100 text-green-700' :
                  project.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Sertifikat Akan Kadaluarsa</h3>
          <div className="space-y-3">
            {sampleCertificates.filter(c => c.status === 'expiring' || c.status === 'expired').map((cert) => (
              <div key={cert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-800">{cert.title}</p>
                  <p className="text-sm text-gray-500">{cert.holder}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  cert.status === 'expired' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {cert.expiryDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const OrganizationView: React.FC = () => {


  return (
    <div className="space-y-6">
      <OrgChartAdmin/>
    </div>
  );
};

const CertificatesView: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>(sampleCertificates);

  const getStatusBadge = (status: Certificate['status']) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      expiring: 'bg-yellow-100 text-yellow-700',
      expired: 'bg-red-100 text-red-700',
    };
    const labels = {
      active: 'Aktif',
      expiring: 'Akan Kadaluarsa',
      expired: 'Kadaluarsa',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Sertifikat</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Upload size={20} />
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 font-medium">
            <Plus size={20} />
            Tambah Sertifikat
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="text-yellow-600" size={24} />
              </div>
              {getStatusBadge(cert.status)}
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">{cert.title}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Pemegang:</span> {cert.holder}</p>
              <p><span className="font-medium">Penerbit:</span> {cert.issuer}</p>
              <p><span className="font-medium">Terbit:</span> {cert.issueDate}</p>
              <p><span className="font-medium">Kadaluarsa:</span> {cert.expiryDate}</p>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                <Edit size={16} />
                Edit
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100">
                <Trash2 size={16} />
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectsView: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);

  const getStatusColor = (status: Project['status']) => {
    const colors = {
      planning: 'bg-gray-100 text-gray-700',
      ongoing: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      'on-hold': 'bg-red-100 text-red-700',
    };
    return colors[status];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Proyek</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 font-medium">
          <Plus size={20} />
          Tambah Proyek
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{project.client}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Project Manager</p>
                <p className="font-medium text-gray-800">{project.manager}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Budget</p>
                <p className="font-medium text-gray-800">{formatCurrency(project.budget)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Mulai</p>
                <p className="font-medium text-gray-800">{project.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Selesai</p>
                <p className="font-medium text-gray-800">{project.endDate}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Progress</span>
                <span className="text-sm font-bold text-gray-800">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm font-medium">
                <ChevronRight size={16} />
                Detail
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 text-sm">
                <Edit size={16} />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function AdminDashboard(): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuItem>('dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardView />;
      case 'organization':
        return <OrganizationView />;
      case 'certificates':
        return <CertificatesView />;
      case 'projects':
        return <ProjectsView />;
      default:
        return <DashboardView />;
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
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}