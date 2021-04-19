const path= require('path')
const express = require("express");
const server =express()
const register= require("../API_Access/Register/register")



//registrieren
server.get("/registrieren", (req,res) =>{
    res.sendFile('registrieren.html', { root: path.join(__dirname,'..', 'view') });
});

server.post("/registrieren", (req,res)=>{
    console.log(req.body)
    regist(req,res);
} );

async function regist(req, res){
    const d= await register(req.body)
        if(d==0){
            res.redirect("/registrieren")
        }else{
            res.redirect("/login")
        }
}


module.exports=server;