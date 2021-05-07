const helper = require("../helper.js");
const IndividuelleKategorieDao = require("../dao/individuelleKategorieDao.js");
const express = require("express");
const auth = require("../Auth/auth.js");
var serviceRouter = express.Router();

helper.log("- Service individuelleKategorie");

serviceRouter.get(
  "/individuellekategorie/gib/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service individuelleKategorie: Client requested one record, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const individuellekategorieDao = new IndividuelleKategorieDao(
        request.app.locals.dbConnection
      );
      try {
        var result = individuellekategorieDao.loadById(request.params.id);
        helper.log("Service individuelleKategorie: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
      } catch (ex) {
        helper.logError(
          "Service individuelleKategorie: Error loading record by id. Exception occured: " +
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
  "/individuellekategorie/alle/:zugang",
  function (request, response) {
    helper.log("Service individuelleKategorie: Client requested all records");

    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const individuellekategorieDao = new IndividuelleKategorieDao(
        request.app.locals.dbConnection
      );
      try {
        var result = individuellekategorieDao.loadAll();
        helper.log(
          "Service individuelleKategorie: Records loaded, count=" +
            result.length
        );
        response.status(200).json(helper.jsonMsgOK(result));
      } catch (ex) {
        helper.logError(
          "Service individuelleKategorie: Error loading all records. Exception occured: " +
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
  "/individuellekategorie/existiert/:id/:zugang",
  function (request, response) {
    helper.log(
      "Service individuelleKategorie: Client requested check, if record exists, id=" +
        request.params.id
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const individuellekategorieDao = new IndividuelleKategorieDao(
        request.app.locals.dbConnection
      );
      try {
        var result = individuellekategorieDao.exists(request.params.id);
        helper.log(
          "Service IndividuelleKategorie: Check if record exists by id=" +
            request.params.id +
            ", result=" +
            result
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ id: request.params.id, existiert: result }));
      } catch (ex) {
        helper.logError(
          "Service individuelleKategorie: Error checking if record exists. Exception occured: " +
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

serviceRouter.post(
  "/individuellekategorie/:zugang",
  function (request, response) {
    helper.log(
      "Service individuelleKategorie: Client requested creation of new record"
    );
    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      var errorMsgs = [];
      if (helper.isUndefined(request.body.bezeichnung))
        errorMsgs.push("bezeichnung fehlt");

      if (errorMsgs.length > 0) {
        helper.log(
          "Service individuelleKategorie: Creation not possible, data missing"
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

      const individuellekategorieDao = new IndividuelleKategorieDao(
        request.app.locals.dbConnection
      );
      try {
        var result = individuellekategorieDao.create(request.body.bezeichnung);
        helper.log("Service individuelleKategorie: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
      } catch (ex) {
        helper.logError(
          "Service individuelleKategorie: Error creating new record. Exception occured: " +
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

serviceRouter.put(
  "/individuellekategorie/:zugang",
  function (request, response) {
    helper.log(
      "Service individuelleKategorie: Client requested update of existing record"
    );

    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      var errorMsgs = [];
      if (helper.isUndefined(request.body.id)) errorMsgs.push("id fehlt");
      if (helper.isUndefined(request.body.bezeichnung))
        errorMsgs.push("bezeichnung fehlt");

      if (errorMsgs.length > 0) {
        helper.log(
          "Service individuelleKategorie: Update not possible, data missing"
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

      const individuellekategorieDao = new IndividuelleKategorieDao(
        request.app.locals.dbConnection
      );
      try {
        var result = individuellekategorieDao.update(
          request.body.id,
          request.body.bezeichnung
        );
        helper.log(
          "Service individuelleKategorie: Record updated, id=" + request.body.id
        );
        response.status(200).json(helper.jsonMsgOK(result));
      } catch (ex) {
        helper.logError(
          "Service individuelleKategorie: Error updating record by id. Exception occured: " +
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

serviceRouter.delete(
  "/individuellekategorie/:id",
  function (request, response) {
    helper.log(
      "Service individuelleKategorie: Client requested deletion of record, id=" +
        request.params.id
    );

    if (
      auth.checkAuth(request.app.locals.dbConnection, request.params.zugang)
    ) {
      const individuellekategorieDao = new IndividuelleKategorieDao(
        request.app.locals.dbConnection
      );
      try {
        var obj = individuellekategorieDao.loadById(request.params.id);
        individuellekategorieDao.delete(request.params.id);
        helper.log(
          "Service individuelleKategorie: Deletion of record successfull, id=" +
            request.params.id
        );
        response
          .status(200)
          .json(helper.jsonMsgOK({ gelöscht: true, eintrag: obj }));
      } catch (ex) {
        helper.logError(
          "Service individuelleKategorie: Error deleting record. Exception occured: " +
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
