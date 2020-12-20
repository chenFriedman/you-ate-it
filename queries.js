const Pool = require('pg').Pool
const db = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const createUser = (request, response) => {
    const { email } = request.body  
    db.query('INSERT INTO users (email) VALUES ($1)', [email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
  
const getUsers = (request, response) => {
    db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
const createFavoritFoodOptions = (request, response) => {
    const { option } = request.body  
    db.query('INSERT INTO favoritFoodOptions (foodType) VALUES ($1)', [option], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}
const getFavoritFoodOptions = (request, response) => {
    db.query('SELECT * FROM favoritFoodOptions ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
const createPrivateDetails = (request, response) => {
  const { email, firstName, lastName, birthDate, id, phone } = request.body  
    db.query('INSERT INTO privateDetails (email, firstName, lastName, birthDate, id, phone) VALUES ($1, $2, $3, $4, $5, $6)', [email, firstName, lastName, birthDate, id, phone], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
  
const getPrivateDetails = (request, response) => {
    db.query('SELECT * FROM privateDetails ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createFavoritFood = (request, response) => {
    db.query(`INSERT INTO favoritFood (email, favoritBeer, favoritFood) VALUES ('chen1@example.com', 'negev', ARRAY [1,3]);`), (error, results) => {
        // const { email, favoritbeer, favoritFood } = request.body  
    // db.query('INSERT INTO privateDetails (email, favoritbeer, favoritFood) VALUES ($1, $2, $3)', [email, favoritbeer, favoritFood], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    }
  }
  
const getFavoritFood = (request, response) => {
    db.query('SELECT * FROM favoritFood', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    createUser,
    getUsers,
    createFavoritFoodOptions,
    getFavoritFoodOptions,
    createPrivateDetails,
    getPrivateDetails,
    createFavoritFood,
    getFavoritFood
  }