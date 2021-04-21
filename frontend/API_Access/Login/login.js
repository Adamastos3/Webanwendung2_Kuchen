const benutzer = require("../Benutzer/benutzer")

async function login(body){

    const data=JSON.stringify({
        "benutzername": body.username,
        "passwort": body.pass,
    })

    const b= await benutzer.checkBenutzerUndPassword(data)
    return b;

}

module.exports=login