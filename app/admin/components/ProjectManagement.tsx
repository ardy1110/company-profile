'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash, X, Loader2, Calendar, User, Briefcase } from 'lucide-react'
import { getProjects, createProject, updateProject, deleteProject } from '@/lib/projectActions'

interface Project {
  id: string
  name: string
  field: string
  client: string
  year: number
}

interface ProjectFormData {
  name: string
  field: string
  client: string
  year: number
}

const AdminProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError('Gagal memuat data proyek dari server.')
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null)
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [success, error])

  const handleOpenAddModal = () => {
    setModalType('add')
    setCurrentProject(null)
    setIsModalOpen(true)
    setError(null)
    setSuccess(null)
  }

  const handleOpenEditModal = (project: Project) => {
    setModalType('edit')
    setCurrentProject(project)
    setIsModalOpen(true)
    setError(null)
    setSuccess(null)
  }
  
  const handleOpenDeleteModal = (project: Project) => {
    setProjectToDelete(project)
    setIsDeleteModalOpen(true)
    setError(null)
    setSuccess(null)
  }

  const handleCloseModals = () => {
    setIsModalOpen(false)
    setIsDeleteModalOpen(false)
    setCurrentProject(null)
    setProjectToDelete(null)
    setModalType(null)
    setError(null)
  }

  const handleSaveProject = async (formData: ProjectFormData) => {
    setIsSubmitting(true)
    setError(null)
    try {
      if (modalType === 'edit' && currentProject) {
        await updateProject(currentProject.id, formData)
        setSuccess('Proyek berhasil diupdate!')
      } else {
        await createProject(formData)
        setSuccess('Proyek berhasil ditambahkan!')
      }
      
      handleCloseModals()
      await fetchProjects()
    } catch (err) {
      console.error(err)
      setError('Gagal menyimpan data. Pastikan semua field sudah diisi dengan benar.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return
    setIsSubmitting(true)
    setError(null)
    try {
      await deleteProject(projectToDelete.id)
      setSuccess('Proyek berhasil dihapus!')
      handleCloseModals()
      await fetchProjects()
    } catch (err) {
      console.error(err)
      setError('Gagal menghapus proyek.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading && projects.length === 0) {
    return (
      <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 flex justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-12 h-12 animate-spin text-yellow-400" />
          <p className="text-slate-300">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-8 px-4 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        {success && (
          <div className="mb-6 bg-green-500/20 border border-green-500 rounded-lg p-4 flex items-start gap-3">
            <div className="flex-1 text-green-200">{success}</div>
            <button onClick={() => setSuccess(null)} className="text-green-400 hover:text-green-300">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {error && !isModalOpen && !isDeleteModalOpen && (
          <div className="mb-6 bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-start gap-3">
            <div className="flex-1 text-red-200">{error}</div>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold">
              <span className="text-yellow-400">Kelola</span> <span className="text-white">Proyek</span>
            </h1>
            <div className="w-40 h-1 bg-yellow-400 mt-2 rounded-full"></div>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-6 py-3 rounded-lg font-bold transition-all inline-flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Tambah Proyek
          </button>
        </div>

        <div className="hidden lg:block bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-yellow-400 text-slate-900">
                <tr>
                  <th className="px-6 py-4 font-bold">Nama Proyek</th>
                  <th className="px-6 py-4 font-bold">Bidang</th>
                  <th className="px-6 py-4 font-bold">Klien</th>
                  <th className="px-6 py-4 font-bold text-center">Tahun</th>
                  <th className="px-6 py-4 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <Briefcase className="w-12 h-12 text-slate-600 mb-2" />
                        <p className="text-lg">Tidak ada proyek yang ditemukan.</p>
                        <button
                          onClick={handleOpenAddModal}
                          className="mt-2 text-yellow-400 hover:text-yellow-300 underline"
                        >
                          Tambah proyek pertama
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  projects.map(project => (
                    <tr key={project.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{project.name}</td>
                      <td className="px-6 py-4 text-slate-300">{project.field}</td>
                      <td className="px-6 py-4 text-slate-300">{project.client}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-medium">
                          <Calendar className="w-3 h-3" />
                          {project.year}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenEditModal(project)}
                            className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
                            aria-label={`Edit ${project.name}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(project)}
                            className="p-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors"
                            aria-label={`Hapus ${project.name}`}
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:hidden space-y-4">
          {projects.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 text-center border border-slate-700">
              <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">Tidak ada proyek yang ditemukan.</p>
              <button
                onClick={handleOpenAddModal}
                className="text-yellow-400 hover:text-yellow-300 underline"
              >
                Tambah proyek pertama
              </button>
            </div>
          ) : (
            projects.map(project => (
              <div key={project.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700 shadow-lg">
                <div className="mb-4">
                  <h3 className="font-bold text-white text-lg mb-2">{project.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Briefcase className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium">Bidang:</span>
                      <span>{project.field}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <User className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium">Klien:</span>
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium">Tahun:</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-700">
                  <button
                    onClick={() => handleOpenEditModal(project)}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(project)}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-medium transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Trash className="w-4 h-4" />
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleSaveProject}
        projectData={currentProject}
        modalType={modalType}
        isSubmitting={isSubmitting}
        formError={error}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        projectName={projectToDelete?.name ?? ''}
        isSubmitting={isSubmitting}
        formError={error}
      />
    </div>
  )
}

interface ProjectFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: ProjectFormData) => Promise<void>
  projectData: Project | null
  modalType: 'add' | 'edit' | null
  isSubmitting: boolean
  formError: string | null
}

const ProjectFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  projectData,
  modalType,
  isSubmitting,
  formError,
}: ProjectFormModalProps) => {
  const [name, setName] = useState('')
  const [field, setField] = useState('')
  const [client, setClient] = useState('')
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    if (modalType === 'edit' && projectData) {
      setName(projectData.name)
      setField(projectData.field)
      setClient(projectData.client)
      setYear(projectData.year)
    } else {
      setName('')
      setField('')
      setClient('')
      setYear(new Date().getFullYear())
    }
  }, [projectData, modalType, isOpen])

  if (!isOpen) return null

  const handleFormSubmit = async () => {
    if (!name.trim() || !field.trim() || !client.trim() || !year) {
      return
    }
    await onSubmit({ name, field, client, year })
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400">
            {modalType === 'edit' ? 'Edit Proyek' : 'Tambah Proyek'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {formError && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
            <strong>Error:</strong> {formError}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nama Proyek <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-700 text-white rounded-lg border border-slate-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              placeholder="Contoh: Pembangunan Jembatan Suramadu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Bidang <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-700 text-white rounded-lg border border-slate-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              placeholder="Contoh: Konstruksi, IT, Konsultan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Klien <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-700 text-white rounded-lg border border-slate-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              placeholder="Contoh: PT Jaya Abadi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Tahun <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
              min="1900"
              max="2100"
              className="w-full px-4 py-2.5 bg-slate-700 text-white rounded-lg border border-slate-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              placeholder={new Date().getFullYear().toString()}
            />
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Batal
            </button>
            <button
              onClick={handleFormSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 font-bold inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
                </>
              ) : (
                'Simpan'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  projectName: string
  isSubmitting: boolean
  formError: string | null
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, projectName, isSubmitting, formError }: DeleteConfirmModalProps) => {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-red-500/50 rounded-xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-500">Hapus Proyek</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {formError && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
            <strong>Error:</strong> {formError}
          </div>
        )}
        
        <p className="text-slate-300 mb-6">
          Apakah Anda yakin ingin menghapus proyek <strong className="text-white">&quot;{projectName}&quot;</strong>?
          <br />
          <span className="text-red-400 text-sm">Tindakan ini tidak dapat dibatalkan.</span>
        </p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold shadow-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Menghapus...
              </>
            ) : (
              <>
                <Trash className="w-4 h-4" /> Hapus
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminProjectPage