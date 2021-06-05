const request = require("../Request/request");
const validator = require("../../Module/Validator/validator");

const auth = "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";

async function getAllProdukt(art) {
  if (art == 1) {
    let path = "http://localhost:8000/wba2api/produkt/alle" + auth;
    const b = await request.getRequest(path);
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

async function createProdukt(data) {
  let path = "http://localhost:8000/wba2api/produkt" + auth;
  const a = await request.postRequest(path, data);
  return a;
}

module.exports = { getAllProdukt, getProduktById, createProdukt };
