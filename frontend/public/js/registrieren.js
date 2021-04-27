const form = document.getElementById("form");
var passW = false;
var sexW = false;
var plzW = false;
var userW = false;
var mailW = false;

const email = document.getElementById("email1");
const username = document.getElementById("username1");
const password1 = document.getElementById("pass1");
const password2 = document.getElementById("pass2");
const anredeH = document.getElementById("herr");
const anredeF = document.getElementById("frau");
const plz = document.getElementById("plz");

function changeRadion(a) {
  if (a == "herr") {
    anredeF.checked = false;
    anredeH.checked = true;
  } else {
    anredeF.checked = true;
    anredeH.checked = false;
  }
}

function checkPlz() {
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
    alert("Die Plz muss aus 5 Zahlen bestehen");
  } else {
    plzW = true;
  }
}

function checkSex() {
  if (anredeH.checked == true || anredeF.checked == true) {
    sexW = true;
  } else {
    alert("Bitte geben Sie ein Geschlecht an");
    sexW = false;
  }
}

function checkPassword() {
  if (password1.value != password2.value) {
    if (password1.value.length < 8) {
      alert(
        "Das Password muss mindestens 8 Zeichen haben und beide Eingaben müssen gleich sein"
      );
    } else {
      alert("Beide Passwörter müssen gleich sein");
    }
    passW = false;
  } else {
    if (password1.value.length < 8) {
      alert("Das Password muss mindestens 8 Zeichen haben");
      passW = false;
    } else {
      passW = true;
    }
  }
}

function checkUser(data) {
  let result = true;
  for (let i = 0; i < data.length; i++) {
    //Bug, von username wird kein Value genommen
    console.log("User: " + data[i].benutzername + " / " + username.value);
    if (data[i].benutzername == username.value) {
      result = false;
      break;
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
  for (let i = 0; i < data.length; i++) {
    //Bug, von Email wird auch kein Value genommen
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
    window.alert("Mail is taken");
    emailW = false;
  }
}

function requestReg() {
  var requestReg = new XMLHttpRequest();
  requestReg.open("GET", "http://localhost:8000/wba2api/benutzer/alle");
  requestReg.onload = function () {
    var data = JSON.parse(requestReg.responseText);
    console.log(data);
    if (data.daten != null) {
      checkUser(data.daten);
      checkMail(data.daten);
    } else {
      console.log(data.fehler);
    }
  };
  requestReg.send();
}

function check() {
  requestReg();
  checkPassword();
  checkPlz();
  checkSex();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  check();
  if (passW && sexW && plzW && userW && mailW) {
    document.form.forms.submit();
  } else {
    passW = false;
    sexW = false;
    plzW = false;
    userW = false;
    mailW = false;
    document.forms.form.reset();
  }
});
