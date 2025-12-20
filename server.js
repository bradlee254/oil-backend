// server.js or index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import fuelRoutes from "./src/routes/fuelRoutes.js";
import riderRoutes from "./src/routes/riderRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/fuel", fuelRoutes);
app.use("/api/rider", riderRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Oil project backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});