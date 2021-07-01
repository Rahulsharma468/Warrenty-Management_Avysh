const express = require("express");
const router = express.Router();

const {
  renderWarranty,
  handleSubmit,
  displayWarranty,
  editWarrenty,
  updateWarrenty,
  getOneWarranty,
  getAllWarranty,
} = require("../controllers/warranty");

router.get("/", renderWarranty);

router.post("/", handleSubmit);

router.get("/display", displayWarranty);

router.get("/:id/edit", editWarrenty);

router.post("/:id/update", updateWarrenty);

router.get("/single/:id", getOneWarranty);

router.get("/all", getAllWarranty);
module.exports = router;
