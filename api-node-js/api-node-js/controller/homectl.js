const usermodel = require("../model/usermodel");
const path = require('path')
 const fs = require('fs')

module.exports.getData = async (req, res) => {
    try {
        let getdata = await usermodel.find();
        if (getdata) {
            return res.status(200).json({ msg: "Data inserted successfully", data: getdata });
        } else {
            
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: "Something went wrong", error: err });
    }
};

module.exports.insertData = async (req, res) => {
    try {
        var image = ''
        if (req.file) {
            image = await usermodel.imgPath + '/' + req.file.filename;
        }
        req.body.userImage = image;

        let userData = await usermodel.create(req.body);
        if (userData) {
            return res.status(200).json({ msg: "Data inserted successfully", data: userData });
        } else {
            return res.status(400).json({ msg: "Something went wrong while inserting data" });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: "Something went wrong", error: err });
    }
};

module.exports.deldata  = async (req, res) => {
    try 
    {
        let singleobj = await usermodel.findById(req.params.id)
        if(singleobj){
            try {
                imgPath = path.join(__dirname,'..',singleobj.filename);
                fs.unlinkSync(imgPath);
            }
            catch (err) {
                console.log('image not found')
            }
        }
      
       let deldatas = await usermodel.findByIdAndDelete(req.params.id)
        if (deldatas) {
            return res.status(200).json({ msg: "Data inserted successfully" });
        } else {
            return res.status(200).json({ msg: "Something went wrong while inserting data" });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: "Something went wrong", error: err });
    }
};
module.exports.singaldata  = async (req, res) => {
    try {
        
       let singaldata = await usermodel.findById(req.query.dataid)
        if (singaldata) {
            return res.status(200).json({ msg: "Data inserted successfully" , data: singaldata });
        } else {
            return res.status(200).json({ msg: "Something went wrong while inserting data" });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: "Something went wrong", error: err });
    }
};
module.exports.updatedata  = async (req, res) => {
    try {
        console.log(req.params.id)
        console.log(req.body)
       let chekdata = await usermodel.findById(req.params.id)
        if (chekdata) {
            let updatedata = await usermodel.findByIdAndUpdate(chekdata._id,req.body);
            if(updatedata){
                let finupdete = await usermodel.findById(req.params.id)
                return res.status(200).json({ msg: "Data inserted successfully" , data: updatedata });
            }
        } else {
            return res.status(200).json({ msg: "Something went wrong while inserting data" });
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({ msg: "Something went wrong", error: err });
    }
};