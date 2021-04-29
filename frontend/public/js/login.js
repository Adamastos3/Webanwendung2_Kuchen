function setInfo() {
  let text = document.getElementById("info");
  let a = cookies();
  console.log(a);
  console.log(text);
  if (a[0] != 0) {
    text.innerHTML =
      "Bitte geben Sie aus Sicherheitsgründen Ihre Anmeldedaten nochmals ein";
  } else {
    text.style.display = "none";
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
    document.forms.form.submit();
  } else {
    location.href = "/registrieren";
  }
}

setInfo();
