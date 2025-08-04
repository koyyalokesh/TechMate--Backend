const mongoose = require('mongoose');

const connect_Data_Base = async()=>{
    await mongoose.connect('mongodb+srv://lokesh_2:NAP38gTqVJNJcA1P@cluster0.wflbxq8.mongodb.net/TechMate')
}

module.exports = connect_Data_Base;