const validator  = require('validator')
const validateSignupData = (req)=>{
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName){
        throw new Error("First Name is Required")
    }else if(!emailId){
        throw new Error("emailId is Required")
    }else if(!password){
        throw new Error("password is Required")
    }
    else if(firstName.length < 3 || firstName.length > 50){
        throw new Error("invalid FirstName")
    }else if(lastName && (lastName.length < 3 || lastName.length > 50)){
        throw new Error("invalid LastName")
    }else if(!validator.isEmail(emailId)){
        throw new Error("invalid EmailId")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("invalid EmailId")
    }

};


const validateProfileData = (req)=>{
    const allowedUpdates = ["firstName", "lastName", "skills", "age", "about", "gender", "photoUrl"];

    const isEditAllowed = Object.keys(req.body).every((field)=> allowedUpdates.includes(field));
    
    return isEditAllowed;

};

module.exports = { validateSignupData, validateProfileData};
