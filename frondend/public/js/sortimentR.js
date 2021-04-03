
//init seesionstorage
if (sessionStorage.length==0) {
    sessionStorage.setItem("regular",null)
    sessionStorage.setItem("Individual", null)
    console.log("test");
}

function store(a) {
    let elem = a.value;
    let regular = sessionStorage.getItem("regular").split(",")
    regular.push(elem);
    sessionStorage.setItem("regular", regular)
    console.log(sessionStorage)
    storeAnzeigen()
    
}

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






//Später einsetzen
/*
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost/8000/api/produkte/alle')
request.onload=function() {
    var data = JSON.parse(request.responseText);
    console.log(data);
}
request.send();

function setzenHtml(){

}

function store(a) {
    let elem = document.getElementById(a).value;
    let regular = sessionStorage.getItem("regular").split(",")
    regular.push(elem);
    sessionStorage.setItem("regular", regular)
    
}



*/