const path= require('path')
const express = require("express");
const server =express()


//kasse
server.get("/kasse", (req,res) =>{
    res.sendFile('kasse.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;