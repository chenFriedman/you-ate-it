const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
'use strict';
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/getbeerslist', (req, res) => {
  let rawdata = fs.readFileSync('./beerslist.json');
  let beerslistFile = JSON.parse(rawdata);
  res.send({ beerslist: beerslistFile.beerList });
});

app.get('/api/getfoodslist', (req, res) => {
  let rawdata = fs.readFileSync('./foodlist.json');
  let foodlistFile = JSON.parse(rawdata);
  res.send({ foodslist: foodlistFile });
});

app.post('api/submit'), (req, res) => {
  // insert values to privateDetails in DB
  // if there is else value
    // add else value to ./foodlist.json
    // inset else value to favoritFoodOptions in DB
  // insert values to favoritFood inDB
}