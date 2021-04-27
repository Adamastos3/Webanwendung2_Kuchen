const path= require('path')
const express = require("express");
const server =express()


//kontakt
server.get("/kontakt", (req,res) =>{
    res.sendFile('kontakt.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;