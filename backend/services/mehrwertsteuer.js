const helper = require("../helper.js");
const MehrwertsteuerDao = require("../dao/mehrwertsteuerDao.js");
const express = require("express");
const auth = require("../Auth/auth.js");
var serviceRouter = express.Router();

helper.log("- Service Mehrwertsteuer");

serviceRouter.get(
  "/mehrwertsteuer/gib/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Mehrwertsteuer: Client requested one record, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const mehrwertsteuerDao = new MehrwertsteuerDao(
        request.app.locals.dbConnection
      );
      try {
        var result = mehrwertsteuerDao.loadById(request.params.id);
        helper.log("Service Mehrwertsteuer: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
      } catch (ex) {
        helper.logError(
          "Service Mehrwertsteuer: Error loading record by id. Exception occured: " +
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

serviceRouter.get("/mehrwertsteuer/alle/:zugang", function (request, response) {
  helper.log("Service Mehrwertsteuer: Client requested all records");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const mehrwertsteuerDao = new MehrwertsteuerDao(
      request.app.locals.dbConnection
    );
    try {
      var result = mehrwertsteuerDao.loadAll();
      helper.log(
        "Service Mehrwertsteuer: Records loaded, count=" + result.length
      );
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Mehrwertsteuer: Error loading all records. Exception occured: " +
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
  "/mehrwertsteuer/existiert/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Mehrwertsteuer: Client requested check, if record exists, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const mehrwertsteuerDao = new MehrwertsteuerDao(
        request.app.locals.dbConnection
      );
      try {
        var result = mehrwertsteuerDao.exists(request.params.id);
        helper.log(
          "Service Mehrwertsteuer: Check if record exists by id=" +
            request.params.id +
            ", result=" +
            result
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ id: request.params.id, existiert: result }));
      } catch (ex) {
        helper.logError(
          "Service Mehrwertsteuer: Error checking if record exists. Exception occured: " +
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

serviceRouter.post("/mehrwertsteuer/:zugang", function (request, response) {
  helper.log("Service Mehrwertsteuer: Client requested creation of new record");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.bezeichnung))
      errorMsgs.push("bezeichnung fehlt");
    if (helper.isUndefined(request.body.steuersatz)) {
      errorMsgs.push("steuersatz fehlt");
    } else if (!helper.isNumeric(request.body.steuersatz)) {
      errorMsgs.push("steuersatz muss eine Zahl sein");
    } else if (request.body.steuersatz <= 0) {
      errorMsgs.push("steuersatz muss eine Zahl > 0 sein");
    }

    if (errorMsgs.length > 0) {
      helper.log("Service Mehrwertsteuer: Creation not possible, data missing");
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

    const mehrwertsteuerDao = new MehrwertsteuerDao(
      request.app.locals.dbConnection
    );
    try {
      var result = mehrwertsteuerDao.create(
        request.body.bezeichnung,
        request.body.steuersatz
      );
      helper.log("Service Mehrwertsteuer: Record inserted");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Mehrwertsteuer: Error creating new record. Exception occured: " +
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

serviceRouter.put("/mehrwertsteuer/:zugang", function (request, response) {
  helper.log(
    "Service Mehrwertsteuer: Client requested update of existing record"
  );
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.id)) errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.bezeichnung))
      errorMsgs.push("bezeichnung fehlt");
    if (helper.isUndefined(request.body.steuersatz)) {
      errorMsgs.push("steuersatz fehlt");
    } else if (!helper.isNumeric(request.body.steuersatz)) {
      errorMsgs.push("steuersatz muss eine Zahl sein");
    } else if (request.body.steuersatz <= 0) {
      errorMsgs.push("steuersatz muss eine Zahl > 0 sein");
    }

    if (errorMsgs.length > 0) {
      helper.log("Service Mehrwertsteuer: Update not possible, data missing");
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

    const mehrwertsteuerDao = new MehrwertsteuerDao(
      request.app.locals.dbConnection
    );
    try {
      var result = mehrwertsteuerDao.update(
        request.body.id,
        request.body.bezeichnung,
        request.body.steuersatz
      );
      helper.log(
        "Service Mehrwertsteuer: Record updated, id=" + request.body.id
      );
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Mehrwertsteuer: Error updating record by id. Exception occured: " +
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

serviceRouter.delete(
  "/mehrwertsteuer/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Mehrwertsteuer: Client requested deletion of record, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const mehrwertsteuerDao = new MehrwertsteuerDao(
        request.app.locals.dbConnection
      );
      try {
        var obj = mehrwertsteuerDao.loadById(request.params.id);
        mehrwertsteuerDao.delete(request.params.id);
        helper.log(
          "Service Mehrwertsteuer: Deletion of record successfull, id=" +
            request.params.id
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ gelöscht: true, eintrag: obj }));
      } catch (ex) {
        helper.logError(
          "Service Mehrwertsteuer: Error deleting record. Exception occured: " +
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

module.exports = serviceRouter;
