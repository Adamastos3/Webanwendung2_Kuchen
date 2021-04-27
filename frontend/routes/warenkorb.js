const path= require('path')
const express = require("express");
const server =express()


//warenkorb
server.get("/warenkorb", (req,res) =>{
    res.sendFile('warenkorb.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;