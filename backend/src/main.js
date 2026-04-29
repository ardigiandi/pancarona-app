import express from "express";
import cors from "cors";
import "dotenv/config";

import adminRoutes from './routes/adminRoutes.js'

const app = express();
app.use(express.json());

app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.json({ message: "Pancarona API is running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
