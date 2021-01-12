const Pool = require('pg').Pool
const pool = new Pool({
  user: 'oactaquy',
  host: 'suleiman.db.elephantsql.com',
  database: 'oactaquy',
  password: 'SVmN2rdJwsp6yAFIpD-9p3kBtMpkbTvy',
  port: 5432,
})
'use strict';

const getBeerlist = (request, response) => {
  pool.query('SELECT * FROM beerList', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
    const { email } = request.body  
    pool.query('INSERT INTO users (email) VALUES ($1)', [email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createFavoritFoodOptions = (request, response) => {
    const {key, value} = request.body  
    pool.query('INSERT INTO favoritFoodOptions (Key, Value) VALUES ($1, $2)', [key, value], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const getFavoritFoodOptions = (request, response) => {
    pool.query('SELECT * FROM favoritFoodOptions ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createPrivateDetails = (request, response) => {
  const { email, firstName, lastName, birthdate, id, phone } = request.body  
    pool.query('INSERT INTO privateDetails (email, firstName, lastName, birthdate, id, phone) VALUES ($1, $2, $3, $4, $5, $6)', [email, firstName, lastName, birthdate, id, phone], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }

const getPrivateDetails = (request, response) => {
    pool.query('SELECT * FROM privateDetails ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createFavoritBeer = (request, response) => {
  const { email, favoriteFoodOrBeer } = request.body  
  pool.query('INSERT INTO favoritFood (email, favoriteFoodOrBeer) VALUES ($1, $2)', [email, favoriteFoodOrBeer], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }

const createFavoritFood = (request, response) => {
  const values = request.body
  var format = require('pg-format');
  pool.query(format('INSERT INTO favoritFood (email, favoriteFoodOrBeer) VALUES %L', values)
  , (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID:`)
  })
  }

const getFavoritFood = (request, response) => {
    pool.query('SELECT * FROM favoritFood', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getBeerlist,
    createUser,
    getUsers,
    createFavoritFoodOptions,
    getFavoritFoodOptions,
    createPrivateDetails,
    getPrivateDetails,
    createFavoritFood,
    getFavoritFood,
    createFavoritBeer
  }