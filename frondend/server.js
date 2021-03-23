const path = require('path');

const express=require('express');
const session = require('express-session');

const server= express();
const port= 3000;

//Einstellungen
server.use(express.urlencoded({ extended: false }))
server.use(session({
    secret: "test",
    resave: false,
    saveUninitialized: false
  }))

//middleware
//uebergabe static files
server.use(express.static(path.join(__dirname,'public')));

//Routen
//Index
server.get('/', (req,res) =>{
    res.sendFile("index.html", {root: path.join(__dirname, 'view')});
});

//Register
server.get("/register", (req,res) =>{
    res.sendFile('register.html', { root: path.join(__dirname, 'view') });
});

//login
server.get("/login", (req,res) =>{
    res.sendFile('login.html', { root: path.join(__dirname, 'view') });
});

server.listen(port, () =>{
    console.log("Server listen to Port " +port);
});
