//Test
/*
var st="null,1,1,1,1,1"
sessionStorage.setItem("regular", st)
sessionStorage.setItem("individuel",st)
*/


//wirklich
var zahl=0;
einfügen()
addsumm();


function addsumm() {
    console.log("addsum Funktion")
    let sum = document.getElementById("sum")
    let mehr = document.getElementById("mehr")
    let gesamt = document.getElementById("gesamt")
    let a = document.getElementsByClassName("preis")

    console.log("a Länge: " + a.length);       //Anzahl Kuchen im Warenkorb

    let wert = 0
    for (let i = 0; i < a.length; i++) {        //die Werte aufsummieren
        let d = a[i].innerHTML;
        let FrontOfComma = d.length-4;        //Betrag bis Komma. Jeder Betrag hat hinten 4 Stellen. for ex: ,73€.
        console.log("vor substring: " + d);
        d = d.substr(0, FrontOfComma) + "." + d.substr(-3,2);  //Substring nimmt die Zahlen bis zum Komma, und hängt dann den Cent betrag an
        console.log("nach substring: " + d);
        console.log(isFinite(d));
        wert = wert + Number(d)
    }
    console.log("wert: " + wert);


    let steuer = Math.round((wert * 0.07) * 100) / 100
    sum.innerHTML = wert + "€"
    mehr.innerHTML = steuer + "€"
    gesamt.innerHTML = (wert + steuer) + "€"

}

function removeElem(id) {

    console.log("id")
    console.log(id);
    let element=id
    console.log(element)
    element.parentNode.removeChild(element);

    addsumm();

    let d = element.id.substr(-2,2)
    console.log(d)
    if(d=="re"){
        let e = sessionStorage.getItem("regular")
        console.log(e)
        if (e.length==4){
            sessionStorage.setItem("regular", "undefined")
        }else{
            let s = e.split(",")
            s.pop()
            if (s.length==0){
                sessionStorage.setItem("regular", "undefined")
            }else {
                sessionStorage.setItem("regular", s)
            }

        }

        console.log(sessionStorage)
    }
    else{
        let e = sessionStorage.getItem("Individual")
        if (e.length==1){
            sessionStorage.setItem("Individual", "n")
        }else{
            let s = e.split()
            s.pop()
            if (s.length==0){
                sessionStorage.setItem("Individual", "n")
            }else {
                sessionStorage.setItem("Individual", s)
            }
        }


        console.log(sessionStorage)
    }

    storeAnzeigen()
}

function sendOn(){
    console.log(sessionStorage)
    let r = sessionStorage.getItem("regular")
    console.log(r)
    let i = sessionStorage.getItem("Individual")
    console.log(i)

    if(((r=="undefined") && (i=="n")) || ((r=="n") && (i=="n"))){
        location.href="shop.html"
    }
    else{
        if (sessionStorage.getItem("login") ==1){
            location.href="kasse.html"
        }
        else{
            sessionStorage.setItem("kasse",1)
            location.href="login.html"
        }
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
        "<td><p><h4>Erdbeerkuchen</h4></p>"+
        "<p>leckerer Erdbeerkuchen mit Sahne und Biscuitteig</p></td>"+
        "<td>"+
        "<input class='menge' type='number' name='' id=''>"+
        "</td>"+
        "<td><p class='preis'>12,00€</p></td>"+
        "<td><button onclick='removeElem("+elem+")'><img src='../public/img/shoppingCartCancel.png' alt=''></button></td>"+
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
        "<td><p><h4>Individueller kuchen</h4></p>"+
        "<p>Individueller Kuchen nach Ihrer Konfiguration</p></td>"+
        "<td>"+
        "<input class='menge' type='number' name='' id=''>"+
        "</td>"+
        "<td><p class='preis'>25,00€</p></td>"+
        "<td><button onclick='removeElem("+elem+")'><img src='../public/img/shoppingCartCancel.png' alt=''></button></td>"+
        "</tr>"
        zahl+=1
        art.innerHTML+=b
    }

}
