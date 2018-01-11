// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

app.get('/api/profile', function(req, res){
  res.json ({
    name: "RJ",
    github_link: "https://github.com/rjmcbain",
    github_image: "https://avatars2.githubusercontent.com/u/33466125?s=460&v=4",
    current_city: "Denver",
    pets:[{name: "Ace", type: "Dog", breed: "Boxer"}]
  });
});
/**********
 * ROUTES *
 **********/

 app.get('/api/videogames', function(req, res){
  db.Videogames.find(function(err, videogames){
    if(err){res.send("error getting videogames", err);}
    res.json(videogames);
  });
 });

 app.get('/api/videogames/:id', function(req, res){
  db.Videogames.findById(req.params.id, function(err, videogames){
    if(err){res.send("error finding videogames", err);}
    res.json(videogames);
  });
 });

 app.post('/api/videogames', function(req, res){
  db.Videogames.create(
    { title: req.body.title,
      console: req.body.console,
      multiplayer: req.body.multiplayer,
      year: req.body.year
    }, function(err, videogames){
    if(err){res.send("error creating videogames", err);}
    res.json(videogames);
  });
 });

app.put('/api/videogames/:id', function(req, res){
  db.Videogames.findById(req.params.id, function(err, updateVideogames){
    if(err)
      res.json("error.",err);
    if(updateVideogames)
      console.log(updateVideogames);
      updateVideogames.title = req.body.title;
      updateVideogames.console = req.body.console;
      updateVideogames.mutltiplayer = req.body.mutltiplayer;
      updateVideogames.year = req.body.year;

      updateVideogames.save(function (err, updateVideogames) {
          if (err) return handleError(err);
          res.json(updateVideogames);
        });
    });
}); 

app.delete('/api/videogames/:id', function(req, res){
  db.Videogames.remove({_id: req.params.id},function(err, deleteVideogames){
    if(err){res.send("error.",err);}
    res.json(deleteVideogames);
    if(deleteVideogames);
      console.log(deleteVideogames);
      deleteVideogames.delete(function(err, deleteVideogames){
        res.json(deleteVideogames);
      });
  });
});

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/rjmcbain/express-personal-api/blob/master/README.md", // CHANGE ME
    base_url: "https://dry-tundra-96948.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Dis About Me"}, // CHANGE ME
      {method: "POST", path: "/api/videogames", description: "E.g. Create a new video game"}, // CHANGE ME
      {method: "DELETE", path: "/api/videogames/:id", description: "Delete a video game"}
    ]
  })
});

//



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

