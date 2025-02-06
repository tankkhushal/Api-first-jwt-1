const express =require ('express')

const route = express.Router();

const authctl =  require("../controller/signupctl")


route.post ("/signup",authctl.signup);

route.post ("/signin",authctl.signin)

module.exports=route