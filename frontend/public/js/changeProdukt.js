const id = ids();
var counter = 1;
const pathProdukt = "http://localhost:3000/produkt/api/" + id;

function ids() {
  let a = document.cookie;

  let id = Number(
    a
      .split("; ")
      .find((row) => row.startsWith("pd="))
      .split("=")[1]
  );
  //deleteCookie("kn");
  return id;
}

function setzenHtmlProduktDaten(data) {
  console.log(data);
  document.getElementById("bezeichnung").value = data.bezeichnung;
  document.getElementById("beschreibung").value = data.beschreibung;
  document.getElementById("nettopreis").value = setPreis(data.nettopreis);
  document.getElementById("datenblatt").value = data.datenblatt.dateipfad;
  document.getElementById("bildpfad").value = data.bilder[0].bildpfad;
  document.getElementById("details").value = data.details;
}

async function changeData() {
  if (checkEingabe()) {
    let path = "http://localhost:3000/produkt";
    let data = JSON.stringify({
      id: id,
      bezeichnung: document.getElementById("bezeichnung").value,
      beschreibung: document.getElementById("beschreibung").value,
      nettopreis: document.getElementById("nettopreis").value,
      datenblatt: document.getElementById("datenblatt").value,
      bildpfad: document.getElementById("bildpfad").value,
      details: document.getElementById("details").value,
    });

    putRequest(path, data, requestServer);
  } else {
    alert("Bitte füllen Sie alle Felder aus");
  }
}

function checkEingabe() {
  let re = [];
  re.push(document.getElementById("bezeichnung").value);
  re.push(document.getElementById("beschreibung").value);
  re.push(document.getElementById("nettopreis").value);
  re.push(document.getElementById("datenblatt").value);
  re.push(document.getElementById("bildpfad").value);
  re.push(document.getElementById("details").value);

  for (let i = 0; i < re.length; i++) {
    if (re[i] == "") {
      return false;
    }
  }

  return true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function requestServer(data) {
  let fehler = data.fehler;
  console.log(fehler);
  if (fehler == null) {
    location.href = "/produktdaten";
  } else {
    let text = "";
    for (let i = 0; i < fehler.length; i++) {
      text += fehler[i][0].bezeichnung + "\n";
    }
    alert(text);
  }
}

//aufrufen
getRequest(pathProdukt, setzenHtmlProduktDaten);
