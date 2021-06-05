function einfügen() {
  var art = document.querySelector("#test");

  var a1 = sessionStorage.getItem("regular");
  var b1 = sessionStorage.getItem("Individual");
  var re = [];
  var indi = [];
  var zahl = 0;
  if (a1 != "n" && a1 != "undefined") {
    if (a1.length == 1) {
      re.push("a");
    } else {
      re = a1.split(",");
    }
  }
  if (b1 != "n") {
    if (b1.length == 1) {
      indi.push("a");
    } else {
      indi = b1.split(",");
    }
  }
  for (let i = 0; i < re.length; i++) {
    let elem = "elem" + zahl + "re";
    let a =
      "<tr id='" +
      elem +
      "'>" +
      "<td><img src='../public/img/cake-example.png' alt=''></td>" +
      "<td><p>Erdbeerkuchen<p>" +
      "<p>leckerer Erdbeerkuchen mit Sahne und Biscuitteig</p></td>" +
      "<td><p class='menge'>1x</p></td>" +
      "<td><p class='preis'>12€</p></td>" +
      "</tr>";
    zahl += 1;
    art.innerHTML += a;
  } //Fügt die Regulären Kucehn ein

  for (let i = 0; i < indi.length; i++) {
    let elem = "elem" + zahl + "in";
    let b =
      "<tr id='" +
      elem +
      "' >" +
      "<td><img src='../public/img/cake-example2.png' alt=''></td>" +
      "<td><p>Individueller kuchen<p>" +
      "<p>Individueller Kuchen nach Ihrer Konfiguration</p></td>" +
      "<td><p class='menge'>1x</p></td>" +
      "<td><p class='preis'>25€</p></td>" +
      "</tr>";
    zahl += 1;
    art.innerHTML += b;
  } //Fügt die Individuellen Kuchen ein
}

function killStorage() {
  sessionStorage.setItem("regular", "undefined");
  sessionStorage.setItem("Individual", "n");
}
einfügen();
//setTimeout(killStorage(), 3000)
