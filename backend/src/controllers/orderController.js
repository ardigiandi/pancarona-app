import prisma from "../lib/prisma.js";

export const getOrderStatus = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      select: { id: true, fullName: true, status: true },
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: "Tidak ada product ditemukan" });
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrderStatusById = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) return res.status(400).json({ message: "ID tidak  valid" });

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        status: true,
        totalPrice: true,
        createdAt: true,
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
