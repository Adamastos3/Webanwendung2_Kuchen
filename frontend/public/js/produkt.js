const id = ids();
const pathProdukt = "http://localhost:3000/produkt/api/" + id;

function ids() {
  let a = document.cookie;

  let id = Number(
    a
      .split("; ")
      .find((row) => row.startsWith("kn="))
      .split("=")[1]
  );
  //deleteCookie("kn");
  return id;
}

function setzenHtmlProdukt(data) {
  console.log("Daten der Produkte");
  console.log(data);
  let text = "";
  document.title = data.bezeichnung;
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
    "<h4>Preis: " +
    setPreis(data.bruttopreis) +
    " €</h4></td>" +
    "</tr><tr><td colspan='1'>" +
    //Datenblatt
    "<p><a href='" +
    data.datenblatt.dateipfad +
    "'>Nährwerttabelle</a></p>" +
    "</td></tr><tr colspan='1' class='inputField2 inputField2Product'>" +
    //Buttons
    "<td><label for='number'>Menge:<input type='number' name='menge' id='menge' value='1' onchange=checkChange() /> </label></td>" +
    "</tr><tr><td colspan='2'><button class='button1 button1Product' onclick=addWarenkorb('" +
    data.id +
    "')>zum Warenkorb hinzufügen</button>" +
    "</td></tr></table></div><div><table class='tableProduct tableProductDescription'><tr><td>" +
    "<a name='unten'><p>Beschreibung<br /><br />" +
    data.details +
    "</p></a></td></tr><tr><td><p></p></td></tr></table></div>";

  div.innerHTML = text;
}

function checkChange() {
  let menge = document.getElementById("menge");
  if (Number(menge.value) < 1) {
    menge.value = 1;
  }
}

//Muss noch gemacht werden
function addWarenkorb(idP) {
  let menge = document.getElementById("menge").value;
  let regular = sessionStorage.getItem("regular");

  if (regular == "") {
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
    regular = idS + menge;
  } else {
    let pro = regular.split(",");

    let check = 1;
    if (pro[0] == "") {
      check = 3;
    }

    for (let i = 0; i < pro.length; i++) {
      let id = pro[i].substring(0, 4);
      if (Number(id) == idP) {
        let anzahl = pro[i].substring(4, 8);
        anzahl = Number(anzahl) + Number(menge);

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
  }
  sessionStorage.setItem("regular", regular);

  location.href = "/sortimentR";
  storeAnzeigen();
}

getRequest(pathProdukt, setzenHtmlProdukt);
