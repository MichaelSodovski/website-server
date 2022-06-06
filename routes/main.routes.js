const express = require("express");

const router = express.Router();

const mainController = require("../controllers/main.controller");

router.get("/getUsers", mainController.getUSers);

router.post("/adduser", mainController.addUser);

router.post("/deleteUser", mainController.authenticateToken, mainController.deleteUser);

router.post("/login", mainController.login); // post is more suitable because were creating something (the token) on the way back. 

router.delete("/logOut", mainController.logOut);

router.post("/refreshToken", mainController.refreshToken)

router.post("/recoverPassword", mainController.recoverPassword);

module.exports = router;

