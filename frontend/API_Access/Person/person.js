const getRequest = require("./../Request/getRequest");
const postRequest = require("./../Request/postRequest");
const putRequest = require("./../Request/putRequest");

async function getPersonbyId(id) {
  let pa = "/wba2api/person/gib/" + id;
  const b = await getRequest(pa);
  return b;
}

async function getPersonnAll(id){
  let pa = "/wba2api/person/alle";
  const b = await getRequest(pa);
  return b;
}

async function createPerson(data) {
  //console.log("start");
  //console.log(data);
  let pa = "/wba2api/person";
  const b = await postRequest(pa, data);
  return b.id;
}

async function updatePerson(data) {
  let pa = "/wba2api/person";
  const b = await putRequest(pa, data);
  return b.id;
}

module.exports = {
  getPersonbyId,
  getPersonnAll,
  createPerson,
  updatePerson,
};
