const path = require('path');

const express=require('express');
const session = require('express-session');
var favicon = require('serve-favicon');

const server= express();
const port= 3000;

//Einstellungen
server.use(express.urlencoded({ extended: false }))
server.use(session({
    secret: "test",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24
    }
  }))

//middleware
//uebergabe static files
server.use(express.static(path.join(__dirname,'public')));

//Favicon
server.use(favicon(path.join(__dirname,'public','favicon.ico')))


//Routen

//Header
//Index
server.get('/', (req,res) =>{
    res.sendFile("start.html", {root: path.join(__dirname, 'view')});
});

//Register
server.get("/register", (req,res) =>{
    res.sendFile('register.html', { root: path.join(__dirname, 'view') });
});

//login
server.get("/login", (req,res) =>{
    res.sendFile('login.html', { root: path.join(__dirname, 'view') });
});


//Footer

//ueberuns
server.get("/ueberUns", (req,res) =>{
    res.sendFile('ueberUns.html', { root: path.join(__dirname, 'view') });
});

//impressum
server.get("/impressum", (req,res) =>{
    res.sendFile('impressum.html', { root: path.join(__dirname, 'view') });
});

//kontakt
server.get("/kontakt", (req,res) =>{
    res.sendFile('kontakt.html', { root: path.join(__dirname, 'view') });
});


//Shop

//shop
server.get("/shop", (req,res) =>{
    res.sendFile('kontakt.html', { root: path.join(__dirname, 'view') });
});

//SortimentR
server.get("/sortimentR", (req,res) =>{
    res.sendFile('sortimentR.html', { root: path.join(__dirname, 'view') });
});

//SortimentI
server.get("/sortimentI", (req,res) =>{
    res.sendFile('sortimentI.html', { root: path.join(__dirname, 'view') });
});

//warenkorb
server.get("/warenkorb", (req,res) =>{
    res.sendFile('warenkorb.html', { root: path.join(__dirname, 'view') });
});



//startet server
server.listen(port, () =>{
    console.log("Server listen to Port " +port);
});
