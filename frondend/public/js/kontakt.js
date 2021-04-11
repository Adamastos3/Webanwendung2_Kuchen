const form = document.getElementById("form")

//prototyp
form.addEventListener("submit", (e)=>{
    
    e.preventDefault();
    sendOn()
})

function changeRadion(a){
    if (a =="Herr") {
        document.getElementById("Frau").checked=false;
        document.getElementById("Herr").checked=true;
    }
    else{
        document.getElementById("Frau").checked=true;
        document.getElementById("Herr").checked=false;
    }
}

function sendOn(){
    window.alert("Danke, dass Sie uns kontaktiert haben")
    
    location.href="start.html"
}


