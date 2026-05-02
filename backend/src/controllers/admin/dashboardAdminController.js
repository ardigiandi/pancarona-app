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

export const getWeeklyRevenue = async (req, res) => {
  try {
    const now = new Date();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const orders = await prisma.order.findMany({
      where: {
        status: "paid",
        createdAt: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
      select: {
        totalPrice: true,
        createdAt: true,
      },
    });

    const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const result = days.map((day) => ({ day, value: 0 }));

    orders.forEach((order) => {
      const dayIndex = new Date(order.createdAt).getDay();
      result[dayIndex].value += order.totalPrice;
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getActivities = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
      },
    });

    const users = await prisma.user.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
    });

    const orderActivities = orders.map((o) => ({
      user: o.name,
      action: "membuat pesanan",
      time: o.createdAt,
      dot: "bg-emerald-500",
    }));

    const usersActivities = users.map((u) => ({
      user: u.name,
      action: "mendaftarkan akun",
      time: u.createdAt,
      dot: "bg-emerald-500",
    }));

    const activities = [...orderActivities, ...usersActivities]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 5);

    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
