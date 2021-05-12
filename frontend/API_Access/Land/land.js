const getRequest = require("../Request/getRequest");
const postRequest = require("../Request/postRequest");

const auth = "/6IyJY6Ri18lhIgNvT-_ec.zJfXz3bkEKnan0zEy_tjfUtPO~7A4nCje9GMFa";

async function getLandById(id) {
  const pa = "/wba2api/land/gib/" + id + auth;
  const b = getRequest(pa);
}

async function createLand(data) {
  const pa = "/wba2api/land" + auth;
  const b = await postRequest(pa, data);
}

module.exports = {
  getLandById,
};
