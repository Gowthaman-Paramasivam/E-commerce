const express = require("express");
const { getProduct } = require("../controllers/productCategory");

const router = express.Router();

router.post("/getproduct", getProduct);

module.exports = router;