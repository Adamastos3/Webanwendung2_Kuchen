const path= require('path')
const express = require("express");
const server =express()


//bestellhistorie
server.get("/bestellhistorie", (req,res) =>{
    res.sendFile('bestellhistorie.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;
