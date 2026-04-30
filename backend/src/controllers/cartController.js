import prisma from "../lib/prisma.js";

const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true },
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: { items: true },
    });
  }
  return cart;
};

export const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addToCart = async (req, res) => {
  const { productId, name, image, price, size, qty, stock } = req.body;
  try {
    const cart = await getOrCreateCart(req.user.id);
    const existing = cart.items.find(
      (i) => i.productId === productId && i.size === size,
    );

    if (existing) {
      const newQty = existing.qty + qty;
      if (newQty > existing.stock)
        return res.status(400).json({ message: "Stock tidak cukup" });

      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { qty: newQty },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          name,
          image,
          price,
          size,
          qty,
          stock,
        },
      });
    }

    const updated = await prisma.cart.findUnique({
      where: { userId: req.user.id },
      include: { items: true },
    });
    res.json(updated.items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateQty = async (req, res) => {
  const { productId, size, delta } = req.body;
  try {
    const cart = await getOrCreateCart(req.user.id);
    const item = cart.items.find(
      (i) => i.productId === productId && i.size === size,
    );
    if (!item) return res.status(404).json({ message: "Item tidak ditemukan" });

    const newQty = item.qty + delta;
    if (newQty < 1) return res.status(400).json({ message: "Qty minimal 1" });
    if (newQty > item.stock)
      return res.status(400).json({ message: "Melebihi stock" });

    await prisma.cartItem.update({
      where: { id: item.id },
      data: { qty: newQty },
    });
    res.json({ message: "Qty diupdate" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeItem = async (req, res) => {
  const { productId, size } = req.params;
  try {
    const cart = await getOrCreateCart(req.user.id);
    const item = cart.items.find(
      (i) => i.productId === parseInt(productId) && i.size === size,
    );
    if (!item) return res.status(404).json({ message: "Item tidak ditemukan" });

    await prisma.cartItem.delete({ where: { id: item.id } });
    res.json({ message: "Item dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    res.json({ message: "Cart dikosongkan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
