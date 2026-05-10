import prisma from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerCourier = async (req, res) => {
  const { name, email, password, vehicle } = req.body;

   console.log("BODY DITERIMA:", req.body);

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

    res.status(200).json({
      message: "Login Kurir berhasil",
      token,
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
