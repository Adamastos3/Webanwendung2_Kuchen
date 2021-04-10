const form = document.getElementById("form")
var timer1 = null;

addSum()

function test(){
    let a = document.getElementById("topping")
    a.style.visibility= "hidden"
}


function start(a,b){
    console.log(b)
    blink(a)
    bildChange(b)
}

function addSum() {
    let result=0
    let er=[]
    let summ= document.getElementById("summe")
    let mehr=document.getElementById("mehrwert")
    let gesamt=document.getElementById("gesamtsumme")
    let a = document.getElementById("select1").value;
    let b = document.getElementById("select2").value
    let c = document.getElementById("select3").value
    let d = document.getElementById("select4").value
    console.log(a)
    er.push(a.substr(-5,2))
    er.push(b.substr(-5,2))
    er.push(c.substr(-5,2))
    er.push(d.substr(-5,2))
    for (let i =0; i< er.length;i++){
        result= result+Number(er[i])
    }
    let mehrwert= result*0.19
    summ.innerHTML=result+",00€";
    mehr.innerHTML=mehrwert+"€"
    gesamt.innerHTML=(result+mehrwert)+"€"


}

function bildChange(a) {
    let bild= document.getElementById("bildMaterial")

    //Top
    if(a =="01" || a=="03"){
        bild.src="../public/erdbeeren.png"
    }
    if(a =="02" || a=="04"){
        bild.src= "../public/erdbeeren2.png"
    }


}

function blink(a){
    let bild= document.getElementById(a)
    if (timer1 != null){
        clearInterval(timer1)
        document.getElementById("topping").style.visibility="visible"
        document.getElementById("topping2").style.visibility="visible"
        document.getElementById("middle").style.visibility="visible"   
        document.getElementById("bottom").style.visibility="visible"
    }
    timer1= setInterval(()=>{
        if (bild.style.visibility === 'visible'){
            bild.style.visibility = 'hidden'
        }
        else{
            bild.style.visibility = 'visible'
        }
        
    },1000)
}

//Prototype

function sendOn(){
    store()
    document.forms.form.reset()
    clearInterval(timer1)
}

function store() {
    let elem = "a";
    if(sessionStorage.getItem("Individual")==" "){
        sessionStorage.setItem("Individual", elem)
    }
    else{
        let individual = sessionStorage.getItem("Individual").split(",")
        individual.push(elem);
        sessionStorage.setItem("Individual", individual)
    }
    console.log(sessionStorage)
    storeAnzeigen()
    
}

