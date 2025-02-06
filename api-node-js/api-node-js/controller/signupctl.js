const singupmodel = require("../model/singupmodel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.signup = async (req, res) => {
    try {

        console.log(req.body)
        let chekdata = await singupmodel.find({ email: req.body.email }).countDocuments();
        if (chekdata == 0) {
            if (req.body.password == req.body.confirmpassword) {
                req.body.password = await bcrypt.hash(req.body.password, 10)
                let signup = await singupmodel.create(req.body);
                if (signup) {
                    return res.status(200).json({ msg: "user register succesfully", data: signup });
                }
                else {
                    return res.status(200).json({ msg: "user not register " });
                }
            }
            else{
                return res.status(200).json({ msg: "password and confirm pass not mach" });
            }
        } 
        else {
            return res.status(200).json({ msg: "email is not found mach" });
        }
       
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: "Something went wrong", error: err });
    }
}


module.exports.signin = async (req, res) => {
    try {

        console.log(req.body)
        let chekemail = await singupmodel.findOne({ email: req.body.email });
        if (chekemail) {
            
                let checkpassword = await bcrypt.compare (req.body.password , chekemail.password);
                if (checkpassword) {
                   let token = await jwt.sign({userdata:chekemail},"rnw")
                   return res.status(200).json({ msg: "user sucess ", token:token });
                }
                else {
                    return res.status(200).json({ msg: "invelid password " });
                }
            
           
        } 
        else {
            return res.status(200).json({ msg: "email is not found mach" });
        }
       
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: "Something went wrong", error: err });
    }
}