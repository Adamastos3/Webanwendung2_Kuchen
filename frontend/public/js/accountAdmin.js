function logout() {
  sessionStorage.clear;
  deleteCookie("kc");
  deleteCookie("kn");
  deleteCookie("pd");
  location.href = "/logout";
}

function change(id) {
  if (id == 1) {
    location.href = "/passwortAendern";
  } else if (id == 2) {
    location.href = "/ausstehendeBestellungen";
  } else if (id == 3) {
    location.href = "/kundendaten";
  } else if (id == 4) {
    location.href = "/produktdaten";
  }
}
