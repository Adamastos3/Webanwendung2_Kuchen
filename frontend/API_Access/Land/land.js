const request = require("../Request/request");

const auth = "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";

async function getLandById(id) {
  const pa = "/wba2api/land/gib/" + id + auth;
  const b = request.getRequest(pa);
  return b;
}

async function createLand(data) {
  const pa = "/wba2api/land" + auth;
  const b = await request.postRequest(pa, data);
  return b;
}

module.exports = {
  getLandById,
  createLand,
};
