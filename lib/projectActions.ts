"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Tipe data untuk input
interface ProjectCreateData {
  name: string;
  field: string;
  client: string;
  year: number;
}

interface ProjectUpdateData {
  name?: string;
  field?: string;
  client?: string;
  year?: number;
}

/**
 * Mengambil semua proyek, diurutkan berdasarkan tahun (terbaru dulu)
 */
export async function getProjects() {
  console.log("Fetching projects...");
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { year: 'desc' }, // Urutkan berdasarkan tahun (terbaru dulu)
        { name: 'asc' }    // Lalu urutkan berdasarkan nama
      ]
    });
    console.log(`Found ${projects.length} projects.`);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return []; // Kembalikan array kosong jika error
  }
}

/**
 * Membuat proyek baru
 */
export async function createProject(data: ProjectCreateData) {
  console.log("Creating new project:", data.name);
  try {
    return await prisma.project.create({ data });
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project.");
  }
}

/**
 * Mengupdate proyek berdasarkan ID
 */
export async function updateProject(id: string, data: ProjectUpdateData) {
  console.log("Updating project:", id);
  try {
    return await prisma.project.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error(`Error updating project ${id}:`, error);
    throw new Error("Failed to update project.");
  }
}

/**
 * Menghapus proyek berdasarkan ID
 */
export async function deleteProject(id: string) {
  console.log("Deleting project:", id);
  try {
    return await prisma.project.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error);
    throw new Error("Failed to delete project.");
  }
}
