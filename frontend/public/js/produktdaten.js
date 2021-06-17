var counter = 1;
const pathProdukt = "http://localhost:3000/produkt/api/alle";

function setzenHtmlProduktDaten(data) {
  var table1 = document.getElementById("tableProdukt");
  var text = "";

  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    let elem = data[i].id;
    //id
    text +=
      "<td><p>" +
      data[i].id +
      "</p></td>" +
      //beschreibung
      "<td><p>" +
      data[i].bezeichnung +
      "<br>" +
      data[i].beschreibung +
      "</p></td>" +
      //datenblattid
      "<td><p>" +
      data[i].datenblatt.id +
      "</p></td>";

    //button
    text +=
      "<td><button onclick=sendOn('" +
      data[i].id +
      "')><img src='./img/pencil.png' alt=''></button></td>" +
      "<td><button onclick=erledigt(" +
      data[i].id +
      ")><img src='./img/bin.png' alt=''></button></td>";

    let rw = table1.insertRow(counter);
    rw.setAttribute("id", elem);
    rw.innerHTML += text;

    text = "";
    counter++;
  }
}

function erledigt(id) {
  console.log(id);
  let element = document.getElementById(id);
  deleteRequest(id);
  element.parentNode.removeChild(element);
}

function sendOn(id) {
  setCookie("pd", id);
  location.href = "/produktAendern";
}

function sendToNewProduct() {
  location.href = "/neuesProdukt";
}

function deleteRequest(id) {
  console.log("Delete");
  console.log(id);
  var request = new XMLHttpRequest();
  request.open("DELETE", "http://localhost:3000/produkt/" + id);
  request.onload = function () {
    var data = JSON.parse(request.responseText);
    if (data.fehler == null) {
      alert("Produkt wurde gelöscht");
    } else {
      alert("Produkt wurde nicht gelöscht.");
    }
  };
  request.send();
}

//aufrufen
getRequest(pathProdukt, setzenHtmlProduktDaten);
