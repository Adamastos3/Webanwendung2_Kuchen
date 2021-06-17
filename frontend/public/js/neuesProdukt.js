const form = document.getElementById("form");

async function sendOnReg() {
  let path = "http://localhost:3000/produkt";
  let data = JSON.stringify({
    bezeichnung: document.getElementById("bezeichnung").value,
    beschreibung: document.getElementById("beschreibung").value,
    nettopreis: document.getElementById("nettopreis").value,
    datenblatt: document.getElementById("datenblatt").value,
    bildpfad: document.getElementById("bildpfad").value,
    details: document.getElementById("details").value,
  });

  let b = await postRequest(path, data, requestServer);
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
      text += fehler[i].bezeichnung + "\n";
    }
    alert(text);
  }
}
