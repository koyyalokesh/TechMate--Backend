const express = require('express');
const profileRouter = express.Router();
const User = require('../models/user');
const {userAuth} = require('../middleware/auth');
const {validateProfileData} = require('../utils/validate');

profileRouter.patch('/profile/edit',userAuth, async(req,res)=>{
    try{
     if(!validateProfileData(req)){
        throw new Error("invalid edit request!!!!!!")
     }
    const {skills} = req.body;
    if(skills.length > 10){
        throw new Error("skills should be less than 10");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key)=> loggedInUser[key] = req.body[key])
    await loggedInUser.save();
    res.send("profile was updated");
    }catch(err){
        res.status(400).send("ERROR :"+ err.message);
    }
});

profileRouter.get('/profile/view', userAuth, async(req, res)=>{
    try{
        const user = req.user;
        console.log(user);
        res.send(user);

    }catch(err){
        res.status(400).send("ERROR :"+ err.message);
    }

})


module.exports = profileRouter;