var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');
var fs = require('fs');
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// URL at which MongoDB service is running
var url = "mongodb://localhost:27017"; 
 
// A Client to MongoDB
var MongoClient = require('mongodb').MongoClient; 
 
// Make a connection to MongoDB Service
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
  if (err) throw err; 
  console.log("Connected to MongoDB!");
  var dbo = db.db("mydb");
  db.close();
});

app.get('/',function(req,res) {
    res.sendFile('index.html', { root: __dirname });
  });

app.get('/liked',function(req,res) {
    res.sendFile('/public/liked.html', { root: __dirname });
  });

app.get("/scrape", function(req, res) {
  axios({
    method:'get',
    url:'https://www.newsinlevels.com/',
  })
    .then(function(response) {
      console.log("url connected")
      res.send(response.data);
  });
});


app.post('/update', function(req, res) {

  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      console.log(req.body)
      var dbo = db.db("mydb");
      var newvalues = {
          article: {
              title: req.body.title,
              link: req.body.href
          }
      };
      dbo.collection("saved").insertOne(newvalues, function(err, result) {
          if (err) throw err;
          console.log("1 document updated with title: " + req.body.title + " and href: " + req.body.href);
          db.close();
      });
  });
})

app.post('/remove', function(req, res) {

  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      console.log(req.body)
      var dbo = db.db("mydb");
      var query = {
          article: {
              title: req.body.title,
              link: req.body.href
          }
      };
      dbo.collection("saved").deleteOne(query, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
      });
  });
})

app.get('/find', function(req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) { 
    var dbo = db.db("mydb");
    dbo.collection("saved").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  })
})

app.get('/deleteCollection', function(req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("saved").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
  }); 
})

app.use(express.static(path.resolve('./public')));

app.listen(port, () => console.log(`News Scraper App listening on port ${port}!`))