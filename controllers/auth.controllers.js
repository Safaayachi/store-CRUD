const userModels= require("../models/user.models");
const bcryptjs=require("bcryptjs");
const login= async(req, res) =>{};

const register = async (req, res) =>{
    try{
        const emailExist=await userModels.findOne({email:req.body.email});
        if(emailExist) 
        return res.status(422).json("Email exist already!");
        const salt=await bcryptjs.genSalt(10);
        const hashedPass=await bcryptjs.hash(req.body.password,salt);

        const newUser = new userModels({
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:hashedPass,
        });
        const savedUser = await newUser.save();
        return res.status(200).json(savedUser);

    } catch(err){
        return res.status(500).json(err);
    }
};

module.exports.register=register;