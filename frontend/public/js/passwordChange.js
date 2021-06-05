const forme = document.getElementById("form");
const pathPass = "http://localhost:3000/passwortAendern";

//prototyp
forme.addEventListener("submit", (e) => {
  e.preventDefault();
});

async function sendOn() {
  if (checkPassword()) {
    let daten = JSON.stringify({
      passOld: document.getElementById("passwordOld").value,
      pass: document.getElementById("passwordNew").value,
    });
    let a = postRequest(pathPass, daten, setErg);
  }
}

function setErg(daten) {
  if (daten.fehler == null) {
    alert("Passwort wurde geändert");
    location.href = "/login";
  } else {
    let text = daten.fehler[0].bezeichnung;
    alert(text);
  }
}

function checkPassword() {
  let a = document.getElementById("passwordNew");
  let b = document.getElementById("passwordNew2");

  if (a.value.length < 8) {
    window.alert("Passwort ist zu kurz (min. 8 Zeichen)");
    return false;
  } else {
    if (a.value == b.value) {
      return true;
    } else {
      window.alert("Die Passwörter sind nicht gleich");
      return false;
    }
  }
}
