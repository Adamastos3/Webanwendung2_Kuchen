const path= require('path')
const express = require("express");
const server =express()
const login= require("../API_Access/Login/login")
const session = require("express-session")

//login
server.get("/login", (req,res) =>{
    res.sendFile('login.html', { root: path.join(__dirname,'..', 'view') });
});

server.post('/login', (req,res)=>{
    console.log("login")
    logins(req,res)
})


async function logins(req,res){
    const b= await login(req.body);
    console.log("Test")
    console.log(b)
    if (b == undefined){
        res.redirect("/login")
    }
    else{
        console.log("angemeldet")
        req.session.isAuth=true
        req.session.username=b;
        res.redirect("/account")

    }

}


module.exports=server;

