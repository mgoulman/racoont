const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

//auth
router.post("/register", authController.signUp);

//user db
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfos);
router.put("/:id", userController.userUpdate);

module.exports = router;
