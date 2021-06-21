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
  const duration_year = req.body.durationYear;
  const duration_month = req.body.durationMonth;
  const duration = { year: duration_year, month: duration_month };
  const type = req.body.type;
  const gridCheck = req.body.gridCheck1;
  const extend = gridCheck == "on" ? true : false;
  var extendDur, extendPrice;
  if (extend) {
    const extend_duration_year = req.body.extensionDurationYear;
    const extend_duration_month = req.body.extensionDurationMonth;
    extendDur = { year: extend_duration_year, month: extend_duration_month };
    extendPrice = Number(req.body.extendprice);
  }

  if (checkForLength([name, resolution])) {
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
        res.redirect("/display");
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
    const warr = await Warranty.find({}).populate("productIds").lean().exec();
    console.log(warr);
    res.render("display", { warr: warr });
  } catch (error) {
    console.log(error);
  }
};
