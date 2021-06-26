const express = require("express");
const router = express.Router();

const {
  renderWarranty,
  handleSubmit,
  displayWarranty,
  editWarrenty,
  updateWarrenty,
} = require("../controllers/warranty");

router.get("/", renderWarranty);

router.post("/", handleSubmit);

router.get("/display", displayWarranty);

router.get("/:id/edit", editWarrenty);

router.post("/:id/update", updateWarrenty);

module.exports = router;
