const path= require('path')
const express = require("express");
const server =express()


//impressum
server.get("/impressum", (req,res) =>{
    res.sendFile('impressum.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;