const helper = require("../helper.js");
const BenutzerrolleDao = require("../dao/benutzerrolleDao.js");
const express = require("express");
const auth = require("../Auth/auth.js");
var serviceRouter = express.Router();

helper.log("- Service Benutzerrolle");

serviceRouter.get(
  "/benutzerrolle/gib/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Benutzerrolle: Client requested one record, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const benutzerrolleDao = new BenutzerrolleDao(
        request.app.locals.dbConnection
      );
      try {
        var result = benutzerrolleDao.loadById(request.params.id);
        helper.log("Service Benutzerrolle: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
      } catch (ex) {
        helper.logError(
          "Service Benutzerrolle: Error loading record by id. Exception occured: " +
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

serviceRouter.get("/benutzerrolle/alle/:zugang", function (request, response) {
  helper.log("Service Benutzerrolle: Client requested all records");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const benutzerrolleDao = new BenutzerrolleDao(
      request.app.locals.dbConnection
    );
    try {
      var result = benutzerrolleDao.loadAll();
      helper.log(
        "Service Benutzerrolle: Records loaded, count=" + result.length
      );
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Benutzerrolle: Error loading all records. Exception occured: " +
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
  "/benutzerrolle/existiert/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Benutzerrolle: Client requested check, if record exists, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const benutzerrolleDao = new BenutzerrolleDao(
        request.app.locals.dbConnection
      );
      try {
        var result = benutzerrolleDao.exists(request.params.id);
        helper.log(
          "Service Benutzerrolle: Check if record exists by id=" +
            request.params.id +
            ", result=" +
            result
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ id: request.params.id, existiert: result }));
      } catch (ex) {
        helper.logError(
          "Service Benutzerrolle: Error checking if record exists. Exception occured: " +
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

serviceRouter.post("/benutzerrolle/:zugang", function (request, response) {
  helper.log("Service Benutzerrolle: Client requested creation of new record");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.bezeichnung))
      errorMsgs.push("bezeichnung fehlt");

    if (errorMsgs.length > 0) {
      helper.log("Service Benutzerrolle: Creation not possible, data missing");
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

    const benutzerrolleDao = new BenutzerrolleDao(
      request.app.locals.dbConnection
    );
    try {
      var result = benutzerrolleDao.create(request.body.bezeichnung);
      helper.log("Service Benutzerrolle: Record inserted");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Benutzerrolle: Error creating new record. Exception occured: " +
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

serviceRouter.put("/benutzerrolle/:zugang", function (request, response) {
  helper.log(
    "Service Benutzerrolle: Client requested update of existing record"
  );
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.id)) errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.bezeichnung))
      errorMsgs.push("bezeichnung fehlt");

    if (errorMsgs.length > 0) {
      helper.log("Service Benutzerrolle: Update not possible, data missing");
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

    const benutzerrolleDao = new BenutzerrolleDao(
      request.app.locals.dbConnection
    );
    try {
      var result = benutzerrolleDao.update(
        request.body.id,
        request.body.bezeichnung
      );
      helper.log(
        "Service Benutzerrolle: Record updated, id=" + request.body.id
      );
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Benutzerrolle: Error updating record by id. Exception occured: " +
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
  "/benutzerrolle/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Benutzerrolle: Client requested deletion of record, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const benutzerrolleDao = new BenutzerrolleDao(
        request.app.locals.dbConnection
      );
      try {
        var obj = benutzerrolleDao.loadById(request.params.id);
        benutzerrolleDao.delete(request.params.id);
        helper.log(
          "Service Benutzerrolle: Deletion of record successfull, id=" +
            request.params.id
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ gelöscht: true, eintrag: obj }));
      } catch (ex) {
        helper.logError(
          "Service Benutzerrolle: Error deleting record. Exception occured: " +
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
