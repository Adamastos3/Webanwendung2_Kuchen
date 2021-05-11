const form = document.getElementById("form");
var timer1 = null;
const pathIndi = "http://localhost:3000/sortimentI/api";

/*
function start(a, b) {
  console.log(b);
  blink(a);
  bildChange(b);
}
*/

function addSum() {
  let result = 0;
  let mehrwert = 0;
  let sum = 0;
  let summ = document.getElementById("summe");
  let mehr = document.getElementById("mehrwert");
  let gesamt = document.getElementById("gesamtsumme");

  let a = Number(document.getElementById("select1").innerHTML.substr(-15, 5));
  let b = Number(document.getElementById("select2").innerHTML.substr(-15, 5));
  let c = Number(document.getElementById("select3").innerHTML.substr(-15, 5));
  let d = Number(document.getElementById("select4").innerHTML.substr(-15, 5));

  console.log(d);
  result = Math.round((a + b + c + d) * 1000) / 1000;

  sum = Math.round(((result * 100) / 107) * 1000) / 1000;
  console.log(sum);
  mehrwert = Math.round((result - sum) * 1000) / 1000;
  console.log(mehrwert);
  summ.innerHTML = sum + "€";
  mehr.innerHTML = mehrwert + "€";
  gesamt.innerHTML = result + "€";
}

/*
function bildChange(a) {
  let bild = document.getElementById("bildMaterial");
  let topping = document.getElementById("topping");
  let topping2 = document.getElementById("topping2");
  let middle = document.getElementById("middle");
  let bottom = document.getElementById("bottom");
  //Top
  if (a == "01") {
    bild.src = "../public/img/erdbeeren2.png";
    topping.style.filter =
      "brightness(0%) invert(14%) sepia(47%) saturate(5789%) hue-rotate(353deg) brightness(106%) contrast(82%)";
  }
  if (a == "02") {
    bild.src = "../public/img/himbeeren.jpeg";
    topping.style.filter =
      "brightness(0%) invert(53%) sepia(19%) saturate(1585%) hue-rotate(282deg) brightness(104%) contrast(103%)";
  }
  if (a == "03") {
    bild.src = "../public/img/schokolade.png";
    topping.style.filter =
      "brightness(0%) invert(26%) sepia(76%) saturate(552%) hue-rotate(344deg) brightness(101%) contrast(95%)";
  }
  if (a == "04") {
    bild.src = "../public/img/sahne.jpeg";
    topping.style.filter =
      "brightness(0%) invert(97%) sepia(2%) saturate(3603%) hue-rotate(179deg) brightness(100%) contrast(101%)";
  }
  //Top2
  if (a == "05") {
    bild.src = "../public/img/schokolade.png";
    topping2.style.filter =
      "brightness(0%) invert(26%) sepia(76%) saturate(552%) hue-rotate(344deg) brightness(101%) contrast(95%)";
  }
  if (a == "06") {
    bild.src = "../public/img/weißeSchokolade.jpeg";
    topping2.style.filter =
      "brightness(0%) invert(93%) sepia(10%) saturate(1230%) hue-rotate(318deg) brightness(105%) contrast(103%)";
  }
  if (a == "07") {
    bild.src = "../public/img/creme.jpeg";
    topping2.style.filter =
      "brightness(0%) invert(89%) sepia(6%) saturate(1414%) hue-rotate(348deg) brightness(115%) contrast(96%)";
  }
  if (a == "08") {
    bild.src = "../public/img/schokolade.png";
    topping2.style.filter =
      "brightness(0%) invert(33%) sepia(53%) saturate(1313%) hue-rotate(355deg) brightness(98%) contrast(89%)";
  }
  //Middle
  if (a == "09") {
    bild.src = "../public/img/schokolade.png";
    middle.style.filter =
      "brightness(0%) invert(26%) sepia(76%) saturate(552%) hue-rotate(344deg) brightness(101%) contra";
  }
  if (a == "10") {
    bild.src = "../public/img/weißeSchokolade.jpeg";
    middle.style.filter =
      "brightness(0%) invert(93%) sepia(10%) saturate(1230%) hue-rotate(318deg) brightness(105%) contrast(103%)";
  }
  if (a == "11") {
    bild.src = "../public/img/erdbeercreme.jpeg";
    middle.style.filter =
      "brightness(0%) invert(90%) sepia(13%) saturate(4986%) hue-rotate(305deg) brightness(96%) contrast(89%)";
  }
  if (a == "12") {
    bild.src = "../public/img/erdbeercreme.jpeg";
    middle.style.filter =
      "brightness(0%) invert(80%) sepia(91%) saturate(6168%) hue-rotate(288deg) brightness(104%) contrast(121%)";
  }
  //Bottom
  if (a == "13") {
    bild.src = "../public/img/kuchenboden.jpeg";
    bottom.style.filter =
      "brightness(0%) invert(62%) sepia(98%) saturate(301%) hue-rotate(338deg) brightness(99%) contrast(93%)";
  }
  if (a == "14") {
    bild.src = "../public/img/kuchenboden.jpeg";
    bottom.style.filter =
      "brightness(0%) invert(62%) sepia(98%) saturate(301%) hue-rotate(338deg) brightness(99%) contrast(93%)";
  }
  if (a == "15") {
    bild.src = "../public/img/schokoladenboden.jpeg";
    bottom.style.filter =
      "brightness(0%) invert(38%) sepia(49%) saturate(743%) hue-rotate(334deg) brightness(86%) contrast(88%)";
  }
  if (a == "16") {
    bild.src = "../public/img/schokoladenboden.jpeg";
    bottom.style.filter =
      "brightness(0%) invert(38%) sepia(49%) saturate(743%) hue-rotate(334deg) brightness(86%) contrast(88%)";
  }
}
*/
function blink(a) {
  
  let bild = document.getElementById(a);
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

//Prototype

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
  console.log(sessionStorage);
  storeAnzeigen();
}

///test

//Zu viel speicher benötigt
function setzenHTMLIndi(data) {
  console.log("setze");
  let table = document.getElementById("tableIndi");
  let bild = document.getElementById("bildMaterial");

  /*let top = [];
  let aussen = [];
  let fuel = [];
  let boden = [];
  console.log("testtest");

  for (let i = 0; i < data.length; i < 0) {
    if (data[i].kategorie.id == 1) {
      top.push(data[i]);
    }
    if (data[i].kategorie.id == 2) {
      aussen.push(data[i]);
    }
    if (data[i].kategorie.id == 3) {
      fuel.push(data[i]);
    }
    if (data[i].kategorie.id == 4) {
      boden.push(data[i]);
    }
  }
*/
  console.log("testtest");
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
      if (bildid == 0) {
        bild.src = data[i].bilder[0].bildpfad;
      }
      bildid++;
      text +=
        "<option value='" +
        data[i].id +
        "'><p>" +
        data[i].bezeichnung +
        "  " +
        data[i].bruttopreis +
        "€</p></option>";
    }
  }

  console.log("testetstst");

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
        data[i].bruttopreis +
        "€</p></option>";
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
        data[i].bruttopreis +
        "€</p></option>";
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
        data[i].bruttopreis +
        "€</p></option>";
    }
  }

  text += "</select> </td> </tr>";

  table.innerHTML += text;

  addSum();
}

function start(a, id) {
  console.log(id);
  let path = "http://localhost:3000/sortimentI/api/" + id;
  console.log(a);
  blink(a);
  console.log(path);
  getRequest(path, picturesChange);
}

function picturesChange(data) {
  let x = document.getElementById("bildMaterial");
  let s = data.bilder[0].bildpfad;

  x.src = s;
  //addSum();
}

async function requestIndi(id) {
  return new Promise((resolve, reject) => {
    var requestIndi = new XMLHttpRequest();
    requestIndi.open("GET", "http://localhost:3000/sortimentI/api/" + id);
    requestIndi.onload = function () {
      let data = JSON.parse(requestIndi.responseText);
      console.log(data);
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
