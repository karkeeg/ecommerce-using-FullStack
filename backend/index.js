const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
require("./database/connection");
const cors = require("cors");
const myrouter = require("./routes/testroute");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(myrouter);
app.use(categoryRouter);
app.use(productRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(paymentRouter);
app.use("/public/uploads", express.static("public/uploads"));

app.use(express.static(path.join(__dirname, "../myreact-project/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../myreact-project/dist", "index.html"));
});

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started successfully at port " + port);
});
