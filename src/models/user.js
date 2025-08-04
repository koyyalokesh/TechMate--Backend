const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
         type:String,
         required:true,
         minLength:4,
         maxLength:50, 
    },
    lastName:{
        type:String,
        min:3,
        max:50,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,

    },
    password:{
        type:String,
        required:true,
    },
    age:{
      type:String,
      min :18,
      max:100,
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value){
        if(!["male", "female", "others"].includes(value)){
            throw new Error("gender data is not valid")
            
        }
      },
    },
    profile:{
        type:String,
        default:"https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png",

    },
    about:{
        type:String,
        default:"this is default about of the user",
        minLength:10,
        maxLength:50,
    },
    skills:{
        type:[String],

    }
    
},{
    timestamps:true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;