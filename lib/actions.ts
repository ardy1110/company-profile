"use server";
// (Pastikan Anda telah menjalankan `npm install @prisma/client`)
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Tipe data untuk input (opsional namun best practice)
interface EmployeeCreateData {
  name: string;
  position: string;
  department?: string;
  level: number;
  parentId?: string;
}

interface EmployeeUpdateData {
  name?: string;
  position?: string;
  department?: string;
  level?: number;
  parentId?: string;
}

// Get all employees (hierarchical from root)
export async function getOrgEmployees() {
  console.log("Fetching organization data...");
  try {
    const data = await prisma.orgEmployee.findMany({
      where: { parentId: null }, // Mulai dari root (tidak punya parent)
      include: {
        children: {
          include: {
            children: {
              include: {
                children: {
                  include: {
                    children: {
                      include: {
                        children: true, // Sesuaikan kedalaman rekursif sesuai kebutuhan
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { level: "asc" }, // Urutkan berdasarkan level
    });
    console.log(`Found ${data.length} root nodes.`);
    return data;
  } catch (error) {
    console.error("Error fetching org employees:", error);
    return []; // Kembalikan array kosong jika error
  }
}

// Get single employee by id (Tidak digunakan di chart, tapi bagus untuk ada)
export async function getOrgEmployee(id: string) {
  try {
    return await prisma.orgEmployee.findUnique({
      where: { id },
      include: { children: true, parent: true },
    });
  } catch (error) {
    console.error(`Error fetching employee ${id}:`, error);
    return null;
  }
}

// Create employee
export async function createOrgEmployee(data: EmployeeCreateData) {
  console.log("Creating new employee:", data.name);
  try {
    return await prisma.orgEmployee.create({
      data: {
        name: data.name,
        position: data.position,
        department: data.department,
        level: data.level,
        parentId: data.parentId,
      },
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    throw new Error("Failed to create employee.");
  }
}

// Update employee
export async function updateOrgEmployee(
  id: string,
  data: EmployeeUpdateData
) {
  console.log("Updating employee:", id);
  try {
    return await prisma.orgEmployee.update({
      where: { id },
      data: {
        name: data.name,
        position: data.position,
        department: data.department,
        level: data.level,
        // parentId tidak di-support untuk diubah di sini, 
        // tapi bisa ditambahkan jika perlu logika drag-drop/pindah-pindah
      },
    });
  } catch (error) {
    console.error(`Error updating employee ${id}:`, error);
    throw new Error("Failed to update employee.");
  }
}

// Delete employee
// Berkat `onDelete: Cascade` di schema.prisma,
// menghapus satu node akan menghapus semua anak-anaknya.
export async function deleteOrgEmployee(id: string) {
  console.log("Deleting employee:", id);
  try {
    return await prisma.orgEmployee.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting employee ${id}:`, error);
    throw new Error("Failed to delete employee.");
  }
}
