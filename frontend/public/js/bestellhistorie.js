var counter = 1;
const pathBestellHistory = "http://localhost:8000/wba2api/bestellung/alle";

function setzenHtmlBestell(data) {
  let id = 1;
  console.log(id);
  var table1 = document.getElementById("tableBestell");
  var text = "";
  console.log("daten");
  console.log(data.length);
  console.log(data[0].besteller);

  for (let i = 0; i < data.length; i++) {
    //nur zum testen
    if (data[i].besteller == null) {
    } else {
      //normal
      if (data[i].besteller.id == id) {
        console.log("ausgabe" + counter);
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
          text += data[i].bestellzeitpunkt.substring(0, 10);
        }

        text += "</p></td>";

        console.log(table1);
        console.log(text);
        let rw = table1.insertRow(1);
        rw.innerHTML += text;
        console.log(table1);
        text = "";
        counter++;
      }
    }
  }
}

getRequest(pathBestellHistory, setzenHtmlBestell);
