import prisma from "../../lib/prisma.js";
import { pusher } from "../../lib/pusher.js";

export const updateStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status, note } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const updateOrder = await tx.order.update({
        where: { id: Number(orderId) },
        data: { status: status },
      });

      const log = await tx.orderStatusLog.create({
        data: {
          orderId: Number(orderId),
          status: `${status}: ${note || "Update status oleh kurir"}`,
        },
      });

      return { updateOrder, log };
    });

    await pusher.trigger(`order-${orderId}`, "status-update", {
      status: status,
      message: note,
      time: result.log.createdAt,
    });

    res.status(200).json({ message: "Status update", data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateLocation = async (req, res) => {
  const { orderId, lat, lng } = req.body;

  try {
    const location = await prisma.courierLocation.upsert({
      where: { orderId: Number(orderId) },
      update: { lat, lng },
      create: {
        orderId: Number(orderId),
        lat,
        lng,
      },
    });

    await pusher.trigger(`order-${orderId}`, "location-update", {
      lat,
      lng,
    });

    res.status(200).json({ message: "Location broadcasted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const takeOrder = async (req, res) => {
  const { orderId } = req.params;
  const { courierId } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: Number(orderId) },
      });
      if (!order) throw new Error("Order tidak ditemukan");
      if (order.courierId) throw new Error("Order sudah diambil kurir lain");

      const updatedOrder = await tx.order.update({
        where: { id: Number(orderId) },
        data: {
          courierId: Number(courierId),
          status: "pickup_process",
        },
      });
      return updatedOrder;
    });

    try {
      await pusher.trigger(`user-order-${result.userId}`, "status-update", {
        orderId: result.id,
        status: result.status,
        message: `Pesananmu sudah diambil oleh kurir (ID: ${courierId})!`,
      });
    } catch (pusherErr) {
      console.error("Gagal mengirim notifikasi ke user:", pusherErr.message);
    }

    res.status(200).json({ message: "Berhasil mengambil order", data: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAvailableOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: "paid",
        courierId: null,
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      message: "Daftar antrean order berhasil dimuat",
      data: orders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
