const getRequest = require("./../Request/getRequest");
const postRequest = require("./../Request/postRequest");
const putRequest = require("./../Request/putRequest");

async function getAddressbyId(id) {
  let pa = "/wba2api/adresse/gib/" + id;
  const b = await getRequest(pa);
  return b;
}

async function createAddress(data) {
  let pa = "/wba2api/adresse";
  const b = await postRequest(pa, data);
  console.log(b);
  return b.id;
}

async function updateAddress(data) {
  let pa = "/wba2api/adresse";
  const b = await putRequest(pa, data);
  console.log(b);
  return b.id;
}

module.exports = {
  getAddressbyId,
  createAddress,
  updateAddress,
};
