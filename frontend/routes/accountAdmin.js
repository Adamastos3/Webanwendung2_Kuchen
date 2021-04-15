const path= require('path')
const express = require("express");
const server =express()


//accountAdmin
server.get("/accountAdmin", (req,res) =>{
    res.sendFile('accountAdmin.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;