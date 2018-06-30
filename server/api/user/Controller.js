module.exports = {
    getData: function (req, res) {
        res.send('I did it get method' );
    },
    postData: function (req, res) {
        res.send('I did it  post' );
    },
    deleteData: function (req, res) {
        res.send('I did it delete' );
    },
    putData: function (req, res) {
        res.send('I did it put' );
    }
}