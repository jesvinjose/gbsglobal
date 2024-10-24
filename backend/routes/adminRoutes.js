const express=require('express');
const adminRoute=express.Router();

const adminController=require('../controllers/adminController');

//adminlogin

adminRoute.post('/adminlogin',adminController.verifyAdminLogin);

module.exports=adminRoute;