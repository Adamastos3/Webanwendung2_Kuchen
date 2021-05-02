const pathAllgemein =
  "http://localhost:8000/wba2api/benutzer/gib/" + cookies()[0];

//init seesionstorage
if (sessionStorage.length === 0) {
  sessionStorage.setItem("regular", "");
  sessionStorage.setItem("Individual", "");
  console.log("init");
}

getRequest(pathAllgemein, setzenHtml);

//Richtig
//
function getRequest(path, func) {
  var request = new XMLHttpRequest();
  request.open("GET", path);
  request.onload = function () {
    var data = JSON.parse(request.responseText);
    console.log(data);
    if (data.daten != null) {
      func(data.daten);
    } else {
      storeAnzeigen();
      console.log("error, NO Data");
    }
  };
  request.send();
}

function postRequest(path, data) {
  var request = new XMLHttpRequest();
  request.open("POST", path);
  request.setRequestHeader("Content-type", "application/json");
  request.setRequestHeader("Content-Length", data.length);

  request.onload = function () {
    var data = JSON.parse(request.responseText);
    console.log(data);
  };
  request.send(data);
}

function setzenHtml(data) {
  let waren = document.getElementById("warenkorb");
  let user = document.getElementById("user");
  let shop = document.getElementById("shop");
  let be = data.benutzerrolle.id;
  console.log(be);
  let usernamen = data.benutzername;
  if (be == 3) {
    user.innerHTML = "" + usernamen;
  } else if (be == 1) {
    user.innerHTML = "Admin";
    user.setAttribute("href", "/accountAdmin");
    waren.innerHTML = "offene Bestellungen";
    waren.setAttribute("href", "/ausstehendeBestellungen");
    shop.innerHTML = "Kundendaten";
    shop.setAttribute("href", "/kundendaten");
  }
  console.log("store");
  storeAnzeigen();
}

function cookies() {
  console.log(document.cookie);
  let a = document.cookie.split(";");
  let co = 0;
  console.log(a);
  console.log(a[0].substring(0, 2));
  let result = [];

  for (let i = 0; i < a.length; i++) {
    if (i == 0 && co == 0) {
      if (a[i].substring(0, 2) == "KN") {
        console.log("kunde");
        let Wertstart = a[i].indexOf("=") + 1;
        let c = a[i].substring(Wertstart, Wertstart + 4);
        result.push(Number(c));
      } else {
        console.log("kein Kunde");
        result.push(0);
        i--;
      }
      co++;
    } else {
      console.log("else");
      console.log(a[i]);
      let Wertstart = a[i].indexOf("=") + 1;
      let c = a[i].substring(Wertstart, Wertstart + 4);
      result.push(Number(c));
    }
  }
  return result;
}

function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";path=/";
}

//Anzeigem der einkäufe
function storeAnzeigen() {
  console.log(sessionStorage);
  let anzahlR = 0;
  let anzahlI = 0;
  let warenkorb = document.getElementById("warenkorb");
  let regular = sessionStorage.getItem("regular");
  console.log(sessionStorage.getItem("regular"));
  console.log("test");
  let individual = sessionStorage.getItem("Individual");

  if (regular != "") {
    let pro = regular.split(",");
    console.log(pro.length);
    for (let i = 0; i < pro.length; i++) {
      let anzahl = pro[i].substring(4, 8);
      console.log(anzahl);
      anzahlR += Number(anzahl);
    }
  }

  if (individual != "") {
    let proI = individual.split(",");
    anzahlI = proI.length;
  }

  let anzahl = anzahlI + anzahlR;
  if (anzahl > 0) {
    warenkorb.innerHTML = "Warenkorb (" + anzahl + ")";
  } else {
    warenkorb.innerHTML = "Warenkorb";
  }
}

function sendToStart() {
  location.href = "/";
}
