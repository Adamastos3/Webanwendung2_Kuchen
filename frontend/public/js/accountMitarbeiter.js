function logout() {
  sessionStorage.clear;
  deleteCookie("kc");
  deleteCookie("kn");
  location.href = "/logout";
}

function change(id) {
  if (id == 1) {
    location.href = "/passwortAendern";
  } else if (id == 2) {
    location.href = "/ihreDatenMitarbeiter";
  } else if (id == 3) {
    location.href = "/ausstehendeBestellungen";
  }
}
