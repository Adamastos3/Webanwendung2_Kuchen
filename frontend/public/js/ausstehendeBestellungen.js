var counter = 1;
const pathAussthendeBestellung =
  "http://localhost:3000/ausstehendeBestellungen/api";

function setzenHtmlAusstehendeBestellung(data) {
  let table = document.getElementById("tableAus");
  let text = "";

  for (let i = 0; i < data.length; i++) {
    if (data[i].status == 0) {
      let elem = "elem" + counter;
      text = "";

      //Bestellid
      text += "<td><p>" + data.id + "</p></td>" + "<td>";

      //Bestellposition
      for (let j = 0; j < data[i].bestellpositionen.length; j++) {
        test +=
          "<p>" +
          data[i].bestellpositionen.menge +
          "x " +
          data[i].bestellpositionen.produkt.bezeichnung +
          " (Id: " +
          data[i].bestellpositionen.produkt.id +
          "</p>";
      }

      //Rechnungsbetrag
      text +=
        "</td>" +
        "<td><p>" +
        data.total.brutto +
        " €</p></td>" +
        //Bestellzeitpunkt
        "<td><p>" +
        data.bestellzeitpunkt.substring(0, 10) +
        "</p></td>" +
        "<td>" +
        "<button onclick='erledigt('" +
        elem +
        "')'>" +
        "<img src='./img/confirm.png' alt='' />" +
        "</button>" +
        "</td>";

      let rw = table.insertRow(counter);
      rw.setAttribute("id", elem);
      rw.innerHTML += text;
      counter++;
    }
  }
}

function erledigt(id) {
  console.log(id);
  let element = document.getElementById(id);

  //console.log(element)
  element.parentNode.removeChild(element);
  //Es fehl noch das entfernen aus dem sessionstore
}

//ausführen
getRequest(pathAussthendeBestellung, setzenHtmlAusstehendeBestellung);
