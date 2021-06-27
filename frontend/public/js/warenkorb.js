//wirklich
var zahl = 0;
const pathReg = "http://localhost:3000/warenkorb/api/reg";
const pathIndi = "http://localhost:3000/warenkorb/api/indi";

getRequest(pathReg, setzenWarenkorbReg);
getRequest(pathIndi, setzenWarenkorbIndi);

function checkAmmount(counterID, elem) {
  let value = document.getElementById(counterID).value;

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

  if (d == "reElem") {
    let result = [];
    let e = sessionStorage.getItem("regular");

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
  } else {
    let result = [];
    let e = sessionStorage.getItem("Individual");
    let pro = e.split(",");
    for (let i = 0; i < pro.length; i++) {
      let ids = pro[i];

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
}

function addsumm() {
  let sum = document.getElementById("sum");
  let mehr = document.getElementById("mehr");
  let gesamt = document.getElementById("gesamt");
  let a = document.getElementsByClassName("preis");

  let ammountCounter = document.getElementsByClassName("menge");

  let wert = 0;
  for (let i = 0; i < a.length; i++) {
    //die Werte aufsummieren
    let d = a[i].innerHTML.substring(0, 5).split(",");

    let dr = "" + d[0] + "." + d[1];

    let counterNumber = ammountCounter[i].value;

    wert = wert + Number(dr) * Number(counterNumber);
  }

  let ge = Math.round(wert * 100) / 100;
  gesamt.innerHTML = setPreis("" + ge) + "€";
  //let steuer = Math.round(wert * 0.07 * 100) / 100;
  let su = Math.round((wert / 1.07) * 100) / 100;

  sum.innerHTML = setPreis("" + su) + "€";
  let mehrw = Math.round((wert - Math.round(wert / 1.07)) * 100) / 100;

  mehr.innerHTML = setPreis("" + mehrw) + "€";
}

function removeElem(id) {
  let element = document.getElementById(id);

  element.parentNode.removeChild(element);
  addsumm();

  let d = id.substring(0, 6);
  let idPro = id.substring(6, 50);

  if (d == "reElem") {
    let result = [];
    let e = sessionStorage.getItem("regular");

    let pro = e.split(",");
    for (let i = 0; i < pro.length; i++) {
      let ids = pro[i].substr(0, 4);
      if (Number(ids) != Number(idPro)) {
        result.push(pro[i]);
      }
    }

    sessionStorage.setItem("regular", result);
  } else {
    let result = [];
    let e = sessionStorage.getItem("Individual");
    let pro = e.split(",");
    for (let i = 0; i < pro.length; i++) {
      let ids = pro[i];

      if (ids != idPro) {
        result.push(pro[i]);
      }
    }

    sessionStorage.setItem("Individual", result);
  }

  storeAnzeigen();
}

function sendOn() {
  location.href = "/kasse";
}

function setzenWarenkorbReg(data) {
  let art = document.getElementById("waren");
  let regular = sessionStorage.getItem("regular");
  var re = []; // Array für reguläre Kuchen

  if (regular != "") {
    re = regular.split(",");
  }

  for (let i = 0; i < re.length; i++) {
    let id = Number(re[i].substring(0, 4));

    let anzahl = Number(re[i].substring(4, 8));

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
          "<input class='menge' type='number' min='1' value='" +
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
          setPreis(data[j].bruttopreis) +
          " €</p></td>" +
          "<td><button onclick=removeElem('" +
          elem +
          "')>" +
          "<img src='./img/shoppingCartCancel.png' alt=''></button></td>" +
          "</tr>";

        art.innerHTML += a;

        zahl += 1;
      }
    }
  }
} //addet die REGULÄREN kuchen

//fehlrt noch
function setzenWarenkorbIndi(data) {
  let art = document.getElementById("waren");
  let indivi = sessionStorage.getItem("Individual");
  if (indivi != "") {
    let indi = indivi.split(",");

    for (let i = 0; i < indi.length; i++) {
      let element = indi[i].split("/");
      let anzahl = element[element.length - 1];
      let kosten = 0;
      let elem = "inElem" + indi[i];

      let counterID = "counter" + zahl;
      let b =
        "<tr id='" +
        elem +
        "' >" +
        "<td><img src='./img/cake-example2.png' alt=''></td>" +
        "<td><p><h4>Individueller Kuchen</h4></p>" +
        "<p>Individueller Kuchen nach Ihrer Konfiguration<br>";

      for (let j = 0; j < element.length - 1; j++) {
        let n = Number(element[j]);

        for (let k = 0; k < data.length; k++) {
          if (data[k].id == n) {
            b += data[k].beschreibung + "<br>";
            kosten += data[k].bruttopreis;
          }
        }
      }

      b +=
        "</p></td>" +
        "<td>" +
        "<input class='menge' type='number' min='1' value='" +
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
        setPreis(kosten) +
        "€</p></td>" +
        "<td><button onclick=removeElem('" +
        elem +
        "')><img src='./img/shoppingCartCancel.png' alt=''></button></td>" +
        "</tr>";

      art.innerHTML += b;

      zahl += 1;
    }
  } //addet die INDIVIDUELLEN kuchen
  addsumm();
}
