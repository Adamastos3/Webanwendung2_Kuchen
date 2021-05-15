const express = require("express");
const server = express();

//login
server.get("/logout", (req, res) => {
  //saveWarenkorb();
  logout(req, res);
});

//Muss noch verbunden werden
async function saveWarenkorb(req, res) {}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
}

module.exports = server;
