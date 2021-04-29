const form = document.getElementById("form");
const pathIhreDaten = "http://localhost:8000/wba2api/benutzer/gib/" + cookies();
var sexW = false;
var plzW = false;
var userW = false;
var emailW = false;
var feldW=false;

function HTMLIhreDatenSetzen(data) {
  let person = data.person;

  if (person.anrede == "Herr") {
    document.getElementById("Herr").checked = true;
  } else {
    document.getElementById("Frau").checked = true;
  }
  document.getElementById("email").value = person.email;
  document.getElementById("username").value = data.benutzername;
  document.getElementById("vorname").value = person.vorname;
  document.getElementById("nachname").value = person.nachname;

  //Geb
  document.getElementById("geb").setAttribute("type", "text")
  document.getElementById("geb").value = person.geburtstag;


  document.getElementById("plz").value = person.adresse.plz;
  document.getElementById("stadt").value = person.adresse.ort;
  document.getElementById("strasse").value = person.adresse.strasse;
  document.getElementById("hausnummer").value = person.adresse.hausnummer;
  hideButton(0);
}

function hideButton(id) {
  function hide(x){
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  if (id == 0) {
    let x = document.getElementById("b1")
    hide(x)
    
  }
  else{
    let x = document.getElementById("b1")
    let y = document.getElementById("b2")
    hide(y)
    hide(x)
  }
}

function changeRadion(a) {
  if (a == "Herr") {
    document.getElementById("Frau").checked = false;
    document.getElementById("Herr").checked = true;
  } else {
    document.getElementById("Frau").checked = true;
    document.getElementById("Herr").checked = false;
  }
}

function changeElem(id) {
  let a = document.getElementById(id);
  a.removeAttribute("readonly");
  if (id != "Herr" && id != "Frau") {
    a.value = "";
  } else {
    a.checked = false;
    document.getElementById("Frau").checked = false;
  }
  hideButton(0);
}

function checkPlz() {
  var array = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  var alertCode = 1;
  var plz1 = document.getElementById("plz").value;
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
    alert("Die Plz muss aus 5 Zahlen bestehen");
  } else {
    plzW = true;
  }
}

function checkSex() {
  if (
    document.getElementById("Frau").checked == true ||
    document.getElementById("Herr").checked == true
  ) {
    sexW = true;
  } else {
    alert("Bitte geben Sie ein Geschlecht an");
    sexW = false;
  }
}

function checkUser(data) {
  let result = true;
  let id = cookies();
  for (let i = 0; i < data.length; i++) {
    if (data[i].id != id) {
      console.log(document.getElementById("username").value)
      console.log(data[i].benutzername)
      if (data[i].benutzername == document.getElementById("username").value) {
        result = false;
        break;
      }
    }
  }
  if (result) {
    userW = true;
  } else {
    console.log("falsche User")
    userW = false;
  }
}

function checkMail(data) {
  let result = true;
  let id = cookies();
  console.log("id"+ id)
  for (let i = 0; i < data.length; i++) {
    if (data[i].id != id) {
      if (data[i].person != null) {
        if (data[i].person.email == document.getElementById("email").value) {
          result = false;
          break;
        }
      }
    }
  }

  if (result) {
    emailW = true;
  } else {
    emailW = false;
  }
}


function checkFields(){
  let result=true;
  if(document.getElementById("email").value==""){
    result=false;
  }
   if(document.getElementById("username").value==""){
    result=false;
  }

  console.log("Vorname ist "+ typeof(document.getElementById("vorname").value))
   if(document.getElementById("vorname").value==""){
    result=false;
  }
   if(document.getElementById("nachname").value==""){
    result=false;
  }
    if(document.getElementById("geb").value==""){
    result=false;
  }
    if(document.getElementById("strasse").value==""){
    result=false;
  }
    if(document.getElementById("stadt").value==""){
    result=false;
  }
    if(document.getElementById("hausnummer").value==""){
    result=false;
  }
    if(document.getElementById("plz").value==""){
    result=false;
  }
  
  if (result){
    feldW=true;
  }
  else{
    feldW=false;
  }

}




async function requestUserMail() {
  return new Promise((resolve, reject) =>{
    var requestUser = new XMLHttpRequest();
  requestUser.open("GET", "http://localhost:8000/wba2api/benutzer/alle");
  requestUser.onload = function () {
    var data = JSON.parse(requestUser.responseText);
    console.log(data);
    if (data.daten != null) {
      checkUser(data.daten);
      checkMail(data.daten);
      checkPlz()
      checkSex()
      checkFields()
      resolve(true)
    } else {
      reject(data.fehler);
    }
  };
  requestUser.send();
});
}

async function sendData() {
  const a = await requestUserMail();
  console.log("a ist "+a)
  if (a && sexW && plzW && userW && emailW && feldW) {
    console.log("submit");
    document.forms.form.submit();
  } else {
    console.log("refresh");
    druckFehler()
    sexW = false;
    plzW = false;
    userW = false;
    emailW = false;
    feldW=false;
    
  }
}

function changeData(){
  hideButton(1);
  document.getElementById("Herr").removeAttribute("readonly")
  document.getElementById("Frau").removeAttribute("readonly")
  document.getElementById("email").removeAttribute("readonly")
  document.getElementById("username").removeAttribute("readonly")
  document.getElementById("vorname").removeAttribute("readonly")
  document.getElementById("nachname").removeAttribute("readonly")
  


  //Geb
  document.getElementById("geb").removeAttribute("readonly")
  document.getElementById("geb").setAttribute("onclick", "gebChange()")


  document.getElementById("plz").removeAttribute("readonly")
  document.getElementById("stadt").removeAttribute("readonly")
  document.getElementById("strasse").removeAttribute("readonly")
  document.getElementById("hausnummer").removeAttribute("readonly")
 

}

function gebChange(){
  document.getElementById("geb").removeAttribute("onclick")
  document.getElementById("geb").setAttribute("type", "date")
}

function druckFehler(){
  let text="";
  if(!emailW){
    text+="Mail is taken \n"
  }
  if(!userW){
    text+="Username is taken \n"
  }
  if(!plzW){
    text+="Die Plz muss aus 5 Zahlen bestehen\n"
  }

  if(!sexW){
    text+= "Bitte wählen Sie ein Geschlecht\n"
  }

  if(!feldW){
    text+= "Bitte füllen Sie alle Felder aus"
  }

  alert(text);
  

}

//ausführen

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  
});

getRequest(pathIhreDaten, HTMLIhreDatenSetzen);
