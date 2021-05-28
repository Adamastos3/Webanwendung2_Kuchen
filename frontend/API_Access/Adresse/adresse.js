const request = require("../Request/request");
const auth = "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";

async function getAddressbyId(id) {
  let pa = "/wba2api/adresse/gib/" + id + auth;
  const b = await request.getRequest(pa);
  return b;
}

async function createAddress(data) {
  let pa = "/wba2api/adresse" + auth;
  const b = await request.postRequest(pa, data);
  console.log(b);
  return b.id;
}

async function updateAddress(data) {
  let pa = "/wba2api/adresse" + auth;
  const b = await request.putRequest(pa, data);
  console.log(b);
  return b.id;
}

module.exports = {
  getAddressbyId,
  createAddress,
  updateAddress,
};
