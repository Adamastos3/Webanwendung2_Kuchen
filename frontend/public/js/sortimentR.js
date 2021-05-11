//ZUm Test ist nur Produkt 13 ausgewählt

const pathSR = "http://localhost:3000/sortimentR/api";
//const pathSRTest = "http://localhost:3000/sortimentR/api/13";
var zahl = 1;

function setzenHtmlSR(data) {
  console.log(data);
  var div = document.getElementById("textdiv");
  console.log(div);
  console.log("row div");
  var text = "";
  var id = "id" + zahl;
  var divBId = "divB" + zahl;
  var divAId = "divA" + zahl;

  //for (let i = 0; i < data.length; i++) {
  for (let i = 0; i <= data.length; i++) {
    text +=
      "<div class='containerProduct containerProductReg' id='" +
      id +
      "'>" +
      "<div id='" +
      divBId +
      "' >" +
      "<table class='tableProduct tableProductReg'>" +
      //Bild
      "<tr><td class='tableProductImage'><img src='" +
      data[i].bilder[0].bildpfad +
      "' alt=''></td></tr>" +
      //Bezeichnung
      "<tr><td><h4>" +
      data[i].bezeichnung +
      "</h4></td></tr>" +
      //Beschreibung
      "<tr><td><p>Beschreibung:</p><p>" +
      data[i].beschreibung +
      "</p></td></tr>" +
      //Preis
      "<tr><td><p>Preis: " +
      data[i].bruttopreis +
      "€</p></td></tr>" +
      "</table></div>" +
      //div2
      "<div id='" +
      divAId +
      "'>" +
      "<table class='tableProduct tableProductReg'>" +
      //Bild
      "<tr><td class='tableProductImage'><img src='" +
      data[i].bilder[0].bildpfad +
      "' alt=''></td></tr>" +
      //Info + Warenkorb
      "<tr><td><button onclick= sendOn('" +
      data[i].id +
      "')>Info</button></td></tr>" +
      "<tr><td><button onclick=addWarenkorb('" +
      data[i].id +
      "')>In den Warenkorb</button></td></tr>" +
      "</table></div></div>";

    div.innerHTML += text;
    console.log(div);
    text = "";
    zahl++;

    document
      .getElementById(id)
      .setAttribute(
        "onmouseover",
        "replaceDivInvert('" + divBId + "', '" + divAId + "')"
      );
    document
      .getElementById(id)
      .setAttribute(
        "onmouseout",
        "replaceDiv('" + divBId + "', '" + divAId + "')"
      );
    replaceDivInvert(divBId, divAId);
  }
}

function replaceDiv(a, b) {
  document.getElementById(b).style.display = "none";
  document.getElementById(a).style.display = "flex";
}

function replaceDivInvert(a, b) {
  document.getElementById(b).style.display = "flex";
  document.getElementById(a).style.display = "none";
}

function sendOn(id) {
  location.href = "/produkt";
  setCookie("kn", id);
}

function addWarenkorb(idP) {
  let regular = sessionStorage.getItem("regular");
  let pro = regular.split(",");
  console.log(pro.length);
  console.log(typeof pro[0]);
  let check = 1;
  if (pro[0] == "") {
    check = 3;
  }

  for (let i = 0; i < pro.length; i++) {
    let id = pro[i].substring(0, 4);
    if (Number(id) == idP) {
      let anzahl = pro[i].substring(4, 8);
      anzahl = Number(anzahl) + 1;

      pro[i] = id + anzahl;
      check = 0;
      break;
    }
  }
  if (check != 0) {
    let idS = "";
    if (idP < 10) {
      idS = "000" + idP;
    } else if (idP < 100) {
      idS = "00" + idP;
    } else if (idP < 1000) {
      idS = "0" + idP;
    } else {
      idS = idP;
    }
    if (check == 3) {
      pro[0] = idS + 1;
    } else {
      pro.push(idS + 1);
    }
  }

  regular = pro;
  sessionStorage.setItem("regular", regular);
  console.log(sessionStorage);
  storeAnzeigen();
}

getRequest(pathSR, setzenHtmlSR);

/*

function store(a) {
    let elem = a.value;
    if(sessionStorage.getItem("regular")=="n" || sessionStorage.getItem("regular")=="n," || sessionStorage.getItem("regular") == "undefined" || sessionStorage.getItem("regular") == ""){
        sessionStorage.setItem("regular", elem)
    }
    else{
        let individual = sessionStorage.getItem("regular").split(",")
        individual.push(elem);
        sessionStorage.setItem("regular", individual)
    }
    console.log("sortiment")
    console.log(sessionStorage)
    storeAnzeigen()
    
}
store("test")
*/

//Später einsetzen
/*
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost/8000/api/produkte/alle')
request.onload=function() {
    var data = JSON.parse(request.responseText);
    console.log(data);
}
request.send();

function setzenHtml(){

}

function store(a) {
    let elem = document.getElementById(a).value;
    let regular = sessionStorage.getItem("regular").split(",")
    regular.push(elem);
    sessionStorage.setItem("regular", regular)
    
}



*/
