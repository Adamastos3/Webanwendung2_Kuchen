const benutzer = require("../Benutzer/benutzer");
const validator = require("../../Module/Validator/validator");

async function checkDatenlogin(body) {
  const data = JSON.stringify({
    benutzername: body.username,
    passwort: body.passwort,
  });

  const b = await benutzer.checkBenutzerUndPassword(data);
  return b;
}

async function getLogin(req) {
  let data = "";
  try {
    const error = await validator.checkLogin(req.body);
    console.log(error);
    console.log(error.length);
    if (error.length < 1) {
      const b = await checkDatenlogin(req.body);
      console.log("Test");
      console.log(b);
      if (b.fehler) {
        data = JSON.stringify({
          fehler: ["Falscher Benutzername oder Passwort"],
        });
        return data;
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
          return data;
        } else {
          let data = JSON.stringify({
            fehler: [],
            an: "b",
          });
          return data;
        }
      }
    } else {
      console.log("etste");
      data = JSON.stringify({
        fehler: error,
      });
      return data;
    }
  } catch {
    data = JSON.stringify({
      fehler: "error",
    });
    return data;
  }
}

module.exports = { getLogin };
