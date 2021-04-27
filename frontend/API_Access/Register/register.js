const person=require("../Person/person")
const adresse=require("../Adresse/adresse")
const benutzer= require("../Benutzer/benutzer")

async function register(body){
    const checkData=JSON.stringify({
        "benutzername": body.username,
    })
    const excist=await benutzer.checkBenutzer(checkData)
    console.log(excist)
    if(excist){
        return InputNewUser(body);
    }else{
        return 0;
    }
}

async function InputNewUser(body){

    function anrede(body){
        if (body.Herr!= undefined){
            return "Herr"
        }
        else{
            return "Frau"
        }
    }

    function geb(body){
        let a = body.geb.split("-")
        let r= ""+a[2]+"."+a[1]+"."+a[0];
        console.log(r)
        return r;
    }

    

        const dataAdresse=JSON.stringify({
            "strasse": body.strasse,
            "hausnummer": body.hausnr,
            "adresszusatz": "",
            "plz": body.plz,
            "ort": body.stadt,
            "land": {
                "id":44,
            }

        });

        const adressId= await adresse.createAddress(dataAdresse);
        console.log(adressId)
       
        const dataPerson=JSON.stringify({
            "anrede": anrede(body),
            "vorname": body.vorname,
            "nachname": body.nachname,
            "adresse": {
                "id": adressId,
            },
            "telefonnummer": "",
            "email": body.email,
            "geburtstag": geb(body),
        });
        const personId= await person.createPerson(dataPerson);
        console.log(personId)
        
        const dataUser= JSON.stringify({
            "id": 1,
            "benutzername": body.username,
            "passwort": body.pass1,
            "benutzerrolle": {
                "id":3,
            },
            "person": {
                "id": personId,
            }
        })
        const benutzerid= await benutzer.createBenutzer(dataUser)
        console.log(benutzerid)
        return benutzerid;
        
        
}


module.exports = register;