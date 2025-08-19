const express = require('express');
const mongoose = require('mongoose')
const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user')
const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:toUserId', userAuth, async(req,res)=>{
      try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ['ignored', 'interested'];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:'invalid status type!!', status})
        }
        if (!mongoose.Types.ObjectId.isValid(toUserId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        if(fromUserId.equals(toUserId)){
            return res.status(400).json({message:'cannot send connection request to yourself'})
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message:'user not found'});
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId : fromUserId, toUserId : toUserId},
                {fromUserId : toUserId, toUserId : fromUserId }
            ]
        });
        if(existingConnectionRequest){
           return res.status(400).json({message:'Connection Request Already Exists!!!'});
        }


        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })
        const connectionRequestData = await connectionRequest.save()

        res.json({
            message:'connection request sent successfully', 
            connectionRequestData
        })
     
      }catch(err){
          res.status(400).send('ERROR: '+err.message)
      }
});

module.exports = requestRouter;