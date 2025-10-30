'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash, X, Loader2, Upload } from 'lucide-react'
import { getCertificates, addCertificate, updateCertificate, deleteCertificate } from '@/lib/certificateActions'
import Image from 'next/image'

interface Certificate {
  id: string
  title: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  altText: string
  order: number
}

interface CertificateFormData {
  title: string
  altText: string
  order: number
  file?: File
}

interface CertificateApiResponse {
  success: boolean
  data?: Certificate[]
  message?: string
}

const AdminCertificatePage = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null)
  const [currentCert, setCurrentCert] = useState<Certificate | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [certToDelete, setCertToDelete] = useState<Certificate | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchCertificates = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await getCertificates() as CertificateApiResponse
      
      if (response.success && response.data) {
        setCertificates(response.data)
      } else {
        setCertificates([])
        if (response.message) {
          setError(`Gagal memuat data: ${response.message}`)
        }
      }
    } catch (err) {
      console.error('Error fetching certificates:', err)
      setError('Gagal memuat data sertifikat dari server.')
      setCertificates([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertificates()
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
    setCurrentCert(null)
    setIsModalOpen(true)
    setError(null)
    setSuccess(null)
  }

  const handleOpenEditModal = (cert: Certificate) => {
    setModalType('edit')
    setCurrentCert(cert)
    setIsModalOpen(true)
    setError(null)
    setSuccess(null)
  }
  
  const handleOpenDeleteModal = (cert: Certificate) => {
    setCertToDelete(cert)
    setIsDeleteModalOpen(true)
    setError(null)
    setSuccess(null)
  }

  const handleCloseModals = () => {
    setIsModalOpen(false)
    setIsDeleteModalOpen(false)
    setCurrentCert(null)
    setCertToDelete(null)
    setModalType(null)
    setError(null)
  }

  const handleSaveCertificate = async (formData: CertificateFormData) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const formObject = new FormData()
      formObject.append('title', formData.title)
      formObject.append('altText', formData.altText)
      formObject.append('order', formData.order.toString())
      
      if (formData.file) {
        formObject.append('image', formData.file)
      }

      let response
      if (modalType === 'edit' && currentCert) {
        response = await updateCertificate(currentCert.id, formObject)
      } else {
        response = await addCertificate(formObject)
      }
      
      if (response.success) {
        setSuccess(response.message || 'Data berhasil disimpan!')
        handleCloseModals()
        await fetchCertificates()
      } else {
        setError(response.message || 'Gagal menyimpan data.')
      }
    } catch (err) {
      console.error(err)
      setError('Gagal menyimpan data. Pastikan semua field sudah diisi dengan benar.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!certToDelete) return
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await deleteCertificate(certToDelete.id)
      if (response.success) {
        setSuccess(response.message || 'Sertifikat berhasil dihapus!')
        handleCloseModals()
        await fetchCertificates()
      } else {
        setError(response.message || 'Gagal menghapus sertifikat.')
      }
    } catch (err) {
      console.error(err)
      setError('Gagal menghapus sertifikat.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading && certificates.length === 0) {
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
              <span className="text-yellow-400">Kelola</span> <span className="text-white">Sertifikat</span>
            </h1>
            <div className="w-40 h-1 bg-yellow-400 mt-2 rounded-full"></div>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-6 py-3 rounded-lg font-bold transition-all inline-flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Tambah Sertifikat
          </button>
        </div>

        <div className="hidden lg:block bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-yellow-400 text-slate-900">
                <tr>
                  <th className="px-6 py-4 font-bold">Gambar</th>
                  <th className="px-6 py-4 font-bold">Judul Sertifikat</th>
                  <th className="px-6 py-4 font-bold">Alt Text</th>
                  <th className="px-6 py-4 font-bold text-center">Urutan</th>
                  <th className="px-6 py-4 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {certificates.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-lg">Tidak ada sertifikat yang ditemukan.</p>
                        <button
                          onClick={handleOpenAddModal}
                          className="mt-2 text-yellow-400 hover:text-yellow-300 underline"
                        >
                          Tambah sertifikat pertama
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  certificates.map(cert => (
                    <tr key={cert.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="relative w-24 h-20 rounded-lg overflow-hidden border-2 border-slate-600">
                          <Image
                            src={cert.imageUrl}
                            alt={cert.altText || cert.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{cert.title}</td>
                      <td className="px-6 py-4 text-slate-300">{cert.altText}</td>
                      <td className="px-6 py-4 text-center text-slate-300">{cert.order}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenEditModal(cert)}
                            className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
                            aria-label={`Edit ${cert.title}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(cert)}
                            className="p-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors"
                            aria-label={`Hapus ${cert.title}`}
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
          {certificates.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 text-center border border-slate-700">
              <p className="text-slate-400 mb-4">Tidak ada sertifikat yang ditemukan.</p>
              <button
                onClick={handleOpenAddModal}
                className="text-yellow-400 hover:text-yellow-300 underline"
              >
                Tambah sertifikat pertama
              </button>
            </div>
          ) : (
            certificates.map(cert => (
              <div key={cert.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-lg">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-slate-600">
                    <Image
                      src={cert.imageUrl}
                      alt={cert.altText || cert.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white mb-1 truncate">{cert.title}</h3>
                    <p className="text-sm text-slate-400 mb-1 truncate">{cert.altText}</p>
                    <p className="text-sm text-slate-500">Urutan: {cert.order}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleOpenEditModal(cert)}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(cert)}
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

      <CertificateFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleSaveCertificate}
        certificateData={currentCert}
        modalType={modalType}
        isSubmitting={isSubmitting}
        formError={error}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        certName={certToDelete?.title ?? ''}
        isSubmitting={isSubmitting}
        formError={error}
      />
    </div>
  )
}

interface CertificateFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: CertificateFormData) => Promise<void>
  certificateData: Certificate | null
  modalType: 'add' | 'edit' | null
  isSubmitting: boolean
  formError: string | null
}

const CertificateFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  certificateData,
  modalType,
  isSubmitting,
  formError,
}: CertificateFormModalProps) => {
  const [title, setTitle] = useState('')
  const [altText, setAltText] = useState('')
  const [order, setOrder] = useState(0)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (modalType === 'edit' && certificateData) {
      setTitle(certificateData.title)
      setAltText(certificateData.altText)
      setOrder(certificateData.order)
      setPreviewUrl(certificateData.imageUrl)
      setImageFile(null)
    } else {
      setTitle('')
      setAltText('')
      setOrder(0)
      setPreviewUrl(null)
      setImageFile(null)
    }
  }, [certificateData, modalType, isOpen])

  if (!isOpen) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleFormSubmit = async () => {
    if (!title.trim() || !altText.trim()) {
      return
    }
    if (modalType === 'add' && !imageFile) {
      return
    }
    await onSubmit({ title, altText, order, file: imageFile || undefined })
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400">
            {modalType === 'edit' ? 'Edit Sertifikat' : 'Tambah Sertifikat'}
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
              Judul Sertifikat <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-700 text-white rounded-lg border border-slate-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              placeholder="Masukkan judul sertifikat"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Alt Text <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-700 text-white rounded-lg border border-slate-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              placeholder="Deskripsi alternatif gambar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Urutan
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-4 py-2.5 bg-slate-700 text-white rounded-lg border border-slate-600 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Upload Gambar {modalType === 'add' && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 text-slate-300 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-600 hover:border-yellow-400 transition-all"
              >
                <Upload className="w-5 h-5" />
                {imageFile ? imageFile.name : 'Pilih gambar'}
              </label>
            </div>
            {modalType === 'edit' && !imageFile && (
              <p className="text-xs text-slate-500 mt-1">Biarkan kosong jika tidak ingin mengubah gambar</p>
            )}
          </div>

          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm text-slate-300 mb-2">Preview:</p>
              <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-slate-600">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-contain bg-slate-900"
                  unoptimized
                />
              </div>
            </div>
          )}

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
  certName: string
  isSubmitting: boolean
  formError: string | null
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, certName, isSubmitting, formError }: DeleteConfirmModalProps) => {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-red-500/50 rounded-xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-500">Hapus Sertifikat</h2>
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
          Apakah Anda yakin ingin menghapus sertifikat <strong className="text-white">&quot;{certName}&quot;</strong>?
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

export default AdminCertificatePage