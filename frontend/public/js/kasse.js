const form = document.getElementById("form");
var zahl = 0;
function addsumm() {
  let sum = document.getElementById("sum");
  let mehr = document.getElementById("mehr");
  let gesamt = document.getElementById("gesamt");
  let a = document.getElementsByClassName("preis");
  let wert = 0;
  for (let i = 0; i < a.length; i++) {
    let d = a[i].innerHTML;
    console.log(d);
    d = d.substr(-3, 2);
    console.log(d);
    wert = wert + Number(d);
  }
  let steuer = Math.round(wert * 0.07 * 100) / 100;
  sum.innerHTML = wert + "€";
  mehr.innerHTML = steuer + "€";
  gesamt.innerHTML = wert + steuer + "€";
}

function changeRadion(a, b) {
  let table = document.getElementById("tablePayment");
  let tr = document.getElementById("tablePaymentTr");

  for (let i=0;i< tr.childNodes.length;i++){
      if(a.id == tr.childNodes[i].)
  }

  /*
  if (a == "payment1") {
    document.getElementById("payment1").checked = true;
    document.getElementById("payment2").checked = false;
    document.getElementById("payment3").checked = false;
  } else if (a == "payment2") {
    document.getElementById("payment1").checked = false;
    document.getElementById("payment2").checked = true;
    document.getElementById("payment3").checked = false;
  } else if (a == "payment3") {
    document.getElementById("payment1").checked = false;
    document.getElementById("payment2").checked = false;
    document.getElementById("payment3").checked = true;
  }
  */
}

function setzenPayment(data) {
  let tr = document.getElementById("tablePaymentTr");
  let zahl = 0;
  let elemId = "elem" + zahl;
  for (let i = 0; i < data.length; i++) {
    let text = "";

    text +=
      "<td>" +
      "<label for='payment" +
      data[i].id +
      "' id='labelPayment" +
      data[i].id +
      "'> Vorkasse </label>" +
      "<input type='radio' name='" +
      data[i].bezeichnung +
      "'" +
      "value='" +
      data[i].bezeichnung +
      "'" +
      "id='" +
      elemId +
      "'" +
      "onclick=changeRadion('" +
      elemId +
      "', '" +
      elemId +
      "L')" +
      "checked/> </td>";

    zahl++;
  }

  let table = document.getElementById("tablePayment");
  zahl = 0;
  for (let i = 0; i < data.length; i++) {
    let text = "";

    text +=
      "<tr id='" +
      elemId +
      "L'> <td colspan='3'>" +
      "<h4>" +
      data[i].bezeichnung +
      "</h4>" +
      "<p>" +
      data[i].beschreibung +
      "</p>" +
      "</td> </tr>";

    table.innerHTML += text;
    zahl++;
  }
}

//nur für Prototyp
function einfügen() {
  console.log("Kasse Einfügen");
  console.log(sessionStorage);
  var art = document.getElementById("waren");
  var a1 = sessionStorage.getItem("regular");
  var b1 = sessionStorage.getItem("Individual");
  var re = [];
  var indi = [];

  if (a1 != "n" && a1 != "undefined") {
    if (a1.length == 1) {
      re.push("a");
    } else {
      re = a1.split(",");
    }
  }
  if (b1 != "n") {
    if (b1.length == 1) {
      indi.push("a");
    } else {
      indi = b1.split(",");
    }
  }
  for (let i = 0; i < re.length; i++) {
    let elem = "elem" + zahl + "re";
    let a =
      "<tr id='" +
      elem +
      "'>" +
      "<td><img src='../public/img/cake-example.png' alt=''></td>" +
      "<td><p>Erdbeerkuchen<p>" +
      "<p>leckerer Erdbeerkuchen mit Sahne und Biscuitteig</p></td>" +
      "<td><p class='menge'>1x</p></td>" +
      "<td><p class='preis'>12€</p></td>" +
      "</tr>";
    zahl += 1;
    art.innerHTML += a;
    console.log("test");
  }
  for (let i = 0; i < indi.length; i++) {
    console.log(art);
    let elem = "elem" + zahl + "in";
    let b =
      "<tr id='" +
      elem +
      "' >" +
      "<td><img src='../public/img/cake-example2.png' alt=''></td>" +
      "<td><p>Individueller kuchen<p>" +
      "<p>Individueller Kuchen nach Ihrer Konfiguration</p></td>" +
      "<td><p class='menge'>1x</p></td>" +
      "<td><p class='preis'>25€</p></td>" +
      "</tr>";
    zahl += 1;
    art.innerHTML += b;
  }
}

function benutzerSetzen() {
  var email = sessionStorage.getItem("email");
  var anrede = sessionStorage.getItem("anrede");
  var vorname = sessionStorage.getItem("vorname");
  var nachname = sessionStorage.getItem("nachname");
  var plz = sessionStorage.getItem("plz");
  var stadt = sessionStorage.getItem("stadt");
  var strasse = sessionStorage.getItem("strasse");
  var hausnr = sessionStorage.getItem("hausnr");
  if (anrede == "Herr") {
    document.getElementById("anrede").value = "Herr";
  } else {
    document.getElementById("anrede").value = "Frau";
  }
  document.getElementById("email").value = email;
  document.getElementById("adresse").value = plz + " " + stadt;
  document.getElementById("vorname").value = vorname;
  document.getElementById("nachname").value = nachname;
  document.getElementById("adresse2").value = strasse + " " + hausnr;
}

function sendOn(a) {
  console.log("SendOn Kasse zur Bestellbestätigung");
  if (a == 0) {
    var changeDiv = document.getElementById("makeHidden");
    var changeName = document.getElementById("makeOrder");
    var getPay = document.querySelectorAll('input[type="radio"]');
    var changeForm = document.getElementById("paymentForm");
    var fixPayment = document.getElementById("fixedPayment");

    for (let i = 0; i < 3; i++) {
      if (getPay[i].checked === true) {
        var payMethod = getPay[i].getAttribute("name");
        break;
      }
    }
    payMethod = payMethod.charAt(0).toUpperCase() + payMethod.slice(1);
    changeDiv.style.display = "none";
    changeName.innerHTML = "Bestellbestätigung";
    changeForm.style.display = "none";
    fixPayment.innerHTML += "<p>" + payMethod + "</p>";
  } else {
    location.href = "warenkorb.html";
  }
}

benutzerSetzen();
einfügen();
addsumm();
