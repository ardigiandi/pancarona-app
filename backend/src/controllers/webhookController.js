import prisma from "../lib/prisma.js";

export const xenditWebhook = async (req, res) => {
  const callback = req.body;

  const externalId = callback.id; 
  const status = callback.status;

  try {
    if (!externalId) {
      return res.status(400).json({ message: "externalId missing" });
    }

    let orderStatus = "pending";

    if (status === "PAID") orderStatus = "paid";
    else if (status === "EXPIRED") orderStatus = "expired";
    else if (status === "FAILED") orderStatus = "failed";

    const order = await prisma.order.findFirst({
      where: { externalId },
    });

    if (!order) {
      return res.status(200).json({ message: "Order not found" });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { status: orderStatus },
    });

    if (status === "PAID") {
      await prisma.cartItem.deleteMany({
        where: {
          cart: {
            userId: order.userId,
          },
        },
      });
    }

    res.status(200).json({ message: "Webhook received" });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ message: err.message });
  }
};