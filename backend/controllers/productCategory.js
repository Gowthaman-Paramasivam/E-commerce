const productInfo = require("../models/productCategory");

const getProduct = async (req, res) => {
  const { name } = req.body;
  const findCategory = await productInfo.findAll({
    where: {
      category: name
    }
  })

  if (findCategory.length > 0) {
    res.status(200).json({ result: findCategory })
  }else{
    res.status(200).json({ result: findCategory })
  }
}

module.exports = { getProduct }