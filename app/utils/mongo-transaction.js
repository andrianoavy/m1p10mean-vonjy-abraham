const {startSession} = require('../config/connection')

module.exports = {
    doTransaction: async function (callback) {
        const transactionOptions = {
            readConcern: { level: 'snapshot' },
            writeConcern: { w: 'majority' },
            readPreference: 'primary'
        };
        //Commencer la session
        const session = startSession();

        try {
            //Début de transaction
            session.startTransaction(transactionOptions);

            await callback(session)
            await session.commitTransaction();

            console.log('Transaction successfully committed.');

        } catch (error) {
            // if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
            //     // add your logic to retry or handle the error
            // }
            // else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
            //     // add your logic to retry or handle the error
            // } else {
                console.log('An error occured in the transaction, performing a data rollback:' + error);
            // }
            await session.abortTransaction();
        } finally {
            await session.endSession();
        }
    }
}