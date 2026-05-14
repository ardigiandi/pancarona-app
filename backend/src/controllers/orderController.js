import prisma from "../lib/prisma.js";
import { pusher } from "../lib/pusher.js";
import { Xendit } from "xendit-node";

const xendit = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY,
});

export const getOrderStatusById = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "ID tidak valid" });

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true, 
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

export const createOrder = async (req, res) => {
  const { fullName, address, phone, items } = req.body;
  const userId = req.user.id;

  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart kosong" });
    }

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );

    const order = await prisma.$transaction(async (tx) => {
      for (const item of items) {
        const sizeData = await tx.productSize.findFirst({
          where: { productId: item.productId, size: item.size },
        });

        if (!sizeData || sizeData.stock < item.qty) {
          throw new Error(`Stock ${item.name} size ${item.size} tidak cukup`);
        }

        const updatedStock = sizeData.stock - item.qty;

        await tx.productSize.update({
          where: { id: sizeData.id },
          data: { stock: updatedStock },
        });
      }

      return await tx.order.create({
        data: {
          userId,
          fullName,
          address,
          phone,
          totalPrice,
          status: "Pending",
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              name: item.name,
              image: item.image,
              price: item.price,
              size: item.size,
              qty: item.qty,
            })),
          },
        },
      });
    });

    try {
      await pusher.trigger("penerimaan-order", "order-baru", {
        orderId: order.id,
        customerName: fullName,
        address: address,
        total: totalPrice,
      });
      console.log("Pusher: Berhasil mengirim sinyal real-time.");
    } catch (pusherError) {
      console.error(
        "Pusher Error (Abaikan jika sengaja):",
        pusherError.message,
      );
    }

    const externalId = `order-${order.id}`;

    const invoice = await xendit.Invoice.createInvoice({
      data: {
        externalId,
        amount: totalPrice,
        description: `Pembayaran Order #${order.id} - Pancarona`,
        payerEmail: req.user.email || "customer@pancarona.com",
        successRedirectURL: "http://localhost:5173/payment-success",
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        invoiceUrl: invoice.invoiceUrl,
        externalId: invoice.id,
      },
    });

    res.json({
      invoiceUrl: invoice.invoiceUrl,
      orderId: order.id,
    });
  } catch (err) {
    console.error("Error pada createOrder:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const getLatestActiveOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const activeOrders = await prisma.order.findMany({
      where: {
        userId: userId,
        status: {
          in: ["Pending", "PICKUP_PROCESS"], 
        },
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc", 
      },
    });

    if (!activeOrders || activeOrders.length === 0) {
      return res.status(404).json({ message: "Kamu tidak memiliki pesanan yang sedang aktif" });
    }

    res.json(activeOrders); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
