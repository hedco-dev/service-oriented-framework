module.exports = {
    getData(req, res) {
        res.send('I did it get method');
    },
    postData(req, res) {
        res.send('I did it  post');
    },
    deleteData(req, res) {
        res.send('I did it delete');
    },
    putData(req, res) {
        res.send('I did it put');
    }
};
