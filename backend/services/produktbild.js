const helper = require("../helper.js");
const ProduktbildDao = require("../dao/produktbildDao.js");
const express = require("express");
const auth = require("../Auth/auth.js");
var serviceRouter = express.Router();

helper.log("- Service Produktbild");

serviceRouter.get("/produktbild/gib/:id/:zugang", function (request, response) {
  helper.log(
    "Service Produktbild: Client requested one record, id=" + request.params.id
  );
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const produktbildDao = new ProduktbildDao(request.app.locals.dbConnection);
    try {
      var result = produktbildDao.loadById(request.params.id);
      helper.log("Service Produktbild: Record loaded");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Produktbild: Error loading record by id. Exception occured: " +
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

serviceRouter.get("/produktbild/alle/:zugang", function (request, response) {
  helper.log("Service Produktbild: Client requested all records");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const produktbildDao = new ProduktbildDao(request.app.locals.dbConnection);
    try {
      var result = produktbildDao.loadAll();
      helper.log("Service Produktbild: Records loaded, count=" + result.length);
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Produktbild: Error loading all records. Exception occured: " +
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
  "/produktbild/existiert/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Produktbild: Client requested check, if record exists, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const produktbildDao = new ProduktbildDao(
        request.app.locals.dbConnection
      );
      try {
        var result = produktbildDao.exists(request.params.id);
        helper.log(
          "Service Produktbild: Check if record exists by id=" +
            request.params.id +
            ", result=" +
            result
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ id: request.params.id, existiert: result }));
      } catch (ex) {
        helper.logError(
          "Service Produktbild: Error checking if record exists. Exception occured: " +
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

serviceRouter.post("/produktbild/:zugang", function (request, response) {
  helper.log("Service Produktbild: Client requested creation of new record");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.bildpfad))
      errorMsgs.push("bildpfad fehlt");
    if (helper.isUndefined(request.body.produkt)) {
      errorMsgs.push("produkt fehlt");
    } else if (helper.isUndefined(request.body.produkt.id)) {
      errorMsgs.push("produkt gesetzt, aber id fehlt");
    }

    if (errorMsgs.length > 0) {
      helper.log("Service Produktbild: Creation not possible, data missing");
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

    const produktbildDao = new ProduktbildDao(request.app.locals.dbConnection);
    try {
      var result = produktbildDao.create(
        request.body.bildpfad,
        request.body.produkt.id
      );
      helper.log("Service Produktbild: Record inserted");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Produktbild: Error creating new record. Exception occured: " +
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

serviceRouter.put("/produktbild/:zugang", function (request, response) {
  helper.log("Service Produktbild: Client requested update of existing record");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.id)) errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.bildpfad))
      errorMsgs.push("bildpfad fehlt");
    if (helper.isUndefined(request.body.produkt)) {
      errorMsgs.push("produkt fehlt");
    } else if (helper.isUndefined(request.body.produkt.id)) {
      errorMsgs.push("produkt gesetzt, aber id fehlt");
    }

    if (errorMsgs.length > 0) {
      helper.log("Service Produktbild: Update not possible, data missing");
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

    const produktbildDao = new ProduktbildDao(request.app.locals.dbConnection);
    try {
      var result = produktbildDao.update(
        request.body.id,
        request.body.bildpfad,
        request.body.produkt.id
      );
      helper.log("Service Produktbild: Record updated, id=" + request.body.id);
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Produktbild: Error updating record by id. Exception occured: " +
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

serviceRouter.delete("/produktbild/:id/:zugang", function (request, response) {
  helper.log(
    "Service Produktbild: Client requested deletion of record, id=" +
      request.params.id
  );
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const produktbildDao = new ProduktbildDao(request.app.locals.dbConnection);
    try {
      var obj = produktbildDao.loadById(request.params.id);
      produktbildDao.delete(request.params.id);
      helper.log(
        "Service Produktbild: Deletion of record successfull, id=" +
          request.params.id
      );
      response
        .status(200)
        .json(helper.jsonMsgOK({ gelöscht: true, eintrag: obj }));
    } catch (ex) {
      helper.logError(
        "Service Produktbild: Error deleting record. Exception occured: " +
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
