const path= require('path')
const express = require("express");
const server =express()


//account
server.get("/account", (req,res) =>{
    res.sendFile('account.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;