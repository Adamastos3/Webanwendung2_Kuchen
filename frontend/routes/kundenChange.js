const path= require('path')
const express = require("express");
const server =express()


//kundenChange
server.get("/kundenChange", (req,res) =>{
    res.sendFile('kundenChange.html', { root: path.join(__dirname,'..', 'view') });
});



module.exports=server;