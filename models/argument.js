var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var argumentSchema = new Schema({
    title: String,
    premises: Array,
    conclusion: String
});

module.exports = Mongoose.model('Argument', argumentSchema);