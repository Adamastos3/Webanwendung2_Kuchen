const form = document.getElementById("form");
var passW = false;
var plzW = false;
var userW = false;
var mailW = false;

let email = document.getElementById("email");
let username = document.getElementById("username");
const password1 = document.getElementById("pass1");
const password2 = document.getElementById("pass2");
const anredeH = document.getElementById("Herr");
const anredeF = document.getElementById("Frau");
const plz = document.getElementById("plz");
const fehler= document.getElementById("Fehler")
const fehlerfeld= document.getElementById("fehlerfeld")


function changeRadion(a) {
  if (a == "Herr") {
    anredeF.checked = false;
    anredeH.checked = true;
  } else {
    anredeF.checked = true;
    anredeH.checked = false;
  }
}

 async function checkPlz() {
  var array = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  var alertCode = 1;
  var plz1 = plz.value;
  if (plz1.length == 5) {
    for (var i = 0; i < plz.length; i++) {
      if (!array.includes(plz[i])) {
        alertCode = 0;
        plzW = false;
      }
    }
  } else {
    alertCode = 0;
  }
  if (alertCode < 1) {
    //alert("Die Plz muss aus 5 Zahlen bestehen");
  } else {
    plzW = true;
  }

  console.log("plz")
}
/*
function checkSefehler() {
  if (anredeH.checked == true || anredeF.checked == true) {
    sexW = true;
  } else {
    alert("Bitte geben Sie ein Geschlecht an");
    sexW = false;
  }

  console.log("sefehler")
}
*/

function checkPassword() {
  if (password1.value != password2.value) {
    if (password1.value.length < 8) {
      //alert("Das Password muss mindestens 8 Zeichen haben und beide Eingaben müssen gleich sein");
    } else {
      //alert("Beide Passwörter müssen gleich sein");
    }
    passW = false;
  } else {
    if (password1.value.length < 8) {
      //alert("Das Password muss mindestens 8 Zeichen haben");
      passW = false;
    } else {
      passW = true;
    }
  }

  console.log("passwort")
}


function checkUser(data) {
  let result = true;
  for (let i = 0; i < data.length; i++) {
    //Bug, von username wird kein Value genommen
    console.log(user)
    //console.log(typeof(user.value))
    console.log("User: " + data[i].benutzername + " / " + username.value);
    if (data[i].benutzername == username.value) {
      result = false;
      break;
    }
  }
  if (result) {
    userW = true;
  } else {
    //window.alert("Username is taken");
    userW = false;
  }
}

function checkMail(data) {
  let result = true;
  for (let i = 0; i < data.length; i++) {
    //Bug, von Email wird auch kein Value genommen
    console.log(email)
    console.log("person: " + data[i].person + " / " + email.value);
    if (data[i].person != null) {
      console.log(data[i].person);
      if (data[i].person.email == email.value) {
        result = false;
        break;
      }
    }
  }

  if (result) {
    emailW = true;
  } else {
    //window.alert("Mail is taken")
    emailW = false;
  }
}

async function requestReg() {
  return new Promise((resolve, reject) =>{
    var requestReg = new XMLHttpRequest();
    requestReg.open("GET", "http://localhost:8000/wba2api/benutzer/alle");
    requestReg.onload = function () {
      var data = JSON.parse(requestReg.responseText);
      console.log(data);
      if (data.daten != null) {
        checkUser(data.daten);
        checkMail(data.daten);
        checkPassword();
        checkPlz();
        //checkSefehler();
        resolve(true);

      } else {
        reject(data.fehler);
      }
    };
    requestReg.send();
});
}

async function check() {
  return await requestReg();
  
  
}

function druckFehler(){
  let text="";
  if(!emailW){
    text+="Mail is taken \n"
  }
  if(!userW){
    text+="Username is taken \n"
  }
  if(!passW){
    text+="Das Password muss mindestens 8 Zeichen haben\n"+
      "Das Password muss mindestens 8 Zeichen haben und beide Eingaben müssen gleich sein \n"+
      "Beide Passwörter müssen gleich sein \n"

  }
  if(!plzW){
    text+="Die Plz muss aus 5 Zahlen bestehen"
  }

  alert(text);
  

}


async function sendOnReg(){
  const a= await check()

  console.log("a ist "+ a)
    if (a && passW && plzW && userW && emailW) {
      console.log("submit")
      document.forms.form.submit();
  } else {
    druckFehler()
    passW = false;
    plzW = false;
    userW = false;
    mailW = false;
    console.log("reset")
    document.forms.form.reset();
    
  }

}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

