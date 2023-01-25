const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const recordRoutes = require("express").Router();

const { Entree } = require("../models/entree");
const { Raparation } = require("../models/reparation");

const entreeDb = require("../db/entrees-db");

const checkJwt = require("../middlewares/checkJwt");
const checkRole = require("../middlewares/checkRole");

const { ObjectId } = require("bson");

const baseRoute = "/api/entrees";

let {
  AllUsers,
  Client,
  ClientAtelier,
  ClientFinancier,
  Atelier,
  Financier,
  Atelierfinancier
} = require("../utils/role");

recordRoutes.post(
  "/api/atelier/entree",
  checkJwt,
  checkRole(Atelier),
  (req, res) => {
    const newEntree = new Entree(
      req.body.designation,
      req.body.dateEntree,
      req.body.dateSortie,
      req.body.voitureId,
      []
    );

    entreeDb
      .saveOne(newEntree)
      .then((entree) => {
        if (!entree) {
          return res.status(401).json({
            message: "Enregistrement échouée"
          });
        }
        res.status(200).json({
          status: "Success",
          data: entree
        });
      })
      .catch((err) => {
        console.log(
          err.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied
        );
        throw new Error(err);
      });
  }
);

recordRoutes.post(
  "/api/atelier/reparation",
  checkJwt,
  checkRole(Atelier),
  (req, res) => {
    const newReparation = new Raparation(
      ObjectId(),
      req.body.description,
      req.body.designationPrestation,
      req.body.montantPrestation,
      req.body.designationAchat,
      req.body.montantAchat,
      req.body.dateDebut,
      req.body.dateFin,
      "En attente"
    );

    entreeDb
      .saveReparation(req.body.entreeId, newReparation)
      .then((reparation) => {
        if (!reparation) {
          return res.status(401).json({
            message: "Enregistrement échouée"
          });
        }
        res.status(200).json({
          status: "Success",
          data: reparation
        });
      })
      .catch((err) => {
        return res.status(401).json({
          message: "Enregistrement de l'information échouée"
        });
      });
  }
);

recordRoutes.get(
  "/api/atelier/entrees",
  checkJwt,
  checkRole(Atelier),
  (req, res) => {
    entreeDb
      .findEntreeWithCar()
      .then((entree) => {
        if (!entree) {
          return res.status(401).json({
            message: "Pas de resultat"
          });
        }
        res.status(200).json({
          status: "Success",
          data: entree
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
);

recordRoutes.get(
  "/api/atelier/entree/reparations",
  checkJwt,
  checkRole(Atelier),
  (req, res) => {
    entreeDb
      .getAllReparationByEntree(req.query.id)
      .then((reparation) => {
        if (!reparation) {
          return res.status(401).json({
            message: "Impossible de touver des reparations"
          });
        }
        res.status(200).json({
          status: "Success",
          data: reparation.reparations
        });
      })
      .catch((err) => {
        return res.status(401).json({
          message: "Impossible de touver des reparations"
        });
      });
  }
);

recordRoutes.put(
  "/api/atelier/update/reparation",
  checkJwt,
  checkRole(Atelier),
  (req, res) => {
    entreeDb
      .updateReparation(req.body.entreeId, req.body.reparationId)
      .then((reparation) => {
        if (!reparation) {
          return res.status(401).json({
            message: "Modification échouée"
          });
        }
        res.status(200).json({
          status: "Success",
          data: reparation
        });
      })
      .catch((err) => {
        return res.status(401).json({
          message: "Modification de l'information échouée"
        });
      });
  }
);

recordRoutes.get(
  "/api/atelier/entree/info",
  checkJwt,
  checkRole(AllUsers),
  (req, res) => {
    entreeDb
      .getOneById(req.query.id)
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            message: "Impossible de trouver d'une entree"
          });
        }
        res.status(200).json({
          status: "Success",
          data: result
        });
      })
      .catch((err) => {
        return res.status(401).json({
          message: "Impossible de trouver des entrees"
        });
      });
  }
);

recordRoutes.get(
  `${baseRoute}`,
  checkJwt,
  checkRole(Client),
  function(req,res)
{
  if(!req.query.voiture){
    res.status(400).send("Pas de voiture selectionnée")
    throw new Error("Pas de voiture fournie")
  }
  const idVoiture = req.query.voiture
  entreeDb.getLastOneByIdVoiture(idVoiture).then(data => {
    res.json(data)
  })
  .catch((err) => {
    res.status(500).json({
      message: "Erreur serveur"
    });
    console.error(err)
  })
});

module.exports = recordRoutes;
