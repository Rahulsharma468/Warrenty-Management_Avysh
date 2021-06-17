const Warranty = require("../models/warranty");
const { checkForLength, getProducts } = require("./helper");

exports.renderWarranty = async (req, res) => {
  const products = await getProducts();
  res.render("warranty", { products: products });
};

exports.handleSubmit = (req, res) => {
  console.log(req.body);
  const name = req.body.warrname;
  const productIds = req.body.products;
  const resolution = req.body.resolution;
  const duration = Number(req.body.duration);
  const type = req.body.type;
  const gridCheck = req.body.gridCheck1;
  const extend = gridCheck == "on" ? true : false;
  var extendDur, extendPrice;
  if (extend) {
    extendDur = Number(req.body.extenddur);
    extendPrice = Number(req.body.extendprice);
  }

  if (checkForLength([name, resolution, duration])) {
    const warr = new Warranty({
      name,
      productIds,
      resolution,
      type,
      extendable: extend,
      duration,
      extendDur,
      extendPrice,
    });
    warr.save(function (err) {
      if (!err) {
        res.redirect("/");
      } else {
        console.log(err);
      }
    });
  } else {
    res.render("warranty", { error: "Please fill in required fields" });
  }
};

exports.displayWarranty = async (req, res) => {
  try {
    const warr = await Warranty.find({}).lean();
    console.log(warr);
    res.render("display", { warr: warr });
  } catch (error) {
    console.log(error);
  }
};
