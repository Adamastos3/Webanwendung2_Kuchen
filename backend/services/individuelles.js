const helper = require("../helper.js");
const IndividuellesDao = require("../dao/individuellesDao.js");
const express = require("express");
const auth = require("../Auth/auth.js");
var serviceRouter = express.Router();

helper.log("- Service Individuelles");

serviceRouter.get(
  "/individuelles/gib/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Individuelles: Client requested one record, id=" +
        request.params.id
    );

    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const individuellesDao = new IndividuellesDao(
        request.app.locals.dbConnection
      );
      try {
        var result = individuellesDao.loadById(request.params.id);
        helper.log("Service Individuelles: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
      } catch (ex) {
        helper.logError(
          "Service Individuelles: Error loading record by id. Exception occured: " +
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

serviceRouter.get("/individuelles/alle/:zugang", function (request, response) {
  helper.log("Service Individuelles: Client requested all records");

  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const individuellesDao = new IndividuellesDao(
      request.app.locals.dbConnection
    );
    try {
      var result = individuellesDao.loadAll();
      helper.log(
        "Service Individuelles: Records loaded, count=" + result.length
      );
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Individuelles: Error loading all records. Exception occured: " +
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
  "/individuelles/existiert/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Individuelles: Client requested check, if record exists, id=" +
        request.params.id
    );

    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const individuellesDao = new IndividuellesDao(
        request.app.locals.dbConnection
      );
      try {
        var result = individuellesDao.exists(request.params.id);
        helper.log(
          "Service Individuelles: Check if record exists by id=" +
            request.params.id +
            ", result=" +
            result
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ id: request.params.id, existiert: result }));
      } catch (ex) {
        helper.logError(
          "Service Individuelles: Error checking if record exists. Exception occured: " +
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

serviceRouter.post("/individuelles/:zugang", function (request, response) {
  helper.log("Service Individuelles: Client requested creation of new record");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.bezeichnung))
      errorMsgs.push("bezeichnung fehlt");
    if (helper.isUndefined(request.body.beschreibung))
      request.body.beschreibung = "";
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
    if (helper.isUndefined(request.body.bilder)) request.body.bilder = [];

    if (errorMsgs.length > 0) {
      helper.log("Service Individuelles: Creation not possible, data missing");
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

    const individuellesDao = new IndividuellesDao(
      request.app.locals.dbConnection
    );
    try {
      var result = individuellesDao.create(
        request.body.kategorie.id,
        request.body.bezeichnung,
        request.body.beschreibung,
        request.body.mehrwertsteuer.id,
        request.body.nettopreis,

        request.body.bilder
      );
      helper.log("Service Individuelles: Record inserted");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Individuelles: Error creating new record. Exception occured: " +
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

serviceRouter.put("/individuelles/:zugang", function (request, response) {
  helper.log(
    "Service Individuelles: Client requested update of existing record"
  );
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.id)) errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.bezeichnung))
      errorMsgs.push("bezeichnung fehlt");
    if (helper.isUndefined(request.body.beschreibung))
      request.body.beschreibung = "";
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

    if (helper.isUndefined(request.body.bilder)) request.body.bilder = [];

    if (errorMsgs.length > 0) {
      helper.log("Service Individuelles: Update not possible, data missing");
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

    const individuellesDao = new IndividuellesDao(
      request.app.locals.dbConnection
    );
    try {
      var result = individuellesDao.update(
        request.body.id,
        request.body.kategorie.id,
        request.body.bezeichnung,
        request.body.beschreibung,
        request.body.mehrwertsteuer.id,
        request.body.nettopreis,
        request.body.bilder
      );
      helper.log(
        "Service Individuelles: Record updated, id=" + request.body.id
      );
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Individuelles: Error updating record by id. Exception occured: " +
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
  "/individuelles/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Individuelles: Client requested deletion of record, id=" +
        request.params.id
    );

    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const individuellesDao = new IndividuellesDao(
        request.app.locals.dbConnection
      );
      try {
        var obj = individuellesDao.loadById(request.params.id);
        individuellesDao.delete(request.params.id);
        helper.log(
          "Service Individuelles: Deletion of record successfull, id=" +
            request.params.id
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ gelöscht: true, eintrag: obj }));
      } catch (ex) {
        helper.logError(
          "Service Individuelles: Error deleting record. Exception occured: " +
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
