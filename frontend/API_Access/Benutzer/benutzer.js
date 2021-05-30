const request = require("../Request/request");

const pas = "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";

async function getBenutzerbyId(id) {
  let pa = "/wba2api/benutzer/gib/" + id + pas;
  const b = await request.getRequest(pa);

  return b;
}

async function getBenutzerAll() {
  let pa = "/wba2api/benutzer/alle" + pas;
  const b = await request.getRequest(pa);
  return b;
}

async function createBenutzer(data) {
  let pa = "/wba2api/benutzer" + pas;
  const b = await request.postRequest(pa, data);

  return b;
}

async function checkBenutzer(data) {
  let pa = "/wba2api/benutzer/eindeutig" + pas;
  const b = await request.getRequest(pa, data);
  console.log(b);
  return b.daten.eindeutig;
}

async function checkBenutzerUndPassword(data) {
  let pa = "/wba2api/benutzer/zugang" + pas;
  const b = await request.getRequest(pa, data);
  console.log(b);
  if (b == null) {
    return 0;
  } else {
    return b;
  }
}

async function updateBenutzer(data) {
  let pa = "/wba2api/benutzer" + pas;
  const b = await request.putRequest(pa, data);
  console.log(b);
  return b.id;
}

async function deleteBenutzer(id) {
  let pa = "/wba2api/benutzer/" + id + pas;
  const b = await request.deleteRequest(pa);
  console.log(b);
  return b;
}

module.exports = {
  getBenutzerbyId,
  getBenutzerAll,
  createBenutzer,
  checkBenutzer,
  checkBenutzerUndPassword,
  updateBenutzer,
  deleteBenutzer,
};
