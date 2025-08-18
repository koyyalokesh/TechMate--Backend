
const express = require('express');
const connect_Data_Base = require('./config/database');
const cookieParser = require('cookie-parser');
const app = express();
const port = 6000;

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');

app.use('/', authRouter);
app.use('/', profileRouter);




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

