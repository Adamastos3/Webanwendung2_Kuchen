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

function removeElem(id) {

    console.log(id);
    let element=id
    console.log(element)
    element.parentNode.removeChild(element);
    addsumm();
    //Es fehl noch das entfernen aus dem sessionstore
}

function sendOn(){
    if (sessionStorage.getItem("login") ==1){
        location.href="kasse.html"
    }
    else{
        sessionStorage.setItem("kasse",1)
        location.href="login.html"
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
        let elem="elem"+zahl
        var a =
        "<tr id='"+elem+"'>"+
        "<td><img src='../public/cake-example.png' alt=''></td>"+
        "<td><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p></td>"+
        "<td><p class='preis'>Preis: 250€</p></td>"+
        "<td><button onclick='removeElem("+elem+")'><img src='../public/shoppingCartCancel.png' alt=''></button></td>"+
        "</tr>"
        zahl+=1
        art.innerHTML+=a
        console.log("test")
    }

    for(let i=1; i<indi.length;i++) {
        let elem="elem"+zahl
        var b=
        "<tr id='"+elem+"' >"+
        "<td><img src='../public/cake-example2.png' alt=''></td>"+
        "<td><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p></td>"+
        "<td><p class='preis'>Preis: 250€</p></td>"+
        "<td><button onclick='removeElem("+elem+")'><img src='../public/shoppingCartCancel.png' alt=''></button></td>"+
        "</tr>"
        zahl+=1
        art.innerHTML+=b
    }
}
catch{}


}

