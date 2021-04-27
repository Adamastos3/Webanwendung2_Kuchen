const path= require('path')
const express = require("express");
const server =express()


//UberUns
server.get("/ueberUns", (req,res) =>{
    res.sendFile('ueberUns.html', { root: path.join(__dirname,'..', 'view') });
});


module.exports=server;