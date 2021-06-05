const md5 = require("md5");
const benutzer = require("../Benutzer/benutzer");
const validator = require("../../Module/Validator/validator");
const passwortgenerator = require("../../Module/passwordGenerator/passwordGenerator");
const mail = require("../../Module/Nodemailer/sendMail");

async function setNewPassword(body, id) {
  const user = await benutzer.getBenutzerbyId(id);
  const userPassHtml = md5(body.passOld);

  if (user.daten.passwort == userPassHtml) {
    let a = await validator.checkPassword(body);
    if (a.length < 1) {
      let daten = JSON.stringify({
        id: user.daten.id,
        benutzername: user.daten.benutzername,
        neuespasswort: body.pass,
        benutzerrolle: {
          id: user.daten.benutzerrolle.id,
        },
        person: {
          id: user.daten.person.id,
        },
      });
      const neues = await benutzer.updateBenutzer(daten);
      if (neues != null) {
        return JSON.stringify({
          fehler: null,
        });
      } else {
        return JSON.stringify({
          fehler: [{ bezeichnung: "no data" }],
        });
      }
    }
    return JSON.stringify({
      fehler: a,
    });
  }
}

async function resetPassword(body) {
  const a = await validator.checkPasswortVergessen(body);
  if (a.length < 1) {
    const benutzerdata = await benutzer.getBenutzerAll();
    const pass = passwortgenerator.generatePassword();
    for (let i = 0; i < benutzerdata.daten.length; i++) {
      if (benutzerdata.daten[i].benutzername == body.username) {
        if (benutzerdata.daten[i].person.email == body.email) {
          let daten = JSON.stringify({
            id: benutzerdata.daten[i].id,
            benutzername: benutzerdata.daten[i].benutzername,
            neuespasswort: pass,
            benutzerrolle: {
              id: benutzerdata.daten[i].benutzerrolle.id,
            },
            person: {
              id: benutzerdata.daten[i].person.id,
            },
          });
          const update = await benutzer.updateBenutzer(daten);

          if (update != null) {
            //Muss manuel aktiviert werden
            //const info = await mail.sendPasswordVergessen(update, pass);
            return JSON.stringify({
              fehler: null,
            });
          } else {
            return JSON.stringify({
              fehler: [{ bezeichnung: "serverFehler" }],
            });
          }
        }
      }
    }
    return JSON.stringify({
      fehler: [{ bezeichnung: "Mail oder Benutzer existiert nicht" }],
    });
  } else {
    return JSON.stringify({
      fehler: a,
    });
  }
}

module.exports = {
  setNewPassword,
  resetPassword,
};
