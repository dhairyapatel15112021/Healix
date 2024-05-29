const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const jwtTokenController = require("../Controllers/JWTTokenController");
const blogController = require("../Controllers/BlogController");
const dataController = require("../Controllers/DataController");

router.post("/signup", userController.signupUserMethod);
router.post("/login", userController.loginUserMethod);
router.post("/logout", userController.logoutUserMethod);

router.post("/refresh",jwtTokenController.tokenRefreshMethod);

router.post("/postBlog",jwtTokenController.authenticateMethod,blogController.postBlogMethod);
router.get("/getBlog",blogController.getBlogMethod);

router.put("/updateUser",jwtTokenController.authenticateMethod,userController.updateUserMethod);
router.delete("/deleteUser",jwtTokenController.authenticateMethod,userController.deleteUserMethod);
router.get("/getUser",jwtTokenController.authenticateMethod,userController.getUserMethod);

router.get("/getSpecialisation",jwtTokenController.authenticateMethod,dataController.speciallisonMethod);
router.post("/getTime",jwtTokenController.authenticateMethod,dataController.timeMethod);
router.post("/cancleSlot",jwtTokenController.authenticateMethod,dataController.cancleSlotMethod);
module.exports = router;
