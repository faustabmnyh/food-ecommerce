const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_CLIENT_SECRET);
const userRouter = require("./src/routes/users");
const productRouter = require("./src/routes/products");
const orderRouter = require("./src/routes/orders");
const uploadRouter = require("./src/routes/uploads");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const MONGODB_URI = process.env.MONGODB_URI;

const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening server at port http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
app.post("/v1/config/stripe", async (req, res) => {
  let { id, order } = req.body;
  console.log(id);
  console.log(order.shippingAddress);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: order.totalPrice * 100,
      currency: "USD",
      description: `Purcashed $${order.totalPrice * 100}`,
      payment_method: id,
      confirm: true,
    });
    res.send({ message: "Payment Successful", payment });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Payment Error" });
  }
});
app.use("/v1/uploads", uploadRouter);
app.use("/v1/users", userRouter);
app.use("/v1/products", productRouter);
app.use("/v1/orders", orderRouter);
app.use("/v1/config/paypal", (_, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/v1/config/google", (_, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});
app.use(
  "/public/images",
  express.static(path.join(__dirname, "/public/images"))
);

app.use((err, _, res, __) => {
  res.status(500).send({ message: err.message });
});
