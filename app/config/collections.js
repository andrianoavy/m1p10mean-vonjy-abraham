const { Db, Collection } = require("mongodb")

//Listes des collections
const collections = [
    require('../models/user'),
    require('../models/voiture'),
]

module.exports = {
    /**
     * Créer les collections définies dans la liste et ajouter les indexes s'ils sont définis
     */
    createCollections: async function (db) {
        if (!(db instanceof Db)) {
            throw Error("Erreur lors de la création des collections")
        }
        //Lister les collections déjà existantes
        const existingCollections = await db.collections()

        collections.forEach((collection) => {
            //Vérifier que collection n'existe pas encore
            if (existingCollections.find((col) => col.collectionName === collection.collectionName) === undefined) {
                //Créer collection
                db.createCollection(collection.collectionName, collection.options)
                .then((newCollection) => {
                    //Vérifier si il y a des index définis 
                    if(collection.indexes !== undefined || collection.indexes !== [] || collection.indexes !== null){
                        collection.indexes.forEach((index) => {
                            //Création d'index avec `{unique:true}` si stipulé 
                            const {indexInfo,isUnique} = index
                            newCollection.createIndex(indexInfo,(isUnique)?{unique:true}:undefined)
                        });
                    }
                });
            }
        })
    }
}