const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");

//ausstehendeBestellungen
server.get("/ausstehendeBestellungen", isAuth, (req, res) => {
  res.sendFile("ausstehendeBestellungen.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

server.get("/ausstehendeBestellungen/api", isAuth, (req, res) => {
  ausstehendeBestellungenGet(req, res);
});

async function ausstehendeBestellungenGet(req, res) {
  const path =
    "http://localhost:8000/wba2api/bestellung/alle/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";
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
        daten: r.daten,
      });
      res.send(data).sendStatus(200);
    } else {
      res.send(
        JSON.stringify({
          fehler: "Authorisierung needed",
          daten: null,
        })
      );
    }
  }
}

module.exports = server;
