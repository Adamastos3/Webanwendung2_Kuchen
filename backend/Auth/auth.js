const md5 = require("md5");
const helper = require("../helper.js");

function checkAuth(dbConnection, id) {
  var sql = "SELECT * FROM Zugang WHERE ZugangID=?";
  var statement = dbConnection.prepare(sql);
  var result = statement.get(md5(id));
  console.log(result);
  if (helper.isUndefined(result)) {
    return false;
  } else {
    helper.log("Auf die API zugreifen will " + result.bezeichnung);
    helper.log("Die ID ist " + result.id);
    return true;
  }
}

function createZugang(dbConnection, bezeichnung, safeString) {
  var sql = "INSERT INTO Zugang (Bezeichnung,ZugangID) VALUES (?,?)";
  var statement = dbConnection.prepare(sql);
  var params = [bezeichnung, md5(safeString)];
  var result = statement.run(params);
  if (result.changes != 1)
    throw new Error("Could not insert new Record. Data: " + params);

  return safeString;
}

module.exports = { checkAuth, createZugang };
