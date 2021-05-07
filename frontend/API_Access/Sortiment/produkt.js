const getRequest = require("../Request/getRequest");
const validator = require("../../Module/Validator/validator");

const auth = "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";

async function getAllProdukt(art) {
  if (art == 1) {
    let path = "http://localhost:8000/wba3api/produkt/alle" + auth;
    const b = await getRequest(path);
    return b;
  }

  if (art == 2) {
    let path = "http://localhost:8000/wba2api/individuelles/alle" + auth;
    const b = await getRequest(path);
    return b;
  }
}

async function getProduktById(art, id) {
  const check = await validator.checkProdukt(id);

  if (art == 1 && check.length < 1) {
    let path = "http://localhost:8000/wba2api/produkt/gib/" + id + "/" + auth;
    const b = await getRequest(path);
    return b;
  }

  if (id == 2 && check.length < 1) {
    let path =
      "http://localhost:8000/wba2api/individuelles/gib/" + id + "/" + auth;
    const b = await getRequest(path);
    return b;
  }

  return { fehler: check, daten: null };
}

module.exports = { getAllProdukt, getProduktById };
