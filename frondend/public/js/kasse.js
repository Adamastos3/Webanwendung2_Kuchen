const form = document.getElementById("form")

function addsumm() {
    let sum=document.getElementById("sum")
    let mehr= document.getElementById("mehr")
    let gesamt=document.getElementById("gesamt")
    let a = document.getElementsByClassName("preis")
    let wert=0
    for (let i=0; i< a.length; i++){
        let d=a[i].innerHTML;
        console.log(d)
        d= d.substr(-4,3)
        console.log(d)
        wert=wert+Number(d)
    }
    sum.innerHTML= wert+"€"
    mehr.innerHTML= (wert*0.19)+"€"
    gesamt.innerHTML=(wert+(wert*0.19))+"€"
}

function changeRadion(a){
    if (a =="vor") {
        document.getElementById("vor").checked=true;
        document.getElementById("rech").checked=false;
        ducument.getElementById("bar").checked=false;
    }
    else if (a =="rech") {
        document.getElementById("vor").checked=false;
        document.getElementById("rech").checked=true;
        ducument.getElementById("bar").checked=false;
    }
    else{
        document.getElementById("vor").checked=false;
        document.getElementById("rech").checked=false;
        ducument.getElementById("bar").checked=true;
    }
}

//nur für Prototyp
function einfügen() {
    console.log(sessionStorage)
    var art= document.getElementById("waren");
    try{
    var re = sessionStorage.getItem("regular").split(",");

    }
    catch{

    }
    try{
    var indi = sessionStorage.getItem("individuel").split(",");
    }catch{}

    try{
    for(let i=1; i<re.length;i++) {
        var a =
        "<tr>"+
        "<td><img src='../public/cake-example.png' alt=''></td>"+
        "<td><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p></td>"+
        "<td><p class='preis'>Preis: 250€</p></td>"+
        "</tr>"
        art.innerHTML+=a
        console.log("test")
        
    }

    for(let i=1; i<indi.length;i++) {
        var b=
        "<tr>"+
        "<td><img src='../public/cake-example2.png' alt=''></td>"+
        "<td><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p></td>"+
        "<td><p class='preis'>Preis: 250€</p></td>"+
        "</tr>"
        art.innerHTML+=b
    }
}
catch{}


}

function benutzerSetzen(){
    var email=sessionStorage.getItem("email")
    var anrede=sessionStorage.getItem("anrede")
    var vorname=sessionStorage.getItem("vorname")
    var nachname=sessionStorage.getItem("nachname")
    var plz=sessionStorage.getItem("plz")
    var stadt=sessionStorage.getItem("stadt")
    var strasse=sessionStorage.getItem("strasse")
    var hausnr= sessionStorage.getItem("hausnr")
    if (anrede=="Herr"){
        document.getElementById("anrede").value="Herr"
    }
    else {
        document.getElementById("anrede").value="Frau"
    }
    document.getElementById("email").value=email
    document.getElementById("adresse").value=plz+" "+stadt
    document.getElementById("vorname").value=vorname
    document.getElementById("nachname").value=nachname
    document.getElementById("adresse2").value=strasse +" "+hausnr

}

function sendOn(a) {
    window.alert("Die Bestellbestätigung wurde in Ihre Mail versendet")
    location.href="shop.html"
    
}

benutzerSetzen()
einfügen()
addsumm()