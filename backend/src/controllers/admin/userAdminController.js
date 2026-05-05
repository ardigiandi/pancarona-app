import prisma from "../../lib/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.orderItem.deleteMany({
      where: { order: { userId: id } },
    });
    await prisma.order.deleteMany({ where: { userId: id } });
    await prisma.cartItem.deleteMany({ where: { cart: { userId: id } } });
    await prisma.cart.deleteMany({ where: { userId: id } });
    await prisma.user.delete({ where: { id } });
    res.json({ message: "User dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
