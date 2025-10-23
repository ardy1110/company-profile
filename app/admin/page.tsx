'use client'
import React, { useState } from 'react';
import { FaSitemap, FaProjectDiagram, FaCertificate, FaPlus, FaEdit, FaTrash, FaUpload } from 'react-icons/fa';

// --- DATA DUMMY (Dalam aplikasi nyata, ini dari API) ---
const initialMembers = [
  { id: 1, name: 'Budi Santoso', position: 'Direktur Utama', imageUrl: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Citra Lestari', position: 'Manajer Proyek', imageUrl: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Agus Wijaya', position: 'Kepala Pemasaran', imageUrl: 'https://i.pravatar.cc/150?u=3' },
];

const initialProjects = [
  { id: 1, title: 'Pembangunan Jembatan Merah Putih', description: 'Proyek strategis nasional di wilayah timur.', date: '2025-12-20' },
  { id: 2, title: 'Renovasi Gedung Perkantoran Pusat', description: 'Modernisasi fasilitas untuk efisiensi kerja.', date: '2026-06-15' },
];

const initialCertificates = [
  { id: 1, name: 'Sertifikat ISO 9001:2015', imageUrl: 'https://via.placeholder.com/300x200.png?text=ISO+9001' },
  { id: 2, name: 'Sertifikat K3', imageUrl: 'https://via.placeholder.com/300x200.png?text=Sertifikat+K3' },
  { id: 3, name: 'Penghargaan Kontraktor Terbaik', imageUrl: 'https://via.placeholder.com/300x200.png?text=Penghargaan' },
];
// --- END OF DATA DUMMY ---


// --- KOMPONEN UNTUK SETIAP BAGIAN ---

const StrukturOrganisasi = () => {
  const [members, setMembers] = useState(initialMembers);

  const handleDelete = (id: number) => {
    if (window.confirm('Yakin ingin menghapus anggota ini?')) {
      setMembers(members.filter(member => member.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Kelola Struktur Organisasi</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center">
          <FaPlus className="mr-2" /> Tambah Anggota
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">Foto</th>
              <th className="p-4">Nama</th>
              <th className="p-4">Jabatan</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <img src={member.imageUrl} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                </td>
                <td className="p-4 font-medium">{member.name}</td>
                <td className="p-4 text-gray-600">{member.position}</td>
                <td className="p-4 flex justify-center items-center space-x-2 h-24">
                  <button className="text-blue-500 hover:text-blue-700 p-2"><FaEdit size={20} /></button>
                  <button onClick={() => handleDelete(member.id)} className="text-red-500 hover:text-red-700 p-2"><FaTrash size={20} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const KelolaProyek = () => {
    const [projects, setProjects] = useState(initialProjects);

    const handleDelete = (id: number) => {
        if (window.confirm('Yakin ingin menghapus proyek ini?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Kelola Kegiatan & Proyek</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                    <FaPlus className="mr-2" /> Tambah Proyek
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <div key={project.id} className="bg-white rounded-lg shadow-md flex flex-col justify-between">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <span className="text-sm text-gray-500">Tanggal: {project.date}</span>
                        </div>
                        <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2">
                            <button className="text-blue-500 hover:text-blue-700 p-2"><FaEdit size={18} /></button>
                            <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700 p-2"><FaTrash size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const KelolaSertifikat = () => {
    const [certificates, setCertificates] = useState(initialCertificates);

    const handleDelete = (id: number) => {
        if (window.confirm('Yakin ingin menghapus sertifikat ini?')) {
            setCertificates(certificates.filter(cert => cert.id !== id));
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Kelola Foto Sertifikat</h2>
                <label htmlFor="upload-sertifikat" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center">
                    <FaUpload className="mr-2" /> Upload Baru
                </label>
                <input id="upload-sertifikat" type="file" className="hidden" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {certificates.map(cert => (
                    <div key={cert.id} className="relative bg-white rounded-lg shadow-md group">
                        <img src={cert.imageUrl} alt={cert.name} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-4">
                            <h3 className="font-bold truncate">{cert.name}</h3>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleDelete(cert.id)} className="bg-red-600 text-white p-2 rounded-full shadow-lg"><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- KOMPONEN UTAMA HALAMAN ADMIN ---

const AdminPage = () => {
  const [activeMenu, setActiveMenu] = useState('struktur'); // 'struktur', 'proyek', atau 'sertifikat'

  const renderContent = () => {
    switch (activeMenu) {
      case 'struktur':
        return <StrukturOrganisasi />;
      case 'proyek':
        return <KelolaProyek />;
      case 'sertifikat':
        return <KelolaSertifikat />;
      default:
        return <StrukturOrganisasi />;
    }
  };

  const getButtonClass = (menuName: string) => {
    return activeMenu === menuName
      ? 'flex items-center p-3 text-base font-bold text-white bg-blue-700 rounded-lg w-full'
      : 'flex items-center p-3 text-base font-bold text-gray-900 rounded-lg hover:bg-gray-100 w-full';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h1 className="text-2xl font-bold text-center mb-8">Admin Panel</h1>
        <nav className="space-y-3">
          <button onClick={() => setActiveMenu('struktur')} className={getButtonClass('struktur')}>
            <FaSitemap />
            <span className="ml-3">Struktur Organisasi</span>
          </button>
          <button onClick={() => setActiveMenu('proyek')} className={getButtonClass('proyek')}>
            <FaProjectDiagram />
            <span className="ml-3">Kegiatan & Proyek</span>
          </button>
          <button onClick={() => setActiveMenu('sertifikat')} className={getButtonClass('sertifikat')}>
            <FaCertificate />
            <span className="ml-3">Sertifikat</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPage;