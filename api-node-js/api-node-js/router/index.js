const express =require ('express')

const route = express.Router();

const passport = require ("passport")

const homectl = require ("../controller/homectl")


route.get("/getData",passport.authenticate("jwt",{failureRedirect:"/unauth"}),homectl.getData);

route.get("/unauth",async (req,res)=>{
    return res.status(400).json({msg:"are you not authenticate"})
})

route.post("/insertData",passport.authenticate("jwt",{failureRedirect:"/unauth"}),homectl.insertData);

route.delete("/deldata/:id",passport.authenticate("jwt",{failureRedirect:"/unauth"}),homectl.deldata)

route.get("/singaldata",passport.authenticate("jwt",{failureRedirect:"/unauth"}), homectl.singaldata)

route.put("/updatedata/:id",passport.authenticate("jwt",{failureRedirect:"/unauth"}), homectl.updatedata)

route.use("/signuproute", require("./signuproute"))

module.exports = route