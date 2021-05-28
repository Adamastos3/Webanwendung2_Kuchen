const request = require("../Request/request");

const auth = "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";

async function getZahlungAll() {
  const path = "http://localhost:8000/wba2api/zahlungsart/alle" + auth;
  const a = await request.getRequest(path);
  return a;
}

module.exports = { getZahlungAll };
