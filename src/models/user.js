const mongoose = require('mongoose');
const validator = require('validator');
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
        validate(value){
            if(!validator.isEmail(value)){
                 throw new Error("invalid email address");
            }
        }

    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password should be strong");
            }
        }
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
    photoUrl:{
        type:String,
        default:"https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
        validate(value){
             if(!validator.isURL(value)){
                throw new Error("invalid url :"+value)
             }
        }

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