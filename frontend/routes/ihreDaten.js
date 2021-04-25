const path= require('path')
const express = require("express");
const server =express()
const isAuth=require("../middleware/controller")

//ihreDaten
server.get("/ihreDaten", isAuth, (req,res) =>{
    res.sendFile('ihreDaten.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;
