const helper = require("../helper.js");
const IndividuelleKategorieDao = require("./individuelleKategorieDao.js");
const MehrwertsteuerDao = require("./mehrwertsteuerDao.js");
const DownloadDao = require("./downloadDao.js");
const ProduktbildDao = require("./produktbildDao.js");

class IndividuellesDao {
  constructor(dbConnection) {
    this._conn = dbConnection;
  }

  getConnection() {
    return this._conn;
  }

  loadById(id) {
    const individuellekategorieDao = new IndividuelleKategorieDao(this._conn);

    const produktbildDao = new ProduktbildDao(this._conn);

    var sql = "SELECT * FROM Individuelles WHERE ID=?";
    var statement = this._conn.prepare(sql);
    var result = statement.get(id);

    if (helper.isUndefined(result))
      throw new Error("No Record found by id=" + id);

    result = helper.objectKeysToLower(result);

    result.kategorie = individuellekategorieDao.loadById(result.kategorieid);
    delete result.kategorieid;
    if (helper.isNull(result.datenblattid)) {
      result.datenblatt = null;
    } else {
      result.datenblatt = downloadDao.loadById(result.datenblattid);
    }
    delete result.datenblattid;
    result.bilder = produktbildDao.loadByParent(result.id);
    for (i = 0; i < result.bilder.length; i++) {
      delete result.bilder[i].produktid;
    }

    result.mehrwertsteueranteil = helper.round(
      (result.nettopreis / 100) * result.mehrwertsteuer.steuersatz
    );

    result.bruttopreis = helper.round(
      result.nettopreis + result.mehrwertsteueranteil
    );

    return result;
  }

  loadAll() {
    const individuellekategorieDao = new IndividuelleKategorieDao(this._conn);
    var categories = individuellekategorieDao.loadAll();
    const mehrwertsteuerDao = new MehrwertsteuerDao(this._conn);
    var taxes = mehrwertsteuerDao.loadAll();
    const produktbildDao = new ProduktbildDao(this._conn);
    var pictures = produktbildDao.loadAll();
    const downloadDao = new DownloadDao(this._conn);

    var sql = "SELECT * FROM Individuelles";
    var statement = this._conn.prepare(sql);
    var result = statement.all();

    if (helper.isArrayEmpty(result)) return [];

    result = helper.arrayObjectKeysToLower(result);

    for (var i = 0; i < result.length; i++) {
      for (var element of categories) {
        if (element.id == result[i].kategorieid) {
          result[i].kategorie = element;
          break;
        }
      }
      delete result[i].kategorieid;

      for (var element of taxes) {
        if (element.id == result[i].mehrwertsteuerid) {
          result[i].mehrwertsteuer = element;
          break;
        }
      }
      delete result[i].mehrwertsteuerid;

      if (helper.isNull(result[i].datenblattid)) {
        result[i].datenblatt = null;
      } else {
        result[i].datenblatt = downloadDao.loadById(result[i].datenblattid);
      }
      delete result[i].datenblattid;

      result[i].bilder = [];
      for (var element of pictures) {
        if (element.produkt.id == result[i].id) {
          result[i].bilder.push(element);
        }
      }

      result[i].mehrwertsteueranteil = helper.round(
        (result[i].nettopreis / 100) * result[i].mehrwertsteuer.steuersatz
      );

      result[i].bruttopreis = helper.round(
        result[i].nettopreis + result[i].mehrwertsteueranteil
      );
    }

    return result;
  }

  exists(id) {
    var sql = "SELECT COUNT(ID) AS cnt FROM Individuelles WHERE ID=?";
    var statement = this._conn.prepare(sql);
    var result = statement.get(id);

    if (result.cnt == 1) return true;

    return false;
  }

  create(
    kategorieid = 1,
    bezeichnung = "",
    beschreibung = "",
    mehrwertsteuerid = 1,
    details = null,
    nettopreis = 0.0,
    datenblattid = null,
    bilder = []
  ) {
    const produktbildDao = new ProduktbildDao(this._conn);

    var sql =
      "INSERT INTO Individuelles (KategorieID,Bezeichnung,Beschreibung,MehrwertsteuerID,Nettopreis,DatenblattID) VALUES (?,?,?,?,?,?)";
    var statement = this._conn.prepare(sql);
    var params = [
      kategorieid,
      bezeichnung,
      beschreibung,
      mehrwertsteuerid,
      nettopreis,
      datenblattid,
    ];
    var result = statement.run(params);

    if (result.changes != 1)
      throw new Error("Could not insert new Record. Data: " + params);

    if (bilder.length > 0) {
      for (var element of bilder) {
        produktbildDao.create(element.bildpfad, result.lastInsertRowid);
      }
    }

    var newObj = this.loadById(result.lastInsertRowid);
    return newObj;
  }

  update(
    id,
    kategorieid = 1,
    bezeichnung = "",
    beschreibung = "",
    mehrwertsteuerid = 1,
    nettopreis = 0.0,
    datenblattid = null,
    bilder = []
  ) {
    const produktbildDao = new ProduktbildDao(this._conn);
    produktbildDao.deleteByParent(id);

    var sql =
      "UPDATE Individuelles SET KategorieID=?,Bezeichnung=?,Beschreibung=?,MehrwertsteuerID=?,Nettopreis=?,DatenblattID=? WHERE ID=?";
    var statement = this._conn.prepare(sql);
    var params = [
      kategorieid,
      bezeichnung,
      beschreibung,
      mehrwertsteuerid,
      nettopreis,
      datenblattid,
      id,
    ];
    var result = statement.run(params);

    if (result.changes != 1)
      throw new Error("Could not update existing Record. Data: " + params);

    if (bilder.length > 0) {
      for (var element of bilder) {
        produktbildDao.create(element.bildpfad, id);
      }
    }

    var updatedObj = this.loadById(id);
    return updatedObj;
  }

  delete(id) {
    try {
      const produktbildDao = new ProduktbildDao(this._conn);
      produktbildDao.deleteByParent(id);

      var sql = "DELETE FROM Individuelles WHERE ID=?";
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
    helper.log("IndividuellesDao [_conn=" + this._conn + "]");
  }
}

module.exports = IndividuellesDao;
