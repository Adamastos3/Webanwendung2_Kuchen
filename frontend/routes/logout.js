const express = require("express");
const server = express();
const warenkorb = require("../API_Access/Bestellung/warenkorb");
const isAuth = require("../middleware/controller");

//login
server.post("/logout", isAuth, (req, res) => {
  saveWarenkorb(req, res);
});

server.get("/logout", isAuth, (req, res) => {
  logout(req, res);
});

async function saveWarenkorb(req, res) {
  req.body.benutzerid = req.session.username;
  console.log(req.body);
  const a = await warenkorb.saveWarenkorb(req.body);
  console.log(a);
  if (JSON.parse(a).fehler == null) {
    let daten = JSON.stringify({
      fehler: null,
    });
    req.session.destroy((err) => {
      if (err) throw err;
      res.send(daten);
    });
  } else {
    req.session.destroy((err) => {
      if (err) throw err;
      res.send(a);
    });
  }
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
}

module.exports = server;
