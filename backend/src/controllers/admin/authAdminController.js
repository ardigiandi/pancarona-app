import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin)
      return res.status(404).json({ message: "Admin tidak ditemukan" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(404).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_ADMIN_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAdminProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const admin = await prisma.admin.update({
      where: { id: req.admin.id },
      data: { name, email },
    });
    res.json({ admin: { id: admin.id, name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAdminPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
    });
    const valid = await bcrypt.compare(oldPassword, admin.password);
    if (!valid) return res.status(401).json({ message: "Password lama salah" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: { id: req.admin.id },
      data: { password: hashed },
    });
    res.json({ message: "Password berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = (req, res) => {
  try {
    res.json({
      admin: req.admin,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const adminLogout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout berhasil" });
};
