const pathAllgemein = "http://localhost:3000/allgemein";

//init seesionstorage
function initStorage() {
  if (sessionStorage.length === 0) {
    sessionStorage.setItem("regular", "");
    sessionStorage.setItem("Individual", "");
    console.log("init");
  }
}
initStorage();
getRequest(pathAllgemein, setzenHtml);

//Richtig
//
function getRequest(path, func) {
  let request = new XMLHttpRequest();
  request.open("GET", path);
  request.onload = function () {
    console.log(request.responseText);
    let data = JSON.parse(request.responseText);
    console.log(data);
    if (data.daten != null) {
      func(data.daten);
    } else {
      storeAnzeigen();
      console.log(data.fehler);
    }
  };
  request.send();
}

function postRequest(path, data, func = undefined) {
  console.log(data);
  let requestPost = new XMLHttpRequest();
  requestPost.open("POST", path, true);
  requestPost.setRequestHeader("Content-type", "application/json");
  //request.setRequestHeader("Content-Length", data.length);

  requestPost.onload = function () {
    let dataPost = JSON.parse(requestPost.responseText);
    console.log(dataPost);
    if (func != undefined) {
      func(dataPost);
    }
  };

  requestPost.send(data);
}

function setzenHtml(data) {
  console.log(data);
  let waren = document.getElementById("warenkorb");
  let user = document.getElementById("user");
  let shop = document.getElementById("shop");
  let be = data.benutzerrolle.id;
  console.log(be);
  let usernamen = data.benutzername;
  if (be != 1) {
    user.innerHTML = "" + usernamen;
    user.setAttribute("href", "/account");
    console.log("store");
    storeAnzeigen();
  } else if (be == 1) {
    console.log("admin");
    user.innerHTML = "Admin";
    user.setAttribute("href", "/accountAdmin");
    waren.innerHTML = "offene Bestellungen";
    waren.setAttribute("href", "/ausstehendeBestellungen");
    shop.innerHTML = "Kundendaten";
    shop.setAttribute("href", "/kundendaten");
  }
}

function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";path=/";
}

function getCookie() {
  return document.cookie;
}

function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
    let an = 0;
    for (let i = 0; i < proI.length; i++) {
      let a = proI[i].split("/");
      console.log(a);
      an += Number(a[a.length - 1]);
    }
    console.log(an);
    anzahlI = an;
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
