import prisma from "../lib/prisma.js";

export const getProducts = async (req, res) => {
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

export const getProductBySlug = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: { sizes: true },
    });

    if (!product)
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
