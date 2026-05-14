import prisma from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerCourier = async (req, res) => {
  const { name, email, password, vehicle } = req.body;

  try {
    const existingCourier = await prisma.courier.findUnique({
      where: { email },
    });

    if (existingCourier) {
      return res.status(200).json({ message: "Email Sudah Terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCourier = await prisma.courier.create({
      data: {
        name,
        email,
        password: hashedPassword,
        vehicle,
      },
    });

    res.status(201).json({
      message: "Kurir behasil dibuat",
      data: { id: newCourier.id, name: newCourier.name },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginCourier = async (req, res) => {
  const { email, password } = req.body;
  try {
    const courier = await prisma.courier.findUnique({
      where: { email },
    });

    if (!courier) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const isPassword = await bcrypt.compare(password, courier.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign({ id: courier.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Kurir berhasil",
      data: {
        id: courier.id,
        name: courier.name,
        email: courier.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logoutCourier = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({ message: "Logout Berhasil, cookie dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCourierProfile = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Sesi habis, silakan login kembali" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const courier = await prisma.courier.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        vehicle: true, 
      },
    });

    if (!courier) {
      return res.status(404).json({ message: "Akun kurir tidak ditemukan" });
    }

    res.status(200).json({
      message: "Sesi valid",
      data: courier,
    });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Token tidak valid atau kedaluwarsa" });
  }
};
