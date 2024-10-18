const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const jwtTokenController = require("../Controllers/JWTTokenController");
const blogController = require("../Controllers/BlogController");
const dataController = require("../Controllers/DataController");

// check for all route that some route is only for user and some for doctor

router.post("/signup", userController.signupUserMethod); // perfect working
router.post("/login", userController.loginUserMethod); // perfect working

router.get("/refresh",jwtTokenController.tokenRefreshMethod); // perfect working

router.post("/doctor/postBlog",jwtTokenController.authenticateMethod,blogController.postBlogMethod); // perfect backend working
router.get("/getBlog",blogController.getBlogsMethod); // perfect backend working
router.get("/doctor/blog",jwtTokenController.authenticateMethod,blogController.getBlog); //perfect backend working

router.put("/updateUser",jwtTokenController.authenticateMethod,userController.updateUserMethod); //perfect backend working -> please check that this not create a problem becuase some data is also stored in jwt
router.delete("/deleteUser",jwtTokenController.authenticateMethod,userController.deleteUserMethod); // perfect backend working
router.get("/getUser",jwtTokenController.authenticateMethod,userController.getUserMethod); // perfect backend working

router.get("/getSpecialisation",jwtTokenController.authenticateMethod,dataController.speciallisonMethod); //perfect working backend
router.post("/getTime",jwtTokenController.authenticateMethod,dataController.timeMethod); // perfect working backend
router.post("/cancleSlot",jwtTokenController.authenticateMethod,dataController.cancleSlotMethod); // perfect working backend

router.post("/bookAppointment",jwtTokenController.authenticateMethod,dataController.bookAppointmentMethod);
router.get("/yourAppointment",jwtTokenController.authenticateMethod,dataController.yourAppointmentMethod);
router.delete("/deleteAppointment",jwtTokenController.authenticateMethod,dataController.deleteAppointmentMethod);


module.exports = router;
