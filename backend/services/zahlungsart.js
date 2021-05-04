const helper = require("../helper.js");
const ZahlungsartDao = require("../dao/zahlungsartDao.js");
const express = require("express");
const auth = require("../Auth/auth.js");
var serviceRouter = express.Router();

helper.log("- Service Zahlungsart");

serviceRouter.get("/zahlungsart/gib/:id/:zugang", function (request, response) {
  helper.log(
    "Service Zahlungsart: Client requested one record, id=" + request.params.id
  );
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const zahlungsartDao = new ZahlungsartDao(request.app.locals.dbConnection);
    try {
      var result = zahlungsartDao.loadById(request.params.id);
      helper.log("Service Zahlungsart: Record loaded");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Zahlungsart: Error loading record by id. Exception occured: " +
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

serviceRouter.get("/zahlungsart/alle/:zugang", function (request, response) {
  helper.log("Service Zahlungsart: Client requested all records");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const zahlungsartDao = new ZahlungsartDao(request.app.locals.dbConnection);
    try {
      var result = zahlungsartDao.loadAll();
      helper.log("Service Zahlungsart: Records loaded, count=" + result.length);
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Zahlungsart: Error loading all records. Exception occured: " +
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
  "/zahlungsart/existiert/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Zahlungsart: Client requested check, if record exists, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const zahlungsartDao = new ZahlungsartDao(
        request.app.locals.dbConnection
      );
      try {
        var result = zahlungsartDao.exists(request.params.id);
        helper.log(
          "Service Zahlungsart: Check if record exists by id=" +
            request.params.id +
            ", result=" +
            result
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ id: request.params.id, existiert: result }));
      } catch (ex) {
        helper.logError(
          "Service Zahlungsart: Error checking if record exists. Exception occured: " +
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

serviceRouter.post("/zahlungsart/:zugang", function (request, response) {
  helper.log("Service Zahlungsart: Client requested creation of new record");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.bezeichnung))
      errorMsgs.push("bezeichnung fehlt");

    if (errorMsgs.length > 0) {
      helper.log("Service Zahlungsart: Creation not possible, data missing");
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

    const zahlungsartDao = new ZahlungsartDao(request.app.locals.dbConnection);
    try {
      var result = zahlungsartDao.create(request.body.bezeichnung);
      helper.log("Service Zahlungsart: Record inserted");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Zahlungsart: Error creating new record. Exception occured: " +
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

serviceRouter.put("/zahlungsart/:zugang", function (request, response) {
  helper.log("Service Zahlungsart: Client requested update of existing record");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.id)) errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.bezeichnung))
      errorMsgs.push("bezeichnung fehlt");

    if (errorMsgs.length > 0) {
      helper.log("Service Zahlungsart: Update not possible, data missing");
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

    const zahlungsartDao = new ZahlungsartDao(request.app.locals.dbConnection);
    try {
      var result = zahlungsartDao.update(
        request.body.id,
        request.body.bezeichnung
      );
      helper.log("Service Zahlungsart: Record updated, id=" + request.body.id);
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Zahlungsart: Error updating record by id. Exception occured: " +
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

serviceRouter.delete("/zahlungsart/:id/:zugang", function (request, response) {
  helper.log(
    "Service Zahlungsart: Client requested deletion of record, id=" +
      request.params.id
  );
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const zahlungsartDao = new ZahlungsartDao(request.app.locals.dbConnection);
    try {
      var obj = zahlungsartDao.loadById(request.params.id);
      zahlungsartDao.delete(request.params.id);
      helper.log(
        "Service Zahlungsart: Deletion of record successfull, id=" +
          request.params.id
      );
      response
        .status(200)
        .json(helper.jsonMsgOK({ gelöscht: true, eintrag: obj }));
    } catch (ex) {
      helper.logError(
        "Service Zahlungsart: Error deleting record. Exception occured: " +
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
