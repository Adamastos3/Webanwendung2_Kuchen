function logout() {
  let path = "http://localhost:3000/logout";
  let regular = sessionStorage.getItem("regular");
  let indi = sessionStorage.getItem("Individual");
  let se = regular + "-" + indi;

  sessionStorage.clear;
  deleteCookie("kc");
  deleteCookie("kn");
  let daten = JSON.stringify({
    benutzerid: null,
    warenkorb: se,
  });

  postRequest(path, daten, setLogout);
}

function setLogout(data) {
  location.href = "/login";
}

function change(id) {
  if (id == 1) {
    location.href = "/passwortAendern";
  } else if (id == 2) {
    location.href = "/bestellhistorie";
  } else if (id == 3) {
    location.href = "/ihreDaten";
  }
}
