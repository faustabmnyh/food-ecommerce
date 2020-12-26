const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./src/routes/users");
const productRouter = require("./src/routes/products");
const orderRouter = require("./src/routes/orders");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGODB_URI =
  "mongodb+srv://fausta:CNX0nfoNxD967bBs@cluster0.nxyav.mongodb.net/mgfoods?retryWrites=true&w=majority";

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

app.use("/v1/users", userRouter);
app.use("/v1/products", productRouter);
app.use("/v1/orders", orderRouter);
app.use("/v1/config/paypal", (_, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.use((err, _, res, __) => {
  res.status(500).send({ message: err.message });
});
