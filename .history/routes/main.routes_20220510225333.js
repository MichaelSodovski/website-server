const express = require("express");

const router = express.Router();

const mainController = require("../controllers/main.controller");

// router.post("/createPdfFromRx", mainController.createPdfFromRx);

router.get("/", mainController.getTestFunction);

module.exports = router;