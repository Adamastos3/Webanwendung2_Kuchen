const form = document.getElementById("form");

//prototyp
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function changeRadion(a) {
  if (a == "Herr") {
    document.getElementById("Frau").checked = false;
    document.getElementById("Herr").checked = true;
  } else {
    document.getElementById("Frau").checked = true;
    document.getElementById("Herr").checked = false;
  }
}

function sendOn() {
  let path = "http://localhost:3000/kontakt";
  let data = JSON.stringify({
    anrede: setSex(),
    vorname: document.getElementById("textVorname").value,
    nachname: document.getElementById("textNachname").value,
    email: document.getElementById("textMail").value,
    text: document.getElementById("text").value,
  });

  postRequest(path, data);
}

function setSex() {
  if (document.getElementById("Herr").checked) {
    return "Herr";
  } else {
    return "Frau";
  }
}

function setInfo(data) {
  if (data.fehler == null) {
    document.forms.form.reset();
  } else {
    let text = "";
    for (let i = 0; i < data.fehler, length; i++) {
      text += "" + data.fehler[i].bezeichnung + "\n";
    }
    alert(text);
  }
}
