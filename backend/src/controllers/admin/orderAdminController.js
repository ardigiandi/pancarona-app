import prisma from "../../lib/prisma.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        items: true,
      },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const validStatus = ["pending", "paid", "shipped", "done", "cancelled"];

  if (!validStatus.includes(status))
    return res.status(400).json({ message: "Status tidak valid" });

  try {
    const order = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: { status },
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
