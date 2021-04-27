const path= require('path')
const express = require("express");
const server =express()


//passwordAendern
server.get("/passwordAendern", (req,res) =>{
    res.sendFile('passwordAendern.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;