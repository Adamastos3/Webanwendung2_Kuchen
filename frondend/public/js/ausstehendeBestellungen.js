

function addsumm() {
    let sum=document.getElementById("sum")
    let mehr= document.getElementById("steuer")
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

function erledigt(id) {
    let element = id;
    //console.log(element)
    element.parentNode.removeChild(element);
    addsumm();
    //Es fehl noch das entfernen aus dem sessionstore
}

