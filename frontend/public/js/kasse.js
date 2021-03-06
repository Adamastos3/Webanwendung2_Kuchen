const form = document.getElementById("paymentForm");
const form1 = document.getElementById("userForm");
const form2 = document.getElementById("lieferForm");
var zahl = 0;

const pathZahlung = "http://localhost:3000/kasse/api/zahlung";
const pathbenutzer = "http://localhost:3000/kasse/api/benutzer";
const pathBestellung = "http://localhost:3000/kasse";
const pathReg = "http://localhost:3000/warenkorb/api/reg";
const pathIndi = "http://localhost:3000/warenkorb/api/indi";

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

form1.addEventListener("submit", (e) => {
  e.preventDefault();
});

function changeRadion(a) {
  if (a == "vorkasse") {
    document.getElementById("vorkasse").checked = true;
    document.getElementById("rechnung").checked = false;
    document.getElementById("bar").checked = false;
    getRequest(pathZahlung, setzenPayment);
  } else if (a == "rechnung") {
    document.getElementById("vorkasse").checked = false;
    document.getElementById("rechnung").checked = true;
    document.getElementById("bar").checked = false;
    getRequest(pathZahlung, setzenPayment);
  } else if (a == "bar") {
    document.getElementById("vorkasse").checked = false;
    document.getElementById("rechnung").checked = false;
    document.getElementById("bar").checked = true;
    getRequest(pathZahlung, setzenPayment);
  }
}

function addsumm() {
  let sum = document.getElementById("sum");
  let mehr = document.getElementById("mehr");
  let gesamt = document.getElementById("gesamt");
  let a = document.getElementsByClassName("preis");
  let ammountCounter = document.getElementsByClassName("menge");
  //console.log("ammountCounter: " + ammountCounter[0].value); //Anzahl Kuchen im Warenkorb

  let wert = 0;
  for (let i = 0; i < a.length; i++) {
    //die Werte aufsummieren
    let d = a[i].innerHTML.substring(0, 5).split(",");

    let dr = "" + d[0] + "." + d[1];

    let counterNumber = ammountCounter[i].value;

    wert = wert + Number(dr) * Number(counterNumber);
  }

  let ge = Math.round(wert * 100) / 100;
  gesamt.innerHTML = setPreis("" + ge) + "???";
  //let steuer = Math.round(wert * 0.07 * 100) / 100;
  let su = Math.round((wert / 1.07) * 100) / 100;

  sum.innerHTML = setPreis("" + su) + "???";
  let mehrw = Math.round((wert - Math.round(wert / 1.07)) * 100) / 100;

  mehr.innerHTML = setPreis("" + mehrw) + "???";
}

function setzenWarenkorbReg(data) {
  let art = document.getElementById("waren");
  let regular = sessionStorage.getItem("regular");
  var re = []; // Array f??r regul??re Kuchen

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
          "<input class='menge' type='number' value='" +
          anzahl +
          "' name='counter' id='" +
          counterID +
          "'  readonly>" +
          "</td>" +
          "<td><p class='preis'>" +
          setPreis(data[j].bruttopreis) +
          "???</p></td>" +
          "</tr>";

        art.innerHTML += a;

        zahl += 1;
      }
    }
  }
  getRequest(pathIndi, setzenWarenkorbIndi);
} //addet die REGUL??REN kuchen

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
        "<input class='menge' type='number'  value='" +
        Number(anzahl) +
        "' name='counter' id='" +
        counterID +
        "' readonly >" +
        "</td>" +
        "<td><p class='preis'>" +
        setPreis(kosten) +
        "???</p></td>" +
        "</tr>";

      art.innerHTML += b;

      zahl += 1;
    }
  } //addet die INDIVIDUELLEN kuchen
  addsumm();
}

function setzenPayment(data) {
  let info = document.getElementById("Infosatz");

  if (document.getElementById("vorkasse").checked) {
    info.innerHTML =
      "<h4>" +
      data[0].bezeichnung +
      "</h4> " +
      "<p>" +
      data[0].beschreibung +
      "</p>";
  } else if (document.getElementById("rechnung").checked) {
    info.innerHTML =
      "<h4>" +
      data[1].bezeichnung +
      "</h4> " +
      "<p>" +
      data[1].beschreibung +
      "</p>";
  } else if (document.getElementById("bar").checked) {
    info.innerHTML =
      "<h4>" +
      data[2].bezeichnung +
      "</h4> " +
      "<p>" +
      data[2].beschreibung +
      "</p>";
  }
}

function benutzerSetzen(data) {
  var email = data.email;
  var anrede = data.anrede;
  var vorname = data.vorname;
  var nachname = data.nachname;
  var plz = data.adresse.plz;
  var stadt = data.adresse.ort;
  var strasse = data.adresse.strasse;
  var hausnr = data.adresse.hausnummer;
  if (anrede == "Herr") {
    document.getElementById("anrede").value = "Herr";
  } else {
    document.getElementById("anrede").value = "Frau";
  }
  document.getElementById("email").value = email;
  document.getElementById("plz").value = plz;
  document.getElementById("stadt").value = stadt;
  document.getElementById("strasse").value = strasse;
  document.getElementById("vorname").value = vorname;
  document.getElementById("nachname").value = nachname;
  document.getElementById("hausnr").value = hausnr;
}

function setLieferdatum() {
  let elem = document.getElementById("lieferdatum");
  let t = new Date();
  let duration = 2;
  t.setTime(t.getTime() + duration * 24 * 60 * 60 * 1000);

  let d = t.getDate();
  let m = t.getMonth() + 1;
  let j = t.getFullYear();

  if (t < 10) {
    d = "0" + d;
  }
  if (m < 10) {
    m = "0" + m;
  }
  let result = "" + d + "-" + m + "-" + j;

  elem.setAttribute("value", result);
}

function checkDatum() {
  let elem = document.getElementById("lieferdatum");
  if (elem.value == "") {
    alert("Datum ist nicht eingef??gt");
    return false;
  } else {
    let now = new Date();
    let datum = new Date(elem.value);
    if (now - datum > 0) {
      alert("Datum liegt in der Vergangenheit");
      return false;
    } else {
      return true;
    }
  }
}

function sendOn() {
  if (checkDatum()) {
    makeBestellung();
  }
  //changeKasse();
}

function makeBestellung() {
  let regular = sessionStorage.getItem("regular");
  let indi = sessionStorage.getItem("Individual");
  let reg = [];

  if (regular != "") {
    let pro = regular.split(",");
    for (let i = 0; i < pro.length; i++) {
      let text = {
        bezeichnung: "regular",
        id: Number(pro[i].substring(0, 4)),
        menge: Number(pro[i].substring(4, 10)),
      };

      reg.push(text);
    }
  }

  if (indi != "") {
    let pro = indi.split(",");

    for (let i = 0; i < pro.length; i++) {
      let t = pro[i].split("/");
      let d = "";
      for (let j = 0; j < t.length - 1; j++) {
        d += t[j];
      }

      let text = {
        bezeichnung: "individuel",
        id: d,
        menge: t[t.length - 1],
      };
      reg.push(text);
    }
  }

  let daten = JSON.stringify({
    produkt: reg,
    bezahlung: findBezahlung(),
    lieferdatum: document.getElementById("lieferdatum").value,
  });

  postRequest(pathBestellung, daten, killStorage);
}

function killStorage(data) {
  let e = data.fehler;

  if (e == null) {
    changeKasse(data);

    sessionStorage.clear();
    initStorage();
    storeAnzeigen();
  } else {
    alert("Er gab einen Fehler. Bitte bestellen Sie nochmals");
  }
}

function findBezahlung() {
  if (document.getElementById("vorkasse").checked) {
    return "Vorkasse";
  }
  if (document.getElementById("rechnung").checked) {
    return "Rechnung";
  }
  if (document.getElementById("bar").checked) {
    return "Bar";
  }
}

function changeKasse(data) {
  let lieferdatum = document.getElementById("lieferdatum");
  let bestell = document.getElementById("Bestellnr");
  let changeDiv = document.getElementById("makeHidden");
  let changeName = document.getElementById("makeOrder");
  let changeForm = document.getElementById("paymentForm");
  let fixPayment = document.getElementById("fixedPayment");
  let paymenttext = document.getElementById("Infosatz").innerHTML;
  let inputFields = document.getElementById("userForm");

  bestell.style.display = "table";
  bestell.innerHTML =
    "<tr>" +
    "<td>Vielen Dank f??r Ihre Bestellung</td>" +
    "<td>" +
    "Ihre Bestellnummer lautet: " +
    data.daten.id +
    "</td>" +
    "<td>" +
    "Bestelldatum: " +
    data.daten.zeitpunkt;
  +"</td>" + "</tr>";
  changeDiv.style.display = "none";
  changeName.innerHTML = "Bestellbest??tigung";
  changeForm.style.display = "none";
  fixPayment.innerHTML += "<p>" + paymenttext + "</p>";
  lieferdatum.setAttribute("readonly", true);

  inputFields.classList.add("ChangeInputField");
}

function sendon() {
  location.href = "/warenkorb";
}

getRequest(pathReg, setzenWarenkorbReg);
getRequest(pathZahlung, setzenPayment);
getRequest(pathbenutzer, benutzerSetzen);
setLieferdatum();

/*
benutzerSetzen();
einf??gen();
addsumm();
*/
