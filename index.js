//Require Node modules
var express = require('express'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override');

//Require models
var Argument = require('./models/argument');

//Connect to database
mongoose.connect('mongodb://localhost/arguments');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database connected");
});

//Basic app configuration
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

//Routes
app.get('/', (req, res) => {
    res.render("index");
});

app.get('/workbench', (req, res) => {
    Argument.find({}, (err, result) => {
        if (err) console.log(err);

        res.render("workbench", { arguments: result });
    });
});

app.get('/profile', (req, res) => {
    res.render("profile");
});

app.get('/argument/:id', (req, res) => {
    Argument.findOne({ _id: req.params.id }, (err, result) => {
        res.render("argument", { argument: result });
    });
});

app.post('/argument', (req, res) => {
    Argument.create({
        title: req.body.title,
        premises: req.body.premises,
        conclusion: req.body.conclusion
    }, (err) => {
        if (err) console.log(err);

        res.redirect('/workbench');
    });
});

app.put('argument/:id', (req, res) => {
    Argument.find({ _id: req.params._id }, (err, result) => {

    });
});

app.delete('/argument/:id', (req, res) => {
    Argument.deleteOne({ _id: req.params.id }, (err) => {
        if (err) console.log(err);

        res.redirect('/workbench');
    });
});

//Start server
app.listen(port, () => {
    console.log("Server running on port " + port);
});