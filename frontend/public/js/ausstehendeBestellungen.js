const pathAussthendeBestellung =
  "http://localhost:3000/ausstehendeBestellungen/api";

function setzenHtmlAusstehendeBestellung(data) {
  let table = document.getElementById("tableAus");
  let text = "";

  for (let i = 0; i < data.length; i++) {
    let elem = data[i].id;
    text = "";

    //Bestellid
    text +=
      "<tr id='" + elem + "'> <td><p>" + data[i].id + "</p></td>" + "<td>";

    //Bestellposition
    for (let j = 0; j < data[i].bestellpositionen.length; j++) {
      text +=
        "<p>" +
        data[i].bestellpositionen[j].menge +
        "x " +
        data[i].bestellpositionen[j].produkt.bezeichnung +
        " (Id: " +
        data[i].bestellpositionen[j].produkt.id +
        " )</p>";
    }

    //Rechnungsbetrag
    text +=
      "</td>" +
      "<td><p>" +
      data[i].total.brutto +
      " €</p></td>" +
      //Bestellzeitpunkt
      "<td><p>" +
      data[i].bestellzeitpunkt.substring(0, 10) +
      "</p></td>" +
      //Lieferzeitpunkt
      "<td><p>" +
      data[i].lieferzeitpunkt.substring(0, 10) +
      "</p></td>" +
      "<td>" +
      "<button onclick=erledigt('" +
      elem +
      "')>" +
      "<img src='./img/confirm.png' alt='' />" +
      "</button>" +
      "</td> </tr>";

    table.innerHTML += text;
  }
}

function erledigt(id) {
  let path = "http://localhost:3000/ausstehendeBestellungen";
  let element = document.getElementById(id);
  element.parentNode.removeChild(element);
  let data = JSON.stringify({
    id: id,
  });
  postRequest(path, data, showInfo);
}

function showInfo(data) {
  if (data.fehler == null) {
    alert("Bestellung ist erledigt");
  } else {
    alert(data.fehler[0].bezeichnung);
  }
}

//ausführen
getRequest(pathAussthendeBestellung, setzenHtmlAusstehendeBestellung);
