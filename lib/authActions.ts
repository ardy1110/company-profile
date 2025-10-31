"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email & password wajib diisi" };
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    return { success: true, message: "Berhasil register", user };
  } catch (err) {
    console.log(err);
    
    return { success: false, message: "Email sudah digunakan" };
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { success: false, message: "User tidak ditemukan" };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return { success: false, message: "Password salah" };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return { success: true, message: "Login berhasil" };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return { success: true };
}
