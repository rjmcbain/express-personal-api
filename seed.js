// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_videogames = [
{
	title:"Mario Brother" ,
	console:"NES" ,
	year: 1985,
	multiplayer: true,
},
{
	title:"The Legend of Zelda" ,
	console:"NES" ,
	year: 1986,
	multiplayer: false,
},
{
	title:"Battlefield 1" ,
	console:"PS4" ,
	year: 2016,
	multiplayer: true,
},
{
	title:"Sonic the Hedgehog" ,
	console:"Sega" ,
	year: 1991,
	multiplayer: true,
}
];

//removing all videogames from the list before seeding again
db.Videogames.remove({}, function(err, videogames){
	if(err)
		{console.log('Experienced a problem removing ',err);}
	else{
		db.Videogames.create(new_videogames, function(err, myVideogames){
			if(err){return console.log('No problems ', err);}
			process.exit();
		});
	}
});
