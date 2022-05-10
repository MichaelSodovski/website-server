const express = require("express");

const router = express.Router();

const mainController = require("../controllers/main.controller");

router.post("/saveUsers", mainController.createPdfFromRx);

router.get("/", mainController.getTestFunction);

router.get("/getUsers", mainController.getUSers);


module.exports = router;