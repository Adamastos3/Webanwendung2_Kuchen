const form = document.getElementById("form")

function addsumm() {
    //Id ändern 
    let sum=document.getElementById("sum")
    let mehr= document.getElementById("mehr")
    let gesamt=document.getElementById("gesamt")
    let a = document.getElementsByClassName("preis")
    let wert=0
    for (let i=0; i< a.length; i++){
        let d=a[i].innerHTML;
        wert=wert+Number(d)
    }
    sum.innerHTML= wert+"€"
    mehr.innerHTML= (wert*0.19)+"€"
    gesamt.innerHTML=(wert+(wert*0.19))+"€"


}


//nur für Prototyp
function einfügenWarenkorb() {
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

    var a = "<table><tr><td><img src='' alt=''></td>"+
    "<td><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p></td>"+
    "<td><p class='preis'>250</p></td>"+
    "</tr>"+
    "</table>"

    var b="<table><tr><td><img src='' alt=''></td>"+
    "<td><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p></td>"+
    "<td><p class='preis'>250</p></td>"+
    "</tr>"+
    "</table>"

    for(let i=1; i<re.length;i++) {
        let d=document.createElement("div")
        d.setAttribute("id","elem"+zahl)
        d.innerHTML=a
        zahl+=1
        art.appendChild(d)
    }

    for(let i=1; i<indi.length;i++) {
        let d=document.createElement("div")
        d.setAttribute("id","elem"+zahl)
        d.innerHTML=a
        zahl+=1
        art.appendChild(d)
    }


}


function sendOn(a) {
    location.href="/shop"
    
}