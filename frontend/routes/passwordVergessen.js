const path= require('path')
const express = require("express");
const server =express()


//passwordVergessen
server.get("/passwordVergessen", (req,res) =>{
    res.sendFile('passwordVergessen.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;