var express = require('express');
var MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
var db;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/workbench', (req, res) => {
    db.collection('arguments').find().toArray((err, result) => {
        if (err) return console.log(err);

        res.render("workbench", { arguments: result });
    });
});

app.get('/profile', (req, res) => {
    res.render("profile");
});

app.post('/arguments', (req, res) => {
    db.collection('arguments').save({
        title: req.body.title,
        premises: req.body.premises,
        conclusion: req.body.conclusion
    });

    res.redirect(req.originalUrl);
});

app.delete('/arguments', (req, res) => {
    db.collection('arguments').remove({ _id: new mongodb.ObjectID(id) });

    res.redirect('/');
});

MongoClient.connect('mongodb://localhost:27017/arguments', (err, client) => {
    if (err) return console.log(err);

    db = client.db('arguments');

    app.listen(port, () => {
        console.log("Server running on port " + port);
    });
});