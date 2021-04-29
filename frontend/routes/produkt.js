const path= require('path')
const express = require("express");
const server =express()



//bestellhistorie
server.get("/produkt", (req,res) =>{
    res.sendFile('produkt.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;