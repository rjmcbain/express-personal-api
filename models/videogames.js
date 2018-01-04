var mongoose = require('mongoose');
Schema = mongoose.Schema;

var VideogamesSchema = new Schema({
	title: String,
	console: String,
	year: String,
	multiplayer: Boolean
});

var Videogames = mongoose.model('Videogames', VideogamesSchema);

module.exports = Videogames;