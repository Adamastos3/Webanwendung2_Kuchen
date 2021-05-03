const helper = require("../helper.js");
const IndividuellesBildDao = require("../dao/individuellesBildDao.js");
const express = require("express");
const auth = require("../Auth/auth.js");
var serviceRouter = express.Router();

helper.log("- Service IndividuellesBild");

serviceRouter.get(
  "/individuellesbild/gib/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service IndividuellesBild: Client requested one record, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const individuellesBildDao = new IndividuellesBildDao(
        request.app.locals.dbConnection
      );
      try {
        var result = individuellesBildDao.loadById(request.params.id);
        helper.log("Service IndividuellesBild: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
      } catch (ex) {
        helper.logError(
          "Service IndividuellesBild: Error loading record by id. Exception occured: " +
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

serviceRouter.get(
  "/individuellesbild/alle/:zugang",
  function (request, response) {
    helper.log("Service IndividuellesBild: Client requested all records");

    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const individuellesBildDao = new IndividuellesBildDao(
        request.app.locals.dbConnection
      );
      try {
        var result = individuellesBildDao.loadAll();
        helper.log(
          "Service IndividuellesBild: Records loaded, count=" + result.length
        );
        response.status(200).json(helper.jsonMsgOK(result));
      } catch (ex) {
        helper.logError(
          "Service IndividuellesBild: Error loading all records. Exception occured: " +
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

serviceRouter.get(
  "/individuellesbild/existiert/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service IndividuellesBild: Client requested check, if record exists, id=" +
        request.params.id
    );

    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const individuellesBildDao = new IndividuellesBildDao(
        request.app.locals.dbConnection
      );
      try {
        var result = individuellesBildDao.exists(request.params.id);
        helper.log(
          "Service IndividuellesBild: Check if record exists by id=" +
            request.params.id +
            ", result=" +
            result
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ id: request.params.id, existiert: result }));
      } catch (ex) {
        helper.logError(
          "Service IndividuellesBild: Error checking if record exists. Exception occured: " +
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

serviceRouter.post("/individuellesbild/:zugang", function (request, response) {
  helper.log(
    "Service IndividuellesBild: Client requested creation of new record"
  );

  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.bildpfad))
      errorMsgs.push("bildpfad fehlt");
    if (helper.isUndefined(request.body.individuelles)) {
      errorMsgs.push("Individuelles fehlt");
    } else if (helper.isUndefined(request.body.individuelles.id)) {
      errorMsgs.push("Individuelles gesetzt, aber id fehlt");
    }

    if (errorMsgs.length > 0) {
      helper.log(
        "Service IndividuellesBild: Creation not possible, data missing"
      );
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

    const individuellesBildDao = new IndividuellesBildDao(
      request.app.locals.dbConnection
    );
    try {
      var result = individuellesBildDao.create(
        request.body.bildpfad,
        request.body.individuelles.id
      );
      helper.log("Service IndividuellesBild: Record inserted");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service IndividuellesBild: Error creating new record. Exception occured: " +
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

serviceRouter.put("/individuellesbild", function (request, response) {
  helper.log(
    "Service IndividuellesBild: Client requested update of existing record"
  );

  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.id)) errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.bildpfad))
      errorMsgs.push("bildpfad fehlt");
    if (helper.isUndefined(request.body.individuelles)) {
      errorMsgs.push("individuelles fehlt");
    } else if (helper.isUndefined(request.body.individuelles.id)) {
      errorMsgs.push("individuelles gesetzt, aber id fehlt");
    }

    if (errorMsgs.length > 0) {
      helper.log(
        "Service IndividuellesBild: Update not possible, data missing"
      );
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

    const individuellesBildDao = new IndividuellesBildDao(
      request.app.locals.dbConnection
    );
    try {
      var result = individuellesBildDao.update(
        request.body.id,
        request.body.bildpfad,
        request.body.individuelles.id
      );
      helper.log(
        "Service IndividuellesBild: Record updated, id=" + request.body.id
      );
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service IndividuellesBild: Error updating record by id. Exception occured: " +
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

serviceRouter.delete("/individuellesbild/:id", function (request, response) {
  helper.log(
    "Service IndividuellesBild: Client requested deletion of record, id=" +
      request.params.id
  );

  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const individuellesBildDao = new IndividuellesBildDao(
      request.app.locals.dbConnection
    );
    try {
      var obj = individuellesBildDao.loadById(request.params.id);
      individuellesBildDao.delete(request.params.id);
      helper.log(
        "Service IndividuellesBild: Deletion of record successfull, id=" +
          request.params.id
      );
      response
        .status(200)
        .json(helper.jsonMsgOK({ gelöscht: true, eintrag: obj }));
    } catch (ex) {
      helper.logError(
        "Service IndividuellesBild: Error deleting record. Exception occured: " +
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
