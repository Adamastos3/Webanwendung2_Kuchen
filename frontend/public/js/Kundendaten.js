var counter = 1;
const pathKunde = "http://localhost:3000/kundendaten/api";

function setzenHtmlKundenDaten(data) {
  var table1 = document.getElementById("tableKunden");
  var text = "";

  for (let i = 0; i < data.length; i++) {
    let elem = "elem" + counter;
    let ids = "ids" + counter;
    //id
    text += "<td><p id='" + ids + "'>" + data[i].id + "</p></td>";

    let person = data[i].person;
    if (person != null) {
      text +=
        "<td><p> Mail: " +
        person.email +
        "</p>" +
        "<p>Username: " +
        data[i].benutzername +
        "</p>" +
        "<p>Name: " +
        person.vorname +
        " " +
        person.nachname +
        "</p>" +
        "<p>Geburtstag: " +
        person.geburtstag +
        "</p>" +
        "<p>Adresse: " +
        person.adresse.strasse +
        " " +
        person.adresse.hausnummer +
        " " +
        person.adresse.plz +
        " " +
        person.adresse.ort +
        "</p>" +
        "</td>";
    }

    //Rolle
    text += "<td><p>" + data[i].benutzerrolle.bezeichnung + "</p></td>";

    //button
    text +=
      "<td><button onclick=sendOn('" +
      data[i].id +
      "')><img src='./img/pencil.png' alt=''></button></td>" +
      "<td><button onclick=erledigt(" +
      elem +
      "," +
      ids +
      ")><img src='./img/bin.png' alt=''></button></td>";

    let rw = table1.insertRow(counter);
    rw.setAttribute("id", elem);
    rw.innerHTML += text;

    text = "";
    counter++;
  }
}

function erledigt(id, idU) {
  let element = id;
  let ids = idU.innerHTML;
  deleteRequest(ids);
  element.parentNode.removeChild(element);
}

function sendOn(id) {
  setCookie("kc", id);

  location.href = "/kundenChange";
}

function deleteRequest(id) {
  var request = new XMLHttpRequest();
  request.open("DELETE", "http://localhost:3000/kundendaten/" + id);
  request.onload = function () {
    var data = JSON.parse(request.responseText);
  };
  request.send();
}

//aufrufen
getRequest(pathKunde, setzenHtmlKundenDaten);
