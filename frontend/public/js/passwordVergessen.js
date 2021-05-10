const form = document.getElementById("form");

//prototyp
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function submitten() {
  let path = "http://localhost:3000/passwordVergessen";
  console.log("submit");
  let data = JSON.stringify({
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
  });
  postRequest(path, data, setInfo);
}

function setInfo(data) {
  console.log(data);
  if (data.fehler == null) {
    alert("Eine Mail mit dem Passwort wurde gesendet");
  } else {
    let text = "";
    for (let i = 0; i < data.fehler.length; i++) {
      text += data.fehler[i].bezeichnung + "\n";
    }
    alert(text);
  }
}
