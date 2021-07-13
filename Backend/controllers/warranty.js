const product = require("../models/product");
const Product = require("../models/product");
const Warranty = require("../models/warranty");
const { checkForLength, getProducts } = require("./helper");
const passport = require("passport");

exports.renderWarranty = async (req, res) => {
  const products = await getProducts();
  res.render("warranty", { products: products });
};

exports.handleSubmit = (req, res) => {
  console.log(req.body);
  const name = req.body.warrname;
  const productIds =
    typeof req.body.products === "string"
      ? [req.body.products]
      : req.body.products;
  const resolution = req.body.resolution;
  const duration_year = Number(req.body.durationYear);
  const duration_month = Number(req.body.durationMonth);
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
  if (
    checkForLength([name, resolution, type]) &&
    (duration_year || duration_month)
  ) {
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
    warr.save(async function (err) {
      if (!err) {
        if (productIds) {
          await productIds.forEach(async (id) => {
            await Product.findByIdAndUpdate(id, {
              warrantyId: warr._id,
              noWarranty: false,
            });
          });
        }

        res.redirect("/display");
      } else {
        console.log(err);
      }
    });
  } else {
    res.redirect("/");
  }
};

exports.displayWarranty = async (req, res) => {
  try {
    Warranty.find({})
      .populate("productIds")
      .lean()
      .exec((err, warr) => {
        console.log(warr);
        res.render("display", { warr });
      });
  } catch (error) {
    console.log(error);
  }
};

exports.editWarrenty = async (req, res) => {
  const id = req.params.id;
  try {
    const products = await getProducts();
    // const taken = await get_taken_products();
    await Warranty.findById({ _id: id })
      .populate("productIds")
      .lean()
      .then((result) => {
        const productIds = result.productIds;
        res.render("editWarrenty", {
          result: result,
          products: products,
          taken: productIds,
        });
      })
      .catch((err) => {
        console.log("Err", err.message);
      });
  } catch (err) {
    console.log("Error in Try", err.message);
  }
};

exports.updateWarrenty = async (req, res) => {
  const id = req.params.id;
  const productIds =
    typeof req.body.products === "string"
      ? [req.body.products]
      : req.body.products;
  await Warranty.findById({ _id: id })
    .populate("productIds")
    .lean()
    .then(async (result) => {
      const productIds = result.productIds;
      if (productIds) {
        await productIds.forEach(async (id) => {
          await Product.findByIdAndUpdate(id, {
            warrantyId: null,
            noWarranty: true,
          });
        });
      }
    })
    .catch((err) => {
      console.log("Err", err.message);
    });
  await Warranty.findByIdAndUpdate(
    { _id: id },
    {
      productIds: productIds,
    },
    async (err, warranty) => {
      if (!err) {
        if (productIds) {
          await productIds.forEach(async (id) => {
            await Product.findByIdAndUpdate(id, {
              warrantyId: warranty._id,
              noWarranty: false,
            });
          });
        }
        res.redirect("/display");
      } else {
        console.log("Error in update");
      }
    }
  );
};

exports.getOneWarranty = async (req, res) => {
  const id = req.params.id;
  Warranty.findOne({ _id: id })
    .lean()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err });
    });
};

exports.getAllWarranty = async (req, res) => {
  return Warranty.find()
    .lean()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err });
    });
};

exports.loginRoute = (req, res) => {
  res.render("login");
};

// Login Handle
exports.login = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

// Logout Handle
exports.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "you are logged out");
  res.redirect("/login");
};
