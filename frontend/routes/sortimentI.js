const path= require('path')
const express = require("express");
const server =express()


//sortimentI
server.get("/sortimentI", (req,res) =>{
    res.sendFile('sortimentI.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;