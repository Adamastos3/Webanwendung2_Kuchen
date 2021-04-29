//ZUm Test ist nur Produkt 13 ausgewählt

const pathSR = "http://localhost:8000/wba2api/produkt/alle";
const pathSRTest = "http://localhost:8000/wba2api/produkt/gib/13";
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
  for (let i = 0; i <= 0; i++) {
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
      data.bilder[0].bildpfad +
      "' alt=''></td></tr>" +
      //Bezeichnung
      "<tr><td><h4>" +
      data.bezeichnung +
      "</h4></td></tr>" +
      //Beschreibung
      "<tr><td><p>Beschreibung:</p><p>" +
      data.beschreibung +
      "</p></td></tr>" +
      //Preis
      "<tr><td><p>Preis: " +
      data.bruttopreis +
      "€</p></td></tr>" +
      "</table></div>" +
      //div2
      "<div id='" +
      divAId +
      "'>" +
      "<table class='tableProduct tableProductReg'>" +
      //Bild
      "<tr><td class='tableProductImage'><img src='" +
      data.bilder[0].bildpfad +
      "' alt=''></td></tr>" +
      //Info + Warenkorb
      "<tr><td><button onclick= sendOn('" +
      data.id +
      "')>Info</button></td></tr>" +
      "<tr><td><button onclick=addWarenkorb('" +
      data.id +
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
  console.log();
  setCookie("Pid", id);
  location.href = "/produkt";
}

//fehlt noch
function addWarenkorb(id) {}

getRequest(pathSRTest, setzenHtmlSR);

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
