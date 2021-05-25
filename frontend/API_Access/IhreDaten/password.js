const md5 = require("md5");
const benutzer = require("../Benutzer/benutzer");
const validator = require("../../Module/Validator/validator");
const passwortgenerator = require("../../Module/passwordGenerator/passwordGenerator");
const mail = require("../../Module/Nodemailer/sendMail");

async function setNewPassword(body, id) {
  console.log(body);
  const user = await benutzer.getBenutzerbyId(id);
  const userPassHtml = md5(body.passOld);
  console.log("User + new oas");
  console.log(user);
  console.log(userPassHtml);

  if (user.daten.passwort == userPassHtml) {
    console.log("test");
    let a = [1]; //await validator.checkPassword(body.passNew)
    if (1 == 1) {
      console.log("ändern");
      let daten = JSON.stringify({
        id: user.daten.id,
        benutzername: user.daten.benutzername,
        neuespasswort: body.passNew,
        benutzerrolle: {
          id: user.daten.benutzerrolle.id,
        },
        person: {
          id: user.daten.person.id,
        },
      });
      console.log("daten");
      console.log(daten);
      const neues = await benutzer.updateBenutzer(daten);
      console.log(neues);
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
          console.log(daten);
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
      fehler: [{ bezeichnung: "Mail existiert nicht" }],
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
