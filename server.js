const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
'use strict';
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/form/elsevalue', (req, res) => {
  const data = JSON.stringify(req.body)
    var fs = require('fs');
     fs.writeFile('./foodlist.json', data, function(err, result) {
        if(err) console.log('error', err);
      });
      // inset else value to favoritFoodOptions in DB
  }); 

  
// insert email to DB
// insert values to privateDetails in DB
// insert values to favoritFood inDB
