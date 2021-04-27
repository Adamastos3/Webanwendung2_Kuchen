const path= require('path')
const express = require("express");
const server =express()


//start
server.get("/", (req,res) =>{
    res.sendFile('start.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;