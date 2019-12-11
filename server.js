var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');
var fs = require('fs');
const axios = require('axios');

app.use(express.static('public'))

app.get('/',function(req,res) {
    res.sendFile('index.html', { root: __dirname });
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

app.use(express.static(path.resolve('./public')));

app.listen(port, () => console.log(`News Scraper App listening on port ${port}!`))