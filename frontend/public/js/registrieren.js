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
const fehler = document.getElementById("Fehler");
const fehlerfeld = document.getElementById("fehlerfeld");

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
}

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
}

function checkUser(data) {
  let result = true;
  if (!data) {
    result = false;
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

  if (!data) {
    result = false;
  }

  if (result) {
    emailW = true;
  } else {
    //window.alert("Mail is taken")
    emailW = false;
  }
}

async function requestReg() {
  return new Promise((resolve, reject) => {
    let daten = JSON.stringify({
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
    });

    var requestReg = new XMLHttpRequest();
    requestReg.open("Post", "http://localhost:3000/registrieren/api");
    requestReg.setRequestHeader("Content-type", "application/json");
    requestReg.onload = function () {
      let data = JSON.parse(requestReg.responseText);

      if (data.user != null) {
        checkUser(data.user);
        checkMail(data.email);
        checkPassword();
        checkPlz();
        //checkSefehler();
        resolve(true);
      } else {
        reject(data.fehler);
      }
    };
    requestReg.send(daten);
  });
}

async function check() {
  return await requestReg();
}

function druckFehler() {
  let text = "";
  if (!emailW) {
    text += "Mail is taken \n";
  }
  if (!userW) {
    text += "Username is taken \n";
  }
  if (!passW) {
    text +=
      "Das Password muss mindestens 8 Zeichen haben\n" +
      "Das Password muss mindestens 8 Zeichen haben und beide Eingaben müssen gleich sein \n" +
      "Beide Passwörter müssen gleich sein \n";
  }
  if (!plzW) {
    text += "Die Plz muss aus 5 Zahlen bestehen";
  }

  alert(text);
}

async function sendOnReg() {
  const a = await check();

  if (a && passW && plzW && userW && emailW) {
    let path = "http://localhost:3000/registrieren";
    let data = JSON.stringify({
      email: email.value,
      username: username.value,
      pass: password1.value,
      anrede: checkSex(),
      vorname: document.getElementById("vorname").value,
      nachname: document.getElementById("nachname").value,
      geb: document.getElementById("geb").value,
      plz: plz.value,
      stadt: document.getElementById("stadt").value,
      strasse: document.getElementById("strasse").value,
      hausnr: document.getElementById("hausnr").value,
    });

    let b = await postRequest(path, data, requestServer);
  } else {
    druckFehler();
    passW = false;
    plzW = false;
    userW = false;
    mailW = false;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function checkSex() {
  if (anredeH.checked) {
    return "Herr";
  } else {
    return "Frau";
  }
}

function requestServer(data) {
  let fehler = data.fehler;
  console.log(fehler);
  if (fehler == null) {
    location.href = "/login";
  } else {
    let text = "";
    for (let i = 0; i < fehler.length; i++) {
      text += fehler[i].bezeichnung + "\n";
    }
    alert(text);
  }
}
