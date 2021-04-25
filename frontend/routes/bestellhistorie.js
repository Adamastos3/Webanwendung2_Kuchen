const path= require('path')
const express = require("express");
const server =express()
const isAuth=require("../middleware/controller")


//bestellhistorie
server.get("/bestellhistorie", isAuth, (req,res) =>{
    res.sendFile('bestellhistorie.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;
