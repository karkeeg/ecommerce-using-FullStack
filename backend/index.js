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
const app = express();
const paymentRouter = require("./routes/paymentRoutes");

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

let port = process.env.PORT;

app.listen(port, () => {
  console.log("Server Started succefully at port " + port);
});
