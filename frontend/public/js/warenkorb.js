//Test
/*
var st="null,1,1,1,1,1"
sessionStorage.setItem("regular", st)
sessionStorage.setItem("individuel",st)
*/

//wirklich
var zahl = 0;
const pathReg = "http://localhost:3000/warenkorb/api/reg";
const pathIndi = "http://localhost:3000/warenkorb/api/indi";

getRequest(pathReg, setzenWarenkorbReg);

function checkAmmount(counterID, elem) {
  console.log("checkAmmount");
  console.log("der Onchange hat funktioniert!!!!");
  console.log(counterID);
  console.log(elem);
  let value = document.getElementById(counterID).value;
  //console.log(document.getElementById(counterID.toString()));
  if (value > 0) {
    setValue(value, elem);
    addsumm();
  } else {
    value = 1;
    addsumm();
  }
}

function setValue(value, id) {
  let d = id.substring(0, 6);
  let idPro = id.substring(6, 50);
  console.log(d);
  console.log(idPro);
  if (d == "reElem") {
    let result = [];
    let e = sessionStorage.getItem("regular");
    console.log(e);
    let pro = e.split(",");
    for (let i = 0; i < pro.length; i++) {
      let ids = pro[i].substr(0, 4);
      if (Number(ids) == Number(idPro)) {
        let t = "";
        if (idPro < 10) {
          t += "000" + idPro;
        } else if (idPro < 100) {
          t += "00" + idPro;
        } else if (idPro < 1000) {
          t += "0" + idPro;
        } else {
          t += idPro;
        }
        t += value;
        result.push(t);
      } else {
        result.push(pro[i]);
      }
    }

    sessionStorage.setItem("regular", result);

    console.log(sessionStorage);
  } else {
    console.log("indi");
    let result = [];
    let e = sessionStorage.getItem("Individual");
    let pro = e.split(",");
    for (let i = 0; i < pro.length; i++) {
      let ids = pro[i];
      console.log(ids);
      if (ids == idPro) {
        let t = "" + idPro.substring(0, idPro.length - 1) + value;
        let r = "" + d + t;
        document.getElementById(id).setAttribute("id", r);
        result.push(t);
      } else {
        result.push(pro[i]);
      }
    }

    sessionStorage.setItem("Individual", result);
  }

  console.log(sessionStorage);
}

function addsumm() {
  console.log("addsum Funktion");
  let sum = document.getElementById("sum");
  let mehr = document.getElementById("mehr");
  let gesamt = document.getElementById("gesamt");
  let a = document.getElementsByClassName("preis");
  console.log(a);
  let ammountCounter = document.getElementsByClassName("menge");
  //console.log("ammountCounter: " + ammountCounter[0].value); //Anzahl Kuchen im Warenkorb

  let wert = 0;
  for (let i = 0; i < a.length; i++) {
    //die Werte aufsummieren
    let d = a[i].innerHTML.substring(0, 4);
    console.log(d);
    let counterNumber = ammountCounter[i].value;
    console.log(counterNumber);
    wert = wert + Number(d) * Number(counterNumber);
  }
  console.log("wert: " + wert);
  gesamt.innerHTML = Math.round(wert * 100) / 100 + "€";
  //let steuer = Math.round(wert * 0.07 * 100) / 100;

  sum.innerHTML = Math.round((wert / 1.07) * 100) / 100 + "€";
  mehr.innerHTML =
    Math.round((wert - Math.round(wert / 1.07)) * 100) / 100 + "€";
}

function removeElem(id) {
  console.log("id die gelöscht wird: " + id);
  console.log(id);
  let element = document.getElementById(id);

  element.parentNode.removeChild(element);
  addsumm();

  let d = id.substring(0, 6);
  let idPro = id.substring(6, 50);
  console.log(d);
  console.log(idPro);
  if (d == "reElem") {
    let result = [];
    let e = sessionStorage.getItem("regular");
    console.log(e);
    let pro = e.split(",");
    for (let i = 0; i < pro.length; i++) {
      let ids = pro[i].substr(0, 4);
      if (Number(ids) != Number(idPro)) {
        result.push(pro[i]);
      }
    }

    sessionStorage.setItem("regular", result);

    /*
    if (e.length == 4) {
      sessionStorage.setItem("regular", "undefined");
    } else {
      let s = e.split(",");
      s.pop();
      if (s.length == 0) {
        sessionStorage.setItem("regular", "undefined");
      } else {
        sessionStorage.setItem("regular", s);
      }
    }
    
*/
    console.log(sessionStorage);
  } else {
    console.log("indi");
    let result = [];
    let e = sessionStorage.getItem("Individual");
    let pro = e.split(",");
    for (let i = 0; i < pro.length; i++) {
      let ids = pro[i];
      console.log(ids);
      if (ids != idPro) {
        result.push(pro[i]);
      }
    }

    sessionStorage.setItem("Individual", result);

    /*
    if (e.length == 1) {
      sessionStorage.setItem("Individual", "n");
    } else {
      let s = e.split();
      s.pop();
      if (s.length == 0) {
        sessionStorage.setItem("Individual", "n");
      } else {
        sessionStorage.setItem("Individual", s);
      }
    }
    
*/
    console.log(sessionStorage);
  }

  storeAnzeigen();
}

function sendOn() {
  /*
  let account = document.getElementById("user").innerHTML;
  if (account == "Account") {
    location.href = "/login";
  } else {
    location.href = "/kasse";
  }
  */

  //für test
  location.href = "/kasse";

  /*
  console.log("SendOn Warenkorb zur Kasse");
  console.log(sessionStorage);
  let r = sessionStorage.getItem("regular");
  console.log("regulär: " + r);
  let i = sessionStorage.getItem("Individual");
  console.log("individuell: " + i);

  if ((r == "undefined" && i == "n") || (r == "n" && i == "n")) {
    location.href = "shop.html";
  } else {
    if (sessionStorage.getItem("login") == 1) {
      location.href = "kasse.html";
    } else {
      sessionStorage.setItem("kasse", 1);
      location.href = "login.html";
    }
  }
  */
}

function setzenWarenkorbReg(data) {
  console.log("Funktion: setzenWarenkorb");
  let art = document.getElementById("waren");
  let regular = sessionStorage.getItem("regular");
  var re = []; // Array für reguläre Kuchen

  if (regular != "") {
    re = regular.split(",");
    console.log(re);
  }

  for (let i = 0; i < re.length; i++) {
    let id = Number(re[i].substring(0, 4));
    console.log("id des regulären kuchen: " + id);
    let anzahl = Number(re[i].substring(4, 8));
    console.log(anzahl);
    for (let j = 0; j < data.length; j++) {
      if (data[j].id == id) {
        let elem = "reElem" + id;
        let counterID = "counter" + zahl;
        let a =
          "<tr id='" +
          elem +
          "'>" +
          "<td><img src='" +
          data[j].bilder[0].bildpfad +
          "' alt=''></td>" +
          "<td><p><h4>" +
          data[j].bezeichnung +
          "</h4></p>" +
          "<p>" +
          data[j].beschreibung +
          "</p></td>" +
          "<td>" +
          "<input class='menge' type='number' value='" +
          anzahl +
          "' name='counter' id='" +
          counterID +
          "'  onclick=checkAmmount('" +
          counterID +
          "','" +
          elem +
          "')>" +
          "</td>" +
          "<td><p class='preis'>" +
          data[j].bruttopreis +
          "€</p></td>" +
          "<td><button onclick=removeElem('" +
          elem +
          "')>" +
          "<img src='./img/shoppingCartCancel.png' alt=''></button></td>" +
          "</tr>";
        console.log("counterID: " + counterID);
        console.log("elem: " + elem);
        art.innerHTML += a;

        zahl += 1;
      }
    }
    getRequest(pathIndi, setzenWarenkorbIndi);
  }
} //addet die REGULÄREN kuchen

//fehlrt noch
function setzenWarenkorbIndi(data) {
  console.log(data);
  let art = document.getElementById("waren");
  let indivi = sessionStorage.getItem("Individual");
  if (indivi != "") {
    let indi = indivi.split(",");
    console.log("indi");
    console.log(indi);
    console.log(indi[0]);
    for (let i = 0; i < indi.length; i++) {
      let element = indi[i].split("/");
      let anzahl = element[element.length - 1];
      let kosten = 0;
      let elem = "inElem" + indi[i];
      console.log(elem);
      let counterID = "counter" + zahl;
      let b =
        "<tr id='" +
        elem +
        "' >" +
        "<td><img src='./img/cake-example2.png' alt=''></td>" +
        "<td><p><h4>Individueller Kuchen</h4></p>" +
        "<p>Individueller Kuchen nach Ihrer Konfiguration<br>";

      for (let j = 0; j < element.length - 1; j++) {
        console.log(element);
        let n = Number(element[j]);
        console.log(n);

        for (let k = 0; k < data.length; k++) {
          if (data[k].id == n) {
            console.log("test");
            b += data[k].beschreibung + "<br>";
            kosten += data[k].bruttopreis;
          }
        }
      }

      b +=
        "</p></td>" +
        "<td>" +
        "<input class='menge' type='number'  value='" +
        Number(anzahl) +
        "' name='counter' id='" +
        counterID +
        "' onclick= checkAmmount('" +
        counterID +
        "','" +
        elem +
        "')>" +
        "</td>" +
        "<td><p class='preis'>" +
        kosten +
        "€</p></td>" +
        "<td><button onclick=removeElem('" +
        elem +
        "')><img src='./img/shoppingCartCancel.png' alt=''></button></td>" +
        "</tr>";
      console.log("counterID: " + counterID);

      art.innerHTML += b;

      zahl += 1;
    }
  } //addet die INDIVIDUELLEN kuchen
  addsumm();
}
