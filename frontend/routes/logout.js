const express = require("express");
const server =express()


//login
server.get("/logout", (req,res) =>{
    res.clearCookie("KN");
    req.session.destroy((err) => {
        if (err) throw err;
    res.redirect("/login");
    });
});

module.exports=server;