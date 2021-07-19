const { getProduct, getProducts } = require("../apicalls/products");
const { getWarr } = require("../apicalls/warranty");

const get_all_products = async(req, res) => {
    const data = await getProducts();
    console.log(req.isAuthenticated());
    // return res.json(data);
    res.render("prodList", { products: data });
};

const get_one = async(req, res) => {
    try {
        let id = req.params.prodId;
        const data = await getProduct(id); //product
        const data1 = await getWarr(data.warrantyId); //warrenty
        console.log(data);
        res.render("prodDesc", { prod: data1, det: data });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    get_all_products,
    get_one,
};