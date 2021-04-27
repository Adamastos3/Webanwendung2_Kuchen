const path= require('path')
const express = require("express");
const server =express()

//Shop

//shop
server.get("/shop", (req,res) =>{
    res.sendFile('shop.html', { root: path.join(__dirname,'..', 'view') });
});

module.exports=server;