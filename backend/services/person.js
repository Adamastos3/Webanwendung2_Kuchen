const helper = require("../helper.js");
const PersonDao = require("../dao/personDao.js");
const express = require("express");
const auth = require("../Auth/auth.js");
var serviceRouter = express.Router();

helper.log("- Service Person");

serviceRouter.get("/person/gib/:id/:zugang", function (request, response) {
  helper.log(
    "Service Person: Client requested one record, id=" + request.params.id
  );
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const personDao = new PersonDao(request.app.locals.dbConnection);
    try {
      var result = personDao.loadById(request.params.id);
      helper.log("Service Person: Record loaded");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Person: Error loading record by id. Exception occured: " +
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

serviceRouter.get("/person/alle/:zugang", function (request, response) {
  helper.log("Service Person: Client requested all records");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const personDao = new PersonDao(request.app.locals.dbConnection);
    try {
      var result = personDao.loadAll();
      helper.log("Service Person: Records loaded, count=" + result.length);
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Person: Error loading all records. Exception occured: " +
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
  "/person/existiert/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service Person: Client requested check, if record exists, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const personDao = new PersonDao(request.app.locals.dbConnection);
      try {
        var result = personDao.exists(request.params.id);
        helper.log(
          "Service Person: Check if record exists by id=" +
            request.params.id +
            ", result=" +
            result
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ id: request.params.id, existiert: result }));
      } catch (ex) {
        helper.logError(
          "Service Person: Error checking if record exists. Exception occured: " +
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

serviceRouter.post("/person/:zugang", function (request, response) {
  helper.log("Service Person: Client requested creation of new record");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.anrede)) {
      errorMsgs.push("anrede fehlt");
    } else if (
      request.body.anrede.toLowerCase() !== "herr" &&
      request.body.anrede.toLowerCase() !== "frau"
    ) {
      errorMsgs.push("anrede falsch. Herr und Frau sind erlaubt");
    }
    if (helper.isUndefined(request.body.vorname))
      errorMsgs.push("vorname fehlt");
    if (helper.isUndefined(request.body.nachname))
      errorMsgs.push("nachname fehlt");
    if (helper.isUndefined(request.body.adresse)) {
      errorMsgs.push("adresse fehlt");
    } else if (helper.isUndefined(request.body.adresse.id)) {
      errorMsgs.push("adresse gesetzt, aber id fehlt");
    }
    if (helper.isUndefined(request.body.telefonnummer))
      request.body.telefonnummer = "";
    if (helper.isUndefined(request.body.email)) errorMsgs.push("email fehlt");
    if (!helper.isEmail(request.body.email))
      errorMsgs.push("email hat ein falsches Format");
    if (helper.isUndefined(request.body.geburtstag)) {
      request.body.geburtstag = null;
    } else if (!helper.isGermanDateTimeFormat(request.body.geburtstag)) {
      errorMsgs.push("geburtstag hat das falsche Format, erlaubt: dd.mm.jjjj");
    } else {
      request.body.geburtstag = helper.parseDateTimeString(
        request.body.geburtstag
      );
    }

    if (errorMsgs.length > 0) {
      helper.log("Service Person: Creation not possible, data missing");
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

    const personDao = new PersonDao(request.app.locals.dbConnection);
    try {
      var result = personDao.create(
        request.body.anrede,
        request.body.vorname,
        request.body.nachname,
        request.body.adresse.id,
        request.body.telefonnummer,
        request.body.email,
        request.body.geburtstag
      );
      helper.log("Service Person: Record inserted");
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Person: Error creating new record. Exception occured: " +
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

serviceRouter.put("/person/:zugang", function (request, response) {
  helper.log("Service Person: Client requested update of existing record");
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    var errorMsgs = [];
    if (helper.isUndefined(request.body.id)) errorMsgs.push("id missing");
    if (helper.isUndefined(request.body.anrede)) {
      errorMsgs.push("anrede fehlt");
    } else if (
      request.body.anrede.toLowerCase() !== "herr" &&
      request.body.anrede.toLowerCase() !== "frau"
    ) {
      errorMsgs.push("anrede falsch. Herr und Frau sind erlaubt");
    }
    if (helper.isUndefined(request.body.vorname))
      errorMsgs.push("vorname fehlt");
    if (helper.isUndefined(request.body.nachname))
      errorMsgs.push("nachname fehlt");
    if (helper.isUndefined(request.body.adresse)) {
      errorMsgs.push("adresse fehlt");
    } else if (helper.isUndefined(request.body.adresse.id)) {
      errorMsgs.push("adresse gesetzt, aber id fehlt");
    }
    if (helper.isUndefined(request.body.telefonnummer))
      request.body.telefonnummer = "";
    if (helper.isUndefined(request.body.email)) errorMsgs.push("email fehlt");
    if (!helper.isEmail(request.body.email))
      errorMsgs.push("email hat ein falsches Format");
    if (helper.isUndefined(request.body.geburtstag)) {
      request.body.geburtstag = null;
    } else if (!helper.isGermanDateTimeFormat(request.body.geburtstag)) {
      errorMsgs.push("geburtstag hat das falsche Format, erlaubt: dd.mm.jjjj");
    } else {
      request.body.geburtstag = helper.parseDateTimeString(
        request.body.geburtstag
      );
    }

    if (errorMsgs.length > 0) {
      helper.log("Service Person: Update not possible, data missing");
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

    const personDao = new PersonDao(request.app.locals.dbConnection);
    try {
      var result = personDao.update(
        request.body.id,
        request.body.anrede,
        request.body.vorname,
        request.body.nachname,
        request.body.adresse.id,
        request.body.telefonnummer,
        request.body.email,
        request.body.geburtstag
      );
      helper.log("Service Person: Record updated, id=" + request.body.id);
      response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
      helper.logError(
        "Service Person: Error updating record by id. Exception occured: " +
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

serviceRouter.delete("/person/:id/:zugang", function (request, response) {
  helper.log(
    "Service Person: Client requested deletion of record, id=" +
      request.params.id
  );
  if (auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)) {
    const personDao = new PersonDao(request.app.locals.dbConnection);
    try {
      var obj = personDao.loadById(request.params.id);
      personDao.delete(request.params.id);
      helper.log(
        "Service Person: Deletion of record successfull, id=" +
          request.params.id
      );
      response
        .status(200)
        .json(helper.jsonMsgOK({ gelöscht: true, eintrag: obj }));
    } catch (ex) {
      helper.logError(
        "Service Person: Error deleting record. Exception occured: " +
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
