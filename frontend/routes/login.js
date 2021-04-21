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
    const val="";
    const name="KN"
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

        if(b >1000){
            val=b;
        }
        else if (b>100){
            val ="0"+b
        }
        else if (b > 10){
            val="00"+b
        }
        else{
            val="000"+b
        }

        res.cookie(name, val, {maxAge: 1000*60*60*24});
        res.redirect("/account")

    }

}


module.exports=server;

