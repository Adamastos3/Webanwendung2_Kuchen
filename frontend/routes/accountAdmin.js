const path= require('path')
const express = require("express");
const server =express()
const isAuth=require("../middleware/controller")

//accountAdmin
server.get("/accountAdmin",isAuth, (req,res) =>{
    res.sendFile('accountAdmin.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;