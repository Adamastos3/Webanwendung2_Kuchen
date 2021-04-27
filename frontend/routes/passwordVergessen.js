const path= require('path')
const express = require("express");
const { getBenutzerAll } = require('../API_Access/Benutzer/benutzer');
const server =express()


//passwordVergessen
server.get("/passwordVergessen", (req,res) =>{
    res.sendFile('passwordVergessen.html', { root: path.join(__dirname,'..', 'view') });
});

server.post("/passwordVergessen", (req,res) =>{
    passV(req,res)
})

async function passV(req,res){
    const data = getBenutzerAll();
    for (let i=0; i< data.length; i++){
        if (data[i].person.email == req.body.email){
            const pass = null;
        }
    }

}
module.exports=server;