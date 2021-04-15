const path= require('path')
const express = require("express");
const server =express()


//ausstehendeBestellungen
server.get("/ausstehendeBestellungen", (req,res) =>{
    res.sendFile('ausstehendeBestellungen.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;