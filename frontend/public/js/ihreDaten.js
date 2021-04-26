const form = document.getElementById("form");
const pathIhreDaten = "http://localhost:8000/wba2api/benutzer/gib/" + cookies();
var sexW = false;
var plzW = false;
var userW = false;
var mailW = false;

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
  document.getElementById("geb").value = person.geburtstag;
  document.getElementById("plz").value = person.adresse.plz;
  document.getElementById("stadt").value = person.adresse.stadt;
  document.getElementById("straße").value = person.adresse.strasse;
  document.getElementById("hausnr").value = person.adresse.hausnummer;
  hideButton(0);
}

function hideButton(id) {
  var x = document.getElementById("b1");
  if (id == 0) {
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
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
      if (data[i].username == document.getElementById("username")) {
        result = false;
        break;
      }
    }
  }
  if (result) {
    userlW = true;
  } else {
    window.alert("Username is taken");
    userlW = false;
  }
}

function checkMail(data) {
  let result = true;
  let id = cookies();
  for (let i = 0; i < data.length; i++) {
    if (data[i].id != id) {
      if (data[i].person != null) {
        if (data[i].person.email == document.getElementById("email")) {
          result = false;
          break;
        }
      } else {
        result = false;
      }
    }
  }

  if (result) {
    emailW = true;
  } else {
    window.alert("Mail is taken");
    emailW = false;
  }
}

function requesUserMail() {
  var requestUser = new XMLHttpRequest();
  requestUser.open("GET", "http://localhost:8000/wba2api/benutzer/alle");
  requestUser.onload = function () {
    var data = JSON.parse(request.responseText);
    console.log(data);
    if (data.daten != null) {
      checkUser(data.daten);
      checkMail();
    } else {
      console.log(data.fehler);
    }
  };
  requestUser.send();
}

function check() {
  checkSex();
  checkPlz();
  requestUserMail();
}

function sendData() {
  check();
  if (sexW && plzW && userW && mailW) {
    document.forms.form.submit();
  } else {
    requestIhreDaten();
  }
}

//ausführen

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData();
  console.log("submit");
});

getRequest(pathIhreDaten, HTMLIhreDatenSetzen);
