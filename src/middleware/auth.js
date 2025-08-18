const jwt = require('jsonwebtoken');
const User = require('../models/user')

const userAuth = async(req, res, next)=>{

       try{
            const {token} = req.cookies;
            if(!token){
                throw new Error('invalid token')
            }
            const decodedObj = await jwt.verify(token, "techmate@0711");
            const userId = decodedObj._id
            const user = await User.findById(userId);
            if(!user){
                throw new Error("user not found")
            }
            req.user = user;
            next()

       }catch(err){
         res.status(401).send("Error"+ err.message);

       }
}

module.exports ={userAuth};