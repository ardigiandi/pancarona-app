import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@pancarona.id" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@pancarona.id",
      password: hashed,
    },
  });
  console.log("Admin seeded!");
}

main().finally(() => prisma.$disconnect());