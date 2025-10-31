import React, { useState, useEffect } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import {
  ChevronDown,
  ChevronUp,
  Search,
  ZoomIn,
  ZoomOut,
  RefreshCw,
} from "lucide-react";

// Import Server Actions
import { getOrgEmployees } from "@/lib/actions";

// TypeScript Interfaces
interface Employee {
  id: string;
  name: string;
  position: string;
  level: number;
  department?: string | null;
  parentId?: string | null;
  children?: Employee[];
}

interface OrgNodeProps {
  employee: Employee;
  isCollapsed: boolean;
  onToggle: (id: string) => void;
  isHighlighted: boolean;
}

// Component untuk setiap node
const OrgNode: React.FC<OrgNodeProps> = ({
  employee,
  isCollapsed,
  onToggle,
  isHighlighted,
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
          min-w-[180px] max-w-[220px]
          transition-all duration-200 hover:shadow-xl
          cursor-pointer relative
        `}
        onClick={() => hasChildren && onToggle(employee.id)}
      >
        <h3 className="font-bold text-sm text-center text-gray-800">
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

        {hasChildren && (
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow">
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Render recursive tree
const renderTree = (
  node: Employee,
  collapsedNodes: Set<string>,
  toggleNode: (id: string) => void,
  searchTerm: string,
  highlightedId: string | null
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
            highlightedId
          )
        )}
    </TreeNode>
  );
};

// Component utama
export default function OrganizationChart(): React.ReactElement {
  const [orgData, setOrgData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());
  const [scale, setScale] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Fetch data menggunakan Server Action
  const fetchOrgData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Panggilan ke server action
      const data = await getOrgEmployees();

      // Baris mock data yang menyebabkan error telah dihapus
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // const data: Employee[] = []; // <-- INI YANG DIHAPUS

      if (!data || data.length === 0) {
        setOrgData([]);
        setError("No organization data found in database");
      } else {
        setOrgData(data);

        // Tampilkan data di console untuk debugging
        console.log("Data dari database:", data);
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


  // Loading state
  if (loading) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 border-solid mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading organization data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
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

  // No data state
  if (orgData.length === 0) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
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
            Database belum memiliki data struktur organisasi
          </p>
          <button
            onClick={fetchOrgData}
            className="px-6 py-2 bg-yellow-400 text-slate-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header Controls */}
      <div className="bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-yellow-400">
          Organization Chart
        </h1>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
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

          {/* Zoom Controls */}
          <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-1">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-slate-600 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5 text-gray-300" />
            </button>
            <span className="text-sm text-gray-300 px-2 min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-slate-600 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          {/* Refresh */}
          <button
            onClick={fetchOrgData}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className="w-5 h-5 text-gray-300" />
          </button>

        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 overflow-auto p-8">
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
                    highlightedId
                  )
                )}
            </Tree>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-slate-800 border-t border-slate-700 p-3 text-center text-sm text-gray-400">
        💡 Tip: Klik pada card untuk expand/collapse • Gunakan scroll untuk
        navigasi
      </div>
    </div>
  );
}
