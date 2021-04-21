
//init seesionstorage

if (sessionStorage.length === 0) {
    sessionStorage.setItem("regular","n")
    sessionStorage.setItem("Individual", "n")
    sessionStorage.setItem("login", 0)
    sessionStorage.setItem("admin",0)
    sessionStorage.setItem("kasse",0)
    console.log("init");
    initBenutzer()
}



cookies()



//Richtig
//
var request = new XMLHttpRequest();
var id= cookies()
request.open('GET', 'http://localhost:8000/wba2api/produkt/alle')
request.onload=function() {
    var data = JSON.parse(request.responseText);
    console.log(data);

}
request.send();

function setzenHtml(){

}




function cookies(){
    console.log(document.cookie)
    var Wertstart = document.cookie.indexOf("=") + 1;
    let c= document.cookie.substring(Wertstart,Wertstart+4);
    console.log(c)
    return c;
   
}




/*
if(sessionStorage.getItem("admin")==="0"){
    changeBenutzer()
    storeAnzeigen()
}else{
    changeAdmin()
}
*/

//Anzeigem der einkäufe
function storeAnzeigen() {
    console.log(sessionStorage)
    let anzahlR=0
    let anzahlI=0
    let warenkorb = document.getElementById("warenkorb");
    let regular = sessionStorage.getItem("regular")
    console.log(sessionStorage.getItem("regular"))
    console.log("test")
    let individual= sessionStorage.getItem("Individual");

    if (regular!="n" && regular !="n," && regular != "undefined"){
        if(regular.length == 1){
            anzahlR+=1
        }
        else{
            anzahlR+=regular.split(",").length 
            console.log("r2")
        }
        
    }

    if (individual!="n"){
        if(individual.length == 1){
            anzahlI+=1
        }
        else{
            anzahlI+=individual.split(",").length 
            console.log("i2")
        }
    }

    
    let anzahl = (anzahlI)+(anzahlR);
    if (anzahl >0) {
        warenkorb.innerHTML="Warenkorb ("+anzahl+")"
    }
    else{
        warenkorb.innerHTML="Warenkorb"
    }
}

function sendToStart(){
    location.href="/"
}

//prototyp
function changeBenutzer(){
    var user = document.getElementById("user");
    if (sessionStorage.getItem("login")=="1"){
        user.innerHTML="Karl Walter"
        user.setAttribute("href", "/account")
    }
    else{
        user.setAttribute("href", "/login")
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
    //console.log(sessionStorage)
}


