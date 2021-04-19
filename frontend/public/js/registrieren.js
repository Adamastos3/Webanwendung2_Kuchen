const form = document.getElementById("form");
var passW=false;
var sexW=false
var plzW=false

var email= document.getElementById("email")
var username= document.getElementById("username")
var password1= document.getElementById("pass1")
var password2= document.getElementById("pass2")
var anredeH= document.getElementById("herr")
var anredeF= document.getElementById("frau")
var plz= document.getElementById("plz")
var vorname= document.getElementById("vorname")
var nachname= document.getElementById("nachname")
var stadt= document.getElementById("stadt")
var straße= document.getElementById("straße")
var geb= document.getElementById("geb")
var hausnr= document.getElementById("hausnr")



//Prototype
/*
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    document.forms.formular.submit();
    location.href="/login"
    /*
    check()
    if(passW &&  sexW && plzW) {
        document.forms.formular.submit();
    }
    
})
*/

function changeRadion(a){
    if (a =="herr") {
        anredeF.checked=false;
        anredeH.checked=true;
    }
    else{
        anredeF.checked=true;
        anredeH.checked=false;
    }
}

function check(){
    checkPassword()
    checkSex()
    checkPlz()
    checkUser()
    resetForm()
}


function checkPlz(){
    var array=["1","2","3","4","5","6","7","8","9","0"]
    var alertCode=1
    var plz1=plz.value
    if(plz1.length==5){
        for (var i=0;i<plz.length;i++){
            if (!array.includes(plz[i])){
                alertCode=0
                plzW=false
            }
        }
    }
    else{
        alertCode=0
    }
    if(alertCode<1){
        alert("Die Plz muss aus 5 Zahlen bestehen")
    }else{
        plzW=true
    }
    
}

function checkSex(){

    if ((anredeH.checked==true) || (anredeF.checked==true)){
        sexW=true
    }
    else{
        alert("Bitte geben Sie ein Geschlecht an")
        sexW=false
    }
}

function checkPassword() {

    if(password1.value != password2.value) {
        if (password1.value.length < 8){
            alert("Das Password muss mindestens 8 Zeichen haben und beide Eingaben müssen gleich sein")
        }
        else{
            alert("Beide Passwörter müssen gleich sein")
        }
        passW=false

    }
    else {
        if (password1.value.length < 8){
            alert("Das Password muss mindestens 8 Zeichen haben")
            passW=false
        }
        else{
            passW=true
        }
    }
}

function checkUser(){
    //nicht im prototype
}


function resetForm(){

    var emailV= email.value;
    var usernameV= username.value;
    var password1V= password1.value;
    var password2V= password2.value;
    var anredeHV= anredeH.value;
    var plzV= plz.value;
    var vornameV= vorname.value;
    var nachnameV= nachname.value;
    var stadtV= stadt.value;
    var straßeV= straße.value;
    var gebV= geb.value;
    var hausnrV= hausnr.value;

    document.forms.formular.reset();
    email.value=emailV
    username.value=usernameV
    vorname.value=vornameV
    nachname.value=nachnameV
    stadt.value=stadtV
    straße.value=straßeV
    hausnr.value=hausnrV
    geb.value=gebV
    if(passW){
        password1.value=password1V
        password2.value=password2V
    }
    if(plzW){
        plz.value=plzV
    }
    if(sexW){
        if(anredeHV.checked==true){
            anredeH.checked=true
        }
        else{
            anredeF.checked=true
        }
    }


}