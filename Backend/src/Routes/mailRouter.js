const { Router } = require("express");
const { sendEmail } = require("../controller/sendMail");
const router = Router();

router.post("/sendMail", sendEmail);

module.exports = router;