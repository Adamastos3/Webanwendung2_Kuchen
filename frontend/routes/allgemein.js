const path = require("path");
const express = require("express");
const getRequest = require("../API_Access/Request/getRequest");
const server = express();

//ausstehendeBestellungen
server.get("/allgemein/", (req, res) => {
  allgemeinGet(req, res);
});

async function allgemeinGet(req, res) {
  const path = "http://localhost:8000/wba2api/benutzer/gib/";
  console.log(req.session.username);
  if (req.session.username == undefined) {
    res.send(
      JSON.stringify({
        fehler: "Authorisierung needed",
        daten: null,
      })
    );
  } else {
    const r = await getRequest(
      path +
        req.session.username +
        "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa"
    );
    if (r != null) {
      let data = JSON.stringify({
        fehler: null,
        daten: {
          benutzername: r.daten.benutzername,
          benutzerrolle: { id: r.daten.benutzerrolle.id },
        },
      });
      res.send(data);
    } else {
      res.send(
        JSON.stringify({
          fehler: "No Data",
          daten: null,
        })
      );
    }
  }
}

module.exports = server;
