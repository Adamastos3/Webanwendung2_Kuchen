const path= require('path')
const express = require("express");
const server =express()


//login
server.get("/login", (req,res) =>{
    res.sendFile('login.html', { root: path.join(__dirname,'..', 'view') });
});

server.post('/login', (req,res)=>{
    
})



module.exports=server;

