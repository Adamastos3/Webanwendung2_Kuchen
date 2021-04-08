
//init seesionstorage
if (sessionStorage.length === 0) {
    sessionStorage.setItem( "regular",null)
    sessionStorage.setItem("Individual", null)
    sessionStorage.setItem("log", 0)
    sessionStorage.setItem("admin",0)
    sessionStorage.setItem("kasse",0)
    console.log("test");
    initBenutzer()
}

if(sessionStorage.getItem("admin")==="0"){
    changeBenutzer()
    storeAnzeigen()
}else{
    changeAdmin()
}


//Anzeigem der einkäufe
function storeAnzeigen() {
    let anzahlR=0
    let anzahlI=0
    let warenkorb = document.getElementById("warenkorb");
    let regular = sessionStorage.getItem("regular")
    let individual= sessionStorage.getItem("individual");
    try {
        console.log(regular[0])
        if (regular[0]!="n"){
            console.log("t1")
            anzahlR+=1
        }
        anzahlR+=regular.split(",").length-1
        
    }
    catch {
       
    }

    try {
        if (individual[0]!="n"){
            anzahlI+=1
        }
        anzahlI+=individual.split(",").length-1
        
    }
    catch {
       
    }
    
    let anzahl = anzahlI+anzahlR;
    if (anzahl >0) {
        warenkorb.innerHTML="Warenkorb ("+anzahl+")"
    }
}

//prototyp
function changeBenutzer(){
    var user = document.getElementById("user");
    if (sessionStorage.getItem("login")=="1"){
        user.innerHTML="Karl Walter"
        user.setAttribute("href", "account.html")
    }
   
}

function changeAdmin(){
    let warenA = document.getElementById("warenkorb");
    let userA = document.getElementById('user');
    let shopA= document.getElementById("shop")
    userA.innerHTML="Admin";
    userA.setAttribute("href", "accountAdmin.html")
    warenA.innerHTML="offene Bestellungen"
    warenA.setAttribute("href", "ausstehendeBestellungen.html")
    shopA.innerHTML="Kundendaten"
    shopA.setAttribute("href", "kundendaten.html")

}

function initBenutzer() {
    sessionStorage.setItem("email", "Test@test.de")
    sessionStorage.setItem("username", "Karl1")
    sessionStorage.setItem("anrede","Herr")
    sessionStorage.setItem("vorname","Karl")
    sessionStorage.setItem("nachname","Walter")
    sessionStorage.setItem("geb","2000-02-04")
    sessionStorage.setItem("plz","78628")
    sessionStorage.setItem("stadt","Rottweil")
    sessionStorage.setItem("strasse","Gartenstraße")
    sessionStorage.setItem("hausnr", "6")
    console.log(sessionStorage)
}


