module.exports = {
    async getData(req, res) {
        res.create(async () => {
            await magic.models.user.user.collection.insertOne({
                name: 'majid',
                yearOfBirth: 2018,
                major: 'Math',
                weight: [1.5, 89]
            });
            const c = await magic.models.user.user.collection.find({}).toArray();
            res.send(c);
        });
    },
    postData(req, res) {
        res.send('I did the post');
    },
    deleteData(req, res) {
        res.send('I did the delete');
    },
    putData(req, res) {
        res.send('I did the put');
    }
};
