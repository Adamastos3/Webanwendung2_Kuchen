const form = document.getElementById("form")
var h=0

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("submit")
})

function sendData() {
    //prototype
    neuSetzen()
    form.submit()
}

function changeElem(id){
    let b= document.getElementById("")
    for (let i=0; i<id.length; i++){
        let a = document.getElementById(id[i])
        if ((id[i]!="herr") && (id[i]!= "frau")){
            a.value="";
        }
        else{
            a.checked=false;
        }
    }
    hideButton(h)
    h+=1
}

function hideButton(id){
    var x = document.getElementById("b1");
    if(id==0){
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
}

//prototyp

var anrede="Herr"
var vorname="Karl"
var nachname="Walter"
var geb="12.04.1985"
var plz="78628"
var stadt="Rottweil"
var strasse="Gartenstraße"
var hausnr= "6"
function inhaltSetzen() {
    if (anrede=="Herr"){
        document.getElementById("herr").checked=true
    }
    else {
        document.getElementById("frau").checked=true
    }

    document.getElementById("vorname").value=vorname
    document.getElementById("nachname").value=nachname
    document.getElementById("geb").value=geb
    document.getElementById("plz").value=plz
    document.getElementById("stadt").value=stadt
    document.getElementById("straße").value=strasse
    document.getElementById("hausnummer").value=hausnr
    hideButton(0)
}

function neuSetzen(){

    if(document.getElementById("herr").checked==true){
        anrede="Herr"
    }
    else{
        anrede="Frau"
    }
    vorname=document.getElementById("vorname").value
    nachname=document.getElementById("nachname").value
    geb= document.getElementById("geb").value
    plz=document.getElementById("plz").value
    stadt=document.getElementById("stadt").value
    strasse=document.getElementById("straße").value
    hausnr=document.getElementById("hausnummer").value
}


inhaltSetzen()