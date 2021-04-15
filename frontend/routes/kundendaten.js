const path= require('path')
const express = require("express");
const server =express()


//kundendaten
server.get("/kundendaten", (req,res) =>{
    res.sendFile('kundendaten.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;