import { Xendit } from "xendit-node";
import prisma from "../lib/prisma.js";

const xendit = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY,
});

export const createCheckout = async (req, res) => {
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

    const order = await prisma.order.create({
      data: {
        userId,
        fullName,
        address,
        phone,
        totalPrice,
        status: "pending",
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

    for (const item of items) {
      const sizeData = await prisma.productSize.findFirst({
        where: {
          productId: item.productId,
          size: item.size,
        },
      });

      if (!sizeData) continue;

      const newStock = sizeData.stock - item.qty;

      if (newStock < 0) {
        return res.status(400).json({
          message: `Stock ${item.name} size ${item.size} tidak cukup`,
        });
      }

      await prisma.productSize.update({
        where: { id: sizeData.id },
        data: { stock: newStock },
      });
    }

    const externalId = `order-${order.id}`;

    const invoice = await xendit.Invoice.createInvoice({
      data: {
        externalId,
        amount: totalPrice,
        description: `Pembayaran Order #${order.id} - Pancarona`,
        payerEmail: req.user.email,
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
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
