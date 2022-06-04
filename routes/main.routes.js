const express = require("express");

const router = express.Router();

const mainController = require("../controllers/main.controller");

router.get("/getUsers", mainController.getUSers);

router.post("/adduser", mainController.addUser);

router.post("/deleteUser", mainController.deleteUser);

router.post("/login", mainController.login);

router.post("/recoverPassword", mainController.recoverPassword);

module.exports = router;

