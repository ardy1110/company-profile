'use client'
import { getProjects } from '@/lib/projectActions'
import { useState, useEffect } from 'react'

// Types (Sesuaikan dengan model Prisma)
interface Project {
  id: string // Ganti ke string untuk uuid
  name: string
  field: string
  client: string
  year: number
}

interface GroupedProjects {
  year: string
  projects: Project[]
}

const PengalamanPekerjaan = () => {
  const [projects, setProjects] = useState<GroupedProjects[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null) // Hapus error sebelumnya
      
      // HAPUS: Simulasi delay
      // await new Promise(resolve => setTimeout(resolve, 1000))
      
      // GANTI: Panggil server action
      const data: Project[] = await getProjects()

      // HAPUS: Data dummy
      // const dummyData = [...]
      
      if (!data) {
        throw new Error("Data tidak ditemukan.");
      }

      // Logika grouping tetap sama
      const groupedByYear = groupProjectsByYear(data)
      setProjects(groupedByYear)

    } catch (err) {
      console.error('Error fetching projects:', err)
      setError(err instanceof Error ? err.message : 'Gagal mengambil data')
    } finally {
      setLoading(false)
    }
  }

  const groupProjectsByYear = (data: Project[]): GroupedProjects[] => {
    const grouped: Record<number, Project[]> = {}
    data.forEach(project => {
      const year = project.year
      if (!grouped[year]) {
        grouped[year] = []
      }
      grouped[year].push(project)
    })
    
    // Convert to array. 
    // Pengurutan sudah dilakukan di server action, tapi kita pastikan lagi.
    return Object.keys(grouped)
      .sort((a, b) => Number(b) - Number(a))
      .map(year => ({
        year,
        projects: grouped[Number(year)]
      }))
  }

  if (loading) {
    return (
      <div className="relative w-full min-h-screen bg-[#1a2744] text-white py-16 px-6 lg:px-12">
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative w-full min-h-screen bg-[#1a2744] text-white py-16 px-6 lg:px-12">
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 text-center">
            <p className="text-red-300">Error: {error}</p>
            <button 
              onClick={fetchProjects}
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-[#1a2744] px-6 py-2 rounded-full font-bold transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full min-h-screen bg-[#1a2744] text-white py-16 px-6 lg:px-12 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('/images/construction-bg.jpg')`,
        }}
      ></div>
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2744]/90 via-[#1a2744]/95 to-[#0d1929]/90"></div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-yellow-400">PENGALAMAN</span>
            <br />
            <span className="text-white">PEKERJAAN</span>
          </h1>
          <div className="w-48 h-1 bg-yellow-400"></div>
        </div>

        {/* Table Header */}
        <div className="bg-yellow-400 text-[#1a2744] font-bold px-6 py-3 mb-6 rounded-t-lg grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>Proyek</div>
          <div>Bidang / Sub Bidang Pekerjaan</div>
          <div>Pengguna Jasa</div>
        </div>

        {/* Projects by Year */}
        {projects.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
            <p className="text-white/70">Tidak ada data proyek yang ditemukan.</p>
          </div>
        ) : (
          projects.map(({ year, projects: yearProjects }) => (
            <div key={year} className="mb-8">
              {/* Year Badge */}
              <div className="bg-yellow-400 text-[#1a2744] font-bold px-6 py-2 mb-4 inline-block rounded">
                {year}
              </div>

              {/* Projects List */}
              <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                {yearProjects.map((project, index) => (
                  <div 
                    key={project.id || index}
                    className={`px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 hover:bg-white/10 transition-colors ${
                      index !== yearProjects.length - 1 ? 'border-b border-white/10' : ''
                    }`}
                  >
                    {/* Project Name */}
                    <div className="text-white/90">
                      <span className="text-yellow-400 mr-2">•</span>
                      {project.name}
                    </div>

                    {/* Field/Category */}
                    <div className="text-white/80 text-sm md:text-base">
                      {project.field}
                    </div>

                    {/* Client */}
                    <div className="text-white/80 text-sm md:text-base">
                      {project.client}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={fetchProjects}
            className="bg-yellow-400 hover:bg-yellow-500 text-[#1a2744] px-8 py-3 rounded-full font-bold transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/50 transform hover:scale-105"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  )
}

export default PengalamanPekerjaan
