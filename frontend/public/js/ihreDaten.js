const form = document.getElementById("form");
const pathIhreDaten = "http://localhost:3000/ihreDaten/api";
const pathPostIhreDaten = "http://localhost:3000/ihreDaten";
var sexW = false;
var plzW = false;
var userW = false;
var emailW = false;
var feldW = false;
var gebW = false;

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
  document.getElementById("geb").setAttribute("type", "text");
  document.getElementById("geb").value = person.geburtstag;

  document.getElementById("plz").value = person.adresse.plz;
  document.getElementById("stadt").value = person.adresse.ort;
  document.getElementById("strasse").value = person.adresse.strasse;
  document.getElementById("hausnummer").value = person.adresse.hausnummer;
  hideButton(0);
}

function hideButton(id) {
  /*
  function hide(x) {
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  */

  if (id == 0) {
    document.getElementById("b2").style.display = "block";
    document.getElementById("b1").style.display = "none";
  } else {
    document.getElementById("b1").style.display = "block";
    document.getElementById("b2").style.display = "none";
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
  //console.log(id);
  let a = document.getElementById(id);
  //console.log(a);
  // console.log(a.getAttributeNames());
  if (!a.getAttributeNames().includes("readonly")) {
    if (id != "Herr" && id != "Frau") {
      a.value = "";
    } else {
      if (id == "Herr") {
        document.getElementById("Frau").checked = false;
      } else {
        document.getElementById("Herr").checked = false;
      }
      a.checked = true;
    }
    hideButton(0);
  } else {
    if (id == "Herr") {
      if (!document.getElementById("Herr").checked) {
        document.getElementById("Frau").checked = true;
        a.checked = false;
      }
    } else {
      if (!document.getElementById("Frau").checked)
        document.getElementById("Herr").checked = true;
      a.checked = false;
    }
  }
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
    //alert("Die Plz muss aus 5 Zahlen bestehen");
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
    //alert("Bitte geben Sie ein Geschlecht an");
    sexW = false;
  }
}

function setSex() {
  if (document.getElementById("Herr").checked) {
    return "Herr";
  } else {
    return "Frau";
  }
}

function checkUser(data) {
  let result = true;
  if (!data) {
    result = false;
  }
  if (result) {
    userW = true;
    12345;
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

function checkFields() {
  let result = true;
  if (document.getElementById("email").value == "") {
    result = false;
  }
  if (document.getElementById("username").value == "") {
    result = false;
  }

  if (document.getElementById("vorname").value == "") {
    result = false;
  }
  if (document.getElementById("nachname").value == "") {
    result = false;
  }
  if (document.getElementById("geb").value == "") {
    result = false;
  }
  if (document.getElementById("strasse").value == "") {
    result = false;
  }
  if (document.getElementById("stadt").value == "") {
    result = false;
  }
  if (document.getElementById("hausnummer").value == "") {
    result = false;
  }
  if (document.getElementById("plz").value == "") {
    result = false;
  }

  if (result) {
    feldW = true;
  } else {
    feldW = false;
  }
}

function checkDatum() {
  let elem = document.getElementById("geb");
  if (elem.value == "") {
    //alert("Datum ist nicht eingef??gt");
    gebW = false;
  } else {
    let now = new Date();
    let datum = new Date(elem.value);
    if (now - datum <= 0) {
      //alert("Datum muss in der Vergangenheit liegen");
      gebW = false;
    } else {
      gebW = true;
    }
  }
}

async function requestUserMail() {
  return new Promise((resolve, reject) => {
    let daten = JSON.stringify({
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
    });
    let requestUser = new XMLHttpRequest();
    requestUser.open("Post", "http://localhost:3000/ihreDaten/api");
    requestUser.setRequestHeader("Content-type", "application/json");
    requestUser.onload = function () {
      var data = JSON.parse(requestUser.responseText);

      if (data.user != null) {
        checkUser(data.user);
        checkMail(data.email);
        checkPlz();
        checkSex();
        checkDatum();
        checkFields();
        resolve(true);
      } else {
        reject(data.fehler);
      }
    };
    requestUser.send(daten);
  });
}

async function sendData() {
  const a = await requestUserMail();

  if (a && sexW && plzW && userW && emailW && feldW && gebW) {
    let daten = JSON.stringify({
      email: document.getElementById("email").value,
      username: document.getElementById("username").value,
      anrede: setSex(),
      vorname: document.getElementById("vorname").value,
      nachname: document.getElementById("nachname").value,
      geb: setGeb(),
      plz: document.getElementById("plz").value,
      stadt: document.getElementById("stadt").value,
      strasse: document.getElementById("strasse").value,
      hausnr: document.getElementById("hausnummer").value,
    });

    //console.log(daten);

    let b = await postRequest(pathPostIhreDaten, daten, aendernData);
  } else {
    druckFehler();
    sexW = false;
    plzW = false;
    userW = false;
    emailW = false;
    gebW = false;
    feldW = false;
  }
}

function changeData() {
  hideButton(1);
  document.getElementById("Herr").removeAttribute("readonly");
  document.getElementById("Frau").removeAttribute("readonly");
  document.getElementById("email").removeAttribute("readonly");
  document.getElementById("username").removeAttribute("readonly");
  document.getElementById("vorname").removeAttribute("readonly");
  document.getElementById("nachname").removeAttribute("readonly");

  //Geb
  document.getElementById("geb").removeAttribute("readonly");
  document.getElementById("geb").setAttribute("onclick", "gebChange()");

  document.getElementById("plz").removeAttribute("readonly");
  document.getElementById("stadt").removeAttribute("readonly");
  document.getElementById("strasse").removeAttribute("readonly");
  document.getElementById("hausnummer").removeAttribute("readonly");
}

function gebChange() {
  document.getElementById("geb").removeAttribute("onclick");
  document.getElementById("geb").setAttribute("type", "date");
}

function druckFehler() {
  let text = "";
  if (!emailW) {
    text += "Mail is taken \n";
  }
  if (!userW) {
    text += "Username is taken \n";
  }
  if (!plzW) {
    text += "Die Plz muss aus 5 Zahlen bestehen\n";
  }

  if (!sexW) {
    text += "Bitte w??hlen Sie ein Geschlecht\n";
  }
  if (!gebW) {
    text += "Datum muss in der Vergangenheit liegen \n";
  }

  if (!feldW) {
    text += "Bitte f??llen Sie alle Felder aus";
  }

  alert(text);
}

function aendernData(daten) {
  let fehler = daten.fehler;
  //console.log("fehler");
  //console.log(fehler);
  if (fehler == null) {
    getRequest(pathIhreDaten, HTMLIhreDatenSetzen);
  } else {
    let text = "";
    for (let i = 0; i < fehler.length; i++) {
      for (let j = 0; j < fehler[i].length; j++)
        text += fehler[i][j].bezeichnung + "\n";
    }
    alert(text);
  }
}

function setGeb() {
  let x = document.getElementById("geb").value;
  let ar = x.split("-");
  let result = "" + ar[2] + "-" + ar[1] + "-" + ar[0];
  return result;
}

//ausf??hren

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

getRequest(pathIhreDaten, HTMLIhreDatenSetzen);
