const form = document.getElementById("form")

var myVar = setInterval(addSum, 1000);



function addSum() {
    let summ= document.getElementById("summe")
    let mehr=document.getElementById("mehrwert")
    let gesamt=document.getElementById("gesamtsumme")
    let result=0
    let er=[]
    let reg="[1-9][1-9]"
    let a = document.getElementById("select1").innerHTML;
    let b = document.getElementById("select2").innerHTML
    let c = document.getElementById("select3").innerHTML
    let d = document.getElementById("select4").innerHTML
    er.push(a.match(reg)[0])
    er.push(b.match(reg)[0])
    er.push(c.match(reg)[0])
    er.push(d.match(reg)[0])
    for (let i =0; i< er.length;i++){
        result= result+Number(er[i])
    }
    let mehrwert= result*0.19
    summ.innerHTML="Summe: "+result+",00€";
    mehr.innerHTML="Mehrwertsteuer: "+mehrwert+"€"
    gesamt.innerHTML="Gesamtsumme: " +(result+mehrwert)+"€"


}

function store(a) {
    let elem = a;
    let indi = sessionStorage.getItem("individuel").split(", ")
    indi.push(elem);
    sessionStorage.setItem("individual" ,indi)
    console.log(sessionStorage)
    storeAnzeigen()
    
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let a = document.getElementById("select1").value;
    let b = document.getElementById("select2").value
    let c = document.getElementById("select3").value
    let d = document.getElementById("select4").value
    let er= a+"-"+b+"-"+c+"-"+d
    
    store(er)
    
})


