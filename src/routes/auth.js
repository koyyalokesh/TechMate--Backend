const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const validateSignupData = require('../utils/validate');
const bcrypt = require('bcrypt');
const validator = require('validator');

authRouter.post('/signup', async(req,res)=>{
     try{
         //validation of data
         validateSignupData(req);
         // encrypting the password
         const {firstName, lastName = " ", emailId, password} = req.body;
         const passwordHash = await bcrypt.hash(password, 10);
         const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
         })
         await user.save();
         res.send("user added succesfully");
     }catch(err){
         res.status(400).send("ERROR: "+ err.message);
     }

});


authRouter.post('/login',async(req,res)=>{
    const {emailId, password} = req.body;
    try{
        if(!emailId && !password){
             throw new Error('emailId and password are required');
        }
        if(!emailId){
            throw new Error('emailId required');
        }
        if(!password){
            throw new Error('password required');
        }
        if(!validator.isEmail(emailId)){
            throw new Error('invalid emailId');
        }
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error('user doesnt exist');
        }
        const isPasswordValid = await user.verifyPassword;
        if(isPasswordValid){
            const token = await user.getJwt();
            res.cookie("token", token, {
                expires : new Date(Date.now() + 8 * 3600000 ),
            });
            res.send("login successfull")
        }else{
            throw new Error("incorrect password");
        }

    }catch(err){
          res.send("ERROR :"+ err.message);
    }

})

authRouter.post('/logout', (req, res)=>{
    res.cookie("token", null, {
        expires : new Date(Date.now())
    });
    res.send("logout succesful");
    
})

module.exports = authRouter;