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
  getRequestWithData(path, daten);
}
