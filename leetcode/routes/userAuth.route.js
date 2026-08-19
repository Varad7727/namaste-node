const express=require("express")
const authRouter=express.Router();
const userMiddleware=require("../middleware/user.middleware");
const adminMiddleware=require("../middleware/adminregister.middleware");
const {register,login,logout,adminRegister}=require("../controller/userAuth.controller");

const app=express();

//register
authRouter.post("/register",register);
//login
authRouter.post("/login",login);
//logout
authRouter.post("/logout",userMiddleware, logout);
authRouter.post("/admin/register", adminRegister);
//getprofile
//app.get("/getprofile",getProfile);

module.exports=authRouter;
