import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return res.status(404).json({ message: "Admin tidak ditemukan" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(404).json({message: "Password salah"})

    const token = jwt.sign(
        {id: admin.id, email: admin.email},
        process.env.JWT_ADMIN_SECRET,
        {expiresIn: "1d"}
    );

    res.json({token, admin: {id: admin.id, name: admin.name, email: admin.email}})
  } catch (err) {
    res.status(500).json({message: err.message})
  }
};
