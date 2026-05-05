import prisma from "../../lib/prisma.js";
import { slugify } from "../../lib/slugify.js";
import cloudinary from "../../lib/cloudinary.js";

export const getProduct = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { sizes: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, description, sizes } = req.body;
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "Minimal upload 1 foto" });

    const images = req.files.map((file) => file.path);

    let slug = slugify(name);
    const exists = await prisma.product.findUnique({ where: { slug } });
    if (exists) slug = `${slug}-${Date.now()}`;

    // ← parse sizes dengan aman
    let parsedSizes = [];
    try {
      parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    } catch {
      return res.status(400).json({ message: "Format sizes tidak valid" });
    }

    if (!parsedSizes || parsedSizes.length === 0)
      return res.status(400).json({ message: "Pilih minimal 1 ukuran" });

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        price: parseInt(price),
        description,
        images,
        sizes: {
          create: parsedSizes.map((s) => ({
            size: s.size,
            stock: parseInt(s.stock),
          })),
        },
      },
      include: { sizes: true },
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, description, sizes } = req.body;
  try {
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    const images =
      req.files && req.files.length > 0
        ? req.files.map((file) => file.path)
        : existingProduct.images;

    let slug = slugify(name);
    const exists = await prisma.product.findFirst({
      where: { slug, NOT: { id } },
    });
    if (exists) slug = `${slug}-${Date.now()}`;

    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;

    await prisma.productSize.deleteMany({ where: { productId: id } });

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        price: parseInt(price),
        description,
        images,
        sizes: { create: parsedSizes },
      },
      include: { sizes: true },
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    for (const url of product.images) {
      const publicId = url.split("/").slice(-3).join("/").split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await prisma.productSize.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });

    res.json({ message: "Produk dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
