const helper = require("../helper.js");
const WarenkorbDao = require("../dao/warenkorbDao.js");
const express = require("express");
const auth = require("../Auth/auth.js");
var serviceRouter = express.Router();

helper.log("- Service Warenkorb");

serviceRouter.get("/warenkorb/gib/:id/:zugang", function (request, response) {
  helper.log(
    "Service Warenkorb: Client requested one record, benutzerid=" +
      request.params.id
  );
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const warenkorbDao = new WarenkorbDao(request.app.locals.dbConnection);
    try {
      var result = warenkorbDao.loadById(request.params.id);
      helper.log("Service Warenkorb: Record loaded");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Warenkorb: Error loading record by id. Exception occured: " +
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

serviceRouter.get("/warenkorb/alle/:zugang", function (request, response) {
  helper.log("Service Warenkorb: Client requested all records");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const warenkorbDao = new WarenkorbDao(request.app.locals.dbConnection);
    try {
      var result = warenkorbDao.loadAll();
      helper.log("Service Warenkorb: Records loaded, count=" + result.length);
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Warenkorb: Error loading all records. Exception occured: " +
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
  "/warenkorb/existiert/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Warenkorb: Client requested check, if record exists, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const warenkorbDao = new WarenkorbDao(request.app.locals.dbConnection);
      try {
        var result = warenkorbDao.exists(request.params.id);
        helper.log(
          "Service Warenkorb: Check if record exists by benutzerid=" +
            request.params.id +
            ", result=" +
            result
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ id: request.params.id, existiert: result }));
      } catch (ex) {
        helper.logError(
          "Service Warenkorb: Error checking if record exists. Exception occured: " +
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

serviceRouter.post("/warenkorb/:zugang", function (request, response) {
  helper.log("Service Warenkorb: Client requested creation of new record");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.benutzerid))
      errorMsgs.push("benutzerid fehlt");
    if (helper.isUndefined(request.body.warenkorb))
      errorMsgs.push("warenkorb fehlt");

    console.log(errorMsgs);

    if (errorMsgs.length > 0) {
      helper.log("Service Warenkorb: Creation not possible, data missing");
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

    const warenkorbDao = new WarenkorbDao(request.app.locals.dbConnection);
    try {
      var result = warenkorbDao.create(
        request.body.benutzerid,
        request.body.warenkorb
      );
      helper.log("Service Warenkorb: Record inserted");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Warenkorb: Error creating new record. Exception occured: " +
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

serviceRouter.put("/warenkorb/:zugang", function (request, response) {
  helper.log("Service Warenkorb: Client requested update of existing record");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.id)) errorMsgs.push("id fehlt");
    if (helper.isUndefined(request.body.benutzerid))
      errorMsgs.push("benutzerid fehlt");
    if (helper.isUndefined(request.body.warenkorb)) {
      errorMsgs.push("Warenkorb fehlt");
    }

    console.log(errorMsgs);

    if (errorMsgs.length > 0) {
      helper.log("Service Warenkorb: Update not possible, data missing");
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

    const warenkorbDao = new WarenkorbDao(request.app.locals.dbConnection);
    try {
      var result = warenkorbDao.update(
        request.body.id,
        request.body.benutzerid,
        request.body.warenkorb
      );
      helper.log("Service Warenkorb: Record updated, id=" + request.body.id);
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Warenkorb: Error updating record by id. Exception occured: " +
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

serviceRouter.delete("/warenkorb/:id/:zugang", function (request, response) {
  helper.log(
    "Service Warenkorb: Client requested deletion of record, id=" +
      request.params.id
  );
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const warenkorbDao = new WarenkorbDao(request.app.locals.dbConnection);
    try {
      var obj = warenkorbDao.loadById(request.params.id);
      warenkorbDao.delete(request.params.id);
      helper.log(
        "Service Warenkorb: Deletion of record successfull, id=" +
          request.params.id
      );
      response
        .status(200)
        .json(helper.jsonMsgOK({ gelöscht: true, eintrag: obj }));
    } catch (ex) {
      helper.logError(
        "Service Warenkorb: Error deleting record. Exception occured: " +
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
