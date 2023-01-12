const { Db, Collection } = require("mongodb")

const collections = [
    require('../models/user'),
]

module.exports = {
    createCollections: async function (db) {
        if (!(db instanceof Db)) {
            throw Error("Erreur lors de la création des collections")
        }
        const existingCollections = await db.collections()

        collections.forEach((collection) => {
            if (existingCollections.find((col) => col.collectionName === collection.collectionName) === undefined) {
                db.createCollection(collection.collectionName, collection.options)
                .then((newCollection) => {
                    if(collection.indexes !== undefined || collection.indexes !== [] || collection.indexes !== null){
                        collection.indexes.forEach((index) => {
                            const {indexInfo,isUnique} = index
                            newCollection.createIndex(indexInfo,(isUnique)?{unique:true}:undefined)
                        });
                    }
                });
            }
        })
    }
}