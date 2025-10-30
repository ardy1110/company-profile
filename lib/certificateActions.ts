"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";

/* ---------------------------- CREATE ---------------------------- */
export async function addCertificate(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const altText = formData.get("altText") as string;
    const order = parseInt(formData.get("order") as string) || 0;
    const file = formData.get("image") as File | null;

    if (!title || !altText) {
      return { success: false, message: "Data tidak lengkap!" };
    }

    let imageUrl: string | null = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `certificate/${Date.now()}-${file.name}`;

      const { data: uploadData, error } = await supabase.storage
        .from("certificate")
        .upload(fileName, buffer, { contentType: file.type, upsert: false });

      if (error) {
        console.error("❌ Upload error:", error);
        return { success: false, message: "Gagal mengunggah gambar!" };
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("certificate").getPublicUrl(uploadData.path);

      imageUrl = publicUrl;
    }

    const newCertificate = await prisma.certificate.create({
      data: {
        title,
        altText,
        order,
        imageUrl: imageUrl ?? "",
      },
    });

    revalidatePath("/admin");

    return { success: true, data: newCertificate, message: "Certificate berhasil ditambahkan!" };
  } catch (error) {
    console.error("❌ Gagal menambah certificate:", error);
    return { success: false, message: "Terjadi kesalahan saat menambah certificate" };
  }
}

/* ---------------------------- READ ---------------------------- */
export async function getCertificates() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { order: "asc" },
    });
    return { success: true, data: certificates };
  } catch (error) {
    console.error("❌ Gagal mengambil data certificate:", error);
    return { success: false, message: "Gagal mengambil data" };
  }
}

/* ---------------------------- UPDATE ---------------------------- */
export async function updateCertificate(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const altText = formData.get("altText") as string;
    const order = parseInt(formData.get("order") as string) || 0;
    const file = formData.get("image") as File | null;

    if (!title || !altText) {
      return { success: false, message: "Data tidak lengkap!" };
    }

    let imageUrl: string | null = null;

    // Jika ada gambar baru → upload ke Supabase
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `certificate/${Date.now()}-${file.name}`;

      const { data: uploadData, error } = await supabase.storage
        .from("certificate")
        .upload(fileName, buffer, { contentType: file.type, upsert: false });

      if (error) {
        console.error("❌ Upload error:", error);
        return { success: false, message: "Gagal mengunggah gambar baru!" };
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("certificate").getPublicUrl(uploadData.path);

      imageUrl = publicUrl;
    }

    const updated = await prisma.certificate.update({
      where: { id },
      data: {
        title,
        altText,
        order,
        ...(imageUrl ? { imageUrl } : {}), // hanya update gambar jika ada baru
      },
    });

    revalidatePath("/admin");

    return { success: true, data: updated, message: "Certificate berhasil diperbarui!" };
  } catch (error) {
    console.error("❌ Gagal update certificate:", error);
    return { success: false, message: "Terjadi kesalahan saat update certificate" };
  }
}

/* ---------------------------- DELETE ---------------------------- */
export async function deleteCertificate(id: string) {
  try {
    await prisma.certificate.delete({ where: { id } });

    revalidatePath("/admin");

    return { success: true, message: "Certificate berhasil dihapus!" };
  } catch (error) {
    console.error("❌ Gagal menghapus certificate:", error);
    return { success: false, message: "Terjadi kesalahan saat menghapus certificate" };
  }
}
