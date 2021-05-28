const request = require("../Request/request");

const auth = "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";

async function getPersonbyId(id) {
  let pa = "/wba2api/person/gib/" + id + auth;
  const b = await request.getRequest(pa);
  return b;
}

async function getPersonnAll() {
  let pa = "/wba2api/person/alle" + auth;
  const b = await request.getRequest(pa);
  return b;
}

async function createPerson(data) {
  //console.log("start");
  //console.log(data);
  let pa = "/wba2api/person" + auth;
  const b = await request.postRequest(pa, data);
  return b.id;
}

async function updatePerson(data) {
  let pa = "/wba2api/person" + auth;
  const b = await request.putRequest(pa, data);
  return b.id;
}

module.exports = {
  getPersonbyId,
  getPersonnAll,
  createPerson,
  updatePerson,
};
