
const express = require('express');
const connect_Data_Base = require('./config/database');
const User = require('./models/user');
const app = express();
const port = 6000;

app.use(express.json());

app.post('/signup', async(req,res)=>{
    const user = new User(req.body)
     try{
         await user.save("lokesh");
         res.send("user added succesfully");
     }catch(err){
         res.status(400).send("error saving the user : "+ err.message);
     }

});

app.get('/user', async(req,res)=>{

    const user = await User.find({email:req.body.email})
    if(user.length === 0){
         res.status(404).send("user not found")
    }else{
         res.send(user);
    }
});

app.get('/feed', async(req,res)=>{
   try{
       const users = await User.find({});
       res.send(users)
     }catch(err){
    res.status(400).send("something went wrong");
   }
});

app.delete('/user', async(req,res)=>{
     const userId = req.body._id;
    try{
       const user =  await User.findByIdAndDelete(userId);
        if(user === null){
            res.status(400).send("user not found")
        }else{
             res.send("user deleted sucessfully");
        }
       
    }catch(err){
        res.status(400).send('something went wrong')
    }
});

app.patch('/user', async(req,res)=>{
    const data = req.body;
   try{ 
      const modifiedUser = await User.findByIdAndUpdate(req.body._id, data, 
        {
            new:true,
            runValidators: true,
      })
      res.send(modifiedUser);
   }catch(err){
    res.status(400).send("update failed"+ err.message);

   }
});

connect_Data_Base()
.then(()=>{
    console.log('database connected succesfully');
    app.listen(port, ()=>{
    console.log(`server listening on port no ${port}`);
    })
})
.catch(()=>{
    console.log("database not connected")
})

