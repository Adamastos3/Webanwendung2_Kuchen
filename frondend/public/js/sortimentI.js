const form = document.getElementById("form")

var myVar = setInterval(addSum, 1000);

//init seesionstorage
if (sessionStorage.length==0) {
    sessionStorage.setItem( "regular",null)
    sessionStorage.setItem("Individual", null)
    console.log("test");
}

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