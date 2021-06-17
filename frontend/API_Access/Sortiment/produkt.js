const request = require("../Request/request");
const validator = require("../../Module/Validator/validator");

const auth = "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";

async function getAllProdukt(art, ka = undefined) {
  if (art == 1) {
    let path = "http://localhost:8000/wba2api/produkt/alle" + auth;
    const b = await request.getRequest(path);
    console.log(b);
    if (ka != undefined) {
      return getKategorieEins(b);
    }
    return b;
  }

  if (art == 2) {
    let path = "http://localhost:8000/wba2api/individuelles/alle" + auth;
    const b = await request.getRequest(path);
    return b;
  }
}

async function getProduktById(art, id) {
  const check = await validator.checkProdukt(id);
  if (art == 1 && check.length < 1) {
    let path = "http://localhost:8000/wba2api/produkt/gib/" + id + auth;
    const b = await request.getRequest(path);
    return b;
  }

  if (art == 2 && check.length < 1) {
    let path = "http://localhost:8000/wba2api/individuelles/gib/" + id + auth;
    const b = await request.getRequest(path);
    return b;
  }

  return { fehler: check, daten: null };
}

async function getDatenblattById(id) {
  const check = await validator.checkProdukt(id);
  let path = "http://localhost:8000/wba2api/download/gib/" + id + auth;
  const b = await request.getRequest(path);
  return b;
}

async function createProdukt(data) {
  let path = "http://localhost:8000/wba2api/produkt" + auth;
  const a = await request.postRequest(path, data);
  return a;
}

async function createDatenblatt(data) {
  let path = "http://localhost:8000/wba2api/download" + auth;
  const a = await request.postRequest(path, data);
  return a;
}

async function changeProdukt(data) {
  let path = "http://localhost:8000/wba2api/produkt" + auth;
  const a = await request.putRequest(path, data);
  return a;
}

async function changeDatenblatt(data) {
  let path = "http://localhost:8000/wba2api/download" + auth;
  const a = await request.putRequest(path, data);
  return a;
}

async function deleteProdukt(id) {
  let path = "http://localhost:8000/wba2api/produkt/" + id + auth;
  const a = await request.deleteRequest(path);
  console.log(a);
  return a;
}

function getKategorieEins(data) {
  console.log("TEst");
  console.log(data);
  let daten = [];
  for (let i = 0; i < data.daten.length; i++) {
    if (data.daten[i].kategorie.id == 1 && data.daten[i].geloescht == 0) {
      daten.push(data.daten[i]);
    }
  }
  console.log(daten);
  return JSON.stringify({ daten: daten });
}

module.exports = {
  getAllProdukt,
  getProduktById,
  createProdukt,
  deleteProdukt,
  createDatenblatt,
  getDatenblattById,
  changeDatenblatt,
  changeProdukt,
};
