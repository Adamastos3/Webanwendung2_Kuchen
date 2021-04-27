const path= require('path')
const express = require("express");
const server =express()
const isAuth=require("../middleware/controller")

//kundendaten
server.get("/kundendaten", isAuth, (req,res) =>{
    res.sendFile('kundendaten.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;