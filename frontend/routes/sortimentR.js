const path= require('path')
const express = require("express");
const server =express()


//sortimentR
server.get("/sortimentR", (req,res) =>{
    res.sendFile('sortimentR.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;