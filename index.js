var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
var db;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    db.collection('arguments').find().toArray((err, result) => {
        if (err) return console.log(err);

        res.render("index", { arguments: result });
    });
});

app.post('/arguments', (req, res) => {
    db.collection('arguments').save({
        title: req.body.title,
        premises: req.body.premises,
        conclusion: req.body.conclusion
    });

    res.redirect('/');
});

MongoClient.connect('mongodb://localhost:27017/arguments', (err, client) => {
    if (err) return console.log(err);

    db = client.db('arguments');

    app.listen(port, () => {
        console.log("Server running on port " + port);
    });
});