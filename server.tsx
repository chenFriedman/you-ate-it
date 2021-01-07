const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
'use strict';
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./queries.tsx');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/form/beerslist', (req, res) => {
  let rawdata = fs.readFileSync('./beerslist.json');
  let beerslistFile = JSON.parse(rawdata);
  res.send({ beerslist: beerslistFile.beerList });
});

app.get('/form/foodslist', (req, res) => {
  let rawdata = fs.readFileSync('./foodlist.json');
  let foodlistFile = JSON.parse(rawdata);
  res.send({ foodslist: foodlistFile });
});

app.post('/users', db.createUser)
app.get('/users', db.getUsers)
app.post('/favoritFoodOptions', db.createFavoritFoodOptions)
app.get('/favoritFoodOptions', db.getFavoritFoodOptions)
app.post('/privateDetails', db.createPrivateDetails)
app.get('/privateDetails', db.getPrivateDetails)
app.post('/favoritFood', db.createFavoritFood)
app.post('/favoritBeer', db.createFavoritBeer)
app.get('/favoritFood', db.getFavoritFood)