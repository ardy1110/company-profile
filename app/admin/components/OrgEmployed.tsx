"use client";

import React, { useState, useEffect } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Search,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Plus,
  Pencil,
  Trash,
  X,
  Loader2,
} from "lucide-react";

// Import Server Actions
import {
  getOrgEmployees,
  createOrgEmployee,
  updateOrgEmployee,
  deleteOrgEmployee,
} from "@/lib/actions"; // Pastikan path ini benar

// --- TypeScript Interfaces ---

interface Employee {
  id: string;
  name: string;
  position: string;
  level: number;
  department?: string | null;
  parentId?: string | null;
  children?: Employee[];
}

// Tipe untuk form, pisahkan dari Employee utama
type EmployeeFormData = {
  name: string;
  position: string;
  department: string;
  level: number;
};

interface OrgNodeProps {
  employee: Employee;
  isCollapsed: boolean;
  onToggle: (id: string) => void;
  isHighlighted: boolean;
  onAddChild: (parent: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

// --- Component untuk Setiap Node ---

const OrgNode: React.FC<OrgNodeProps> = ({
  employee,
  isCollapsed,
  onToggle,
  isHighlighted,
  onAddChild,
  onEdit,
  onDelete,
}) => {
  const hasChildren = employee.children && employee.children.length > 0;

  const getBackgroundColor = (): string => {
    if (isHighlighted) return "bg-blue-400 ring-4 ring-blue-600";
    if (employee.level === 1) return "bg-yellow-400";
    if (employee.level === 2) return "bg-yellow-300";
    if (employee.level === 3) return "bg-yellow-200";
    return "bg-white border-2 border-yellow-400";
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          ${getBackgroundColor()}
          px-6 py-3 rounded-lg shadow-lg
          min-w-[200px] max-w-[240px]
          transition-all duration-200 hover:shadow-xl
          cursor-pointer relative group
        `}
        onClick={() => hasChildren && onToggle(employee.id)}
      >
        {/* Tombol Edit & Hapus (Muncul saat hover) */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(employee);
            }}
            className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            title="Edit"
          >
            <Pencil className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(employee);
            }}
            className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            title="Delete"
          >
            <Trash className="w-3 h-3" />
          </button>
        </div>

        <h3 className="font-bold text-sm text-center text-gray-800 pt-4">
          {employee.name}
        </h3>
        <p className="text-xs text-center text-gray-600 mt-1">
          {employee.position}
        </p>
        {employee.department && (
          <p className="text-xs text-center text-gray-500 mt-1 italic">
            {employee.department}
          </p>
        )}

        {/* Tombol Expand/Collapse & Add Child */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(employee.id);
              }}
              className="bg-white rounded-full p-1 shadow"
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              {isCollapsed ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddChild(employee);
            }}
            className="bg-green-500 text-white rounded-full p-1 shadow hover:bg-green-600"
            title="Add Child"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Render Recursive Tree ---

const renderTree = (
  node: Employee,
  collapsedNodes: Set<string>,
  toggleNode: (id: string) => void,
  searchTerm: string,
  highlightedId: string | null,
  onAddChild: (parent: Employee) => void,
  onEdit: (employee: Employee) => void,
  onDelete: (employee: Employee) => void
): React.ReactElement => {
  const isCollapsed = collapsedNodes.has(node.id);
  const isHighlighted = highlightedId === node.id;

  return (
    <TreeNode
      key={node.id}
      label={
        <OrgNode
          employee={node}
          isCollapsed={isCollapsed}
          onToggle={toggleNode}
          isHighlighted={isHighlighted}
          onAddChild={onAddChild}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      }
    >
      {!isCollapsed &&
        node.children?.map((child) =>
          renderTree(
            child,
            collapsedNodes,
            toggleNode,
            searchTerm,
            highlightedId,
            onAddChild,
            onEdit,
            onDelete
          )
        )}
    </TreeNode>
  );
};

// --- Component Utama (Admin) ---

export default function OrgChartAdmin(): React.ReactElement {
  // State untuk Data Chart
  const [orgData, setOrgData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk UI Chart
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());
  const [scale, setScale] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // State untuk Modal & CRUD
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [currentEmployee, setCurrentEmployee] =
    useState<Partial<Employee> | null>(null); // Untuk data form

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch data menggunakan Server Action
  const fetchOrgData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOrgEmployees();
      if (!data) {
        setOrgData([]);
        setError("Failed to fetch data: Action returned undefined");
      } else if (data.length === 0) {
        setOrgData([]);
        // Ini bukan error, tapi state kosong
      } else {
        setOrgData(data);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch organization data";
      setError(errorMessage);
      console.error("Error fetching org data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgData();
  }, []);

  // --- Handlers untuk UI ---

  const toggleNode = (nodeId: string): void => {
    setCollapsedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handleZoomIn = (): void => setScale((s) => Math.min(s + 0.1, 2));
  const handleZoomOut = (): void => setScale((s) => Math.max(s - 0.1, 0.3));

  const searchEmployee = (node: Employee, term: string): string | null => {
    if (!term) return null;
    const lowerTerm = term.toLowerCase();
    if (
      node.name.toLowerCase().includes(lowerTerm) ||
      node.position.toLowerCase().includes(lowerTerm) ||
      (node.department && node.department.toLowerCase().includes(lowerTerm))
    ) {
      return node.id;
    }
    if (node.children) {
      for (const child of node.children) {
        const result = searchEmployee(child, term);
        if (result) return result;
      }
    }
    return null;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 2 && orgData.length > 0) {
      let foundId: string | null = null;
      for (const rootNode of orgData) {
        foundId = searchEmployee(rootNode, term);
        if (foundId) break;
      }
      setHighlightedId(foundId);
    } else {
      setHighlightedId(null);
    }
  };

  const exportChart = (): void => {
    alert(
      "Fitur export akan menggunakan html2canvas atau library serupa di implementasi production"
    );
  };

  // --- Handlers untuk Modal CRUD ---

  const handleCloseModals = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentEmployee(null);
    setEmployeeToDelete(null);
    setModalType(null);
  };

  const handleOpenAddRootModal = () => {
    setModalType("add");
    setCurrentEmployee({ level: 1, parentId: null });
    setIsModalOpen(true);
  };

  const handleOpenAddChildModal = (parent: Employee) => {
    setModalType("add");
    setCurrentEmployee({ parentId: parent.id, level: parent.level + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (employee: Employee) => {
    setModalType("edit");
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  // Handler untuk Aksi Form (Create / Update)
  const handleSaveEmployee = async (formData: EmployeeFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (modalType === "edit" && currentEmployee?.id) {
        // Update Employee
        await updateOrgEmployee(currentEmployee.id, {
          name: formData.name,
          position: formData.position,
          department: formData.department || undefined,
          level: formData.level,
        });
      } else if (modalType === "add") {
        // Create Employee
        await createOrgEmployee({
          name: formData.name,
          position: formData.position,
          department: formData.department || undefined,
          level: currentEmployee?.level ?? 1, // Ambil level dari currentEmployee
          parentId: currentEmployee?.parentId ?? undefined, // Ambil parentId dari currentEmployee
        });
      }
      handleCloseModals();
      await fetchOrgData(); // Refresh data setelah sukses
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save employee";
      setError(errorMessage);
      console.error("Error saving employee:", err);
      // Biarkan modal terbuka jika terjadi error
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler untuk Aksi Delete
  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await deleteOrgEmployee(employeeToDelete.id);
      handleCloseModals();
      await fetchOrgData(); // Refresh data setelah sukses
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete employee";
      setError(errorMessage);
      console.error("Error deleting employee:", err);
      // Biarkan modal terbuka jika terjadi error
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render State ---

  if (loading) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300 text-lg">Loading organization data...</p>
        </div>
      </div>
    );
  }

  if (error && !isModalOpen && !isDeleteModalOpen) {
    // Hanya tampilkan error utama jika tidak ada modal yang terbuka (karena modal punya error state sendiri)
    return (
      <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-500 text-white rounded-full p-4 inline-block mb-4">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-200 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchOrgData}
            className="px-6 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // --- Render Utama ---

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header Controls */}
      <div className="bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-yellow-400">Org Chart Admin</h1>
        <div className="flex items-center gap-3 flex-wrap">
          {/* ... (Search, Zoom, Refresh, Export controls - sama seperti view) ... */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search employee..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-64"
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-1">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-slate-600 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5 text-gray-300" />
            </button>
            <span className="text-sm text-gray-300 px-2 min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-slate-600 rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5 text-gray-300" />
            </button>
          </div>
          <button
            onClick={fetchOrgData}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
            title="Refresh Data"
            disabled={loading}
          >
            <RefreshCw
              className={`w-5 h-5 text-gray-300 ${
                loading ? "animate-spin" : ""
              }`}
            />
          </button>
          <button
            onClick={exportChart}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 font-medium"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 overflow-auto p-8">
        {orgData.length === 0 ? (
          // State jika tidak ada data
          <div className="text-center pt-20">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-20 h-20 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <p className="text-gray-300 text-lg mb-2">No Organization Data</p>
            <p className="text-gray-500 text-sm mb-4">
              Database belum memiliki data struktur organisasi.
            </p>
            <button
              onClick={handleOpenAddRootModal}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Root Employee
            </button>
          </div>
        ) : (
          // Render chart jika ada data
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              transition: "transform 0.2s ease",
            }}
          >
            {orgData.map((rootNode) => (
              <Tree
                key={rootNode.id}
                lineWidth="2px"
                lineColor="#64748b"
                lineBorderRadius="10px"
                label={
                  <OrgNode
                    employee={rootNode}
                    isCollapsed={collapsedNodes.has(rootNode.id)}
                    onToggle={toggleNode}
                    isHighlighted={highlightedId === rootNode.id}
                    onAddChild={handleOpenAddChildModal}
                    onEdit={handleOpenEditModal}
                    onDelete={handleOpenDeleteModal}
                  />
                }
              >
                {!collapsedNodes.has(rootNode.id) &&
                  rootNode.children?.map((child) =>
                    renderTree(
                      child,
                      collapsedNodes,
                      toggleNode,
                      searchTerm,
                      highlightedId,
                      handleOpenAddChildModal,
                      handleOpenEditModal,
                      handleOpenDeleteModal
                    )
                  )}
              </Tree>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="bg-slate-800 border-t border-slate-700 p-3 text-center text-sm text-gray-400">
        💡 Tip: Gunakan tombol +, ✏️, 🗑️ pada node untuk mengelola data.
      </div>

      {/* --- Modals --- */}
      <EmployeeFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleSaveEmployee}
        employeeData={currentEmployee}
        modalType={modalType}
        isSubmitting={isSubmitting}
        formError={error}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        employeeName={employeeToDelete?.name ?? ""}
        isSubmitting={isSubmitting}
        formError={error}
      />
    </div>
  );
}

// --- Component Modal Form ---

interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: EmployeeFormData) => void;
  employeeData: Partial<Employee> | null;
  modalType: "add" | "edit" | null;
  isSubmitting: boolean;
  formError: string | null;
}

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  employeeData,
  modalType,
  isSubmitting,
  formError,
}) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    position: "",
    department: "",
    level: 1,
  });

  // Update form state ketika employeeData berubah (saat modal dibuka)
  useEffect(() => {
    if (employeeData) {
      setFormData({
        name: employeeData.name ?? "",
        position: employeeData.position ?? "",
        department: employeeData.department ?? "",
        level: employeeData.level ?? 1,
      });
    }
  }, [employeeData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const title = modalType === "edit" ? "Edit Employee" : "Add New Employee";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-yellow-400">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {formError && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-2 rounded mb-4 text-sm">
            <strong>Error:</strong> {formError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Department (Optional)
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Level (Otomatis)
              </label>
              <input
                type="number"
                id="level"
                name="level"
                value={formData.level}
                readOnly
                disabled
                className="w-full px-3 py-2 bg-slate-900 text-gray-400 rounded-lg border border-slate-700"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium inline-flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Component Modal Konfirmasi Delete ---

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employeeName: string;
  isSubmitting: boolean;
  formError: string | null;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  employeeName,
  isSubmitting,
  formError,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-500">Delete Employee</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {formError && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-2 rounded mb-4 text-sm">
            <strong>Error:</strong> {formError}
          </div>
        )}

        <p className="text-gray-300 mb-4">
          Are you sure you want to delete{" "}
          <strong className="font-bold text-white">{employeeName}</strong>?
        </p>
        <p className="text-sm text-yellow-400 bg-yellow-900 bg-opacity-50 border border-yellow-700 p-3 rounded-lg">
          <strong>Warning:</strong> Deleting this employee will also delete all
          employees reporting under them (all children). This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium inline-flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
