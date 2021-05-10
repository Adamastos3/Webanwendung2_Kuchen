const benutzer = require("../Benutzer/benutzer");
const validator = require("../../Module/Validator/validator");

async function getKunden() {
  let data = [];
  let result = "";
  const a = await benutzer.getBenutzerAll();
  if (a.daten != null) {
    for (let i = 0; i < a.daten.length; i++) {
      if (a.daten[i].benutzerrolle.id == 3) {
        data.push(a.daten[i]);
      }
    }
    result = JSON.stringify({
      fehler: null,
      daten: data,
    });
    return result;
  }
}

async function getKunde(id) {
  console.log("getKunde");
  const a = await validator.checkID(id);
  if (a.length < 1) {
    const b = benutzer.getBenutzerbyId(id);
    return b;
  }
}

module.exports = { getKunden, getKunde };
