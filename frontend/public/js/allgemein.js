const pathAllgemein = "http://localhost:3000/allgemein";

//init seesionstorage
function initStorage() {
  if (sessionStorage.length === 0) {
    sessionStorage.setItem("regular", "");
    sessionStorage.setItem("Individual", "");
  }
}
initStorage();
getRequest(pathAllgemein, setzenHtml);

//Richtig
//
function getRequest(path, func, info = undefined) {
  let request = new XMLHttpRequest();
  request.open("GET", path);
  request.onload = function () {
    let data = JSON.parse(request.responseText);

    if (data.daten != null) {
      if (info == undefined) {
        func(data.daten);
      } else {
        func(data.daten, info);
      }
    } else {
      storeAnzeigen();
    }
  };
  request.send();
}

function postRequest(path, data, func = undefined) {
  let requestPost = new XMLHttpRequest();
  requestPost.open("POST", path, true);
  requestPost.setRequestHeader("Content-type", "application/json");
  //request.setRequestHeader("Content-Length", data.length);

  requestPost.onload = function () {
    let dataPost = JSON.parse(requestPost.responseText);
    if (func != undefined) {
      func(dataPost);
    }
  };

  requestPost.send(data);
}

function putRequest(path, data, func = undefined) {
  console.log(path);
  console.log(data);
  let requestPost = new XMLHttpRequest();
  requestPost.open("PUT", path, true);
  requestPost.setRequestHeader("Content-type", "application/json");
  //request.setRequestHeader("Content-Length", data.length);

  requestPost.onload = function () {
    let dataPost = JSON.parse(requestPost.responseText);
    if (func != undefined) {
      func(dataPost);
    }
  };

  requestPost.send(data);
}

function setzenHtml(data) {
  let waren = document.getElementById("warenkorb");
  let user = document.getElementById("user");
  let shop = document.getElementById("shop");
  let be = data.benutzerrolle.id;
  let usernamen = data.benutzername;
  if (be == 3) {
    user.innerHTML = "" + usernamen;
    user.setAttribute("href", "/account");
    setWarenkorb(data);
  } else if (be == 2) {
    user.innerHTML = "" + usernamen;
    user.setAttribute("href", "/accountMitarbeiter");
    waren.innerHTML = "offene Bestellungen";
    waren.setAttribute("href", "/ausstehendeBestellungen");
    shop.innerHTML = "Ihre Daten";
    shop.setAttribute("href", "/ihreDatenMitarbeiter");
  } else if (be == 1) {
    user.innerHTML = "Admin";
    user.setAttribute("href", "/accountAdmin");
    waren.innerHTML = "offene Bestellungen";
    waren.setAttribute("href", "/ausstehendeBestellungen");
    shop.innerHTML = "Kundendaten";
    shop.setAttribute("href", "/kundendaten");
  } else {
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
  let anzahlR = 0;
  let anzahlI = 0;
  let warenkorb = document.getElementById("warenkorb");
  let regular = sessionStorage.getItem("regular");
  let individual = sessionStorage.getItem("Individual");

  if (regular != "") {
    let pro = regular.split(",");

    for (let i = 0; i < pro.length; i++) {
      let anzahl = pro[i].substring(4, 8);

      anzahlR += Number(anzahl);
    }
  }

  if (individual != "") {
    let proI = individual.split(",");
    let an = 0;
    for (let i = 0; i < proI.length; i++) {
      let a = proI[i].split("/");
      an += Number(a[a.length - 1]);
    }

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

function setWarenkorb(data) {
  let re = sessionStorage.getItem("regular");
  let indi = sessionStorage.getItem("Individual");
  let benutzername = data.benutzername;
  let path = "http://localhost:3000/allgemein/warenkorb/";

  if (re == "" && indi == "") {
    if (benutzername != undefined) {
      getRequest(path, setWarenkorbSession);
    }
  }
  storeAnzeigen();
}

function setWarenkorbSession(daten) {
  let wareen = daten.warenkorb.split("-");
  sessionStorage.setItem("regular", wareen[0]);
  sessionStorage.setItem("Individual", wareen[1]);
  storeAnzeigen();
}

function setPreis(preis) {
  let pf = Math.round(Number(preis) * 100) / 100;

  let r = "" + pf;
  let rf = r.split(".");

  if (rf[1] != undefined) {
    if (rf[1] < 10 && rf[1].length < 2) {
      let result = "" + rf[0] + "," + rf[1] + "0";
      return result;
    } else {
      let result = "" + rf[0] + "," + rf[1];
      return result;
    }
  } else {
    let result = "" + rf[0] + ",00";
    return result;
  }
}

function changePreis(preis) {
  let p = preis.split(",");
  let pr = "";
  if (p[1] == undefined) {
    pr += p[0] + ".00";
  } else {
    pr += p[0] + "." + p[1];
  }

  return Number(pr);
}
