import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
import UserRouter from "./routes/users.route.js";
import CartRouter from "./routes/cart.router.js";
import ContactRouter from "./routes/contact.route.js";
import OrderRouter from "./routes/order.router.js";
dotenv.config();
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3001",
  methods:"GET,POST,PUT, PATCH, DELETE, HEAD",
  credentials:true, 
}
//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/api/cart", CartRouter);
app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRouter);
app.use("/api/contact", ContactRouter);

app.listen(PORT, () => {
  connectDB();
  console.log("server started");
});
