const path= require('path')
const express = require("express");
const server =express()
const isAuth=require("../middleware/controller")

//ausstehendeBestellungen
server.get("/ausstehendeBestellungen", isAuth, (req,res) =>{
    res.sendFile('ausstehendeBestellungen.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;