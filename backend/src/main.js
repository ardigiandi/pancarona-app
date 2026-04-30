import express from "express";
import cors from "cors";
import "dotenv/config";

import adminRoutes from './routes/adminRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/auth', authRoutes)
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.json({ message: "Pancarona API is running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
