import prisma from "../../lib/prisma.js";

export const getDashboard = async (req, res) => {
  try {
    const [totalUsers, totalOrders, totalProducts, recentOrders, revenue] =
      await Promise.all([
        prisma.user.count(),
        prisma.order.count(),
        prisma.product.count(),
        prisma.order.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          include: { user: { select: { name: true, email: true } } },
        }),
        prisma.order.aggregate({
          _sum: { totalPrice: true },
          where: { status: "paid" },
        }),
      ]);

    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue: revenue._sum.totalPrice || 0,
      recentOrders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
