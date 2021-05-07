const helper = require("../helper.js");

class IndividuellesBildDao {
  constructor(dbConnection) {
    this._conn = dbConnection;
  }

  getConnection() {
    return this._conn;
  }

  loadById(id) {
    var sql = "SELECT * FROM IndividuellesBild WHERE ID=?";
    var statement = this._conn.prepare(sql);
    var result = statement.get(id);

    if (helper.isUndefined(result))
      throw new Error("No Record found by id=" + id);

    result = helper.objectKeysToLower(result);

    result.individuelles = { id: result.individuellesid };
    delete result.individuellesid;

    return result;
  }

  loadAll() {
    var sql = "SELECT * FROM IndividuellesBild";
    var statement = this._conn.prepare(sql);
    var result = statement.all();

    if (helper.isArrayEmpty(result)) return [];

    result = helper.arrayObjectKeysToLower(result);

    for (var i = 0; i < result.length; i++) {
      result[i].individuelles = { id: result[i].individuellesid };
      delete result[i].individuellesid;
    }

    return result;
  }

  loadByParent(id) {
    var sql = "SELECT * FROM IndividuellesBild WHERE individuellesID=?";
    var statement = this._conn.prepare(sql);
    var result = statement.all(id);

    if (helper.isArrayEmpty(result)) return [];

    result = helper.arrayObjectKeysToLower(result);

    for (var i = 0; i < result.length; i++) {
      result[i].individuelles = { id: result[i].individuellesid };
      delete result[i].individuellesid;
    }

    return result;
  }

  exists(id) {
    var sql = "SELECT COUNT(ID) AS cnt FROM IndividuellesBild WHERE ID=?";
    var statement = this._conn.prepare(sql);
    var result = statement.get(id);

    if (result.cnt == 1) return true;

    return false;
  }

  create(bildpfad = "", individuellesid = 1) {
    var sql =
      "INSERT INTO IndividuellesBild (Bildpfad,IndividuellesID) VALUES (?,?)";
    var statement = this._conn.prepare(sql);
    var params = [bildpfad, individuellesid];
    var result = statement.run(params);

    if (result.changes != 1)
      throw new Error("Could not insert new Record. Data: " + params);

    var newObj = this.loadById(result.lastInsertRowid);
    return newObj;
  }

  update(id, bildpfad = "", individuellesid = 1) {
    var sql =
      "UPDATE IndividuellesBild SET Bildpfad=?,IndividuellesID=? WHERE ID=?";
    var statement = this._conn.prepare(sql);
    var params = [bildpfad, individuellesid, id];
    var result = statement.run(params);

    if (result.changes != 1)
      throw new Error("Could not update existing Record. Data: " + params);

    var updatedObj = this.loadById(id);
    return updatedObj;
  }

  delete(id) {
    try {
      var sql = "DELETE FROM IndividuellesBild WHERE ID=?";
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

  deleteByParent(id) {
    try {
      var sql = "DELETE FROM IndividuellesBild WHERE IndividuellesID=?";
      var statement = this._conn.prepare(sql);
      var result = statement.run(id);

      return true;
    } catch (ex) {
      throw new Error(
        "Could not delete Records by id=" +
          individuellesid +
          ". Reason: " +
          ex.message
      );
    }
  }

  toString() {
    helper.log("IndividuellesBildDao [_conn=" + this._conn + "]");
  }
}

module.exports = IndividuellesBildDao;
