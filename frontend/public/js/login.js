function setInfo(data) {
  let text = "";
  if (data.fehler.length >= 1) {
    for (let i = 0; i < data.fehler.length; i++) {
      text += data.fehler[i] + "\n";
    }
    window.alert(text);
    document.forms.form.reset();
  } else {
    if (data.an == "a") {
      location.href = "/accountAdmin";
    } else if (data.an == "b") {
      location.href = "/accountMitarbeiter";
    } else if (data.an == "c") {
      location.href = "/account";
    }
  }
}

//prototyp
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    sendOn(0);
  }
});

function sendOn(a) {
  if (a == 0) {
    let dataPost = JSON.stringify({
      username: document.getElementById("username").value,
      passwort: document.getElementById("pass").value,
    });

    postRequest("/login", dataPost, setInfo);
  } else {
    location.href = "/registrieren";
  }
}
