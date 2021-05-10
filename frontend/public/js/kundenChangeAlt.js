const form = document.getElementById("form");

function ids() {
  let a = document.cookie;
  console.log(a);
  let id = Number(a.substr(3, 4));
  deleteCookie("kc");
  return id;
}

var sexW = false;
var plzW = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit");
});

function sendData() {
  //prototype
  document.getElementById("b1").style.display = "none";
  document.getElementById("b2").style.display = "block";
  check();
  if (sexW && plzW) {
    neuSetzen();
    document.forms.form.submit();
  } else {
    inhaltSetzen();
  }
}

function changeData() {
  document.getElementById("b1").style.display = "block";
  document.getElementById("b2").style.display = "none";
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

//prototyp

var email = sessionStorage.getItem("email");
//console.log(email)
var username = sessionStorage.getItem("username");
var anrede = sessionStorage.getItem("anrede");
var vorname = sessionStorage.getItem("vorname");
var nachname = sessionStorage.getItem("nachname");
var geb = sessionStorage.getItem("geb");
//console.log(geb)
var plz = sessionStorage.getItem("plz");
var stadt = sessionStorage.getItem("stadt");
var strasse = sessionStorage.getItem("strasse");
var hausnr = sessionStorage.getItem("hausnr");
function inhaltSetzen() {
  if (anrede == "Herr") {
    document.getElementById("Herr").checked = true;
  } else {
    document.getElementById("Frau").checked = true;
  }
  document.getElementById("email").value = email;
  document.getElementById("username").value = username;
  document.getElementById("pass1").value = "asdf";
  document.getElementById("pass2").value = "asdf";
  document.getElementById("vorname").value = vorname;
  document.getElementById("nachname").value = nachname;
  document.getElementById("geb").value = geb;
  document.getElementById("plz").value = plz;
  document.getElementById("stadt").value = stadt;
  document.getElementById("straße").value = strasse;
  document.getElementById("hausnr").value = hausnr;
  hideButton(0);
}

function neuSetzen() {
  if (document.getElementById("Herr").checked == true) {
    anrede = "Herr";
  } else {
    anrede = "Frau";
  }
  email = document.getElementById("email").value;
  username = document.getElementById("username").value;
  vorname = document.getElementById("vorname").value;
  nachname = document.getElementById("nachname").value;
  geb = document.getElementById("geb").value;
  plz = document.getElementById("plz").value;
  stadt = document.getElementById("stadt").value;
  strasse = document.getElementById("straße").value;
  hausnr = document.getElementById("hausnr").value;

  sessionStorage.setItem("email", email);
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("anrede", anrede);
  sessionStorage.setItem("vorname", vorname);
  sessionStorage.setItem("nachname", nachname);
  sessionStorage.setItem("geb", geb);
  sessionStorage.setItem("plz", plz);
  sessionStorage.setItem("stadt", stadt);
  sessionStorage.setItem("strasse", strasse);
  sessionStorage.setItem("hausnr", hausnr);

  hideButton(0);
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

function check() {
  checkSex();
  checkPlz();
  checkUser();
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

function checkUser() {
  //nicht im prototype
}

inhaltSetzen();
