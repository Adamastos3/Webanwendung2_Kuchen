function setInfo(data) {
  console.log(data);
  let text = document.getElementById("info");
  for (let i = 0; i < data.fehler.length; i++) {
    text.innerHTML += data.fehler[i] + "\n";
  }
  if (data.an == "a") {
    location.href = "/accountAdmin";
  } else if (data.an == "b") {
    location.href = "/account";
  }
}

//prototyp
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    console.log("tetetet");

    e.preventDefault();
    sendOn(0);
  }
});

function sendOn(a) {
  if (a == 0) {
    console.log("submit");
    let dataPost = JSON.stringify({
      username: document.getElementById("username").value,
      passwort: document.getElementById("pass").value,
    });

    console.log(dataPost);
    postRequest("/login", dataPost, setInfo);
    console.log("ende");
  } else {
    location.href = "/registrieren";
  }
}
