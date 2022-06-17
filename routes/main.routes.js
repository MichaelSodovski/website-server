const express = require("express");
const router = express.Router();
// const mainController = require("../controllers/main.controller");
const usersController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");
const articlesController = require("../controllers/articles.controller");
const redirectionController = require("../controllers/redirection.controller");

router.get("/getUsers", authController.authenticateToken, usersController.getUSers);
router.post("/adduser", authController.authenticateToken, usersController.addUser);
router.delete("/deleteUser", authController.authenticateToken, usersController.deleteUser);
router.put("/userUpdate", authController.authenticateToken, usersController.updateUser); 

router.post("/login", authController.login); // post is more suitable because were creating something (the token) on the way back. 
router.delete("/logOut", authController.logOut);
router.post("/refreshToken", authController.refreshToken);
router.post("/recoverPassword", redirectionController.redirectToSentMail , authController.recoverPassword);
router.post("/verifyCode", authController.verifyCode);
router.post("/updatePassword", redirectionController.redirectToPassSucceesUpdate, authController.updatePassword);
router.post("/recoverUserName", authController.recoverUserName);

router.get("/getArticles", authController.authenticateToken, articlesController.getArticles);


module.exports = router;

