module.exports = {
    async getItems(req, res) {
        await magic.database.startTransaction(async session => {
            await magic.models.product.product.collection.insertOne({ name: 'xxxx' }, { session });
            await magic.models.user.user.collection.insertOne({ name: 'xxxx-uuu' }, { session });
        });
        res.send({ name: 'majid' });
    }
};
