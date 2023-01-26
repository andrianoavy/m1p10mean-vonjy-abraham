const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const emailService = require("../services/email.service");

const recordRoutes = require("express").Router();

const { Entree } = require("../models/entree");
const { Reparation } = require("../models/reparation");

const entreeDb = require("../db/entrees-db");
const userDb = require("../db/users-db");

const checkJwt = require("../middlewares/checkJwt");
const checkRole = require("../middlewares/checkRole");

const { ObjectId } = require("bson");

const baseRoute = "/api";

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
      "Non valide",
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
    const newReparation = new Reparation(
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

// valide sortie
recordRoutes.put(
  "/api/atelier/entree",
  checkJwt,
  checkRole(Atelier),
  (req, res) => {
    entreeDb
      .updateEntree(req.body.entreeId)
      .then((entree) => {
        if (!entree) {
          return res.status(401).json({
            message: "Modification échouée"
          });
        }

        entreeDb.getOneById(req.body.entreeId).then((result) => {
          userDb.findOneById(result[0].voiture[0].idClient).then((data) => {
            emailService.sendMail(data.email, {
              subject: "Bon de sortie par Mikara-Car",
              text: "test2",
              html: "<span>Bonjour "+data.name +", <br><br></span><span>Les réparations sur votre voiture sont terminées. Nous venons de valider votre bon de sortie du garage. Veillez prendre votre voiture chez nous.</span><br><br>Merci beaucoup."
            });
          });
        });

        res.status(200).json({
          status: "Success",
          data: entree
        });
      })
      .catch((err) => {
        return res.status(401).json({
          message: "Modification de l'information échouée"
        });
      });
  }
);

recordRoutes.delete(
  "/api/atelier/reparation",
  checkJwt,
  checkRole(Atelier),
  (req, res) => {
    entreeDb
      .deleteReparation(req.body.entreeId, req.body.reparationId)
      .then((reparation) => {
        if (!reparation) {
          return res.status(401).json({
            message: "Suppression échouée"
          });
        }
        res.status(200).json({
          status: "Success",
          data: reparation
        });
      })
      .catch((err) => {
        return res.status(401).json({
          message: "Suppression de l'information échouée"
        });
      });
  }
);

recordRoutes.get(
  "/api/atelier/searchEntree",
  checkJwt,
  checkRole(Atelier),
  (req, res) => {
    entreeDb
      .filterEntreeWithCar(req.query.search)
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
  "/api/entree/tempsMoyenReparation",
  checkJwt,
  checkRole(Atelier),
  (req, res) => {
    entreeDb.tempDeReparationMoyen().then((result)=>{
      if (!result) {
        return res.status(401).json({
          message: "Pas de resultat"
        });
      }
      let tempMoyen = 0;
      for(const data of result)
      {
        tempMoyen = tempMoyen + data.dateDiffReparation;
      }
      res.status(200).json({
        status: "Success",
        data: tempMoyen/result.length
      });
    }).catch((err) => {
      throw new Error(err);
    });
  }
)

module.exports = recordRoutes;
