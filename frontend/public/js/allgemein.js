
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
request()



//Richtig
//
function request(){
    var id= cookies()

    if(id > 0){
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:8000/wba2api/benutzer/gib/'+id)
        request.onload=function() {
            var data = JSON.parse(request.responseText);
            console.log(data);
            setzenHtml(data)

        }
        request.send();
    }

}
function setzenHtml(data){
    let waren = document.getElementById("warenkorb");
    let user = document.getElementById('user');
    let shop= document.getElementById("shop")
    let be= data.daten.benutzerrolle.id;
    let username= data.daten.benutzername
    if(be == 3){
        user.innerHTML=""+username
    }else if(be==1){
    user.innerHTML="Admin";
    user.setAttribute("href", "/accountAdmin")
    waren.innerHTML="offene Bestellungen"
    waren.setAttribute("href", "/ausstehendeBestellungen")
    shop.innerHTML="Kundendaten"
    shop.setAttribute("href", "/kundendaten")

    }

    
}

function cookies(){
    console.log(document.cookie)
    var Wertstart = document.cookie.indexOf("=") + 1;
    let c= document.cookie.substring(Wertstart,Wertstart+4);
    let z= Number(c);
    console.log(c)
    console.log(z)
    return z;
   
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


