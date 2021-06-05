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

function changeElem(id) {
  console.log(id);
  let a = document.getElementById(id);
  console.log(a);
  console.log(a.getAttributeNames());
  if (!a.getAttributeNames().includes("readonly")) {
    if (id != "Herr" && id != "Frau") {
      a.value = "";
    } else {
      if (id == "Herr") {
        document.getElementById("Frau").checked = false;
      } else {
        document.getElementById("Herr").checked = false;
      }
      a.checked = true;
    }
    hideButton(0);
  } else {
    if (id == "Herr") {
      if (!document.getElementById("Herr").checked) {
        document.getElementById("Frau").checked = true;
        a.checked = false;
      }
    } else {
      if (!document.getElementById("Frau").checked)
        document.getElementById("Herr").checked = true;
      a.checked = false;
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

getRequest(pathIhreDaten, HTMLMitarbeiterSetzen);
