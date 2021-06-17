const helper = require("../helper.js");
const ProduktDao = require("../dao/produktDao.js");
const express = require("express");
const auth = require("../Auth/auth.js");
var serviceRouter = express.Router();

helper.log("- Service Produkt");

serviceRouter.get("/produkt/gib/:id/:zugang", function (request, response) {
  helper.log(
    "Service Produkt: Client requested one record, id=" + request.params.id
  );
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const produktDao = new ProduktDao(request.app.locals.dbConnection);
    try {
      var result = produktDao.loadById(request.params.id);
      helper.log("Service Produkt: Record loaded");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Produkt: Error loading record by id. Exception occured: " +
          ex.message
      );
      response.status(400).json(helper.jsonMsgError(ex.message));
    }
  } else {
    const errorMessage = "Authentification is not given";
    helper.logError(errorMessage);

    response.status(401).json(helper.jsonMsgError(errorMessage));
  }
});

serviceRouter.get("/produkt/alle/:zugang", function (request, response) {
  helper.log("Service Produkt: Client requested all records");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const produktDao = new ProduktDao(request.app.locals.dbConnection);
    try {
      var result = produktDao.loadAll();
      helper.log("Service Produkt: Records loaded, count=" + result.length);
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Produkt: Error loading all records. Exception occured: " +
          ex.message
      );
      response.status(400).json(helper.jsonMsgError(ex.message));
    }
  } else {
    const errorMessage = "Authentification is not given";
    helper.logError(errorMessage);

    response.status(401).json(helper.jsonMsgError(errorMessage));
  }
});

serviceRouter.get(
  "/produkt/existiert/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Produkt: Client requested check, if record exists, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const produktDao = new ProduktDao(request.app.locals.dbConnection);
      try {
        var result = produktDao.exists(request.params.id);
        helper.log(
          "Service Produkt: Check if record exists by id=" +
            request.params.id +
            ", result=" +
            result
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ id: request.params.id, existiert: result }));
      } catch (ex) {
        helper.logError(
          "Service Produkt: Error checking if record exists. Exception occured: " +
            ex.message
        );
        response.status(400).json(helper.jsonMsgError(ex.message));
      }
    } else {
      const errorMessage = "Authentification is not given";
      helper.logError(errorMessage);

      response.status(401).json(helper.jsonMsgError(errorMessage));
    }
  }
);

serviceRouter.post("/produkt/:zugang", function (request, response) {
  helper.log("Service Produkt: Client requested creation of new record");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.bezeichnung))
      errorMsgs.push("bezeichnung fehlt");
    if (helper.isUndefined(request.body.beschreibung))
      request.body.beschreibung = "";
    if (helper.isUndefined(request.body.details)) request.body.details = null;
    if (helper.isUndefined(request.body.nettopreis))
      errorMsgs.push("nettopreis fehlt");
    if (!helper.isNumeric(request.body.nettopreis))
      errorMsgs.push("nettopreis muss eine Zahl sein");
    if (helper.isUndefined(request.body.kategorie)) {
      errorMsgs.push("kategorie fehlt");
    } else if (helper.isUndefined(request.body.kategorie.id)) {
      errorMsgs.push("kategorie gesetzt, aber id fehlt");
    }
    if (helper.isUndefined(request.body.mehrwertsteuer)) {
      errorMsgs.push("mehrwertsteuer fehlt");
    } else if (helper.isUndefined(request.body.mehrwertsteuer.id)) {
      errorMsgs.push("mehrwertsteuer gesetzt, aber id fehlt");
    }
    if (helper.isUndefined(request.body.datenblatt)) {
      request.body.datenblatt = null;
    } else if (helper.isUndefined(request.body.datenblatt.id)) {
      errorMsgs.push("datenblatt gesetzt, aber id fehlt");
    } else {
      request.body.datenblatt = request.body.datenblatt.id;
    }
    if (helper.isUndefined(request.body.bilder)) request.body.bilder = [];

    if (errorMsgs.length > 0) {
      helper.log("Service Produkt: Creation not possible, data missing");
      response
        .status(400)
        .json(
          helper.jsonMsgError(
            "Hinzufügen nicht möglich. Fehlende Daten: " +
              helper.concatArray(errorMsgs)
          )
        );
      return;
    }

    const produktDao = new ProduktDao(request.app.locals.dbConnection);
    try {
      var result = produktDao.create(
        request.body.kategorie.id,
        request.body.bezeichnung,
        request.body.beschreibung,
        request.body.mehrwertsteuer.id,
        request.body.details,
        request.body.nettopreis,
        request.body.datenblatt,
        request.body.bilder
      );
      helper.log("Service Produkt: Record inserted");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Produkt: Error creating new record. Exception occured: " +
          ex.message
      );
      response.status(400).json(helper.jsonMsgError(ex.message));
    }
  } else {
    const errorMessage = "Authentification is not given";
    helper.logError(errorMessage);

    response.status(401).json(helper.jsonMsgError(errorMessage));
  }
});

serviceRouter.put("/produkt/:zugang", function (request, response) {
  helper.log("Service Produkt: Client requested update of existing record");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.id)) errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.bezeichnung))
      errorMsgs.push("bezeichnung fehlt");
    if (helper.isUndefined(request.body.beschreibung))
      request.body.beschreibung = "";
    if (helper.isUndefined(request.body.details)) request.body.details = null;
    if (helper.isUndefined(request.body.nettopreis))
      errorMsgs.push("nettopreis fehlt");
    if (!helper.isNumeric(request.body.nettopreis))
      errorMsgs.push("nettopreis muss eine Zahl sein");
    if (helper.isUndefined(request.body.geloescht))
      errorMsgs.push("geloescht fehlt");
    if (!helper.isNumeric(request.body.geloescht))
      errorMsgs.push("geloescht muss eine Zahl sein");
    if (helper.isUndefined(request.body.kategorie)) {
      errorMsgs.push("kategorie fehlt");
    } else if (helper.isUndefined(request.body.kategorie.id)) {
      errorMsgs.push("kategorie gesetzt, aber id fehlt");
    }
    if (helper.isUndefined(request.body.mehrwertsteuer)) {
      errorMsgs.push("mehrwertsteuer fehlt");
    } else if (helper.isUndefined(request.body.mehrwertsteuer.id)) {
      errorMsgs.push("mehrwertsteuer gesetzt, aber id fehlt");
    }
    if (helper.isUndefined(request.body.datenblatt)) {
      request.body.datenblatt = null;
    } else if (helper.isUndefined(request.body.datenblatt.id)) {
      errorMsgs.push("datenblatt gesetzt, aber id fehlt");
    } else {
      request.body.datenblatt = request.body.datenblatt.id;
    }
    if (helper.isUndefined(request.body.bilder)) request.body.bilder = [];

    if (errorMsgs.length > 0) {
      helper.log("Service Produkt: Update not possible, data missing");
      response
        .status(400)
        .json(
          helper.jsonMsgError(
            "Update nicht möglich. Fehlende Daten: " +
              helper.concatArray(errorMsgs)
          )
        );
      return;
    }

    const produktDao = new ProduktDao(request.app.locals.dbConnection);
    try {
      var result = produktDao.update(
        request.body.id,
        request.body.kategorie.id,
        request.body.bezeichnung,
        request.body.beschreibung,
        request.body.mehrwertsteuer.id,
        request.body.details,
        request.body.nettopreis,
        request.body.datenblatt,
        request.body.geloescht,
        request.body.bilder
      );
      helper.log("Service Produkt: Record updated, id=" + request.body.id);
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Produkt: Error updating record by id. Exception occured: " +
          ex.message
      );
      response.status(400).json(helper.jsonMsgError(ex.message));
    }
  } else {
    const errorMessage = "Authentification is not given";
    helper.logError(errorMessage);

    response.status(401).json(helper.jsonMsgError(errorMessage));
  }
});

serviceRouter.delete("/produkt/:id/:zugang", function (request, response) {
  helper.log(
    "Service Produkt: Client requested deletion of record, id=" +
      request.params.id
  );
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const produktDao = new ProduktDao(request.app.locals.dbConnection);
    try {
      var obj = produktDao.loadById(request.params.id);
      produktDao.delete(request.params.id);
      helper.log(
        "Service Produkt: Deletion of record successfull, id=" +
          request.params.id
      );
      response
        .status(200)
        .json(helper.jsonMsgOK({ gelöscht: true, eintrag: obj }));
    } catch (ex) {
      helper.logError(
        "Service Produkt: Error deleting record. Exception occured: " +
          ex.message
      );
      response.status(400).json(helper.jsonMsgError(ex.message));
    }
  } else {
    const errorMessage = "Authentification is not given";
    helper.logError(errorMessage);

    response.status(401).json(helper.jsonMsgError(errorMessage));
  }
});

module.exports = serviceRouter;
