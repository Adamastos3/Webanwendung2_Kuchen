const path = require('path');

const express=require('express');
const session = require('express-session');
const isAuth= require('./middleware/controller.js')
var cookieParser = require('cookie-parser')
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
//cookie-parser
server.use(cookieParser())
//uebergabe static files
server.use(express.static(path.join(__dirname,'public')));

//Favicon
server.use(favicon(path.join(__dirname,'public','favicon.ico')))

//Routen
var route= require("./routes/shop.js")
server.use('/',route)
route= require("./routes/login.js")
server.use('/',route)
route= require("./routes/registrieren.js")
server.use('/',route)
route= require("./routes/ueberUns.js")
server.use('/',route)
route= require("./routes/impressum.js")
server.use('/',route)
route= require("./routes/kontakt.js")
server.use('/',route)
route= require("./routes/sortimentR.js")
server.use('/',route)
route= require("./routes/sortimentI.js")
server.use('/',route)
route= require("./routes/warenkorb.js")
server.use('/',route)
route= require("./routes/kasse.js")
server.use('/',route)
route= require("./routes/passwordVergessen.js")
server.use('/',route)
route= require("./routes/passwortAendern.js")
server.use('/',route)
route= require("./routes/kundendaten.js")
server.use('/',route)
route= require("./routes/kundenChange.js")
server.use('/',route)
route= require("./routes/ihreDaten.js")
server.use('/',route)
route= require("./routes/bestellhistorie.js")
server.use('/',route)
route= require("./routes/ausstehendeBestellungen.js")
server.use('/',route)
route= require("./routes/accountAdmin.js")
server.use('/',route)
route= require("./routes/account.js")
server.use('/',route)
route= require("./routes/start.js")
server.use('/',route)



//startet server
server.listen(port, () =>{
    console.log("Server listen to Port " +port);
});
