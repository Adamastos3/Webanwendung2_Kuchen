const helper = require("../helper.js");

class WarenkorbDao {
  constructor(dbConnection) {
    this._conn = dbConnection;
  }

  getConnection() {
    return this._conn;
  }

  loadById(id) {
    var sql = "SELECT * FROM Warenkorb WHERE BenutzerID=?";
    var statement = this._conn.prepare(sql);
    var result = statement.get(id);

    if (helper.isUndefined(result))
      throw new Error("No Record found by id=" + id);

    result = helper.objectKeysToLower(result);

    return result;
  }

  loadAll() {
    var sql = "SELECT * FROM Warenkorb";
    var statement = this._conn.prepare(sql);
    var result = statement.all();

    if (helper.isArrayEmpty(result)) return [];

    result = helper.arrayObjectKeysToLower(result);

    return result;
  }

  exists(id) {
    var sql = "SELECT COUNT(ID) AS cnt FROM Warenkorb WHERE BenutzerID=?";
    var statement = this._conn.prepare(sql);
    var result = statement.get(id);

    if (result.cnt == 1) return true;

    return false;
  }

  create(benutzerid = "", warenkorb = "") {
    var sql = "INSERT INTO Warenkorb (BenutzerID,Warenkorb) VALUES (?,?)";
    var statement = this._conn.prepare(sql);
    var params = [benutzerid, warenkorb];
    var result = statement.run(params);

    if (result.changes != 1)
      throw new Error("Could not insert new Record. Data: " + params);

    var newObj = this.loadById(result.lastInsertRowid);
    return newObj;
  }

  update(id, benutzerid, warenkorb) {
    var sql = "UPDATE Warenkorb SET BenutzerID=?,Warenkorb=? WHERE ID=?";
    var statement = this._conn.prepare(sql);
    var params = [benutzerid, warenkorb, id];

    var result = statement.run(params);

    if (result.changes != 1)
      throw new Error("Could not update existing Record. Data: " + params);

    var updatedObj = this.loadById(id);
    return updatedObj;
  }

  delete(id) {
    try {
      var sql = "DELETE FROM Warenkorb WHERE ID=?";
      var statement = this._conn.prepare(sql);
      var result = statement.run(id);

      if (result.changes != 1)
        throw new Error("Could not delete Record by id=" + id);

      return true;
    } catch (ex) {
      throw new Error(
        "Could not delete Record by id=" + id + ". Reason: " + ex.message
      );
    }
  }

  toString() {
    helper.log("WarenkorbDao [_conn=" + this._conn + "]");
  }
}

module.exports = WarenkorbDao;
