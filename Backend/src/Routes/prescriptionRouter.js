const { Router } = require("express");
const router = Router();
const {add_prescription} = require("../controller/prescriptionController");


router.post("/prescription/:healthID", add_prescription);
module.exports = router;