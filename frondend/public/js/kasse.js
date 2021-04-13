const form = document.getElementById("form")
var zahl=0;
function addsumm() {
    let sum=document.getElementById("sum")
    let mehr= document.getElementById("mehr")
    let gesamt=document.getElementById("gesamt")
    let a = document.getElementsByClassName("preis")
    let wert=0
    for (let i=0; i< a.length; i++){
        let d=a[i].innerHTML;
        console.log(d)
        d= d.substr(-3,2)
        console.log(d)
        wert=wert+Number(d)
    }
    let steuer= Math.round((wert*0.07)*100)/100
    sum.innerHTML= wert+"€"
    mehr.innerHTML= steuer+"€"
    gesamt.innerHTML=(wert+steuer)+"€"

}

function changeRadion(a){
    if (a =="vor") {
        
        document.getElementById("vor").checked=true;
        document.getElementById("rech").checked=false;
        document.getElementById("bar").checked=false;
    }
    else if (a =="rech") {
        document.getElementById("vor").checked=false;
        document.getElementById("rech").checked=true;
        document.getElementById("bar").checked=false;
    }
    else if (a=="bar"){
        document.getElementById("vor").checked=false;
        document.getElementById("rech").checked=false;
        document.getElementById("bar").checked=true;
    }
}

//nur für Prototyp
function einfügen() {
    console.log(sessionStorage)
    var art= document.getElementById("waren");
    var a1= sessionStorage.getItem("regular")
    var b1= sessionStorage.getItem("Individual")
    var re=[];
    var indi=[];

    if(a1!="n" && a1!="undefined" ){
        if( a1.length == 1){
            re.push("a")
        }
        else{
            re=a1.split(",")
        }
    }
    if(b1!="n"){
        if( b1.length == 1){
            indi.push("a")
        }
        else{
            indi=b1.split(",")
        }
    }
    for(let i=0; i<re.length;i++) {
        let elem="elem"+zahl+"re"
        let a =
        "<tr id='"+elem+"'>"+
        "<td><img src='../public/img/cake-example.png' alt=''></td>"+
        "<td><p>Erdbeerkuchen<p>"+
        "<p>leckerer Erdbeerkuchen mit Sahne und Biscuitteig</p></td>"+
        "<td><p class='preis'>12€</p></td>"+
        "</tr>"
        zahl+=1
        art.innerHTML+=a
        console.log("test")
    }

    for(let i=0; i<indi.length;i++) {
        let elem="elem"+zahl+"in"
        let b=
        "<tr id='"+elem+"' >"+
        "<td><img src='../public/img/cake-example2.png' alt=''></td>"+
        "<td><p>Individueller kuchen<p>"+
        "<p>Individueller Kuchen nach Ihrer Konfiguration</p></td>"+
        "<td><p class='preis'>25€</p></td>"+
        "</tr>"
        zahl+=1
        art.innerHTML+=b
    }


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
    sessionStorage.setItem("regular", "undefined")
    sessionStorage.setItem("Individual", "n")

    if (a==0){
        window.alert("Die Bestellbestätigung wurde in Ihre Mail versendet")
        location.href="shop.html"
    }
    else {
        location.href="warenkorb.html"
    }
}

benutzerSetzen()
einfügen()
addsumm()