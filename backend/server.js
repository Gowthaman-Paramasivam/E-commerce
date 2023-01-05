const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./database")
const UserInfo = require("./models/userInfo");
const app = express();

const userRoutes = require("./routes/userInfo.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");

const PORT = process.env.PORT || 5001;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to E-commerce");
});

sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Server Running on Port: http://localhost:${PORT}`)
  )
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

