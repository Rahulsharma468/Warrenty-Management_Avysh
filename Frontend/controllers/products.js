const { getProduct, getProducts } = require("../apicalls/products");

const get_all_products = async (req, res) => {
  const data = await getProducts();
  console.log(data);
  // return res.json(data);
  res.render("prodList", { products: data });
};

const get_one = async (req, res) => {
  let id = req.params.prodId;
  const data = await getProduct(id);
  console.log(data);
  res.render("desc", { prod: data });
};

module.exports = {
  get_all_products,
  get_one,
};
