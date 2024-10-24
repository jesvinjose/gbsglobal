const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController");

userRoute.post("/adduser", userController.addUser);

userRoute.get("/getusers", userController.getUsers);

userRoute.delete("/deleteuser/:id", userController.deleteUser);

userRoute.put("/updateuser/:id", userController.updateUser);

userRoute.post("/userlogin", userController.verifyUserLogin);

userRoute.get('/:id',userController.getUserDetails)

module.exports = userRoute;
