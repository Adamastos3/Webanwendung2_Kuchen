const path= require('path')
const express = require("express");
const server =express()


//ihreDaten
server.get("/ihreDaten", (req,res) =>{
    res.sendFile('ihreDaten.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;
