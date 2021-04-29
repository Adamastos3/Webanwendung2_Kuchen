const pathProdukt = "http://localhost:8000/wba2api/produkt/gib/" + getID();

function getID() {
  const id = cookies();
  return id[1];
}

function setzenHtmlProdukt(data) {
  let text = "";
  let div = document.getElementById("produktdiv");

  text +=
    "<div><table class='tableProduct'><tr>" +
    "<td rowspan='4' id='tableProductImage2'>" +
    //bild
    "<img src='" +
    data.bilder[0].bildpfad +
    "' />" +
    "</td><td colspan='1'>" +
    //Beschreibung + bezeichnung
    "<h3>" +
    data.bezeichnung +
    "</h3>" +
    "<p>" +
    data.beschreibung +
    "</p>" +
    "<a href='#unten'>Klicke hier für die vollständige Beschreibung :)</a>" +
    "</td></tr><tr><td colspan='1'>" +
    //Preis
    "<h4>Preis:" +
    data.bruttopreis +
    "€</h4></td>" +
    "</tr><tr><td colspan='1'>" +
    //Datenblatt
    "<p><a href='" +
    data.datenblatt.bildpfad +
    "'>Nährwerttabelle</a></p>" +
    "</td></tr><tr colspan='1' class='inputField2 inputField2Product'>" +
    //Buttons
    "<td><label for='number'>Menge:<input type='number' 'name='menge' id='menge' /> </label></td>" +
    "</tr><tr><td colspan='2'><button class='button1 button1Product' onclick=addWarenkorb('" +
    data.id +
    "')>Warenkorb</button>" +
    "</td></tr></table></div><div><table class='tableProduct tableProductDescription'><tr><td>" +
    "<a name='unten'><p>Beschreibung<br /><br />" +
    data.details +
    "</p></a></td></tr><tr><td><p></p></td></tr></table></div>";

  div.innerHTML = text;
}

//Muss noch gemacht werden
function addWarenkorb(id) {}

getRequest(pathProdukt, setzenHtmlProdukt);
