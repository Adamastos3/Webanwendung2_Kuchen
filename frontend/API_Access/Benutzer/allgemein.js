const benutzer = require("../Benutzer/benutzer");

async function getAllgemein(req) {
  //const path = "http://localhost:8000/wba2api/benutzer/gib/";
  console.log(req.session.username);
  if (req.session.username == undefined) {
    return JSON.stringify({
      fehler: "Authorisierung needed",
      daten: null,
    });
  } else {
    const r = await benutzer.getBenutzerbyId(req.session.username);
    if (r != null) {
      let data = JSON.stringify({
        fehler: null,
        daten: {
          benutzername: r.daten.benutzername,
          benutzerrolle: { id: r.daten.benutzerrolle.id },
        },
      });
      return data;
    } else {
      return JSON.stringify({
        fehler: "No Data",
        daten: null,
      });
    }
  }
}

module.exports = { getAllgemein };
