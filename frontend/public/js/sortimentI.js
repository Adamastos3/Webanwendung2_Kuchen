const form = document.getElementById("form");
var timer1 = null;
const pathIndi = "http://localhost:3000/sortimentI/api";

function addSum() {
  let result = 0;
  let mehrwert = 0;
  let sum = 0;
  let summ = document.getElementById("summe");
  let mehr = document.getElementById("mehrwert");
  let gesamt = document.getElementById("gesamtsumme");

  let a = changePreis(
    document.getElementById("select1").innerHTML.substr(-16, 6)
  );

  let b = changePreis(
    document.getElementById("select2").innerHTML.substr(-16, 6)
  );

  let c = changePreis(
    document.getElementById("select3").innerHTML.substr(-16, 6)
  );

  let d = changePreis(
    document.getElementById("select4").innerHTML.substr(-16, 6)
  );

  result = Math.round((a + b + c + d) * 100) / 100;

  sum = Math.round(((result * 100) / 107) * 100) / 100;

  mehrwert = Math.round((result - sum) * 100) / 100;

  summ.innerHTML = setPreis("" + sum) + "€";
  mehr.innerHTML = setPreis("" + mehrwert) + "€";
  gesamt.innerHTML = setPreis("" + result) + "€";
}

function blink(a) {
  setInfoText(a);
  let bild = document.getElementById(a);
  let b = document.getElementById("bilder");
  
  if (timer1 != null) {
    clearInterval(timer1);
    document.getElementById("topping").style.visibility = "visible";
    document.getElementById("topping2").style.visibility = "visible";
    document.getElementById("middle").style.visibility = "visible";
    document.getElementById("bottom").style.visibility = "visible";
  }
  timer1 = setInterval(() => {
    if (bild.style.visibility === "visible") {
      bild.style.visibility = "hidden";
    } else {
      bild.style.visibility = "visible";
    }
  }, 1000);
}

function setInfoText(info) {
  let text = document.getElementById("infoText");
  text.style.color = "white";
  text.style.fontSize = "110%";
  if (info == "topping") {
    let s = "Sie bearbeiten gerade das Topping des Kuchens";
    text.innerHTML = s;
  } else if (info == "topping2") {
    let s = "Sie bearbeiten gerade die Außenschicht des Kuchens";
    text.innerHTML = s;
  } else if (info == "middle") {
    let s = "Sie bearbeiten gerade die Füllung des Kuchens";
    text.innerHTML = s;
  } else if (info == "bottom") {
    let s = "Sie bearbeiten gerade den Boden des Kuchens";
    text.innerHTML = s;
  }
}

function sendOn() {
  store();
  document.forms.form.reset();
  clearInterval(timer1);
}

function store() {
  let elem = "";
  let er = [];
  er.push(document.getElementById("select1").value);
  er.push(document.getElementById("select2").value);
  er.push(document.getElementById("select3").value);
  er.push(document.getElementById("select4").value);
  er.push(1);

  for (let i = 0; i < er.length; i++) {
    if (i + 1 != er.length) {
      if (er[i] < 10) {
        elem += "000" + er[i] + "/";
      } else if (er[i] < 100) {
        elem += "00" + er[i] + "/";
      } else if (er[i] < 1000) {
        elem += "0" + er[i] + "/";
      } else {
        elem += er[i] + "/";
      }
    } else {
      elem += er[i];
    }
  }

  if (sessionStorage.getItem("Individual") == "") {
    sessionStorage.setItem("Individual", elem);
  } else {
    let individual = sessionStorage.getItem("Individual").split(",");
    individual.push(elem);
    sessionStorage.setItem("Individual", individual);
  }

  storeAnzeigen();
}

//Kann zu viel speicher benötigen
function setzenHTMLIndi(data) {
  let table = document.getElementById("tableIndi");
  let bildid = 0;
  let text = "";
  text +=
    "<tr> <td colspan='1'><label for=''>Topping</label></td> </tr> <tr> <td colspan='1'>" +
    "<select " +
    "onclick=start('topping',value) " +
    "id='select1'" +
    "class='dropdown'>";

  for (let i = 0; i < data.length; i++) {
    if (data[i].kategorie.id == 1) {
      //if (bildid == 0) {
      // bild.src = data[i].bilder[0].bildpfad;
      //}
      // bildid++;
      text +=
        "<option value='" +
        data[i].id +
        "'><p>" +
        data[i].bezeichnung +
        "  " +
        setPreis(data[i].bruttopreis) +
        " €</p></option>";
    }
  }

  text +=
    "</select> </td> </tr>" +
    " <tr> <td colspan='1'><label for=''>Außenschicht</label></td> </tr> <tr> <td colspan='1'>" +
    "<select " +
    "onclick=start('topping2',value) " +
    "id='select2'>";

  for (let i = 0; i < data.length; i++) {
    if (data[i].kategorie.id == 2) {
      text +=
        "<option value='" +
        data[i].id +
        "'><p>" +
        data[i].bezeichnung +
        "  " +
        setPreis(data[i].bruttopreis) +
        " €</p></option>";
    }
  }

  text +=
    "</select> </td> </tr> <tr> <td colspan='1'><label for=''>Füllung</label></td> </tr> <tr> <td colspan='1'>" +
    "<select " +
    "onclick=start('middle',value) " +
    "id='select3'>";

  for (let i = 0; i < data.length; i++) {
    if (data[i].kategorie.id == 3) {
      text +=
        "<option value='" +
        data[i].id +
        "'><p>" +
        data[i].bezeichnung +
        "  " +
        setPreis(data[i].bruttopreis) +
        " €</p></option>";
    }
  }

  text +=
    "</select> </td> </tr> <tr> <td colspan='1'><label for=''>Boden</label></td> </tr> <tr> <td colspan='1'> " +
    "<select " +
    "onclick= start('bottom',value) " +
    "id='select4'>";

  for (let i = 0; i < data.length; i++) {
    if (data[i].kategorie.id == 4) {
      text +=
        "<option value='" +
        data[i].id +
        "'><p>" +
        data[i].bezeichnung +
        "  " +
        setPreis(data[i].bruttopreis) +
        " €</p></option>";
    }
  }

  text += "</select> </td> </tr>";

  table.innerHTML += text;

  addSum();
}

function start(a, id) {
  let path = "http://localhost:3000/sortimentI/api/" + id;

  blink(a);

  getRequest(path, picturesChange, a);
}

function picturesChange(data, info) {
  if (info == "topping") {
    let x = document.getElementById("toppingPicture");
    let s = data.bilder[0].bildpfad;

    x.src = s;
  } else if (info == "topping2") {
    let x = document.getElementById("aussenPicture");
    let s = data.bilder[0].bildpfad;

    x.src = s;
  } else if (info == "middle") {
    let x = document.getElementById("fuellPicture");
    let s = data.bilder[0].bildpfad;

    x.src = s;
  } else if (info == "bottom") {
    let x = document.getElementById("bottomPicture");
    let s = data.bilder[0].bildpfad;

    x.src = s;
  }

  //addSum();
}

async function requestIndi(id) {
  return new Promise((resolve, reject) => {
    var requestIndi = new XMLHttpRequest();
    requestIndi.open("GET", "http://localhost:3000/sortimentI/api/" + id);
    requestIndi.onload = function () {
      let data = JSON.parse(requestIndi.responseText);

      if (data.daten != null) {
        resolve(data.daten);
      } else {
        reject(data.fehler);
      }
    };
    requestIndi.send();
  });
}

getRequest(pathIndi, setzenHTMLIndi);
