import dotenv from "dotenv";
dotenv.config()
import cors from "cors"
import express from "express";
import mongoose from "mongoose";
import prodcutRoutes from './Routes/product.route.js'
import path from "path";
import { fileURLToPath } from "url";

const app = express()

// ✅ 1. Add CORS FIRST
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use('/api/v1/product', prodcutRoutes);



const port = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "Public/Images")));

try {
    await mongoose.connect(DB_URI)
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
