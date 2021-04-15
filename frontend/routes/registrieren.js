const path= require('path')
const express = require("express");
const server =express()


//registrieren
server.get("/registrieren", (req,res) =>{
    res.sendFile('registrieren.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;