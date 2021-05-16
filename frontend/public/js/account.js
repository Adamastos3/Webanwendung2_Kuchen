function logout() {
  let path = "http://localhost:3000/logout";
  let regular = sessionStorage.getItem("regular");
  let indi = sessionStorage.getItem("Individual");
  let se = regular + "-" + indi;
  console.log("se");
  console.log(se);
  sessionStorage.clear;
  deleteCookie("kc");
  deleteCookie("kn");
  let daten = JSON.stringify({
    benutzerid: null,
    warenkorb: se,
  });
  console.log("daten");
  console.log(daten);
  postRequest(path, daten, setLogout);
}

function setLogout(data) {
  location.href = "/login";
}
