const path = require("path");
const express = require("express");
const server = express();
const login = require("../API_Access/Login/login");
const validator = require("../Module/Validator/validator");
//const session = require("express-session")

//login
server.get("/login", (req, res) => {
  res.sendFile("login.html", { root: path.join(__dirname, "..", "view") });
});

server.post("/login", (req, res) => {
  console.log("login");
  console.log(req.body);
  logins(req, res);
});

async function logins(req, res) {
  let data = "";
  try {
    const error = await validator.checkLogin(req.body);
    console.log(error);
    console.log(error.length);
    if (error.length < 1) {
      const b = await login(req.body);
      console.log("Test");
      console.log(b);
      if (b.fehler) {
        data = JSON.stringify({
          fehler: ["Falscher Benutzername oder Passwort"],
        });
        res.send(data);
      } else {
        console.log("angemeldet");
        //console.log(typeof(b))
        req.session.authenticated = true;
        req.authenticated = true;
        req.session.username = b.daten.id;
        console.log(req.session.authenticated + "" + req.authenticated);
        if (b.daten.benutzerrolle.id == 1) {
          let data = JSON.stringify({
            fehler: [],
            an: "a",
          });
          res.send(data);
        } else {
          let data = JSON.stringify({
            fehler: [],
            an: "b",
          });
          res.send(data);
        }
      }
    } else {
      console.log("etste");
      data = JSON.stringify({
        fehler: error,
      });
      res.send(data);
    }
  } catch {
    data = JSON.stringify({
      fehler: "error",
    });
  }
}

module.exports = server;
