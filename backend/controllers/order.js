const OrderInfo = require("../models/order");

const placeOrder = async (req, res) => {

  const { order_id, userName, order_status, total_price } = req.body;

  await OrderInfo.create({
    order_id,
    order_status,
    userName,
    total_price
  })
  res.status(200);
  
}

module.exports = { placeOrder }