var express = require('express');
var Mongoose = require('mongoose');
var methodOverride = require('method-override');

var Argument = require('./models/argument');

Mongoose.connect('mongodb://localhost/arguments');
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Database connected");
});

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/workbench', (req, res) => {
    Argument.find({}, function (err, result) {
        if (err) console.log(err);

        res.render("workbench", { arguments: result });
    });    
});

app.get('/profile', (req, res) => {
    res.render("profile");
});

app.post('/arguments', (req, res) => {
    Argument.create({
        title: req.body.title,
        premises: req.body.premises,
        conclusion: req.body.conclusion
    });

    res.redirect('/workbench');
});

app.delete('/arguments/:id', (req, res) => {
    Argument.deleteOne({ _id: req.params.id }, function (err) {
        if (err) console.log(err);

        res.redirect('/workbench');
    });
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});