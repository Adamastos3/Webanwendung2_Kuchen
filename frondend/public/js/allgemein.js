
//init seesionstorage
if (sessionStorage.length==0) {
    sessionStorage.setItem( "regular",null)
    sessionStorage.setItem("Individual", null)
    sessionStorage.setItem("log", 0)
    console.log("test");
}

//Anzeigem der einkäufe
function storeAnzeigen() {
    let anzahlR=0
    let anzahlI=0
    let w = document.getElementById("zahl");
    let r = sessionStorage.getItem("regular")
    let i= sessionStorage.getItem("individual");
    try {
        console.log(r[0])
        if (r[0]!="n"){
            console.log("t1")
            anzahlR+=1
        }
        anzahlR+=r.split(",").length-1
        
    }
    catch {
       
    }

    try {
        if (i[0]!="n"){
            anzahlI+=1
        }
        anzahlI+=i.split(",").length-1
        
    }
    catch {
       
    }
    
    let anzahl = anzahlI+anzahlR;
    if (anzahl >0) {
        w.innerHTML=" ("+anzahl+")"
    }
}

//prototyp
function changeBenutzer(){
    var user = document.getElementById("user");
    if (sessionStorage.getItem("login")=="1"){
        user.innerHTML=""
    }
   
}
