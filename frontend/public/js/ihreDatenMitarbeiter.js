const form = document.getElementById("form");
const pathIhreDaten = "http://localhost:3000/ihreDaten/api";

function HTMLMitarbeiterSetzen(data) {
  let person = data.person;

  if (person.anrede == "Herr") {
    document.getElementById("Herr").checked = true;
  } else {
    document.getElementById("Frau").checked = true;
  }
  document.getElementById("email").value = person.email;
  document.getElementById("username").value = data.id;
  document.getElementById("vorname").value = person.vorname;
  document.getElementById("nachname").value = person.nachname;

  //Geb
  document.getElementById("geb").setAttribute("type", "text");
  document.getElementById("geb").value = person.geburtstag;

  document.getElementById("plz").value = person.adresse.plz;
  document.getElementById("stadt").value = person.adresse.ort;
  document.getElementById("strasse").value = person.adresse.strasse;
  document.getElementById("hausnummer").value = person.adresse.hausnummer;
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

getRequest(pathIhreDaten, HTMLMitarbeiterSetzen);
