const path = require("path");
const express = require("express");
const server = express();
const isAuth = require("../middleware/controller");

//bestellhistorie
server.get("/bestellhistorie", isAuth, (req, res) => {
  res.sendFile("bestellhistorie.html", {
    root: path.join(__dirname, "..", "view"),
  });
});

server.get("/bestellhistorie", isAuth, (req, res) => {
  bestellhistorieGet(req, res);
});

async function bestellhistorieGet(req, res) {
  const pathBes = "http://localhost:8000/wba2api/bestellung/alle";
  const pathB = "http://localhost:8000/wba2api/benutzer/gib/";
  let data = "";
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
      pathBes + "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa"
    );
    const be = await getRequest(
      pathB +
        req.session.username +
        "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa"
    );
    if (r != null && be != null) {
      let daten = [];
      for (let i = 0; i < r.daten.length; i++) {
        if (r.daten[i].besteller.id == be.person.id) {
            daten.push(r.daten[i]);
          
        }
      }

      if (daten.length > 0) {
        data = JSON.stringify({
          fehler: null,
          daten: r.daten,
        });
      } else {
        data = JSON.stringify({
          fehler: "NO Data",
          daten: null,
        });
      }

      res.send(data);
    } else {
      res.send(
        JSON.stringify({
          fehler: "NO Data",
          daten: null,
        })
      );
    }
  }
}

module.exports = server;
