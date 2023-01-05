const express = require("express");
const { placeOrder } = require("../controllers/order");

const router = express.Router();

router.post("/placeOrder", placeOrder);

module.exports = router;