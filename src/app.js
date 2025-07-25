const express = require('express');
const app = express();
const port = 3000;

app.use("/hello",(req,res)=>{
     res.send("dhoni from the server................");
})
app.listen(port, ()=>{
    console.log(`server running on port no ${port}`)
});