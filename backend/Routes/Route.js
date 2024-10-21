const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const jwtTokenController = require("../Controllers/JWTTokenController");
const blogController = require("../Controllers/BlogController");
const dataController = require("../Controllers/DataController");

// check for all route that some route is only for user and some for doctor

router.post("/signup", userController.signupUserMethod);
router.post("/login", userController.loginUserMethod);

router.get("/refresh",jwtTokenController.tokenRefreshMethod);

router.post("/doctor/postBlog",jwtTokenController.authenticateMethod,blogController.postBlogMethod);
router.get("/getBlog",blogController.getBlogsMethod);
router.get("/doctor/blog",jwtTokenController.authenticateMethod,blogController.getBlog); //perfect backend working , frontend is left

router.put("/updateUser",jwtTokenController.authenticateMethod,userController.updateUserMethod);
//please check updating that this not create a problem becuase some data is also stored in jwt
// doctor bio , description , etc update is baki
router.delete("/deleteUser",jwtTokenController.authenticateMethod,userController.deleteUserMethod);
router.get("/getUser",jwtTokenController.authenticateMethod,userController.getUserMethod);

router.get("/getSpecialisation",jwtTokenController.authenticateMethod,dataController.speciallisonMethod);
router.post("/getTime",jwtTokenController.authenticateMethod,dataController.timeMethod);
router.post("/cancleSlot",jwtTokenController.authenticateMethod,dataController.cancleSlotMethod); // perfect working backend - frontend change is needed
router.post("/unavailable",jwtTokenController.authenticateMethod,dataController.unavailableMethod);

router.post("/bookAppointment",jwtTokenController.authenticateMethod,dataController.bookAppointmentMethod); // perfect working backend
router.get("/yourAppointment",jwtTokenController.authenticateMethod,dataController.yourAppointmentMethod);
router.delete("/deleteAppointment",jwtTokenController.authenticateMethod,dataController.deleteAppointmentMethod);
router.put("/updateAppointment",jwtTokenController.authenticateMethod,) // backend is not ready

// prescription
// after posting the blog from doctor side, form is still there so improve it

// profile picture like blob?
module.exports = router;
