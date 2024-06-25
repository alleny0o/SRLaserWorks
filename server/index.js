// import dotenv immediately
import dotenv from "dotenv";
dotenv.config();

// import other important packages
import express from "express";
import cors from "cors";

// import connectDB to connect to MongoDB
import connectDB from "./database.js";

// import our Routes
import productRoutes from "./routes/productRoutes.js";

connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);

const port = 8080;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => {
  console.log(`Server runs on PORT: ${port}`);
});
