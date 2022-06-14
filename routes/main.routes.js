const express = require("express");
const router = express.Router();
// const mainController = require("../controllers/main.controller");
const usersController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");
const articlesController = require("../controllers/articles.controller");

router.get("/getUsers", usersController.getUSers);

router.post("/adduser", usersController.addUser);

router.post("/deleteUser", authController.authenticateToken, usersController.deleteUser);

router.post("/login", authController.login); // post is more suitable because were creating something (the token) on the way back. 

router.delete("/logOut", authController.logOut);

router.post("/refreshToken", authController.refreshToken);

router.post("/recoverPassword", authController.recoverPassword);

router.post("/verifyCode", authController.verifyCode);

router.post("/updatePassword", authController.updatePassword);

router.post("/recoverUserName", authController.recoverUserName);

router.get("/getArticles", authController.authenticateToken, articlesController.getArticles);


module.exports = router;

