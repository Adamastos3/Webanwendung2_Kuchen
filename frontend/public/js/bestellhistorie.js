var counter = 1;
const pathBestellHistory = "http://localhost:3000/bestellhistorie/api";

function setzenHtmlBestell(data) {
  let id = 1;
  var table1 = document.getElementById("tableBestell");
  var text = "";

  for (let i = 0; i < data.length; i++) {
    text += "<td><p>" + data[i].id + "</p></td>" + "<td><p>";

    let bestell = data[i].bestellpositionen;
    for (let j = 0; j < bestell.length; j++) {
      text +=
        "" +
        bestell[j].menge +
        "x " +
        bestell[j].produkt.bezeichnung +
        "<br>" +
        bestell[j].produkt.beschreibung +
        "<br> <br>";
    }

    //Preis
    text +=
      "</p></td>" +
      "<td><p>" +
      data[i].total.brutto +
      " € </p></td>" +
      "<td><p>" +
      //bestellzeitpunkt
      data[i].bestellzeitpunkt.substring(0, 10) +
      "</p></td>" +
      "<td><p>";

    //Lieferzeitpunkt
    if (data[i].lieferzeitpunkt == null) {
      text += "Nicht geliefert";
    } else {
      text += data[i].lieferzeitpunkt.substring(0, 10);
    }

    text +=
      "</p></td>" +
      //geliefert
      "<td><p>";

    if (data[i].status == 0) {
      text += "nicht geliefert, wird am Lieferdatum geliefert";
    } else {
      text += "geliefert";
    }
    text += "</p></td>";

    let rw = table1.insertRow(1);
    rw.innerHTML += text;
    text = "";
    counter++;
  }
}

getRequest(pathBestellHistory, setzenHtmlBestell);
