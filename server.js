const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
'use strict';
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require('pg').Pool
const db = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

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
});

app.post('/users', (request, response) => {
  const { email } = request.body  
  db.query('INSERT INTO users (email) VALUES ($1)', [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
})

app.get('/users', (req,res) => {
  db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })

})

app.post('/favoritFoodOptions', (request, response) => {
  const { option } = request.body  
  db.query('INSERT INTO favoritFoodOptions (foodType) VALUES ($1)', [option], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
})

app.get('/favoritFoodOptions', (req,res) => {
  db.query('SELECT * FROM favoritFoodOptions ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.post('/privateDetails', (request, response) => {
const { email, firstName, lastName, birthDate, id, phone } = request.body  
  db.query('INSERT INTO privateDetails (email, firstName, lastName, birthDate, id, phone) VALUES ($1, $2, $3, $4, $5, $6)', [email, firstName, lastName, birthDate, id, phone], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
})

app.get('/privateDetails', (req,res) => {
  db.query('SELECT * FROM privateDetails ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.post('/favoritFood', (request, response) => {
  let { email, favoritbeer, favoritFood } = request.body  
  db.query('INSERT INTO privateDetails (email, favoritbeer, favoritFood) VALUES ($1, $2, $3)', [email, favoritbeer, favoritFood], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
})

app.get('/favoritFood', (req,res) => {
  db.query('SELECT * FROM favoritFood', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})